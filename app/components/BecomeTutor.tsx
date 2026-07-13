import Image from "next/image";
import Reveal from "./Reveal";
import { SIGNUP_URL } from "@/lib/config";

// The tier system, straight from the live app (LandingPage.js). Each tier is
// the mascot sculpted in that material — the strongest asset the brand owns.
const TIERS = [
  {
    name: "Bronze",
    lessons: "0–10 lezioni",
    commission: "25%",
    img: "/tiers/mascot-tier-1-bronze.png",
    glow: "rgba(205,127,50,0.35)",
  },
  {
    name: "Silver",
    lessons: "10–50 lezioni",
    commission: "22%",
    img: "/tiers/mascot-tier-2-silver.png",
    glow: "rgba(192,192,192,0.4)",
  },
  {
    name: "Gold",
    lessons: "50–200 lezioni",
    commission: "20%",
    img: "/tiers/mascot-tier-3-gold.png",
    glow: "rgba(240,183,83,0.45)",
  },
  {
    name: "Diamond",
    lessons: "200+ lezioni",
    commission: "15%",
    img: "/tiers/mascot-tier-4-diamond.png",
    glow: "rgba(0,212,255,0.4)",
  },
];

const PERKS = [
  ["Più insegni, più guadagni", "La commissione scende dal 25% al 15% man mano che sali di livello."],
  ["Certificato verificato", "Dopo 12 mesi e 20+ lezioni ottieni il Certificato di Eccellenza per LinkedIn e CV."],
  ["Studenti già pronti", "Niente self-marketing: la domanda arriva da scuole e agenzie partner."],
];

export default function BecomeTutor() {
  return (
    <section id="tutor" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <span className="text-sm font-bold tracking-widest text-[var(--gold-dark)] uppercase">
          Per i tutor
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
          Sali di livello.
          <br />
          Guadagna <span className="text-[var(--gold)]">di più</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)]">
          Ogni lezione ti avvicina al livello successivo — e ogni livello ti
          lascia più soldi in tasca. Nessuna commissione nascosta, nessuna gara
          al ribasso.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 90}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-8 text-center transition-all duration-500 hover:-translate-y-2">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${t.glow} 0%, transparent 65%)`,
                }}
              />
              <div className="relative">
                <Image
                  src={t.img}
                  alt=""
                  width={190}
                  height={280}
                  className="mx-auto h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: `drop-shadow(0 8px 24px ${t.glow})` }}
                />
                <h3 className="font-display mt-6 text-2xl font-black">{t.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{t.lessons}</p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                  Commissione
                </p>
                <p className="font-display text-4xl font-black text-[var(--navy)]">
                  {t.commission}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {PERKS.map(([title, body], i) => (
          <Reveal key={title} delay={i * 80}>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-[var(--text-muted)]">{body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-16">
          <a href={SIGNUP_URL} className="btn-primary">
            Diventa un tutor
          </a>
        </div>
      </Reveal>
    </section>
  );
}
