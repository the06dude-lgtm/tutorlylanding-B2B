import Reveal from "./Reveal";

const PILLARS = [
  {
    title: "Tutor verificati, non un marketplace aperto",
    body: "Ogni tutor è selezionato, verificato e classificato per qualifiche, esperienza e risultati. Nessuna sorpresa davanti ai genitori.",
  },
  {
    title: "Nessuna lista d'attesa",
    body: "Il primo match arriva in pochi minuti, non in giorni. La domanda dei tuoi studenti non resta mai scoperta.",
  },
  {
    title: "Qualità misurabile",
    body: "Il sistema a livelli premia i tutor migliori e li rende riconoscibili. Sai sempre chi entra in aula.",
  },
];

export default function WhatIsTutorly() {
  return (
    <section id="cos-e" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
          Non un elenco di tutor.
          <br />
          Un’<span className="text-[var(--gold)]">infrastruttura</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)]">
          Tutorly è la piattaforma che scuole e agenzie usano per offrire
          ripetizioni online senza costruire nulla da zero: tutor, verifica,
          aule virtuali e pagamenti, già pronti.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <div className="h-full rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(4,44,68,0.1)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--gold)] font-display text-lg font-black text-[var(--navy)]">
                {i + 1}
              </div>
              <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-[var(--text-muted)]">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
