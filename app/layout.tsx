import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Coolvetica is the brand's display voice — self-hosted from the official asset
// pack rather than the third-party CDN the old site relied on.
const coolvetica = localFont({
  src: "./fonts/Coolvetica-Regular.otf",
  variable: "--font-coolvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tutorly — Lancia le tue ripetizioni, senza costruirle",
  description:
    "La tua agenzia non offre tutoring? Con Tutorly lo attivi in pochi giorni: tutor verificati, aule virtuali e pagamenti già pronti. Per i tutor: sali di livello, guadagna di più.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${coolvetica.variable} h-full`}>
      <head>
        {/* Satoshi — the body face. Self-host from Fontshare before launch. */}
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
