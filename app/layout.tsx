import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "De Reset — Schurft-vrij in 24 uur | Studentenhuizen Groningen",
  description:
    "Een schone lei. Een frisse start. Wij resetten jullie studentenhuis in 24 uur. De enige complete oplossing voor hardnekkige schurft.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
