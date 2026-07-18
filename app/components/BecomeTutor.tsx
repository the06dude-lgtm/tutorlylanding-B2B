"use client";

import Image from "next/image";
import { signupHref } from "@/lib/config";
import { useLang } from "@/lib/i18n";

// The tier system, straight from the live app (LandingPage.js). Each tier is
// the mascot sculpted in that material — the strongest asset the brand owns.
// Names are proper nouns; the lesson ranges come from the i18n dict.
const TIERS = [
  {
    name: "Bronze",
    img: "/tiers/mascot-tier-1-bronze.png",
    glow: "rgba(205,127,50,0.35)",
    bar: "linear-gradient(90deg, #cd7f32, #e8a56b)",
  },
  {
    name: "Silver",
    img: "/tiers/mascot-tier-2-silver.png",
    glow: "rgba(192,192,192,0.4)",
    bar: "linear-gradient(90deg, #9aa4ad, #d7dde2)",
  },
  {
    name: "Gold",
    img: "/tiers/mascot-tier-3-gold.png",
    glow: "rgba(240,183,83,0.45)",
    bar: "var(--gradient-gold)",
  },
  {
    name: "Diamond",
    img: "/tiers/mascot-tier-4-diamond.png",
    glow: "rgba(0,212,255,0.4)",
    bar: "linear-gradient(90deg, #00d4ff, #7de9ff)",
  },
];

const PERK_ICONS = ["€", "★"];

export default function BecomeTutor() {
  const { t } = useLang();

  return (
    <section id="tutor" className="relative">
      {/* Audience switch: everything above is for agencies, from here on it's
          the tutor pitch — the hero's "Are you a tutor?" lands here. A navy
          band carries the turn; a hairline rule was too quiet to signal that
          the whole page just changed who it's talking to. */}
      <div className="bg-[var(--navy)] py-14 text-center md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-5 py-2 text-sm font-bold text-[var(--gold)]">
            {t.tutors.divider}
          </span>
          <h2 className="mt-7 text-3xl text-white md:text-5xl">
            {t.tutors.title1}{" "}
            <span className="text-[var(--gold)]">
              {t.tutors.title2} {t.tutors.titleAccent}
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            {t.tutors.body}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              </div>
          </div>
        ))}
        </div>

        {/* The certificate is the one perk that outlives the platform — it
            earns its own block instead of a third of a card row. */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white md:grid md:grid-cols-[1.15fr_1fr] md:items-center">
          <div className="p-8 md:p-12">
            <span className="text-xs font-bold tracking-widest text-[var(--gold-dark)] uppercase">
              {t.tutors.cert.kicker}
            </span>
            <h3 className="font-display mt-4 text-2xl md:text-3xl">
              {t.tutors.cert.title}
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              {t.tutors.cert.body}
            </p>
            <ul className="mt-6 space-y-3">
              {t.tutors.cert.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-[var(--navy)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* A LinkedIn certification entry, as it lands on the tutor's
              profile once they add it. The card rises toward the cursor on
              hover — the group lives on the card, so the surrounding panel
              isn't a hover target. */}
          <div className="border-t border-[rgba(4,44,68,0.08)] bg-[var(--cream)] p-8 md:h-full md:border-t-0 md:border-l md:p-12">
            <div className="group/card rounded-2xl border border-[rgba(4,44,68,0.1)] bg-white p-5 shadow-[0_8px_28px_rgba(4,44,68,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(4,44,68,0.16)]">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#0a66c2]">
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#0a66c2] text-[10px] font-black text-white"
                >
                  in
                </span>
                {t.tutors.cert.linkedinLabel}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(4,44,68,0.08)] bg-[var(--cream)]"
                >
                  <Image
                    src="/mascot/mascotte.svg"
                    alt=""
                    width={40}
                    height={50}
                    className="h-8 w-auto transition-transform duration-500 group-hover/card:scale-110"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-snug font-bold">
                    {t.tutors.cert.linkedinCert}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    Tutorly
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
              {t.tutors.cert.linkedinCaption}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {t.tutors.perks.map((perk, i) => (
            <div
              key={perk.title}
              className="rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-black text-[var(--navy)] shadow-[0_3px_8px_rgba(240,183,83,0.4)]"
                style={{ background: "var(--gradient-gold)" }}
              >
                {PERK_ICONS[i]}
              </span>
              <h3 className="mt-5 text-lg font-bold">{perk.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
                {perk.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a href={signupHref("tutor")} className="btn-primary">
            {t.tutors.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
