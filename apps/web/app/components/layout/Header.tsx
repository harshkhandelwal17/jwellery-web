"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: "var(--color-text)",
        color: "rgba(250,240,235,0.75)",
        textAlign: "center",
        padding: "0.55rem 1rem",
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
      }}>
        Free consultation &amp; home delivery available &nbsp;·&nbsp;
        Today&apos;s Gold Rate:{" "}
        <span style={{ color: "var(--color-blush-mid)" }}>₹9,450 / gram</span>
        &nbsp;·&nbsp; BIS Hallmarked 22KT Gold
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,247,242,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 1.25rem",
        height: "70px",
      }}>
        {/* Left — burger on mobile, nav links on desktop */}
        <div className="flex items-center gap-8">
          {/* Mobile burger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--color-text)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 400,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logo — always centred */}
        <Link href="/" style={{
          fontFamily: "'Corinthia', cursive",
          fontSize: "2.4rem", fontWeight: 400,
          color: "var(--color-text)", textDecoration: "none",
          letterSpacing: "0.03em", textAlign: "center",
          justifySelf: "center",
        }}>
          Jwell
        </Link>

        {/* Right — hidden on mobile, nav + CTA on desktop */}
        <div className="flex items-center justify-end gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/contact" style={{
              fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 400,
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              Contact
            </Link>
            <Link href="/contact" style={{
              fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--color-text)", border: "1px solid var(--color-text)",
              padding: "0.4rem 1.1rem", textDecoration: "none", transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-text)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-bg)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)";
            }}
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
