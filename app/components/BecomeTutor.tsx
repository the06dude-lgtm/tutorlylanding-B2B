"use client";

import Image from "next/image";
import Reveal from "./Reveal";
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
  },
  {
    name: "Silver",
    commission: "22%",
    img: "/tiers/mascot-tier-2-silver.png",
    glow: "rgba(192,192,192,0.4)",
  },
  {
    name: "Gold",
    commission: "20%",
    img: "/tiers/mascot-tier-3-gold.png",
    glow: "rgba(240,183,83,0.45)",
  },
  {
    name: "Diamond",
    commission: "15%",
    img: "/tiers/mascot-tier-4-diamond.png",
    glow: "rgba(0,212,255,0.4)",
  },
];

export default function BecomeTutor() {
  const { t } = useLang();

  return (
    <section id="tutor" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <span className="text-sm font-bold tracking-widest text-[var(--gold-dark)] uppercase">
          {t.tutors.kicker}
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl font-black md:text-5xl">
          {t.tutors.title1}
          <br />
          {t.tutors.title2}{" "}
          <span className="text-[var(--gold)]">{t.tutors.titleAccent}</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)]">
          {t.tutors.body}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 90}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 text-center transition-all duration-500 hover:-translate-y-2">
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
                <h3 className="font-display mt-6 text-2xl font-black">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {t.tutors.lessonsLabel[i]}
                </p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                  {t.tutors.commissionLabel}
                </p>
                <p className="font-display text-4xl font-black text-[var(--navy)]">
                  {tier.commission}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {t.tutors.perks.map((perk, i) => (
          <Reveal key={perk.title} delay={i * 80}>
            <h3 className="text-lg font-bold">{perk.title}</h3>
            <p className="mt-2 text-[var(--text-muted)]">{perk.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-16">
          <a href={SIGNUP_URL} className="btn-primary">
            {t.tutors.cta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
