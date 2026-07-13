import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Ci parli dei tuoi studenti",
    body: "Materie, livelli, volumi. Capiamo cosa ti serve e in quali fasce sei scoperto.",
  },
  {
    title: "Attiviamo la rete",
    body: "Selezioniamo i tutor verificati adatti al tuo bacino. Nessun reclutamento da parte tua.",
  },
  {
    title: "Gli studenti prenotano",
    body: "Aule virtuali, calendario e pagamenti sono già inclusi. Tu non gestisci nulla.",
  },
  {
    title: "Ricevi i report",
    body: "Ore erogate, feedback e risultati. Dati pronti da condividere con chi decide.",
  },
];

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">
          Quattro passi. <span className="text-[var(--gold)]">Zero attrito.</span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-10 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <li className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-black text-[var(--sand)]">
                  0{i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-[rgba(4,44,68,0.12)] md:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[var(--text-muted)]">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
