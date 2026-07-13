"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DEMO_EMAIL } from "@/lib/config";

const MascotScene = dynamic(() => import("./MascotScene"), { ssr: false });

const CARDS = [
  {
    icon: "✓",
    label: "Tutor verificati",
    className: "left-0 top-[36%]",
    delay: 120,
    drift: "-1.8s",
  },
  {
    icon: "€",
    label: "Pagamenti pronti",
    className: "right-0 top-[56%]",
    delay: 240,
    drift: "-3.6s",
  },
  {
    icon: "★",
    label: "Il brand della tua agenzia",
    className: "bottom-[4%] left-[16%]",
    delay: 360,
    drift: "-0.9s",
  },
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
        aria-label="Scopri come funziona Tutorly"
        className="h-full w-full cursor-pointer rounded-full"
      >
        <MascotScene hovered={active} distance={active ? 18.5 : 21} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Lancia la tua piattaforma di tutoring in 7 giorni"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="mascot-pop pointer-events-auto absolute top-0 w-72 rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-5 text-center shadow-[0_16px_48px_rgba(4,44,68,0.18)]"
            style={{ left: "calc(50% - 144px)" }}
          >
            <p className="font-display text-xl font-black leading-snug">
              Lancia la tua piattaforma di tutoring in 7 giorni
            </p>
            <a
              href={`mailto:${DEMO_EMAIL}`}
              className="btn-primary mt-4 w-full !px-4 !py-2.5 text-sm"
            >
              Prenota una demo
            </a>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--navy)]"
            >
              Chiudi
            </button>
          </div>

          {CARDS.map(({ icon, label, className, delay, drift }) => (
            <div
              key={label}
              className={`mascot-pop pointer-events-auto absolute ${className}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              <div
                className="mascot-drift flex items-center gap-2.5 rounded-2xl border border-[rgba(4,44,68,0.1)] bg-white py-2.5 pr-4 pl-2.5 shadow-[0_10px_30px_rgba(4,44,68,0.12)]"
                style={{ animationDelay: drift }}
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cream)] text-sm font-black text-[var(--gold-dark)]"
                >
                  {icon}
                </span>
                <span className="text-sm font-bold whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
