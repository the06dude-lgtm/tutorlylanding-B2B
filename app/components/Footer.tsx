"use client";

import { CONTACT_EMAIL, DEMO_EMAIL, SIGNUP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

// Mirrors the nav's anchors, and reuses its labels so the two never drift.
const LINKS = [
  { href: "#cos-e", key: "what" },
  { href: "#partner", key: "agencies" },
  { href: "#tutor", key: "tutors" },
] as const;

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-[rgba(4,44,68,0.1)] bg-[var(--cream)]">
      {/* Final CTA — the two audiences, side by side. */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[var(--navy)] p-10 text-white">
            <h3 className="font-display text-2xl md:text-3xl">
              {t.footer.agencyTitle}
            </h3>
            <p className="mt-3 text-white/70">{t.footer.agencyBody}</p>
            <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary mt-7">
              {t.footer.agencyCta}
            </a>
          </div>

          <div className="rounded-3xl border border-[rgba(4,44,68,0.12)] bg-white p-10">
            <h3 className="font-display text-2xl md:text-3xl">
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

      {/* Sitemap + contact. Navy so the page closes on the brand colour
          rather than trailing off into the cream. */}
      <div className="bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
            <div>
              <span className="font-display text-2xl">Tutorly</span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                {t.footer.blurb}
              </p>
            </div>

            <nav aria-label={t.footer.navLabel}>
              <h4 className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase">
                {t.footer.navLabel}
              </h4>
              <ul className="mt-4 space-y-3">
                {LINKS.map(({ href, key }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {t.nav[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase">
                {t.footer.contactLabel}
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm break-all text-white/70 transition hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href="/assistenza"
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {t.footer.support}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Tutorly. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
