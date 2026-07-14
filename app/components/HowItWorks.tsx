"use client";

import { useLang } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="come-funziona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-3xl font-black md:text-5xl">
        {t.how.title}{" "}
        <span className="text-[var(--gold)]">{t.how.titleAccent}</span>
      </h2>

      <ol className="mt-16 grid gap-10 md:grid-cols-4">
        {t.how.steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-black text-[var(--sand)]">
                0{i + 1}
              </span>
              {i < t.how.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-[rgba(4,44,68,0.12)] md:block"
                />
              )}
            </div>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-[var(--text-muted)]">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
