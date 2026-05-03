"use client";

import Link from "next/link";
import Image from "next/image";

const TICKER_ITEMS = [
  "BIS Hallmarked 22KT Gold",
  "Handcrafted with Love",
  "Lifetime Servicing",
  "Free Home Delivery",
  "Lab Grown Diamonds Available",
];

const BADGES = ["BIS Hallmarked", "Handcrafted", "Secure Shipping"] as const;

export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-btn-primary {
          background: var(--color-gold, #d4af37) !important;
          color: #000000 !important;
          border: 1px solid var(--color-gold, #d4af37) !important;
          border-radius: 999px !important;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 24px rgba(212,175,55,0.25);
        }
        .hero-btn-primary:hover {
          background: var(--color-gold-light, #f4e5b3) !important;
          border-color: var(--color-gold-light, #f4e5b3) !important;
          box-shadow: 0 8px 32px rgba(212,175,55,0.35);
          transform: translateY(-1px);
        }
        .hero-btn-ghost {
          color: var(--color-text-mid, #a0a0b0) !important;
          border: 1px solid var(--color-border, rgba(255,255,255,0.2)) !important;
          background: rgba(255,255,255,0.03) !important;
          border-radius: 999px !important;
          transition: all 0.3s ease-in-out;
        }
        .hero-btn-ghost:hover {
          color: var(--color-gold, #d4af37) !important;
          border-color: var(--color-gold, #d4af37) !important;
          background: rgba(212,175,55,0.08) !important;
        }
        .hero-section {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: calc(100vh - 96px);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(ellipse 95% 80% at 50% 108%, rgba(4, 4, 18, 0.85) 0%, transparent 52%),
            radial-gradient(ellipse 85% 70% at 22% 28%, rgba(212, 175, 55, 0.14), transparent 55%),
            radial-gradient(ellipse 75% 60% at 82% 48%, rgba(120, 130, 255, 0.08), transparent 52%),
            linear-gradient(168deg, #07071c 0%, var(--color-bg, #050514) 42%, #050514 100%);
        }
        .hero-section::after {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.2;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.08'%3E%3Cpath d='M0 70h140M70 0v140'/%3E%3C/g%3E%3C/svg%3E");
          mask-image: radial-gradient(ellipse 88% 78% at 50% 44%, black 0%, transparent 82%);
          -webkit-mask-image: radial-gradient(ellipse 88% 78% at 50% 44%, black 0%, transparent 82%);
        }
        .hero-text {
          padding: 5.5rem 4.25rem 5rem 5rem;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          position: relative;
          z-index: 1;
        }
        .hero-kicker-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .hero-kicker-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-gold, #d4af37), transparent);
          flex-shrink: 0;
        }
        .hero-title-accent {
          background: linear-gradient(105deg, #f4e5b3, var(--color-gold, #d4af37) 45%, #b8860b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-pill {
          font-size: 0.64rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-mid, #e0e0e0);
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 999px;
          padding: 0.42rem 0.85rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
        }
        .hero-image-col {
          height: calc(100vh - 96px);
          position: relative;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          perspective: 1400px;
        }
        .hero-image-col::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(ellipse 58% 52% at 52% 46%, rgba(212, 175, 55, 0.11), transparent 72%);
          opacity: 1;
        }
        .hero-orbit {
          position: absolute;
          inset: 14% 14%;
          border: 1px solid rgba(212,175,55,0.18);
          border-radius: 999px;
          opacity: 0.4;
          z-index: 0;
        }
        .hero-orbit::after {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: inherit;
          border: 1px dashed rgba(212,175,55,0.18);
        }
        
        @keyframes desktop-float {
          0%, 100% { transform: rotateY(-12deg) rotateX(5deg) translateZ(12px) translateY(0); }
          50% { transform: rotateY(-12deg) rotateX(5deg) translateZ(12px) translateY(-15px); }
        }
        .hero-image-stack {
          width: min(440px, 82%);
          aspect-ratio: 4/5;
          border-radius: 1.5rem;
          position: relative;
          transform-style: preserve-3d;
          animation: desktop-float 6s ease-in-out infinite;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }
        .hero-image-stack:hover {
          animation-play-state: paused;
          transform: rotateY(-6deg) rotateX(3deg) translateZ(18px) scale(1.03);
        }
        .hero-glow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(circle, rgba(212,175,55,0.32), transparent 58%);
          filter: blur(36px);
          z-index: 0;
        }
        .hero-jewel-img {
          border-radius: 1.25rem;
          padding: 0.35rem !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          filter:
            drop-shadow(0 28px 50px rgba(0, 0, 0, 0.55))
            drop-shadow(0 12px 28px rgba(0, 0, 0, 0.35))
            drop-shadow(0 0 52px rgba(212, 175, 55, 0.22));
        }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex;
          width: max-content;
          animation: ticker-scroll 25s linear infinite;
        }

        /* --- REDESIGNED MOBILE FIX --- */
        @media (max-width: 768px) {
          .hero-section { 
            display: flex; 
            flex-direction: column;
            justify-content: center; /* This centers everything vertically */
            align-items: center;
            min-height: calc(100dvh - 80px); 
            padding: 2rem 1rem;
            gap: 2.5rem; /* Consistent gap between text and image, no empty voids */
          }
          .hero-section::after { opacity: 0.16; }
          .hero-text { 
            padding: 0; 
            align-items: center; 
            text-align: center; 
            width: 100%;
          }
          .hero-kicker-row { justify-content: center; margin-bottom: 0.75rem; }
          .hero-kicker-line { display: none; }
          .hero-text h1 { font-size: clamp(2.5rem, 10vw, 3.5rem) !important; line-height: 1.1 !important; margin-bottom: 0.5rem; }
          .hero-text .text-lede { font-size: 0.85rem !important; max-width: 18rem !important; margin-top: 0.5rem !important;}
          .hero-badges { justify-content: center; gap: 0.5rem !important; margin-top: 1.25rem !important; }
          .hero-pill { font-size: 0.55rem !important; padding: 0.4rem 0.6rem !important; }
          
          .hero-cta {
            flex-direction: row !important;
            justify-content: center !important;
            width: 100%;
            margin-top: 1.5rem !important;
            gap: 0.75rem !important;
          }
          .hero-cta a { 
            width: auto; 
            padding: 0.85rem 1.25rem !important; 
            font-size: 0.65rem !important;
            min-height: 44px !important;
          }
          
          .hero-image-col { 
            height: auto !important; 
            width: 100%;
            min-height: 280px; /* Base height for the image area */
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .hero-jewel-img { padding: 0 !important; }
          .hero-image-stack { 
            width: min(280px, 75%); 
            border-radius: 1.05rem; 
            transform: none; 
            animation: none; 
          }
          .hero-orbit { inset: -5% -5%; }
        }
      `}</style>

      <section className="hero-section section-shell">
        <div className="hero-text">
          <div className="hero-enter hero-enter-1 hero-kicker-row">
            <span className="hero-kicker-line" aria-hidden />
            <p className="text-caption-gold" style={{ marginBottom: 0, color: "var(--color-gold, #d4af37)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem", fontWeight: "600" }}>
              The Luxury Standard
            </p>
          </div>

          <h1 className="hero-enter hero-enter-2 luxury-hero-title" style={{
            fontSize: "clamp(2.15rem, 5vw, 4.35rem)",
            lineHeight: 1.12,
            color: "var(--color-text, #ffffff)",
          }}>
            Moments To<br />
            <span className="hero-title-accent font-serif italic">Mementos</span>
          </h1>

          <p className="hero-enter hero-enter-3 text-lede mx-auto md:mx-0" style={{ fontWeight: 300, maxWidth: "24rem", marginTop: "1.15rem", color: "var(--color-text-mid, #a0a0b0)" }}>
            Handpicked gold craftsmanship — hallmarked purity, honest pricing, and a finish meant to turn heads.
          </p>

          <div className="hero-enter hero-enter-3 hero-badges" style={{ display: "flex", gap: "0.75rem", marginTop: "1.35rem", flexWrap: "wrap" }}>
            {BADGES.map((badge) => (
              <span key={badge} className="hero-pill">
                {badge}
              </span>
            ))}
          </div>

          <div className="hero-enter hero-enter-4 hero-cta" style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/products" className="hero-btn-primary" style={{
              padding: "0.95rem 2.35rem",
              fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: 700,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              minHeight: "48px",
            }}>
              Shop Collection
            </Link>
            <Link href="/contact" className="hero-btn-ghost" style={{
              padding: "0.95rem 2rem",
              fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: 600,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              gap: "0.45rem",
              minHeight: "48px",
            }}>
              Book Visit
            </Link>
          </div>
        </div>

        <div className="hero-image-col">
          <div className="hero-orbit slow-spin" />
          <div className="hero-float" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <div className="hero-image-stack">
              <div className="hero-glow" />
              <Image
                src="/cheroImage-removebg-preview.png"
                alt="Handcrafted gold diamond ring"
                fill
                className="object-contain hero-jewel-img"
                priority
                quality={100}
                sizes="(max-width: 768px) 80vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{
        background: "linear-gradient(180deg, var(--color-bg-card, #07071c), rgba(17,17,50,0.96))",
        borderTop: "1px solid var(--color-border, rgba(255,255,255,0.05))",
        borderBottom: "1px solid var(--color-border, rgba(255,255,255,0.05))",
        padding: "0.9rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
            <span key={i} style={{
              fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--color-text-mid, #a0a0b0)", display: "inline-flex", alignItems: "center", gap: "0.75rem",
              fontWeight: 500, marginRight: "3rem"
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-gold, #d4af37)", display: "inline-block", flexShrink: 0 }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}