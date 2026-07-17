"use client";

import dynamic from "next/dynamic";
import { useActionState, useEffect, useState } from "react";
import { captureLead, type LeadState } from "@/app/actions/lead";
import { useLang } from "@/lib/i18n";

const MascotScene = dynamic(() => import("./MascotScene"), { ssr: false });

/**
 * The mascot lives here rather than in the hero, where a click on him read as
 * decoration and nobody thought to try it. As a corner button with a label and
 * a badge he's unambiguously interactive, and he's present from the first
 * paint so the offer to talk never has to be scrolled for.
 *
 * Two paths, because the page has two kinds of visitor with an unanswered
 * question: a prospect who wants to be contacted (email capture) and an
 * existing customer who needs help (support).
 */
const INITIAL_LEAD: LeadState = { status: "idle" };

export default function MascotCompanion() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [teaser, setTeaser] = useState(0);
  const { t } = useLang();
  const [state, formAction, pending] = useActionState(
    captureLead,
    INITIAL_LEAD
  );
  const sent = state.status === "ok";

  // Rotate the speech bubble's line. Paused while the panel is open — he has
  // nothing to advertise once you're already talking to him.
  useEffect(() => {
    if (open) return;
    const id = setInterval(
      () => setTeaser((i) => (i + 1) % t.widget.teasers.length),
      3800
    );
    return () => clearInterval(id);
  }, [open, t.widget.teasers.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-3 bottom-3 z-50 flex flex-col items-end gap-3 md:right-5 md:bottom-4">
      {open && (
        <div
          role="dialog"
          aria-label={t.widget.title}
          className="mascot-pop w-[19rem] rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-5 shadow-[0_2px_8px_rgba(4,44,68,0.05),0_24px_56px_rgba(4,44,68,0.2)]"
        >
          <p className="font-display text-lg">{t.widget.title}</p>

          {sent ? (
            <p
              aria-live="polite"
              className="mt-2 flex items-start gap-2 text-sm text-[var(--text-muted)]"
            >
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
              <form action={formAction} className="mt-4">
                {/* Honeypot: off-screen, unfocusable, never autofilled. */}
                <div aria-hidden className="absolute left-[-9999px]">
                  <label htmlFor="widget-company">Company</label>
                  <input
                    id="widget-company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <label htmlFor="widget-email" className="sr-only">
                  {t.widget.emailLabel}
                </label>
                <input
                  id="widget-email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  aria-invalid={state.status === "error" ? true : undefined}
                  placeholder={t.widget.emailPlaceholder}
                  className={`w-full rounded-xl border bg-[var(--off-white)] px-3.5 py-2.5 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                    state.status === "error"
                      ? "border-[#c2410c] focus:border-[#c2410c] focus:ring-[#c2410c]/20"
                      : "border-[rgba(4,44,68,0.14)] focus:border-[var(--gold)] focus:ring-[var(--gold)]/25"
                  }`}
                />
                {state.status === "error" && state.messageKey && (
                  <p
                    aria-live="polite"
                    className="mt-2 text-xs font-semibold text-[#9a3412]"
                  >
                    {t.widget[state.messageKey as "invalidEmail" | "failed"]}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="btn-primary mt-2.5 w-full !px-4 !py-2.5 text-sm"
                >
                  {pending ? t.widget.submitting : t.widget.submit}
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

      {/* No pill, no label — just the mascot sitting on the page, with the
          "?" tucked beside his stars and a speech bubble at his shoulder.
          The badge, the bubble and the hover lift are what say "clickable";
          the character does the rest. */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-label={open ? t.widget.close : t.widget.open}
        className="relative block h-24 w-24 transition-transform duration-300 hover:scale-105 md:h-28 md:w-28"
      >
        {/* Hidden from the a11y tree: it's ambient flavour, and the button
            already carries a stable label. */}
        {!open && (
          <span
            aria-hidden
            className="absolute top-[36%] right-[82%] flex items-center"
          >
            <span
              key={teaser}
              className="mascot-teaser relative rounded-2xl border border-[rgba(4,44,68,0.08)] bg-white px-3.5 py-2 text-sm font-bold whitespace-nowrap text-[var(--navy)] shadow-[0_6px_20px_rgba(4,44,68,0.14)]"
            >
              {t.widget.teasers[teaser]}
              {/* Tail: a small square rotated to a diamond, half-tucked behind
                  the bubble so only the pointing corner shows. */}
              <span className="absolute top-1/2 -right-1 h-3 w-3 -translate-y-1/2 rotate-45 border-t border-r border-[rgba(4,44,68,0.08)] bg-white" />
            </span>
          </span>
        )}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(240,183,83,0.45) 0%, transparent 70%)",
          }}
        />
        <MascotScene hovered={hovered} distance={19} shadow={false} />

        {!open && (
          <span
            aria-hidden
            className="absolute top-[14%] right-[6%] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)] text-sm font-bold text-[var(--navy)] shadow-md"
          >
            ?
          </span>
        )}
      </button>
    </div>
  );
}
