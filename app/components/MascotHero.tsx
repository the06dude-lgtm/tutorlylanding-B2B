"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DEMO_EMAIL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const MascotScene = dynamic(() => import("./MascotScene"), { ssr: false });

/**
 * Placement of the three proof cards, staggered around the mascot so nothing
 * covers his face: upper-left below the pitch card, lower-right at shoulder
 * level, lower-left at hand level. Copy comes from the i18n dict in the same
 * order.
 */
const CARD_LAYOUT = [
  { icon: "✓", className: "left-0 top-[40%]", delay: 120, drift: "-1.8s", tilt: "-3deg" },
  { icon: "€", className: "right-0 top-[64%]", delay: 240, drift: "-3.4s", tilt: "2.5deg" },
  { icon: "★", className: "bottom-[14%] left-0", delay: 360, drift: "-0.9s", tilt: "-2deg" },
];

/**
 * The hero mascot — stationary in its slot. Hovering switches him into
 * "activation mode" (slower sway, glowing stars, gold motes, camera eases in);
 * clicking opens a mini demo: the pitch card plus three floating proof cards
 * around him.
 */
export default function MascotHero() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  // The slot is display:none below lg — don't pay for a hidden WebGL canvas.
  useEffect(() => {
    const check = () =>
      setEnabled(window.matchMedia("(min-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!enabled) return null;

  const active = hovered || open;

  return (
    <div className="absolute inset-0">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(240,183,83,0.42) 0%, transparent 70%)",
          opacity: active ? 1 : 0.65,
        }}
      />

      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-label={t.mascot.aria}
        className="h-full w-full cursor-pointer rounded-full"
      >
        {/* Open = he steps back to give the cards the stage; hover = he leans
            in. Both eased by the scene's camera rig. */}
        <MascotScene
          hovered={active}
          distance={open ? 24.5 : hovered ? 18.5 : 21}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t.mascot.headline}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="mascot-pop pointer-events-auto absolute top-1 w-80"
            style={{ left: "calc(50% - 160px)" }}
          >
            <div className="mascot-float-soft relative rounded-3xl border border-[rgba(4,44,68,0.08)] bg-white/95 p-6 text-center shadow-[0_2px_8px_rgba(4,44,68,0.05),0_28px_56px_rgba(4,44,68,0.18)] backdrop-blur-md">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream)] px-3 py-1 text-xs font-bold tracking-wide text-[var(--gold-dark)]">
                {t.mascot.pill}
              </span>
              <p className="font-display mt-3 text-2xl font-black leading-snug">
                {t.mascot.headline}
              </p>
              <a
                href={`mailto:${DEMO_EMAIL}`}
                className="btn-primary mt-4 w-full !px-4 !py-2.5 text-sm"
              >
                {t.mascot.cta}
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.mascot.close}
                className="absolute -top-2.5 -right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-bold text-white shadow-md transition-transform hover:scale-110"
              >
                ✕
              </button>
            </div>
          </div>

          {CARD_LAYOUT.map(({ icon, className, delay, drift, tilt }, i) => (
            <div
              key={icon}
              className={`mascot-pop pointer-events-auto absolute ${className}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              <div
                className="mascot-float flex items-center gap-3 rounded-2xl border border-[rgba(4,44,68,0.08)] bg-white/90 py-3 pr-5 pl-3 shadow-[0_2px_8px_rgba(4,44,68,0.05),0_20px_40px_rgba(4,44,68,0.14)] backdrop-blur-md"
                style={{ animationDelay: drift, rotate: tilt }}
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-black text-[var(--navy)] shadow-[0_3px_8px_rgba(240,183,83,0.4)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  {icon}
                </span>
                <span className="flex flex-col whitespace-nowrap">
                  <span className="text-sm font-bold">
                    {t.mascot.cards[i].title}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.mascot.cards[i].sub}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
