"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DEMO_EMAIL } from "@/lib/config";

const MascotScene = dynamic(() => import("./MascotScene"), { ssr: false });

/**
 * The mascot follows the reader down the page. Once the hero's copy is behind
 * them, he docks into the corner; clicking him opens a "get started" bubble.
 * He's a CTA with a personality, not decoration.
 */
export default function MascotCompanion() {
  const [docked, setDocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Dock once the hero is mostly out of view.
      const past = window.scrollY > window.innerHeight * 0.75;
      setDocked(past);
      if (!past) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the bubble.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!docked) return null;

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      {open && (
        <div
          role="dialog"
          aria-label="Inizia con Tutorly"
          className="w-64 rounded-3xl border border-[rgba(4,44,68,0.1)] bg-white p-5 shadow-[0_16px_48px_rgba(4,44,68,0.18)]"
        >
          <p className="font-display text-lg font-black">Iniziamo oggi</p>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            Attiviamo il tuo servizio di ripetizioni in pochi giorni. Zero costi
            di setup.
          </p>
          <a
            href={`mailto:${DEMO_EMAIL}`}
            className="btn-primary mt-4 w-full !px-4 !py-2.5 text-sm"
          >
            Contattaci
          </a>
          <button
            onClick={() => setOpen(false)}
            className="mt-2 w-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--navy)]"
          >
            Chiudi
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-label={open ? "Chiudi" : "Inizia con Tutorly"}
        className="relative h-24 w-24 rounded-full transition-transform duration-300 hover:scale-105 md:h-28 md:w-28"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(240,183,83,0.55) 0%, transparent 70%)",
          }}
        />
        <MascotScene hovered={hovered} distance={17} shadow={false} />

        {!open && (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)] text-sm font-black text-[var(--navy)] shadow-md"
          >
            ?
          </span>
        )}
      </button>
    </div>
  );
}
