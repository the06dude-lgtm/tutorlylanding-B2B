"use client";

import Image from "next/image";
import Reveal from "./Reveal";
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
        <Reveal>
          <span className="text-sm font-bold tracking-widest text-[var(--gold)] uppercase">
            {t.agencies.kicker}
          </span>
          <h2 className="mt-5 max-w-2xl text-3xl font-black md:text-5xl">
            {t.agencies.title1}
            <br />
            <span className="text-[var(--gold)]">{t.agencies.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            {t.agencies.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {t.agencies.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:bg-white/[0.08]">
                <h3 className="text-xl font-bold">{b.title}</h3>
                <p className="mt-3 text-white/70">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
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
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <a href={`mailto:${DEMO_EMAIL}`} className="btn-primary">
              {t.agencies.ctaDemo}
            </a>
            <a href="#come-funziona" className="btn-ghost-light">
              {t.agencies.ctaHow}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
