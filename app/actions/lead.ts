"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/config";
import { EMAIL_FROM, EMAIL_MAX, EMAIL_RE } from "@/lib/email";

export type LeadState = {
  status: "idle" | "ok" | "error";
  /** Dictionary key for the widget to render. Copy lives in i18n. */
  messageKey?: string;
};

/**
 * The mascot widget's email capture. Fires an internal alert to us — the
 * visitor has raised their hand and the whole value is in calling them back
 * fast, so the mail is written to be actionable at a glance on a phone.
 *
 * Previously this handed off to the visitor's mail client via `mailto:`, which
 * lost the lead entirely if they had no client configured or abandoned the
 * draft. Now the send happens server-side and can't be dropped.
 */
export async function captureLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  const email = String(formData.get("email") ?? "").trim();

  // Bots fill every field they find; humans never see this one.
  if (String(formData.get("company") ?? "")) {
    return { status: "ok", messageKey: "sent" };
  }

  if (!email || email.length > EMAIL_MAX.email || !EMAIL_RE.test(email)) {
    return { status: "error", messageKey: "invalidEmail" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY is not set");
    return { status: "error", messageKey: "failed" };
  }

  const when = new Intl.DateTimeFormat("it-IT", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(new Date());

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_EMAIL,
      // Reply goes straight to the prospect — that's the whole point.
      replyTo: email,
      subject: `🔥 Nuovo lead: ${email} — contattare al più presto`,
      text: [
        "Una persona ha lasciato la sua email sul sito: è interessata a Tutorly.",
        "",
        `Email:    ${email}`,
        `Quando:   ${when}`,
        `Da dove:  widget mascotte (landing tutorly.it)`,
        "",
        "Contattala al più presto — rispondi a questa mail e le arriva",
        "direttamente.",
      ].join("\n"),
    });

    if (error) {
      console.error("[lead] resend error:", error);
      return { status: "error", messageKey: "failed" };
    }

    return { status: "ok", messageKey: "sent" };
  } catch (err) {
    console.error("[lead] unexpected error:", err);
    return { status: "error", messageKey: "failed" };
  }
}
