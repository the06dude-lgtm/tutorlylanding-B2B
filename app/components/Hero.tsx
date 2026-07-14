"use client";

import { DEMO_EMAIL } from "@/lib/config";
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
          <h1 className="text-5xl font-black md:text-7xl">
            {t.hero.title1}
            <br />
            {t.hero.title2}{" "}
            <span className="text-[var(--gold)]">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-7 max-w-md text-lg text-[var(--text-muted)] md:text-xl">
            {t.hero.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#tutor" className="btn-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-14 flex max-w-lg divide-x divide-[rgba(4,44,68,0.08)] rounded-2xl border border-[rgba(4,44,68,0.08)] bg-white/70 shadow-[0_8px_32px_rgba(4,44,68,0.06)] backdrop-blur-sm">
            {t.hero.stats.map(([stat, label]) => (
              <div key={label} className="flex-1 px-5 py-4 first:rounded-l-2xl last:rounded-r-2xl">
                <dt className="font-display text-2xl font-black md:text-3xl">
                  {stat}
                </dt>
                <dd className="mt-1 text-xs text-[var(--text-muted)] md:text-sm">
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
