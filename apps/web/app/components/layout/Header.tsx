"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function BurgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px",
        color: "var(--color-text)",
        flexShrink: 0,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

/** 
 * Ultra-Premium BrandLink: 
 * Text aur image ka size maximize kiya gaya hai bina header layout ko tode.
 * Gold shadow aur hover effect add kiya hai ekdam "Mast" look ke liye.
 */
function BrandLink({ layout }: { layout: "mobile" | "desktop" }) {
  const isDesktop = layout === "desktop";
  
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: isDesktop ? "1.4rem" : "0.9rem", // Thoda gap badhaya bade size ke liye
        justifyContent: "center",
        transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", // Smooth premium hover
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Logo Image */}
      <Image
        src="/logo.jpeg"
        alt="Shreeva Jewellers"
        width={isDesktop ? 90 : 70} // Size increased
        height={isDesktop ? 90 : 70}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: isDesktop ? "2px solid rgba(212,175,55,0.8)" : "1.5px solid rgba(212,175,55,0.8)",
          boxShadow: "0 6px 24px rgba(212,175,55,0.25), inset 0 0 10px rgba(212,175,55,0.1)", // Richer glow
        }}
        priority
      />

      {/* Text Wordmark */}
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        <span
          style={{
            color: "var(--color-gold)",
            fontSize: isDesktop ? "2.6rem" : "1.9rem", // Massive text size
            fontWeight: 700, // Bolder
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "var(--font-serif, serif)",
            lineHeight: 1.05,
            // Gold glow + deep dark shadow background se alag karne ke liye
            textShadow: "0 2px 15px rgba(212,175,55,0.35), 0 4px 20px rgba(0,0,0,0.8)", 
          }}
        >
          Shreeva
        </span>
        <span
          style={{
            color: "var(--color-text-mid)",
            fontSize: isDesktop ? "0.95rem" : "0.75rem", // Bada base text
            fontWeight: 500,
            letterSpacing: isDesktop ? "0.5em" : "0.4em", // Perfectly stretched
            textTransform: "uppercase",
            marginTop: "0.35rem",
            paddingLeft: "0.15em", 
          }}
        >
          Jewellers
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [goldRate, setGoldRate] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/gold-price`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setGoldRate(d.data.pricePerGram);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          background: "var(--color-bg-card)",
          color: "var(--color-text-mid)",
          textAlign: "center",
          padding: "0.6rem 1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          borderBottom: "1px solid var(--color-border)",
          textTransform: "uppercase"
        }}
      >
        <span className="hidden sm:inline">
          Free consultation &amp; home delivery available &nbsp;·&nbsp;
        </span>
        Today&apos;s Gold Rate:{" "}
        <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
          {goldRate ? `₹${goldRate.toLocaleString("en-IN")} / gm` : "Live Market"}
        </span>
        <span className="hidden sm:inline">&nbsp;·&nbsp; BIS Hallmarked 22KT</span>
      </div>

      <header
        className="site-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(180deg, rgba(14,14,42,0.99) 0%, rgba(8,8,28,0.96) 60%, rgba(6,6,22,0.92) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          padding: "0.8rem clamp(1rem, 4vw, 2rem)", // Thoda sa padding badhaya bade logo ko space dene ke liye
        }}
      >
        <style>{`
          .site-header { display: flex; flex-direction: column; justify-content: center; }
          
          .site-header-mobile {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            width: 100%;
          }
          .site-header-desktop {
            display: none;
          }
          @media (min-width: 768px) {
            .site-header-mobile { display: none; }
            .site-header-desktop {
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: center;
              width: 100%;
            }
          }
        `}</style>

        {/* Mobile Layout */}
        <div className="site-header-mobile md:hidden">
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <BurgerButton onClick={() => setMobileOpen(true)} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BrandLink layout="mobile" />
          </div>
          
          <div></div> 
        </div>

        {/* Desktop Layout */}
        <div className="site-header-desktop">
          {/* Left Navigation */}
          <div className="flex items-center justify-start gap-8">
            <nav className="flex items-center gap-8">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Collections" },
                { href: "/products?category=bridal", label: "Bridal" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-mid)",
                    fontWeight: 500,
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    transition: "color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-mid)")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centered Huge Text + Elegant Logo */}
          <div style={{ justifySelf: "center", padding: "0 1rem" }}>
            <BrandLink layout="desktop" />
          </div>

          {/* Right Navigation & CTA */}
          <div className="flex items-center justify-end gap-8">
            <nav className="flex items-center gap-8">
              <Link
                href="/contact"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-mid)",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-mid)")}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  border: "1px solid var(--color-gold)",
                  padding: "0.7rem 1.6rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease-in-out",
                  whiteSpace: "nowrap",
                  borderRadius: "2px",
                  background: "rgba(212,175,55,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-gold)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)";
                }}
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}