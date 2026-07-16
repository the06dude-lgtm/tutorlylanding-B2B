"use client";

import Image from "next/image";
import { DEMO_EMAIL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const UNIVERSITIES = [
  { src: "/universities/bocconi.png", name: "Bocconi" },
  { src: "/universities/cattolica.png", name: "Cattolica" },
  { src: "/universities/luiss.png", name: "LUISS" },
  { src: "/universities/politecnico-milano.png", name: "Politecnico di Milano" },
  { src: "/universities/universita-studi-milano.png", name: "Università degli Studi di Milano" },
];

export default function ForSchools() {
  const { t } = useLang();

  return (
    <section id="partner" className="relative overflow-hidden bg-[var(--navy)] py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(at 15% 0%, rgba(240,183,83,0.16) 0px, transparent 55%), radial-gradient(at 90% 100%, rgba(0,212,255,0.12) 0px, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <span className="text-sm font-bold tracking-widest text-[var(--gold)] uppercase">
          {t.agencies.kicker}
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl md:text-5xl">
          {t.agencies.title1}
          <br />
          <span className="text-[var(--gold)]">{t.agencies.titleAccent}</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          {t.agencies.body}
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {t.agencies.benefits.map((b) => (
            <div
              key={b.title}
              className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:bg-white/[0.08]"
            >
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="mt-3 text-white/70">{b.body}</p>
            </div>
          ))}
        </div>

        {/* Leg 3: niche tutoring companies (IMAT-only, coding-only…) are
            customers too — same white-label mechanic, different buyer. */}
        <div className="mt-6 rounded-3xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <h3 className="text-xl font-bold">{t.agencies.niche.title}</h3>
            <p className="mt-3 max-w-2xl text-white/70">{t.agencies.niche.body}</p>
          </div>
          <a
            href={`mailto:${DEMO_EMAIL}`}
            className="btn-primary mt-6 shrink-0 md:mt-0"
          >
            {t.agencies.niche.cta}
          </a>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="text-sm font-semibold tracking-wide text-white/60 uppercase">
            {t.agencies.logosLabel}
          </p>
          {/* The source logos are a mix of dark and light artwork, so rather
              than inverting them onto navy, each sits on its own white chip. */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {UNIVERSITIES.map((u) => (
              <div
                key={u.name}
                className="flex h-20 flex-1 basis-36 items-center justify-center rounded-2xl bg-white px-5 transition duration-300 hover:-translate-y-1"
              >
                <Image
                  src={u.src}
                  alt={u.name}
                  width={130}
                  height={52}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          {/* Tutorly is not partnered with these universities — the tutors just
              study there. The logos are their trademarks, so the provenance
              framing above and this notice have to travel with them. */}
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/40">
            {t.agencies.logosDisclaimer}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary">
            {t.agencies.ctaDemo}
          </a>
          <a href="#come-funziona" className="btn-ghost-light">
            {t.agencies.ctaHow}
          </a>
        </div>
      </div>
    </section>
  );
}
