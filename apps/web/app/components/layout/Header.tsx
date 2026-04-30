"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileNav from "./MobileNav";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: "var(--color-bg-card)",
        color: "var(--color-text-mid)",
        textAlign: "center",
        padding: "0.55rem 1rem",
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
        borderBottom: "1px solid var(--color-border)"
      }}>
        <span className="hidden sm:inline">
          Free consultation &amp; home delivery available &nbsp;·&nbsp;
        </span>
        Today&apos;s Gold Rate:{" "}
        <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>₹9,450 / gram</span>
        <span className="hidden sm:inline">&nbsp;·&nbsp; BIS Hallmarked 22KT Gold</span>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--color-bg-overlay)",
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
              <Link key={l.href} href={l.href} className="gold-underline" style={{
                fontSize: "0.78rem", color: "var(--color-text-mid)", fontWeight: 400,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.3s ease-in-out",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-mid)")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logo — always centred */}
        <Link href="/" style={{
          textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          justifySelf: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Image
              src="/logo.jpeg"
              alt="Shreeva Jewellers"
              width={44}
              height={44}
              style={{ borderRadius: "0.4rem", objectFit: "cover" }}
              priority
            />
            <span className="text-[0.7rem] sm:text-[0.85rem]" style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              color: "var(--color-gold)", letterSpacing: "0.1em",
              textTransform: "uppercase", whiteSpace: "nowrap",
            }}>
              Shreeva Jewellers
            </span>
          </div>
        </Link>

        {/* Right — hidden on mobile, nav + CTA on desktop */}
        <div className="flex items-center justify-end gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link href="/contact" className="gold-underline" style={{
              fontSize: "0.78rem", color: "var(--color-text-mid)", fontWeight: 400,
              textDecoration: "none", transition: "color 0.3s ease-in-out",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-mid)")}
            >
              Contact
            </Link>
            <Link href="/contact" style={{
              fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--color-text)", border: "1px solid var(--color-gold)",
              padding: "0.5rem 1.25rem", textDecoration: "none", transition: "all 0.3s ease-in-out",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#000000";
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
