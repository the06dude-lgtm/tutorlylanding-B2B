"use client";

import { useLang } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="come-funziona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="rounded-[2.5rem] bg-[var(--cream)] px-8 py-14 md:px-16 md:py-20">
        <h2 className="text-3xl font-black md:text-5xl">
          {t.how.title}{" "}
          <span className="text-[var(--gold)]">{t.how.titleAccent}</span>
        </h2>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
          {/* The path through the four steps — sits behind the gold coins. */}
          <div
            aria-hidden
            className="absolute top-7 right-[10%] left-[10%] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, var(--gold) 0%, var(--sand) 50%, var(--gold) 100%)",
            }}
          />

          {t.how.steps.map((s, i) => (
            <li key={s.title} className="group relative">
              <span
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-black text-[var(--navy)] shadow-[0_8px_20px_rgba(240,183,83,0.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6"
                style={{ background: "var(--gradient-gold)" }}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[var(--text-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
