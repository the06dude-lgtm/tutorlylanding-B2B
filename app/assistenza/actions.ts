"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/config";
import { EMAIL_FROM, EMAIL_MAX, EMAIL_RE } from "@/lib/email";

export type SupportState = {
  status: "idle" | "ok" | "error";
  /** Which dictionary key the form should render. Copy lives in i18n. */
  messageKey?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", true>>;
};

/**
 * Support form -> our inbox, via Resend (already DKIM-verified on tutorly.it).
 * The visitor never sees the API key: this only ever runs on the server.
 */
export async function sendSupportRequest(
  _prev: SupportState,
  formData: FormData
): Promise<SupportState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Bots fill every field they find; humans never see this one.
  if (String(formData.get("company") ?? "")) {
    return { status: "ok", messageKey: "sent" };
  }

  const fieldErrors: SupportState["fieldErrors"] = {};
  if (!name || name.length > EMAIL_MAX.name) fieldErrors.name = true;
  if (!email || email.length > EMAIL_MAX.email || !EMAIL_RE.test(email))
    fieldErrors.email = true;
  if (!message || message.length > EMAIL_MAX.message) fieldErrors.message = true;

  if (Object.keys(fieldErrors).length) {
    return { status: "error", messageKey: "invalid", fieldErrors };
  }

  // Missing key is a deploy problem, not a user problem — don't blame the form.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[support] RESEND_API_KEY is not set");
    return { status: "error", messageKey: "unavailable" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      // Sending as our own domain keeps DKIM aligned; the visitor's address
      // goes in reply-to so hitting Reply reaches them directly.
      replyTo: email,
      subject: `Assistenza — ${name}`,
      text: `Da: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[support] resend error:", error);
      return { status: "error", messageKey: "failed" };
    }

    return { status: "ok", messageKey: "sent" };
  } catch (err) {
    console.error("[support] unexpected error:", err);
    return { status: "error", messageKey: "failed" };
  }
}
