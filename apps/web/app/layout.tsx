import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JWELL — Luxury Jewellery",
  description:
    "Handcrafted luxury jewellery. Rings, necklaces, earrings and bracelets made with the finest gold.",
  keywords: "luxury jewellery, gold jewellery, rings, necklaces, earrings, bracelets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
