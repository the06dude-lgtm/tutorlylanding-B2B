"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "it" | "en";

/**
 * All page copy, per language. Italian is the source of truth — the `Dict`
 * type is derived from it, so a missing English key is a type error.
 */
const it = {
  nav: {
    what: "Cos’è",
    agencies: "Agenzie",
    tutors: "Tutor",
    cta: "Inizia ora",
  },
  hero: {
    badge: "Per agenzie e tutor",
    title1: "Lancia le tue",
    title2: "ripetizioni.",
    titleAccent: "Senza costruirle.",
    body: "La tua agenzia non offre tutoring? Con Tutorly lo attivi in pochi giorni: tutor verificati, aule virtuali e pagamenti sono già pronti. Tu ci metti i clienti, noi tutto il resto.",
    ctaPrimary: "Attiva il tuo tutoring",
    ctaSecondary: "Insegna con noi",
    stats: [
      ["0€", "Costi di setup"],
      ["Giorni", "Non mesi"],
      ["100%", "Tutor verificati"],
    ],
  },
  mascot: {
    aria: "Scopri come funziona Tutorly",
    pill: "⚡ Attiva in 7 giorni",
    headline: "Lancia la tua piattaforma di tutoring",
    cta: "Prenota una demo",
    close: "Chiudi",
    cards: [
      { title: "Tutor verificati", sub: "Dalle migliori università" },
      { title: "Pagamenti pronti", sub: "Incassi automatici, zero setup" },
      { title: "Il tuo brand", sub: "White-label completo" },
    ],
  },
  what: {
    title1: "Aprire un servizio di ripetizioni",
    title2: "richiede mesi.",
    titleAccent: "O una settimana.",
    body: "Le tre cose che fermano ogni agenzia — i tutor, la tecnologia, la qualità — sono esattamente le tre che ti diamo già fatte.",
    blockers: [
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
    ],
  },
  agencies: {
    kicker: "Per le agenzie",
    title1: "Il tutoring che non hai,",
    titleAccent: "operativo domani",
    body: "I tuoi clienti chiedono ripetizioni e tu devi dire di no. Con Tutorly dici di sì: attivi il servizio, lo vendi come tuo, e noi lo eroghiamo dietro le quinte.",
    benefits: [
      {
        title: "Una nuova linea di ricavi",
        body: "Il tutoring diventa un servizio che vendi ai clienti che hai già. Nessun costo fisso, nessuna assunzione.",
      },
      {
        title: "Copertura su tutte le materie",
        body: "Dalle medie alla maturità, fino a IB, SAT e test di ammissione. Nessuna richiesta resta senza risposta.",
      },
      {
        title: "Aule virtuali incluse",
        body: "Lezioni, registrazioni e materiali in un unico posto. Nessun software da comprare o integrare.",
      },
      {
        title: "Reportistica trasparente",
        body: "Ore erogate, presenze e feedback. Dati chiari da mostrare ai tuoi clienti — e da usare per rivendere.",
      },
    ],
    logosLabel: "I nostri tutor arrivano da",
    ctaDemo: "Richiedi una demo",
    ctaHow: "Come funziona",
  },
  how: {
    title: "Quattro passi.",
    titleAccent: "Zero attrito.",
    steps: [
      {
        title: "Ci dici cosa ti chiedono",
        body: "Materie, livelli, volumi. Capiamo quale domanda stai già perdendo.",
      },
      {
        title: "Attiviamo la rete",
        body: "Selezioniamo i tutor verificati adatti ai tuoi clienti. Nessun reclutamento da parte tua.",
      },
      {
        title: "Vendi il servizio come tuo",
        body: "Aule virtuali, calendario e pagamenti sono già inclusi. Tu non gestisci nulla.",
      },
      {
        title: "Incassi e ricevi i report",
        body: "Ore erogate, feedback e risultati. Una linea di ricavi in più, senza costi fissi.",
      },
    ],
  },
  tutors: {
    kicker: "Per i tutor",
    title1: "Sali di livello.",
    title2: "Guadagna",
    titleAccent: "di più",
    body: "Ogni lezione ti avvicina al livello successivo — e ogni livello ti lascia più soldi in tasca. Nessuna commissione nascosta, nessuna gara al ribasso.",
    lessonsLabel: ["0–10 lezioni", "10–50 lezioni", "50–200 lezioni", "200+ lezioni"],
    commissionLabel: "Commissione",
    perks: [
      {
        title: "Più insegni, più guadagni",
        body: "La commissione scende dal 25% al 15% man mano che sali di livello.",
      },
      {
        title: "Certificato verificato",
        body: "Dopo 12 mesi e 20+ lezioni ottieni il Certificato di Eccellenza per LinkedIn e CV.",
      },
      {
        title: "Studenti già pronti",
        body: "Niente self-marketing: la domanda arriva da scuole e agenzie partner.",
      },
    ],
    cta: "Diventa un tutor",
  },
  footer: {
    agencyTitle: "Hai un’agenzia?",
    agencyBody:
      "Attiviamo il tuo servizio di ripetizioni in pochi giorni. Zero costi di setup.",
    agencyCta: "Attiva il tuo tutoring",
    tutorTitle: "Vuoi insegnare?",
    tutorBody:
      "Studenti già pronti, commissioni che scendono. Parti da Bronze.",
    tutorCta: "Diventa un tutor",
  },
};

