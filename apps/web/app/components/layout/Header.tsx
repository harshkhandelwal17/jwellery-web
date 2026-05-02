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
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

/** No pill/circle wrapper — clean logo + wordmark */
function BrandLink({
  layout,
}: {
  layout: "mobile" | "desktop";
}) {
  const isDesktop = layout === "desktop";
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: isDesktop ? "0.8rem" : "0.65rem",
        justifyContent: isDesktop ? "center" : "flex-start",
        minWidth: 0,
      }}
    >
      <Image
        src="/logo.jpeg"
        alt="Shreeva Jewellers"
        width={isDesktop ? 62 : 54}
        height={isDesktop ? 62 : 54}
        style={{
          borderRadius: "0.55rem",
          objectFit: "cover",
          flexShrink: 0,
          border: "1px solid rgba(212,175,55,0.35)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        }}
        priority
      />
      <span
        className={
          isDesktop
            ? "text-[0.95rem] sm:text-[1.05rem] lg:text-[1.12rem]"
            : "text-[0.82rem] min-[400px]:text-[0.9rem]"
        }
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontWeight: 700,
          color: "var(--color-gold)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          lineHeight: 1.12,
          textShadow: "0 1px 12px rgba(212,175,55,0.22)",
        }}
      >
        Shreeva Jewellers
      </span>
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
          padding: "0.55rem 1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span className="hidden sm:inline">
          Free consultation &amp; home delivery available &nbsp;·&nbsp;
        </span>
        Today&apos;s Gold Rate:{" "}
        <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
          {goldRate ? `₹${goldRate.toLocaleString("en-IN")} / gram` : "Live Market Pricing"}
        </span>
        <span className="hidden sm:inline">&nbsp;·&nbsp; BIS Hallmarked 22KT Gold</span>
      </div>

      <header
        className="site-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(180deg, rgba(8,8,30,0.98), rgba(8,8,30,0.86))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 clamp(0.75rem, 3.6vw, 1.25rem)",
          minHeight: "clamp(72px, 12vw, 84px)",
        }}
      >
        <style>{`
          .site-header { display: flex; flex-direction: column; justify-content: center; }
          .site-header-mobile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            min-height: clamp(72px, 12vw, 84px);
            gap: 0.75rem;
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
              min-height: clamp(72px, 12vw, 84px);
            }
          }
        `}</style>

        {/* Mobile: brand left, menu right */}
        <div className="site-header-mobile md:hidden">
          <div style={{ minWidth: 0, flex: "1 1 auto" }}>
            <BrandLink layout="mobile" />
          </div>
          <BurgerButton onClick={() => setMobileOpen(true)} />
        </div>

        {/* Desktop / laptop: nav | centered brand | nav + CTA */}
        <div className="site-header-desktop">
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/products?category=bridal", label: "Bridal" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="gold-underline"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-text-mid)",
                    fontWeight: 400,
                    textDecoration: "none",
                    letterSpacing: "0.02em",
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

          <div style={{ justifySelf: "center" }}>
            <BrandLink layout="desktop" />
          </div>

          <div className="flex items-center justify-end gap-6">
            <nav className="flex items-center gap-6">
              <Link
                href="/contact"
                className="gold-underline"
                style={{
                  fontSize: "0.78rem",
                  color: "var(--color-text-mid)",
                  fontWeight: 400,
                  textDecoration: "none",
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
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-gold)",
                  padding: "0.55rem 1.25rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease-in-out",
                  whiteSpace: "nowrap",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-gold)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)";
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
