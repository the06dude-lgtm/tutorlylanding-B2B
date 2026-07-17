import type { Metadata } from "next";
import SupportPage from "./SupportPage";

export const metadata: Metadata = {
  title: "Assistenza clienti — Tutorly",
  description:
    "Hai bisogno di aiuto con il tuo account Tutorly? Scrivici e ti rispondiamo in giornata.",
  robots: { index: false },
};

export default function Assistenza() {
  return <SupportPage />;
}
