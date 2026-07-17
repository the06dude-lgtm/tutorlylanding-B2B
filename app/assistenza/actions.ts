"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/config";

/**
 * Envelope sender. MUST be on a domain verified in Resend — tutorly.it is
 * verified at the root, which is what authorises the from address. A
 * gmail.com from would be rejected: we can't DKIM-sign for Google's domain.
 * Lives here rather than lib/config.ts because that module is bundled into
 * client components, where server env vars read as undefined.
 */
const SUPPORT_FROM = process.env.EMAIL_FROM ?? "Tutorly <assistenza@tutorly.it>";

export type SupportState = {
  status: "idle" | "ok" | "error";
  /** Which dictionary key the form should render. Copy lives in i18n. */
  messageKey?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", true>>;
};

const MAX = { name: 100, email: 200, message: 4000 };

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
  if (!name || name.length > MAX.name) fieldErrors.name = true;
  if (!email || email.length > MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = true;
  if (!message || message.length > MAX.message) fieldErrors.message = true;

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
      from: SUPPORT_FROM,
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
