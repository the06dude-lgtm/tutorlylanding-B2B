import Image from "next/image";
import { SIGNUP_URL } from "@/lib/config";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(4,44,68,0.06)] bg-[var(--cream)]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
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

        <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#cos-e" className="transition hover:text-[var(--gold-dark)]">
            Cos’è
          </a>
          <a href="#partner" className="transition hover:text-[var(--gold-dark)]">
            Scuole e agenzie
          </a>
          <a href="#tutor" className="transition hover:text-[var(--gold-dark)]">
            Tutor
          </a>
        </div>

        <a
          href={SIGNUP_URL}
          className="btn-primary !px-5 !py-2.5 text-sm"
        >
          Inizia ora
        </a>
      </nav>
    </header>
  );
}
