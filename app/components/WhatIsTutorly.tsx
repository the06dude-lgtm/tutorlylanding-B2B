"use client";

import { useLang } from "@/lib/i18n";

// The agency's real objection: "building a tutoring arm is a project."
// Each row kills one reason they haven't done it yet — the problem struck
// out at headline size, the ready-made answer beside it.
export default function WhatIsTutorly() {
  const { t } = useLang();

  return (
    <section id="cos-e" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="max-w-3xl text-3xl md:text-5xl">
        {t.what.title1}
        <br />
        {t.what.title2}{" "}
        <span className="text-[var(--gold)]">{t.what.titleAccent}</span>
      </h2>
      <p className="mt-7 max-w-2xl text-lg text-[var(--text-muted)]">
        {t.what.body}
      </p>

      <div className="mt-16 border-t border-[rgba(4,44,68,0.12)]">
        {t.what.blockers.map((b, i) => (
          <div
            key={b.problem}
            className="group grid items-baseline gap-3 border-b border-[rgba(4,44,68,0.12)] py-9 transition-all duration-300 hover:bg-white/70 hover:pl-4 md:grid-cols-[3.5rem_1.1fr_1fr] md:items-center md:gap-8 md:py-12"
          >
            <span className="font-display text-sm tracking-widest text-[var(--gold-dark)]">
              0{i + 1}
            </span>
            <h3 className="font-display text-3xl text-[rgba(4,44,68,0.3)] line-through decoration-[var(--gold)] decoration-[3px] transition-colors duration-300 group-hover:text-[rgba(4,44,68,0.5)] md:text-5xl">
              {b.problem}
            </h3>
            <p className="flex items-start gap-3 text-lg text-[var(--navy)]">
              <span
                aria-hidden
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-[var(--navy)]"
                style={{ background: "var(--gradient-gold)" }}
              >
                ✓
              </span>
              {b.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
