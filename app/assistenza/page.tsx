import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Assistenza clienti — Tutorly",
  description:
    "Hai bisogno di aiuto con il tuo account Tutorly? Scrivici e ti rispondiamo in giornata.",
  // Placeholder: nothing here to rank on yet.
  robots: { index: false },
};

export default function Assistenza() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="rounded-full bg-[var(--cream)] px-3.5 py-1.5 text-xs font-bold tracking-widest text-[var(--gold-dark)] uppercase">
        In arrivo
      </span>

      <h1 className="mt-6 text-4xl md:text-5xl">Assistenza clienti</h1>

      <p className="mt-5 max-w-md text-lg text-[var(--text-muted)]">
        Il centro assistenza è in costruzione. Nel frattempo scrivici pure: una
        persona vera ti risponde, di solito in giornata.
      </p>

      <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary mt-8">
        {CONTACT_EMAIL}
      </a>

      <Link
        href="/"
        className="mt-6 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--navy)]"
      >
        ← Torna alla home
      </Link>
    </main>
  );
}
