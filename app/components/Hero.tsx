"use client";

import { DEMO_EMAIL, SIGNUP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import MascotHero from "./MascotHero";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(4,44,68,0.12)] bg-white px-4 py-2 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            {t.hero.title1}
            <br />
            {t.hero.title2}{" "}
            <span className="text-[var(--gold)]">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg text-[var(--text-muted)]">
            {t.hero.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href={SIGNUP_URL} className="btn-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {t.hero.stats.map(([stat, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-black">{stat}</dt>
                <dd className="mt-1 text-sm text-[var(--text-muted)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden h-[600px] lg:block">
          <MascotHero />
        </div>
      </div>
    </section>
  );
}
