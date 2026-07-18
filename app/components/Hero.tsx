"use client";

import Image from "next/image";
import { signupHref } from "@/lib/config";
import { useLang } from "@/lib/i18n";

/**
 * University NAMES, not logos. Naming where the tutors actually study is a
 * factual claim (nominative fair use); the logos are trademarks and stay in
 * the partner section behind their disclaimer — see ForSchools.
 */
const CAMPUSES = ["Bocconi", "Politecnico", "Cattolica", "LUISS", "Statale"];

/** Licensed stock, pre-cropped to the frame's 4:4.4. */
const HERO_PHOTO = "/landing-page-photo.png";

export default function Hero() {
  const { lang, t } = useLang();

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
            {t.hero.title2}{" "}
            {/* Italian fits at full size and stays there. Only the English
                aside is stepped down — "of students (and more)" overflows the
                column at full size and breaks the line structure. */}
            <span className={lang === "en" ? "text-[0.72em]" : undefined}>
              {t.hero.title2Aside}
            </span>
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
            <a href={signupHref("student")} className="btn-primary">
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

        {/* The Orum move: photo taped down askew, brand doodles stuck over its
            corners. The frame is a plain rotated rect — no clip-path — so its
            edges stay predictable and the stickers can sit exactly on them. */}
        <div className="relative hidden md:block">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 55% 45%, rgba(240,183,83,0.35) 0%, transparent 70%)",
            }}
          />

          <div className="relative" style={{ rotate: "-1.5deg" }}>
            <div
              className="relative overflow-hidden rounded-sm bg-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
              style={{ aspectRatio: "4 / 4.4" }}
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

            {/* Each SVG's artwork fills its own viewBox edge-to-edge, so a
                -50% offset puts the shape's centre right on the frame's
                corner: half on the photo, half on the navy. */}
            <svg
              aria-hidden
              viewBox="0 0 60 60"
              className="absolute -top-8 -left-8 z-10 h-16 w-16 drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
              style={{ rotate: "-14deg" }}
            >
              <path
                d="M30 2 L37.5 21.5 L58 22 L41.5 34.5 L47.5 55 L30 42.5 L12.5 55 L18.5 34.5 L2 22 L22.5 21.5 Z"
                fill="var(--gold-hot)"
              />
            </svg>
            <svg
              aria-hidden
              viewBox="0 0 40 60"
              className="absolute -right-7 bottom-[18%] z-10 h-20 w-14 drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
              style={{ rotate: "12deg" }}
            >
              <path
                d="M26 1 L5 35 L17.5 35 L13 59 L35 25 L21.5 25 Z"
                fill="var(--gold)"
              />
            </svg>
          </div>
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
