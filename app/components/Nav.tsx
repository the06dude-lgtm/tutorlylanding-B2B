"use client";

import Image from "next/image";
import { SIGNUP_URL } from "@/lib/config";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(4,44,68,0.06)] bg-[var(--cream)]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center">
            <Image
              src="/tutorly-logo.png"
              alt="Tutorly"
              width={160}
              height={59}
              priority
              className="h-9 w-auto"
            />
          </a>

          {/* Language switch — flags only, IT/EN. */}
          <div className="flex items-center rounded-full border border-[rgba(4,44,68,0.12)] bg-white p-0.5">
            {LANGS.map(({ code, flag, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-label={label}
                aria-pressed={lang === code}
                className={`flex h-7 w-9 items-center justify-center rounded-full text-base transition ${
                  lang === code
                    ? "bg-[var(--cream)] shadow-sm"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#cos-e" className="transition hover:text-[var(--gold-dark)]">
            {t.nav.what}
          </a>
          <a href="#partner" className="transition hover:text-[var(--gold-dark)]">
            {t.nav.agencies}
          </a>
          <a href="#tutor" className="transition hover:text-[var(--gold-dark)]">
            {t.nav.tutors}
          </a>
        </div>

        <a href={SIGNUP_URL} className="btn-primary !px-5 !py-2.5 text-sm">
          {t.nav.cta}
        </a>
      </nav>
    </header>
  );
}
