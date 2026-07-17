"use client";

import { useActionState } from "react";
import { CONTACT_EMAIL } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import { sendSupportRequest, type SupportState } from "./actions";

const INITIAL: SupportState = { status: "idle" };

const FIELD =
  "w-full rounded-xl border bg-[var(--off-white)] px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2";
const FIELD_OK =
  "border-[rgba(4,44,68,0.14)] focus:border-[var(--gold)] focus:ring-[var(--gold)]/25";
// Not colour alone: invalid fields also get aria-invalid and a message.
const FIELD_BAD = "border-[#c2410c] focus:border-[#c2410c] focus:ring-[#c2410c]/20";

export default function SupportForm() {
  const { t } = useLang();
  const [state, formAction, pending] = useActionState(
    sendSupportRequest,
    INITIAL
  );

  const s = t.support;

  if (state.status === "ok") {
    return (
      <div className="rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 text-center md:p-10">
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-[var(--navy)] shadow-[0_6px_16px_rgba(240,183,83,0.35)]"
          style={{ background: "var(--gradient-gold)" }}
        >
          ✓
        </span>
        <p className="font-display mt-5 text-xl">{s.sent}</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {s.responseTime}
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 md:p-10"
    >
      {/* Honeypot: off-screen, unfocusable, and explicitly not autofilled. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-bold text-[var(--navy)]"
          >
            {s.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            aria-invalid={err.name ? true : undefined}
            placeholder={s.namePlaceholder}
            className={`mt-2 ${FIELD} ${err.name ? FIELD_BAD : FIELD_OK}`}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-bold text-[var(--navy)]"
          >
            {s.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            aria-invalid={err.email ? true : undefined}
            placeholder={s.emailPlaceholder}
            className={`mt-2 ${FIELD} ${err.email ? FIELD_BAD : FIELD_OK}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="text-sm font-bold text-[var(--navy)]"
        >
          {s.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          aria-invalid={err.message ? true : undefined}
          placeholder={s.messagePlaceholder}
          className={`mt-2 resize-y ${FIELD} ${err.message ? FIELD_BAD : FIELD_OK}`}
        />
      </div>

      {/* aria-live so the outcome is announced, not just seen. */}
      <p aria-live="polite" className="sr-only">
        {state.status === "error" && state.messageKey
          ? s[state.messageKey as "invalid" | "failed" | "unavailable"]
          : ""}
      </p>

      {state.status === "error" && state.messageKey && (
        <div className="mt-5 rounded-xl border border-[#c2410c]/25 bg-[#c2410c]/5 px-4 py-3 text-sm text-[#9a3412]">
          {s[state.messageKey as "invalid" | "failed" | "unavailable"]}{" "}
          {state.messageKey !== "invalid" && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold underline">
              {CONTACT_EMAIL}
            </a>
          )}
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? s.submitting : s.submit}
        </button>
        <p className="text-xs text-[var(--text-muted)]">{s.responseTime}</p>
      </div>
    </form>
  );
}
