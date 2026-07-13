import Reveal from "./Reveal";

// The agency's real objection: "building a tutoring arm is a project."
// Each card kills one reason they haven't done it yet.
const BLOCKERS = [
  {
    problem: "Reclutare tutor",
    answer:
      "La rete esiste già: tutor verificati dalle migliori università italiane, selezionati e classificati per livello.",
  },
  {
    problem: "Costruire la piattaforma",
    answer:
      "Aule virtuali, calendario, pagamenti e registrazioni: tutto incluso. Nessun software da comprare o integrare.",
  },
  {
    problem: "Gestire la qualità",
    answer:
      "Il sistema a livelli premia i tutor migliori e li rende riconoscibili. Sai sempre chi entra in aula.",
  },
];

export default function WhatIsTutorly() {
  return (
    <section id="cos-e" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-black md:text-5xl">
          Aprire un servizio di ripetizioni
          <br />
          richiede mesi.{" "}
          <span className="text-[var(--gold)]">O una settimana.</span>
        </h2>
        <p className="mt-7 max-w-2xl text-lg text-[var(--text-muted)]">
          Le tre cose che fermano ogni agenzia — i tutor, la tecnologia, la
          qualità — sono esattamente le tre che ti diamo già fatte.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {BLOCKERS.map((b, i) => (
          <Reveal key={b.problem} delay={i * 90}>
            <div className="h-full rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(4,44,68,0.1)]">
              <p className="text-sm font-bold tracking-wide text-[var(--text-muted)] uppercase line-through decoration-[var(--gold)] decoration-2">
                {b.problem}
              </p>
              <p className="mt-5 text-[var(--navy)]">{b.answer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