export type Dict = typeof it;

const en: Dict = {
  nav: {
    what: "What it is",
    agencies: "Agencies",
    tutors: "Tutors",
    cta: "Get started",
  },
  hero: {
    badge: "For agencies & tutors",
    title1: "Launch your",
    title2: "tutoring.",
    titleAccent: "Without building it.",
    body: "Your agency doesn’t offer tutoring? With Tutorly it’s live in days: verified tutors, virtual classrooms and payments are ready to go. You bring the clients, we handle the rest.",
    ctaPrimary: "Launch your tutoring",
    ctaSecondary: "Teach with us",
    stats: [
      ["€0", "Setup costs"],
      ["Days", "Not months"],
      ["100%", "Verified tutors"],
    ],
  },
  mascot: {
    aria: "See how Tutorly works",
    pill: "⚡ Live in 7 days",
    headline: "Launch your tutoring platform",
    cta: "Book a demo",
    close: "Close",
    cards: [
      { title: "Verified tutors", sub: "From top universities" },
      { title: "Payments ready", sub: "Automatic payouts, zero setup" },
      { title: "Your brand", sub: "Fully white-label" },
    ],
  },
  what: {
    title1: "Launching a tutoring service",
    title2: "takes months.",
    titleAccent: "Or one week.",
    body: "The three things that stop every agency — tutors, technology, quality — are exactly the three we hand you ready-made.",
    blockers: [
      {
        problem: "Recruiting tutors",
        answer:
          "The network already exists: verified tutors from Italy’s top universities, screened and ranked by level.",
      },
      {
        problem: "Building the platform",
        answer:
          "Virtual classrooms, scheduling, payments and recordings: all included. No software to buy or integrate.",
      },
      {
        problem: "Managing quality",
        answer:
          "The tier system rewards the best tutors and makes them stand out. You always know who walks into the classroom.",
      },
    ],
  },
  agencies: {
    kicker: "For agencies",
    title1: "The tutoring you don’t have,",
    titleAccent: "running by tomorrow",
    body: "Your clients ask for tutoring and you have to say no. With Tutorly you say yes: you launch the service, sell it as your own, and we deliver it behind the scenes.",
    benefits: [
      {
        title: "A new revenue line",
        body: "Tutoring becomes a service you sell to the clients you already have. No fixed costs, no hiring.",
      },
      {
        title: "Every subject covered",
        body: "From middle school to finals, up to IB, SAT and admission tests. No request goes unanswered.",
      },
      {
        title: "Virtual classrooms included",
        body: "Lessons, recordings and materials in one place. No software to buy or integrate.",
      },
      {
        title: "Transparent reporting",
        body: "Hours delivered, attendance and feedback. Clear data to show your clients — and to upsell with.",
      },
    ],
    logosLabel: "Our tutors come from",
    ctaDemo: "Request a demo",
    ctaHow: "How it works",
  },
  how: {
    title: "Four steps.",
    titleAccent: "Zero friction.",
    steps: [
      {
        title: "Tell us what they ask for",
        body: "Subjects, levels, volumes. We map the demand you’re already losing.",
      },
      {
        title: "We activate the network",
        body: "We select the verified tutors that fit your clients. No recruiting on your side.",
      },
      {
        title: "Sell the service as yours",
        body: "Virtual classrooms, scheduling and payments are included. You manage nothing.",
      },
      {
        title: "Collect revenue and reports",
        body: "Hours delivered, feedback and results. One more revenue line, no fixed costs.",
      },
    ],
  },
  tutors: {
    kicker: "For tutors",
    title1: "Level up.",
    title2: "Earn",
    titleAccent: "more",
    body: "Every lesson brings you closer to the next tier — and every tier leaves more money in your pocket. No hidden fees, no race to the bottom.",
    lessonsLabel: ["0–10 lessons", "10–50 lessons", "50–200 lessons", "200+ lessons"],
    commissionLabel: "Commission",
    perks: [
      {
        title: "Teach more, earn more",
        body: "Commission drops from 25% to 15% as you climb the tiers.",
      },
      {
        title: "Verified certificate",
        body: "After 12 months and 20+ lessons you earn the Certificate of Excellence for LinkedIn and your CV.",
      },
      {
        title: "Students ready to go",
        body: "No self-marketing: demand comes from partner schools and agencies.",
      },
    ],
    cta: "Become a tutor",
  },
  footer: {
    agencyTitle: "Run an agency?",
    agencyBody: "We launch your tutoring service in days. Zero setup costs.",
    agencyCta: "Launch your tutoring",
    tutorTitle: "Want to teach?",
    tutorBody: "Students ready to go, commissions that drop. Start from Bronze.",
    tutorCta: "Become a tutor",
  },
};

export const dictionaries: Record<Lang, Dict> = { it, en };

const STORAGE_KEY = "tutorly-lang";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "it", setLang: () => {}, t: it });

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Italian on the server and on first client render, so hydration matches;
  // the saved preference is applied right after mount.
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "it" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
