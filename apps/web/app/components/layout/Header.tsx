"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar — dark background like design-2 */}
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

      {/* Nav — backdrop blur, 3-col grid */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,247,242,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 3rem",
        height: "70px",
      }}>
        {/* Left links */}
        <nav style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
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

        {/* Logo — centred */}
        <Link href="/" style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.4rem", fontWeight: 400,
          color: "var(--color-text)", textDecoration: "none",
          letterSpacing: "0.03em", textAlign: "center",
          justifySelf: "center",
        }}>
          Jwell
        </Link>

        {/* Right links */}
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "flex-end" }}>
          {[
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 400,
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--color-text)", border: "1px solid var(--color-text)",
            padding: "0.4rem 1.1rem", textDecoration: "none", transition: "all 0.2s",
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

          {/* Mobile burger */}
          <button
            className="block md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--color-text)", marginBottom: "5px" }} />
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--color-text)", marginBottom: "5px" }} />
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--color-text)" }} />
          </button>
        </nav>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
