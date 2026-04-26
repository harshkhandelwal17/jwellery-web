"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/products?category=rings", label: "Rings" },
  { href: "/products?category=necklaces", label: "Necklaces" },
  { href: "/products?category=earrings", label: "Earrings" },
  { href: "/products?category=bracelets", label: "Bracelets" },
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
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Drawer — slides in from left */}
      <nav style={{
        position: "relative",
        marginLeft: "auto",
        width: "280px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        background: "#fdfcf8",
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
            cursor: "pointer", color: "#1a1a1a",
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
            fontFamily: "'Corinthia', cursive",
            fontSize: "2.2rem", fontWeight: 400,
            color: "#1a1a1a", textDecoration: "none",
            marginBottom: "2rem", display: "block",
          }}
        >
          Jwell
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
              color: "#3a3a3a", textDecoration: "none",
              borderBottom: "1px solid #ede9e1",
              transition: "color 0.2s",
              display: "block",
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
            padding: "0.875rem 1rem",
            border: "1px solid #1a1a1a",
            color: "#1a1a1a", textDecoration: "none",
            display: "block",
          }}
        >
          Book Appointment
        </Link>
      </nav>
    </div>
  );
}
