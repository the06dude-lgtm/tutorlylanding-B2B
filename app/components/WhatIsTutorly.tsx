"use client";

import { useLang } from "@/lib/i18n";

// The agency's real objection: "building a tutoring arm is a project."
// Each card kills one reason they haven't done it yet.
export default function WhatIsTutorly() {
  const { t } = useLang();

  return (
    <section id="cos-e" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="max-w-3xl text-3xl font-black md:text-5xl">
        {t.what.title1}
        <br />
        {t.what.title2}{" "}
        <span className="text-[var(--gold)]">{t.what.titleAccent}</span>
      </h2>
      <p className="mt-7 max-w-2xl text-lg text-[var(--text-muted)]">
        {t.what.body}
      </p>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {t.what.blockers.map((b) => (
          <div
            key={b.problem}
            className="h-full rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(4,44,68,0.1)]"
          >
            <p className="text-sm font-bold tracking-wide text-[var(--text-muted)] uppercase line-through decoration-[var(--gold)] decoration-2">
              {b.problem}
            </p>
            <p className="mt-5 text-[var(--navy)]">{b.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
