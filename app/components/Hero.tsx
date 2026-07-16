"use client";

import Image from "next/image";
import { SIGNUP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

/**
 * University NAMES, not logos. Naming where the tutors actually study is a
 * factual claim (nominative fair use); the logos are trademarks and stay in
 * the partner section behind their disclaimer — see ForSchools.
 */
const CAMPUSES = ["Bocconi", "Politecnico", "Cattolica", "LUISS", "Statale"];

/** Licensed stock, pre-cropped to the frame's 4:4.4. */
const HERO_PHOTO = "/hero.png";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-[var(--navy)] pt-28 pb-16 text-white md:pt-36 md:pb-20">
      {/* Warm depth in the navy field, so it isn't a flat rectangle. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(at 12% 8%, rgba(240,183,83,0.22) 0px, transparent 55%), radial-gradient(at 85% 90%, rgba(0,212,255,0.14) 0px, transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.05fr_1fr] md:gap-8">
        <div>
          <h1 className="text-[2.5rem] leading-[1.06] md:text-[3.5rem]">
            {t.hero.title1}
            <br />
            {t.hero.title2}
            <br />
            {/* The brand's own gold underline, drawn loose like a marker
                stroke — Orum's trick for making type feel hand-made. */}
            <span className="relative inline-block text-[var(--gold)]">
              {t.hero.titleAccent}
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full"
              >
                <path
                  d="M2 8 C 60 2, 120 10, 180 5 S 280 3, 298 7"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-md text-base text-white/70 md:text-lg">
            {t.hero.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={SIGNUP_URL} className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#partner" className="btn-ghost-light">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-10 text-xs font-bold tracking-widest text-white/40 uppercase">
            {t.hero.networkLabel}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {CAMPUSES.map((c) => (
              <span key={c} className="text-sm font-semibold text-white/75">
                {c}
              </span>
            ))}
            <span className="text-sm font-semibold text-[var(--gold)]">
              {t.hero.networkMore}
            </span>
          </div>
        </div>

        {/* The Orum move: photo in a hand-cut skewed frame, brand doodles
            breaking out of its edges. */}
        <div className="relative hidden md:block">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 55% 45%, rgba(240,183,83,0.35) 0%, transparent 70%)",
            }}
          />

          <div
            className="relative overflow-hidden bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
            style={{
              // Irregular corners — cut by hand, not a rounded rect.
              clipPath: "polygon(3% 1%, 100% 0, 97% 97%, 0 100%)",
              aspectRatio: "4 / 4.4",
            }}
          >
            <Image
              src={HERO_PHOTO}
              alt={t.hero.photoAlt}
              fill
              priority
              sizes="(max-width: 768px) 0px, 42vw"
              className="object-cover"
            />
          </div>

          {/* Gold star + lightning, the mascot's own vocabulary, spilling
              over the frame's edge the way Orum's stickers do. */}
          <svg
            aria-hidden
            viewBox="0 0 60 60"
            className="absolute -top-5 -left-6 h-14 w-14 drop-shadow-lg"
          >
            <path
              d="M30 4 L36.5 22 L55 22.5 L40 34 L45.5 52 L30 41 L14.5 52 L20 34 L5 22.5 L23.5 22 Z"
              fill="var(--gold-hot)"
            />
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 40 60"
            className="absolute -right-5 bottom-8 h-16 w-11 drop-shadow-lg"
          >
            <path d="M24 2 L6 34 L18 34 L14 58 L34 24 L21 24 Z" fill="var(--gold)" />
          </svg>
        </div>
      </div>

      {/* Stats rail — sits on the fold edge, like Orum's logo strip. */}
      <div className="relative mx-auto mt-14 max-w-6xl px-6 md:mt-20">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {t.hero.stats.map(([stat, label]) => (
            <div key={label} className="bg-[var(--navy)] px-6 py-5">
              <dt className="font-display text-xl text-[var(--gold)] md:text-2xl">
                {stat}
              </dt>
              <dd className="mt-1 text-sm text-white/60">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
