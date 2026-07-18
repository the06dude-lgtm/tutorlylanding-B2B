"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signupHref } from "@/lib/config";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the navy hero — the bar and the hero read as one field,
  // the way Orum's does. It only picks up its own surface once past the fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[rgba(4,44,68,0.06)] bg-[var(--cream)]/90 backdrop-blur-md"
          : "border-b border-white/10 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          {/* Language switch — corner slot, left of the logo. A sliding pill:
              the cream thumb glides under the active flag. */}
          <div className="relative flex items-center rounded-full border border-[rgba(4,44,68,0.12)] bg-white p-1 shadow-[0_2px_8px_rgba(4,44,68,0.06)]">
            <span
              aria-hidden
              className="absolute top-1 left-1 h-7 w-12 rounded-full border border-[rgba(240,183,83,0.5)] bg-[var(--cream)] shadow-sm transition-transform duration-300"
              style={{
                transform: `translateX(${lang === "it" ? 0 : 48}px)`,
              }}
            />
            {LANGS.map(({ code, flag, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-label={label}
                aria-pressed={lang === code}
                className={`relative z-10 flex h-7 w-12 items-center justify-center gap-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                  lang === code
                    ? "text-[var(--navy)]"
                    : "text-[var(--text-muted)] opacity-50 hover:opacity-90"
                }`}
              >
                <span className="text-sm">{flag}</span>
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <a href="#" className="flex items-center">
            {/* The wordmark is navy artwork; over the navy hero it would
                disappear, so invert it to white until the cream bar arrives. */}
            <Image
              src="/tutorly-logo.png"
              alt="Tutorly"
              width={160}
              height={59}
              priority
              className="h-9 w-auto transition-[filter] duration-300"
              style={{
                filter: scrolled
                  ? "none"
                  : "brightness(0) saturate(100%) invert(1)",
              }}
            />
          </a>
        </div>

        <div
          className={`hidden items-center gap-8 text-sm font-semibold transition-colors duration-300 md:flex ${
            scrolled ? "text-[var(--navy)]" : "text-white/85"
          }`}
        >
          <a href="#cos-e" className="transition hover:text-[var(--gold)]">
            {t.nav.what}
          </a>
          <a href="#partner" className="transition hover:text-[var(--gold)]">
            {t.nav.agencies}
          </a>
          <a href="#tutor" className="transition hover:text-[var(--gold)]">
            {t.nav.tutors}
          </a>
        </div>

        <a href={signupHref("tutor")} className="btn-primary !px-5 !py-2.5 text-sm">
          {t.nav.cta}
        </a>
      </nav>
    </header>
  );
}
