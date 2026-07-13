"use client";

import { CONTACT_EMAIL, DEMO_EMAIL, SIGNUP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-[rgba(4,44,68,0.1)] bg-[var(--cream)]">
      {/* Final CTA — the two audiences, side by side. */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[var(--navy)] p-10 text-white">
            <h3 className="font-display text-2xl font-black md:text-3xl">
              {t.footer.agencyTitle}
            </h3>
            <p className="mt-3 text-white/70">{t.footer.agencyBody}</p>
            <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary mt-7">
              {t.footer.agencyCta}
            </a>
          </div>

          <div className="rounded-3xl border border-[rgba(4,44,68,0.12)] bg-white p-10">
            <h3 className="font-display text-2xl font-black md:text-3xl">
              {t.footer.tutorTitle}
            </h3>
            <p className="mt-3 text-[var(--text-muted)]">
              {t.footer.tutorBody}
            </p>
            <a href={SIGNUP_URL} className="btn-secondary mt-7">
              {t.footer.tutorCta}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(4,44,68,0.08)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <span className="font-display text-xl font-black">Tutorly</span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--navy)]"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Tutorly
          </p>
        </div>
      </div>
    </footer>
  );
}
