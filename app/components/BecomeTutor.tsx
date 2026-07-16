"use client";

import Image from "next/image";
import { SIGNUP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

// The tier system, straight from the live app (LandingPage.js). Each tier is
// the mascot sculpted in that material — the strongest asset the brand owns.
// Names are proper nouns; the lesson ranges come from the i18n dict.
const TIERS = [
  {
    name: "Bronze",
    commission: "25%",
    img: "/tiers/mascot-tier-1-bronze.png",
    glow: "rgba(205,127,50,0.35)",
    bar: "linear-gradient(90deg, #cd7f32, #e8a56b)",
  },
  {
    name: "Silver",
    commission: "22%",
    img: "/tiers/mascot-tier-2-silver.png",
    glow: "rgba(192,192,192,0.4)",
    bar: "linear-gradient(90deg, #9aa4ad, #d7dde2)",
  },
  {
    name: "Gold",
    commission: "20%",
    img: "/tiers/mascot-tier-3-gold.png",
    glow: "rgba(240,183,83,0.45)",
    bar: "var(--gradient-gold)",
  },
  {
    name: "Diamond",
    commission: "15%",
    img: "/tiers/mascot-tier-4-diamond.png",
    glow: "rgba(0,212,255,0.4)",
    bar: "linear-gradient(90deg, #00d4ff, #7de9ff)",
  },
];

const PERK_ICONS = ["€", "★", "🎓"];

export default function BecomeTutor() {
  const { t } = useLang();

  return (
    <section id="tutor" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      {/* Audience switch: everything above is for agencies, from here on
          it's the tutor pitch — the hero's "Are you a tutor?" lands here. */}
      <div className="mb-16 flex items-center gap-4 md:mb-20">
        <span aria-hidden className="h-px flex-1 bg-[rgba(4,44,68,0.12)]" />
        <span className="rounded-full border border-[rgba(4,44,68,0.12)] bg-white px-5 py-2.5 text-sm font-bold shadow-[0_2px_8px_rgba(4,44,68,0.06)]">
          {t.tutors.divider}
        </span>
        <span aria-hidden className="h-px flex-1 bg-[rgba(4,44,68,0.12)]" />
      </div>

      <span className="text-sm font-bold tracking-widest text-[var(--gold-dark)] uppercase">
        {t.tutors.kicker}
      </span>
      <h2 className="mt-5 max-w-2xl text-3xl md:text-5xl">
        {t.tutors.title1}
        <br />
        {t.tutors.title2}{" "}
        <span className="text-[var(--gold)]">{t.tutors.titleAccent}</span>.
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)]">
        {t.tutors.body}
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => (
          <div
            key={tier.name}
            className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(4,44,68,0.12)]"
          >
              {/* Material swatch — each tier wears its own metal. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: tier.bar }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${tier.glow} 0%, transparent 65%)`,
                }}
              />
              <div className="relative">
                <Image
                  src={tier.img}
                  alt=""
                  width={190}
                  height={280}
                  className="mx-auto h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: `drop-shadow(0 8px 24px ${tier.glow})` }}
                />
                <h3 className="font-display mt-6 text-2xl ">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {t.tutors.lessonsLabel[i]}
                </p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                  {t.tutors.commissionLabel}
                </p>
                <p className="font-display text-4xl text-[var(--navy)]">
                  {tier.commission}
                </p>
              </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {t.tutors.perks.map((perk, i) => (
          <div
            key={perk.title}
            className="rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(4,44,68,0.1)]"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-black text-[var(--navy)] shadow-[0_3px_8px_rgba(240,183,83,0.4)]"
              style={{ background: "var(--gradient-gold)" }}
            >
              {PERK_ICONS[i]}
            </span>
            <h3 className="mt-5 text-lg font-bold">{perk.title}</h3>
            <p className="mt-2 text-[var(--text-muted)]">{perk.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <a href={SIGNUP_URL} className="btn-primary">
          {t.tutors.cta}
        </a>
      </div>
    </section>
  );
}
