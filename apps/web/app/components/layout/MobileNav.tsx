"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Collections" },
  { href: "/products?category=bridal", label: "Bridal" },
  { href: "/products?category=rings", label: "Rings" },
  { href: "/products?category=necklaces", label: "Necklaces" },
  { href: "/products?category=earrings", label: "Earrings" },
  { href: "/products?category=bracelets", label: "Bracelets" },
  { href: "/products?category=lab-grown-diamond", label: "Lab Grown Diamond" },
  { href: "/products?category=silver-gold", label: "Silver & Gold" },
  { href: "/contact", label: "Contact" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex",
    }}>
      {/* Backdrop */}
      <div
        className="mobile-nav-backdrop"
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Drawer — slides in from right */}
      <nav className="mobile-nav-drawer" style={{
        position: "relative",
        marginLeft: "auto",
        width: "min(86vw, 320px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1.25rem 1.1rem 1.5rem",
        background: "linear-gradient(180deg, rgba(12,12,40,0.98), rgba(8,8,30,0.98))",
        borderLeft: "1px solid var(--color-border)",
        overflowY: "auto",
        zIndex: 10,
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            alignSelf: "flex-end",
            background: "none", border: "none",
            cursor: "pointer", color: "var(--color-text-mid)",
            marginBottom: "2rem", padding: "4px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={onClose}
          style={{
            textDecoration: "none", marginBottom: "2rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image
              src="/logo.jpeg"
              alt="Shreeva Jewellers"
              width={54}
              height={54}
              style={{
                borderRadius: "0.5rem",
                objectFit: "cover",
                boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              }}
            />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.02rem", fontWeight: 600, color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.25 }}>
              Shreeva Jewellers
            </span>
          </div>
        </Link>

        {/* Links */}
        {links.map((l) => (
          <Link
            key={l.href + l.label}
            href={l.href}
            onClick={onClose}
            style={{
              padding: "0.875rem 0",
              fontSize: "0.72rem", letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-mid)", textDecoration: "none",
              borderBottom: "1px solid var(--color-border)",
              transition: "color 0.2s",
              display: "block",
              borderRadius: "0.4rem",
            }}
          >
            {l.label}
          </Link>
        ))}

        {/* CTA */}
        <Link
          href="/contact"
          onClick={onClose}
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "0.9rem 1rem",
            border: "1px solid var(--color-gold)",
            color: "var(--color-gold)", textDecoration: "none",
            display: "block",
            borderRadius: "999px",
            background: "rgba(212,175,55,0.08)",
          }}
        >
          Book Appointment
        </Link>
      </nav>
    </div>
  );
}
