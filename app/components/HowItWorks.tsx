"use client";

import { useLang } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="come-funziona" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="rounded-[2.5rem] border border-[rgba(4,44,68,0.08)] bg-[var(--cream)] px-8 py-12 shadow-[0_1px_2px_rgba(4,44,68,0.04)] md:px-16 md:py-16">
        <h2 className="text-3xl md:text-5xl">
          {t.how.title}{" "}
          <span className="text-[var(--gold)]">{t.how.titleAccent}</span>
        </h2>

        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          {/* The path through the four steps. Stops one half-coin short at each
              end so it runs between the coins instead of out past them. */}
          <div
            aria-hidden
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--sand) 12%, var(--sand) 88%, transparent 100%)",
            }}
          />

          {t.how.steps.map((s, i) => (
            <li key={s.title} className="group relative">
              <span
                className="font-display relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-xl text-[var(--navy)] shadow-[0_6px_16px_rgba(240,183,83,0.3)] ring-8 ring-[var(--cream)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6"
                style={{ background: "var(--gradient-gold)" }}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
