"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/config";
import { EMAIL_FROM, EMAIL_MAX, EMAIL_RE } from "@/lib/email";

export type SignupRole = "tutor" | "agency" | "student";

export type SignupState = {
  status: "idle" | "ok" | "error";
  /** Dictionary key the form renders. Copy lives in i18n. */
  messageKey?: string;
  fieldErrors?: Partial<Record<"role" | "name" | "email", true>>;
};

const ROLES: SignupRole[] = ["tutor", "agency", "student"];

// How each role reads in the alert subject/body — kept here so the email is
// legible without the reader cross-referencing a code.
const ROLE_LABEL: Record<SignupRole, string> = {
  tutor: "Tutor",
  agency: "Agenzia / azienda",
  student: "Cerca ripetizioni",
};

/**
 * Temporary signup capture. The real app signup (SIGNUP_URL) is bypassed while
 * this is in place: every "sign up" CTA points here, and a submission emails us
 * the lead's details via Resend so we can onboard them by hand.
 */
export async function submitSignup(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const role = String(formData.get("role") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Bots fill every field they find; humans never see this one.
  if (String(formData.get("company") ?? "")) {
    return { status: "ok", messageKey: "sent" };
  }

  const fieldErrors: SignupState["fieldErrors"] = {};
  if (!ROLES.includes(role as SignupRole)) fieldErrors.role = true;
  if (!name || name.length > EMAIL_MAX.name) fieldErrors.name = true;
  if (!email || email.length > EMAIL_MAX.email || !EMAIL_RE.test(email))
    fieldErrors.email = true;

  if (Object.keys(fieldErrors).length) {
    return { status: "error", messageKey: "invalid", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[signup] RESEND_API_KEY is not set");
    return { status: "error", messageKey: "unavailable" };
  }

  const roleLabel = ROLE_LABEL[role as SignupRole];
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
      // Reply goes straight to the lead.
      replyTo: email,
      subject: `📝 Nuova iscrizione (${roleLabel}): ${name}`,
      text: [
        `Nuova richiesta di iscrizione dal sito.`,
        ``,
        `Ruolo:   ${roleLabel}`,
        `Nome:    ${name}`,
        `Email:   ${email}`,
        `Quando:  ${when}`,
        ``,
        message ? `Messaggio:\n${message}` : `(nessun messaggio)`,
        ``,
        `Rispondi a questa mail per contattare direttamente la persona.`,
      ].join("\n"),
    });

    if (error) {
      console.error("[signup] resend error:", error);
      return { status: "error", messageKey: "failed" };
    }

    return { status: "ok", messageKey: "sent" };
  } catch (err) {
    console.error("[signup] unexpected error:", err);
    return { status: "error", messageKey: "failed" };
  }
}
