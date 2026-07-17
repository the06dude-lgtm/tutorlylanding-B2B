"use client";

import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { CONTACT_EMAIL } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import SupportForm from "./SupportForm";

export default function SupportPage() {
  const { t } = useLang();
  const s = t.support;

  return (
    <>
      <Nav />
      <main>
        {/* Short navy band rather than a full hero: this is a utility page,
            and the form should be near the top of the fold. */}
        <section className="bg-[var(--navy)] pt-28 pb-16 text-center text-white md:pt-36 md:pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <span className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase">
              {s.kicker}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl">
              {s.title}{" "}
              <span className="text-[var(--gold)]">{s.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">
              {s.body}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-16 md:py-20">
          <SupportForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              {s.directLead}{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-bold text-[var(--navy)] underline transition hover:text-[var(--gold-dark)]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <Link
              href="/"
              className="mt-5 inline-block text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--navy)]"
            >
              {s.backHome}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
