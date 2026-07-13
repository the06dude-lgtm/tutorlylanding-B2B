"use client";

import dynamic from "next/dynamic";
import { SIGNUP_URL } from "@/lib/config";

// The 3D scene is client-only and must never block first paint.
const MascotScene = dynamic(() => import("./MascotScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
      {/* Warm mesh wash — the brand's signature non-flat background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(4,44,68,0.12)] bg-white px-4 py-2 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            Per scuole, agenzie e tutor
          </span>

          <h1 className="mt-6 text-4xl leading-[1.15] font-black tracking-tight md:text-6xl">
            Ripetizioni online
            <br />
            per chi <span className="text-[var(--gold)]">non può sbagliare</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-[var(--text-muted)]">
            Tutor verificati dalle migliori università italiane, pronti in pochi
            minuti. Tu porti gli studenti, noi la piattaforma, i tutor e la
            qualità.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#partner" className="btn-primary">
              Diventa partner
            </a>
            <a href={SIGNUP_URL} className="btn-secondary">
              Insegna con noi
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              ["5", "Atenei top"],
              ["100%", "Tutor verificati"],
              ["< 5 min", "Primo match"],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-black">{stat}</dt>
                <dd className="mt-1 text-sm text-[var(--text-muted)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The 3D mascot. Decorative — the page reads fine without it. */}
        <div aria-hidden className="relative h-[380px] md:h-[560px]">
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(240,183,83,0.35) 0%, rgba(0,212,255,0.14) 45%, transparent 70%)",
            }}
          />
          <MascotScene />
        </div>
      </div>
    </section>
  );
}
