"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { DEMO_EMAIL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const MascotScene = dynamic(() => import("./MascotScene"), { ssr: false });

/**
 * The mascot lives here now — docked in the corner rather than in the hero,
 * where a click on him read as decoration and nobody thought to try it. As a
 * corner button with a label and a badge he's unambiguously interactive.
 *
 * Two paths, because the page has two kinds of visitor with an unanswered
 * question: a prospect who wants to be contacted (email capture) and an
 * existing customer who needs help (support).
 */
export default function MascotCompanion() {
  const [docked, setDocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      // Dock once the hero is mostly out of view.
      const past = window.scrollY > window.innerHeight * 0.6;
      setDocked(past);
      if (!past) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reopening after a send should offer a fresh form, not a stale receipt.
  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  // No backend on this static site: hand the address to the user's mail client
  // with the body prefilled. Swap for a POST when an endpoint exists.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(
      "Richiesta info Tutorly"
    )}&body=${encodeURIComponent(`Email di contatto: ${email}\n\n`)}`;
    setSent(true);
  };

  if (!docked) return null;

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t.widget.title}
          className="mascot-pop w-[19rem] rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-5 shadow-[0_2px_8px_rgba(4,44,68,0.05),0_24px_56px_rgba(4,44,68,0.2)]"
        >
          <p className="font-display text-lg">{t.widget.title}</p>

          {sent ? (
            <p className="mt-2 flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <span
                aria-hidden
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-[var(--navy)]"
                style={{ background: "var(--gradient-gold)" }}
              >
                ✓
              </span>
              {t.widget.sent}
            </p>
          ) : (
            <>
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                {t.widget.body}
              </p>
              <form onSubmit={onSubmit} className="mt-4">
                <label htmlFor="widget-email" className="sr-only">
                  {t.widget.emailLabel}
                </label>
                <input
                  id="widget-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.widget.emailPlaceholder}
                  className="w-full rounded-xl border border-[rgba(4,44,68,0.14)] bg-[var(--off-white)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--gold)] focus:bg-white focus:ring-2 focus:ring-[var(--gold)]/25"
                />
                <button
                  type="submit"
                  className="btn-primary mt-2.5 w-full !px-4 !py-2.5 text-sm"
                >
                  {t.widget.submit}
                </button>
              </form>
            </>
          )}

          <div className="mt-4 border-t border-[rgba(4,44,68,0.1)] pt-3.5">
            <p className="text-xs text-[var(--text-muted)]">
              {t.widget.supportLead}
            </p>
            <a
              href="/assistenza"
              className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] transition hover:text-[var(--gold-dark)]"
            >
              {t.widget.supportCta}
              <span aria-hidden>→</span>
            </a>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-xs font-semibold text-[var(--text-muted)] transition hover:text-[var(--navy)]"
          >
            {t.widget.close}
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-label={open ? t.widget.close : t.widget.open}
        className="group relative flex items-center gap-2.5 rounded-full border border-[rgba(4,44,68,0.1)] bg-white py-1.5 pr-5 pl-1.5 shadow-[0_8px_28px_rgba(4,44,68,0.16)] transition-transform duration-300 hover:scale-[1.03]"
      >
        {/* block + explicit box: the R3F canvas sizes to this parent, and an
            inline span in a flex row collapses it to zero height. */}
        <span className="relative block h-14 w-14 shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background:
                "radial-gradient(circle, rgba(240,183,83,0.55) 0%, transparent 70%)",
            }}
          />
          <span className="absolute inset-0">
            <MascotScene hovered={hovered} distance={17} shadow={false} />
          </span>
        </span>
        <span className="text-sm font-bold whitespace-nowrap text-[var(--navy)]">
          {t.widget.open}
        </span>
        {!open && (
          <span
            aria-hidden
            className="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--navy)] shadow-md"
          >
            ?
          </span>
        )}
      </button>
    </div>
  );
}
