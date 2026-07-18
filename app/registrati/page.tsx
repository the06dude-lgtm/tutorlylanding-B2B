import type { Metadata } from "next";
import SignupPage from "./SignupPage";
import type { SignupRole } from "./actions";

export const metadata: Metadata = {
  title: "Iscriviti — Tutorly",
  description:
    "Lasciaci i tuoi dati e ti ricontattiamo per completare l’attivazione.",
  robots: { index: false },
};

const ROLES: SignupRole[] = ["tutor", "agency", "student"];

// Links arrive as ?role=tutor|agency|student; anything else falls back to tutor
// (the dominant CTA). searchParams is a Promise in this Next version.
export default async function Registrati({
  searchParams,
}: {
  searchParams: Promise<{ role?: string | string[] }>;
}) {
  const raw = (await searchParams).role;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const role: SignupRole = ROLES.includes(value as SignupRole)
    ? (value as SignupRole)
    : "tutor";

  return <SignupPage defaultRole={role} />;
}
