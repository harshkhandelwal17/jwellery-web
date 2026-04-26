"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

const leftLinks = [
  { href: "/products", label: "Collections" },
  { href: "/products?category=rings", label: "Rings" },
  { href: "/products?category=necklaces", label: "Necklaces" },
];

const rightLinks = [
  { href: "/products?category=earrings", label: "Earrings" },
  { href: "/products?category=bracelets", label: "Bracelets" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div
        className="text-center py-2 px-4 text-xs tracking-widest uppercase"
        style={{ backgroundColor: "var(--color-gold-500)", color: "#fff" }}
      >
        Today&apos;s Gold Rate: ₹9,450/gram &nbsp;·&nbsp; BIS Hallmarked &nbsp;·&nbsp; Free Shipping Above ₹25,000
      </div>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "var(--color-ivory-50)",
          borderColor: "var(--color-ivory-200)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            {leftLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase transition-colors hover:opacity-60"
                style={{ color: "var(--color-text-700)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centre on desktop, left on mobile */}
          <Link
            href="/"
            className="font-display text-4xl absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-auto leading-none"
            style={{ color: "var(--color-text-900)" }}
          >
            Jwell
          </Link>

          {/* Right nav */}
          <div className="hidden md:flex items-center gap-8">
            {rightLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase transition-colors hover:opacity-60"
                style={{ color: "var(--color-text-700)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-xs tracking-widest uppercase px-4 py-2 border transition-all hover:opacity-80"
              style={{
                borderColor: "var(--color-text-900)",
                color: "var(--color-text-900)",
              }}
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
