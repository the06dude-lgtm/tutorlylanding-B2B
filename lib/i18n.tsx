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
    what: "Cos’è Tutorly",
    agencies: "Per le aziende",
    tutors: "Diventa tutor",
    cta: "Accedi",
  },
  widget: {
    open: "Parla con noi",
    close: "Chiudi",
    /** Cycled in the speech bubble, one at a time. */
    teasers: [
      "Vuoi una demo?",
      "Ti serve aiuto?",
      "Cerchi un tutor?",
      "Parliamone!",
    ],
    title: "Ti interessa Tutorly?",
    body: "Lasciaci la tua email: ti ricontattiamo in giornata.",
    emailLabel: "La tua email",
    emailPlaceholder: "nome@azienda.it",
    submit: "Invia",
    submitting: "Invio…",
    sent: "Grazie! Ti scriviamo a breve.",
    invalidEmail: "Controlla la tua email.",
    failed: "Invio non riuscito. Riprova tra poco.",
    supportLead: "Hai già un account?",
    supportCta: "Assistenza clienti",
  },
  hero: {
    title1: "Il più grande network",
    title2: "di studenti",
    title2Aside: "(e non)",
    titleAccent: "pronti ad aiutarti.",
    body: "Tutorly mette in contatto chi ha bisogno di ripetizioni con chi sa insegnarle. Studenti, professionisti, tutor verificati — dalle medie all’università. E ora anche al servizio delle imprese.",
    ctaPrimary: "Trova il tuo tutor",
    ctaSecondary: "Sei un’azienda? ↓",
    stats: [
      ["Verificati", "Selezionati uno a uno"],
      ["Ogni livello", "Dalle medie ai test"],
      ["Ovunque", "Online, quando serve"],
    ],
    photoAlt: "Una tutor Tutorly durante una lezione di ripetizione",
    networkLabel: "I nostri tutor studiano in",
    networkMore: "+ altri atenei",
    networkPoints: [
      "Selezionati uno a uno, non un marketplace aperto.",
      "Classificati per livello: sai sempre chi ti segue.",
      "Dalle medie all’università, fino ai test d’ammissione.",
    ],
  },
  what: {
    title1: "Trovare ripetizioni",
    title2: "non dovrebbe essere",
    titleAccent: "una scommessa.",
    body: "Il passaparola è lento, i marketplace sono una lotteria e le agenzie costano. Tutorly è la rete di tutor che avresti voluto avere: selezionata, classificata, pronta.",
    blockers: [
      {
        problem: "Cercare a caso",
        answer:
          "Ogni tutor è selezionato uno a uno e classificato per livello. Non un marketplace aperto dove chiunque si iscrive.",
      },
      {
        problem: "Sperare che sia bravo",
        answer:
          "I livelli si guadagnano lezione dopo lezione, con i feedback reali degli studenti. Sai sempre chi ti trovi davanti.",
      },
      {
        problem: "Incastrare gli orari",
        answer:
          "Aule virtuali, calendario e pagamenti in un unico posto. Prenoti, entri, impari — da qualsiasi città.",
      },
    ],
  },
  agencies: {
    kicker: "Tutorly for Partners",
    title1: "Il tutoring che non hai,",
    titleAccent: "operativo domani",
    body: "I tuoi clienti chiedono ripetizioni e tu devi dire di no. Con Tutorly dici di sì: attivi il servizio, lo vendi come tuo, e noi lo eroghiamo dietro le quinte.",
    benefits: [
      {
        title: "Una nuova linea di ricavi",
        body: "Il tutoring diventa un servizio che vendi ai clienti che hai già. Nessun costo fisso, nessuna assunzione.",
      },
      {
        title: "Copertura totale, test inclusi",
        body: "Dalle medie alla maturità, fino a IB, SAT e test di ammissione. E per GRE, GMAT, IELTS e TOEFL attiviamo partner specializzati: non devi mai dire di no.",
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
    logosLabel: "I nostri tutor studiano in",
    logosDisclaimer:
      "I marchi citati appartengono ai rispettivi atenei. Tutorly non è affiliata, sponsorizzata o approvata da tali istituzioni: i loghi indicano unicamente l’università di provenienza dei nostri tutor.",
    ctaDemo: "Richiedi una demo",
    ctaHow: "Come funziona",
    niche: {
      title: "Fai già tutoring, ma in una sola nicchia?",
      body: "Solo preparazione IMAT? Solo coding? Ogni richiesta fuori dalla tua nicchia oggi è un cliente perso. Passala a noi: la eroghiamo col tuo brand e il cliente resta tuo.",
      cta: "Parliamone",
    },
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
    divider: "🎓 Sei un tutor? Questa parte è per te",
    title1: "Sali di livello.",
    title2: "Guadagna",
    titleAccent: "di più",
    body: "Ogni lezione ti avvicina al livello successivo — e ogni livello ti lascia più soldi in tasca. Nessuna commissione nascosta, nessuna gara al ribasso.",
    lessonsLabel: ["0–10 lezioni", "10–50 lezioni", "50–200 lezioni", "200+ lezioni"],
    commissionLabel: "Commissione",
    cert: {
      kicker: "Certificato di Eccellenza",
      title: "Il tuo lavoro, dimostrabile su LinkedIn.",
      body: "Dopo 12 mesi e almeno 20 lezioni ricevi il Certificato di Eccellenza Tutorly: un attestato verificato che pubblichi sul tuo profilo LinkedIn in un clic e aggiungi al CV.",
      points: [
        "Si aggiunge alle certificazioni del profilo LinkedIn, con Tutorly come ente emittente.",
        "Riporta le ore insegnate, le materie e il livello raggiunto — verificati da noi.",
        "Resta tuo per sempre, anche se smetti di insegnare con Tutorly.",
      ],
      linkedinLabel: "Licenze e certificazioni",
      linkedinCert: "Certificato di Eccellenza — Tutor Gold",
      linkedinCaption: "Come appare sul tuo profilo.",
    },
    perks: [
      {
        title: "Più insegni, più guadagni",
        body: "La commissione scende dal 25% al 15% man mano che sali di livello.",
      },
      {
        title: "Studenti già pronti",
        body: "Niente self-marketing: la domanda arriva da scuole e agenzie partner.",
      },
    ],
    cta: "Diventa un tutor",
  },
  signup: {
    kicker: "Iscriviti",
    title: "Iniziamo.",
    titleAccent: "Ti ricontattiamo noi.",
    body: "Lasciaci due dati e ti scriviamo per completare l’attivazione. Di solito rispondiamo in giornata.",
    roleLabel: "Sono…",
    roles: {
      tutor: "Un tutor",
      agency: "Un’agenzia / azienda",
      student: "Cerco ripetizioni",
    },
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "La tua email",
    emailPlaceholder: "nome@esempio.it",
    messageLabel: "Qualcosa che dovremmo sapere? (facoltativo)",
    messagePlaceholder: "Materie, esperienza, volumi…",
    submit: "Invia richiesta",
    submitting: "Invio…",
    sent: "Ricevuto! Ti ricontattiamo al più presto.",
    responseTime: "Rispondiamo in giornata, dal lunedì al venerdì.",
    invalid: "Controlla i campi evidenziati.",
    failed: "Qualcosa è andato storto. Riprova, o scrivici direttamente.",
    unavailable:
      "Il modulo non è disponibile in questo momento. Scrivici direttamente:",
    directLead: "Preferisci la tua email?",
    backHome: "← Torna alla home",
  },
  support: {
    kicker: "Assistenza",
    title: "Come possiamo",
    titleAccent: "aiutarti?",
    body: "Scrivici e ti risponde una persona vera, di solito in giornata. Più dettagli ci dai, più in fretta risolviamo.",
    nameLabel: "Il tuo nome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "La tua email",
    emailPlaceholder: "nome@esempio.it",
    messageLabel: "Come possiamo aiutarti?",
    messagePlaceholder: "Raccontaci cosa succede…",
    submit: "Invia richiesta",
    submitting: "Invio…",
    sent: "Ricevuto! Ti rispondiamo al più presto.",
    sentAgain: "Invia un’altra richiesta",
    invalid: "Controlla i campi evidenziati.",
    failed: "Qualcosa è andato storto. Riprova, o scrivici direttamente.",
    unavailable:
      "Il modulo non è disponibile in questo momento. Scrivici direttamente:",
    directLead: "Preferisci la tua email?",
    backHome: "← Torna alla home",
    responseTime: "Rispondiamo in giornata, dal lunedì al venerdì.",
  },
  footer: {
    agencyTitle: "Hai un’agenzia?",
    agencyBody:
      "Attiviamo il tuo servizio di ripetizioni in pochi giorni. Zero costi di setup.",
    agencyCta: "Attiva il tuo tutoring",
    tutorTitle: "Vuoi insegnare?",
    tutorBody:
      "Studenti già pronti, commissioni che scendono, e il Certificato di Eccellenza per il tuo LinkedIn.",
    tutorCta: "Diventa un tutor",
    blurb:
      "La rete di tutor selezionati che porta le ripetizioni dentro la tua azienda — e fa crescere chi le insegna.",
    navLabel: "Naviga",
    contactLabel: "Contatti",
    support: "Assistenza clienti",
    rights: "Tutti i diritti riservati.",
  },
};

export type Dict = typeof it;

const en: Dict = {
  nav: {
    what: "What Tutorly is",
    agencies: "For business",
    tutors: "Become a tutor",
    cta: "Sign in",
  },
  widget: {
    open: "Talk to us",
    close: "Close",
    teasers: [
      "Want a demo?",
      "Need help?",
      "Looking for a tutor?",
      "Let’s talk!",
    ],
    title: "Interested in Tutorly?",
    body: "Leave us your email and we’ll get back to you today.",
    emailLabel: "Your email",
    emailPlaceholder: "name@company.com",
    submit: "Send",
    submitting: "Sending…",
    sent: "Thanks! We’ll be in touch shortly.",
    invalidEmail: "Please check your email address.",
    failed: "Couldn’t send. Please try again shortly.",
    supportLead: "Already have an account?",
    supportCta: "Customer support",
  },
  hero: {
    title1: "The largest network",
    title2: "of students",
    title2Aside: "(and more)",
    titleAccent: "ready to help you.",
    body: "Tutorly connects the people who need tutoring with the people who know how to teach it. Students, professionals, verified tutors — from middle school to university. And now at the service of businesses too.",
    ctaPrimary: "Find your tutor",
    ctaSecondary: "Are you a business? ↓",
    stats: [
      ["Verified", "Tutors screened one by one"],
      ["Every level", "From school to test prep"],
      ["Anywhere", "Online, whenever you need"],
    ],
    photoAlt: "A Tutorly tutor during a tutoring session",
    networkLabel: "Our tutors study at",
    networkMore: "+ more universities",
    networkPoints: [
      "Screened one by one — not an open marketplace.",
      "Ranked by tier, so you always know who’s teaching you.",
      "From middle school to university and admission tests.",
    ],
  },
  what: {
    title1: "Finding a tutor",
    title2: "shouldn’t be",
    titleAccent: "a gamble.",
    body: "Word of mouth is slow, marketplaces are a lottery and agencies are expensive. Tutorly is the tutor network you wish you’d had: screened, ranked, ready.",
    blockers: [
      {
        problem: "Searching blind",
        answer:
          "Every tutor is screened one by one and ranked by tier. Not an open marketplace where anyone can sign up.",
      },
      {
        problem: "Hoping they’re good",
        answer:
          "Tiers are earned lesson after lesson, on real student feedback. You always know who you’re getting.",
      },
      {
        problem: "Juggling schedules",
        answer:
          "Virtual classrooms, scheduling and payments in one place. Book, join, learn — from any city.",
      },
    ],
  },
  agencies: {
    kicker: "Tutorly for Partners",
    title1: "The tutoring you don’t have,",
    titleAccent: "running by tomorrow",
    body: "Your clients ask for tutoring and you have to say no. With Tutorly you say yes: you launch the service, sell it as your own, and we deliver it behind the scenes.",
    benefits: [
      {
        title: "A new revenue line",
        body: "Tutoring becomes a service you sell to the clients you already have. No fixed costs, no hiring.",
      },
      {
        title: "Total coverage, tests included",
        body: "From middle school to finals, up to IB, SAT and admission tests. For GRE, GMAT, IELTS and TOEFL we bring in specialist partners: you never have to say no.",
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
    logosLabel: "Our tutors study at",
    logosDisclaimer:
      "All trademarks belong to their respective universities. Tutorly is not affiliated with, sponsored by, or endorsed by these institutions: the logos indicate only where our tutors study.",
    ctaDemo: "Request a demo",
    ctaHow: "How it works",
    niche: {
      title: "Already tutoring, but in a single niche?",
      body: "Only IMAT prep? Only coding? Every request outside your niche is a lost client today. Route it through us: we deliver it under your brand and the client stays yours.",
      cta: "Let’s talk",
    },
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
    divider: "🎓 Are you a tutor? This part is for you",
    title1: "Level up.",
    title2: "Earn",
    titleAccent: "more",
    body: "Every lesson brings you closer to the next tier — and every tier leaves more money in your pocket. No hidden fees, no race to the bottom.",
    lessonsLabel: ["0–10 lessons", "10–50 lessons", "50–200 lessons", "200+ lessons"],
    commissionLabel: "Commission",
    cert: {
      kicker: "Certificate of Excellence",
      title: "Your work, provable on LinkedIn.",
      body: "After 12 months and at least 20 lessons you receive the Tutorly Certificate of Excellence: a verified credential you post to your LinkedIn profile in one click and add to your CV.",
      points: [
        "Adds to your LinkedIn profile’s certifications, with Tutorly as the issuing organisation.",
        "Shows hours taught, subjects and the tier you reached — all verified by us.",
        "It’s yours for good, even if you stop teaching with Tutorly.",
      ],
      linkedinLabel: "Licenses & certifications",
      linkedinCert: "Certificate of Excellence — Gold Tutor",
      linkedinCaption: "How it looks on your profile.",
    },
    perks: [
      {
        title: "Teach more, earn more",
        body: "Commission drops from 25% to 15% as you climb the tiers.",
      },
      {
        title: "Students ready to go",
        body: "No self-marketing: demand comes from partner schools and agencies.",
      },
    ],
    cta: "Become a tutor",
  },
  signup: {
    kicker: "Sign up",
    title: "Let’s get started.",
    titleAccent: "We’ll reach out.",
    body: "Leave us a couple of details and we’ll write to finish setting you up. We usually reply the same day.",
    roleLabel: "I am…",
    roles: {
      tutor: "A tutor",
      agency: "An agency / business",
      student: "Looking for tutoring",
    },
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    emailLabel: "Your email",
    emailPlaceholder: "name@example.com",
    messageLabel: "Anything we should know? (optional)",
    messagePlaceholder: "Subjects, experience, volumes…",
    submit: "Send request",
    submitting: "Sending…",
    sent: "Got it! We’ll reach out shortly.",
    responseTime: "We reply the same day, Monday to Friday.",
    invalid: "Please check the highlighted fields.",
    failed: "Something went wrong. Try again, or email us directly.",
    unavailable:
      "The form isn’t available right now. Please email us directly:",
    directLead: "Prefer your own email?",
    backHome: "← Back to home",
  },
  support: {
    kicker: "Support",
    title: "How can we",
    titleAccent: "help you?",
    body: "Write to us and a real person answers, usually the same day. The more detail you give us, the faster we can fix it.",
    nameLabel: "Your name",
    namePlaceholder: "Jane Smith",
    emailLabel: "Your email",
    emailPlaceholder: "name@example.com",
    messageLabel: "How can we help?",
    messagePlaceholder: "Tell us what’s going on…",
    submit: "Send request",
    submitting: "Sending…",
    sent: "Got it! We’ll get back to you shortly.",
    sentAgain: "Send another request",
    invalid: "Please check the highlighted fields.",
    failed: "Something went wrong. Try again, or email us directly.",
    unavailable:
      "The form isn’t available right now. Please email us directly:",
    directLead: "Prefer your own email?",
    backHome: "← Back to home",
    responseTime: "We reply the same day, Monday to Friday.",
  },
  footer: {
    agencyTitle: "Run an agency?",
    agencyBody: "We launch your tutoring service in days. Zero setup costs.",
    agencyCta: "Launch your tutoring",
    tutorTitle: "Want to teach?",
    tutorBody:
      "Students ready to go, commissions that drop, and a Certificate of Excellence for your LinkedIn.",
    tutorCta: "Become a tutor",
    blurb:
      "The screened tutor network that brings tutoring inside your business — and grows the people who teach it.",
    navLabel: "Explore",
    contactLabel: "Contact",
    support: "Customer support",
    rights: "All rights reserved.",
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
