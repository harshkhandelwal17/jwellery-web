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

// Ornamental SVG divider — single thin line with a diamond centre
function OrnamentDivider({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="220"
      height="16"
      viewBox="0 0 220 16"
      fill="none"
      aria-hidden
      style={{ display: "block" }}
    >
      <line x1="0" y1="8" x2="96" y2="8" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="0.8" />
      <rect x="103" y="3" width="10" height="10" rx="1" transform="rotate(45 108 8)" fill="none" stroke="#d4af37" strokeOpacity="0.8" strokeWidth="1" />
      <line x1="120" y1="8" x2="220" y2="8" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="0.8" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <>
      <style>{`
        /* ── buttons ── */
        .hero-btn-primary {
          background: linear-gradient(135deg, #c9a227, #d4af37 50%, #b8860b) !important;
          color: #0a0800 !important;
          border: none !important;
          border-radius: 2px !important;
          transition: all 0.35s ease;
          box-shadow: 0 0 0 1px rgba(212,175,55,0.5), 0 6px 28px rgba(212,175,55,0.28);
          letter-spacing: 0.22em;
        }
        .hero-btn-primary:hover {
          background: linear-gradient(135deg, #e0c44a, #f4e5b3 50%, #c9a227) !important;
          box-shadow: 0 0 0 1px rgba(212,175,55,0.7), 0 10px 36px rgba(212,175,55,0.4);
          transform: translateY(-2px);
        }
        .hero-btn-outline {
          color: rgba(212,175,55,0.9) !important;
          border: 1px solid rgba(212,175,55,0.38) !important;
          background: transparent !important;
          border-radius: 2px !important;
          transition: all 0.35s ease;
          letter-spacing: 0.2em;
        }
        .hero-btn-outline:hover {
          color: #d4af37 !important;
          border-color: rgba(212,175,55,0.75) !important;
          background: rgba(212,175,55,0.06) !important;
          transform: translateY(-2px);
        }

        /* ── section shell ── */
        .hero-section {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: calc(100dvh - 136px);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(ellipse 100% 60% at 50% 110%, rgba(3,3,14,0.95) 0%, transparent 55%),
            radial-gradient(ellipse 70% 65% at 18% 30%, rgba(212,175,55,0.09), transparent 58%),
            radial-gradient(ellipse 65% 55% at 85% 52%, rgba(180,120,40,0.07), transparent 55%),
            linear-gradient(162deg, #080818 0%, #050512 55%, #060614 100%);
        }

        /* subtle grain texture overlay */
        .hero-section::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }

        /* faint geometric mesh */
        .hero-section::after {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.14;
          z-index: 0;
          background-image:
            linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 44%, black 0%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 44%, black 0%, transparent 80%);
        }

        /* ── text column ── */
        .hero-text {
          padding: 3rem 2.5rem 3rem 4.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        /* eyebrow / kicker */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.1rem;
        }
        .hero-eyebrow-line {
          width: 38px;
          height: 1px;
          background: linear-gradient(90deg, rgba(212,175,55,0.7), transparent);
          flex-shrink: 0;
        }
        .hero-eyebrow-text {
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.75);
          margin: 0;
        }

        /* main headline */
        .hero-headline {
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.1;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #fff;
          margin: 0;
        }
        .hero-headline em {
          font-style: italic;
          font-family: "Cormorant Garamond", "Cormorant", Georgia, serif;
          font-weight: 300;
          font-size: 1.08em;
          background: linear-gradient(108deg, #f8eecc 0%, #d4af37 45%, #c9952a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: 0.02em;
        }

        /* subheading */
        .hero-subheadline {
          font-family: "Cormorant Garamond", "Cormorant", Georgia, serif;
          font-size: clamp(0.95rem, 1.55vw, 1.28rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(230,220,200,0.72);
          letter-spacing: 0.03em;
          line-height: 1.5;
          margin: 0.45rem 0 0;
        }

        /* ornament row */
        .hero-ornament-row {
          margin: 1.1rem 0 1.4rem;
        }

        /* mobile-only image inside text col */
        .hero-mobile-img-wrap {
          display: none;
        }

        /* CTA row */
        .hero-cta {
          display: flex;
          gap: 0.85rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .hero-cta a {
          padding: 0.78rem 1.9rem;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }

        /* stat strip */
        .hero-stat-strip {
          display: flex;
          gap: 1.75rem;
          margin-top: 1.6rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(212,175,55,0.12);
        }
        .hero-stat-item { display: flex; flex-direction: column; gap: 0.15rem; }
        .hero-stat-num {
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(1.1rem, 1.75vw, 1.5rem);
          font-weight: 400;
          color: #d4af37;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(180,174,200,0.6);
          font-weight: 500;
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }

        /* ── image column ── */
        .hero-image-col {
          height: calc(100dvh - 136px);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1400px;
        }
        .hero-image-col::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(ellipse 55% 50% at 50% 48%, rgba(212,175,55,0.12), transparent 70%);
        }

        /* corner ornament lines */
        .hero-corner {
          position: absolute;
          width: 56px;
          height: 56px;
          z-index: 1;
          pointer-events: none;
        }
        .hero-corner--tl { top: 10%; left: 8%; border-top: 1px solid rgba(212,175,55,0.35); border-left: 1px solid rgba(212,175,55,0.35); }
        .hero-corner--tr { top: 10%; right: 8%; border-top: 1px solid rgba(212,175,55,0.35); border-right: 1px solid rgba(212,175,55,0.35); }
        .hero-corner--bl { bottom: 14%; left: 8%; border-bottom: 1px solid rgba(212,175,55,0.35); border-left: 1px solid rgba(212,175,55,0.35); }
        .hero-corner--br { bottom: 14%; right: 8%; border-bottom: 1px solid rgba(212,175,55,0.35); border-right: 1px solid rgba(212,175,55,0.35); }

        .hero-orbit {
          position: absolute;
          inset: 12% 10%;
          border: 1px solid rgba(212,175,55,0.1);
          border-radius: 999px;
          z-index: 0;
        }
        .hero-orbit-inner {
          position: absolute;
          inset: 22% 20%;
          border: 1px dashed rgba(212,175,55,0.09);
          border-radius: 999px;
          z-index: 0;
        }

        @keyframes jewel-float {
          0%, 100% { transform: rotateY(-10deg) rotateX(4deg) translateY(0px); }
          50% { transform: rotateY(-10deg) rotateX(4deg) translateY(-14px); }
        }
        .hero-image-stack {
          width: min(500px, 92%);
          aspect-ratio: 4/5;
          position: relative;
          z-index: 2;
          transform-style: preserve-3d;
          animation: jewel-float 7s ease-in-out infinite;
        }
        .hero-image-stack:hover {
          animation-play-state: paused;
          transform: rotateY(-5deg) rotateX(2deg) scale(1.02);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-glow {
          position: absolute;
          inset: -22%;
          background: radial-gradient(circle, rgba(212,175,55,0.28), transparent 60%);
          filter: blur(42px);
          z-index: 0;
        }
        .hero-jewel-img {
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          filter:
            drop-shadow(0 32px 56px rgba(0,0,0,0.6))
            drop-shadow(0 10px 24px rgba(0,0,0,0.35))
            drop-shadow(0 0 60px rgba(212,175,55,0.2));
        }

        /* image caption strip */
        .hero-img-caption {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(5,5,20,0.72);
          border: 1px solid rgba(212,175,55,0.2);
          backdrop-filter: blur(8px);
          border-radius: 2px;
          padding: 0.5rem 1.1rem;
          white-space: nowrap;
        }
        .hero-img-caption-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d4af37;
          flex-shrink: 0;
        }
        .hero-img-caption-text {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.8);
          font-weight: 600;
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }

        /* ── ticker ── */
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex;
          width: max-content;
          animation: ticker-scroll 28s linear infinite;
        }

        /* ── tablet ── */
        @media (min-width: 769px) and (max-width: 1100px) {
          .hero-text { padding: 2.5rem 1.5rem 2.5rem 2.5rem; }
          .hero-headline { font-size: clamp(1.7rem, 3.4vw, 2.8rem) !important; }
          .hero-stat-strip { gap: 1.25rem; }
          .hero-image-stack { width: min(420px, 90%) !important; }
        }

        /* ── mobile ── */
        @media (max-width: 768px) {
          .hero-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            min-height: calc(100dvh - 148px);
            padding: 2rem 1.25rem 2rem;
            gap: 2rem;
            overflow-y: auto;
          }
          .hero-text {
            padding: 0;
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .hero-eyebrow { justify-content: center; margin-bottom: 0.75rem; }
          .hero-eyebrow-line { display: none; }
          .hero-headline { font-size: clamp(1.9rem, 9vw, 2.9rem) !important; line-height: 1.12 !important; }
          .hero-subheadline { font-size: clamp(0.9rem, 3.8vw, 1.12rem) !important; margin-top: 0.4rem !important; }
          .hero-ornament-row { display: flex; justify-content: center; margin: 0.85rem 0 0; }
          .hero-mobile-img-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 0.5rem 0 0.25rem;
            position: relative;
            height: 280px;
          }
          .hero-mobile-img-wrap .hero-glow {
            inset: -10%;
            filter: blur(32px);
          }
          .hero-cta { justify-content: center; width: 100%; margin-top: 1rem !important; gap: 0.6rem !important; }
          .hero-cta a { padding: 0.78rem 1.4rem !important; font-size: 0.58rem !important; min-height: 42px !important; }
          .hero-stat-strip { justify-content: center; gap: 1.25rem; padding-top: 0.9rem; margin-top: 1rem; }
          .hero-stat-num { font-size: 1.1rem !important; }
          .hero-image-col { display: none !important; }
        }
      `}</style>

      <section className="hero-section section-shell">
        {/* ── LEFT: editorial text ── */}
        <div className="hero-text">

          {/* eyebrow */}
          <div className="hero-enter hero-enter-1 hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden />
            <p className="hero-eyebrow-text">Fine Jewellery · Est. Heritage</p>
          </div>

          {/* main headline — NO brand name repeat */}
          <h1 className="hero-enter hero-enter-2 hero-headline" aria-label="Crafted in Gold, Worn for Generations">
            Crafted in Gold,<br />
            Worn for <em>Generations</em>
          </h1>

          {/* sub-headline */}
          <p className="hero-enter hero-enter-2 hero-subheadline">
            Where every piece tells a story of devotion
          </p>

          {/* ornamental divider */}
          <div className="hero-enter hero-enter-2 hero-ornament-row">
            <OrnamentDivider />
          </div>

          {/* Mobile-only image — appears between headline and CTAs on small screens */}
          <div className="hero-mobile-img-wrap">
            <div className="hero-glow" />
            <Image
              src="/cheroImage-removebg-preview2.png"
              alt="Handcrafted gold diamond jewellery"
              fill
              className="object-contain hero-jewel-img"
              priority
              quality={95}
              sizes="80vw"
            />
          </div>

          {/* CTA buttons */}
          <div className="hero-enter hero-enter-4 hero-cta">
            <Link href="/products" className="hero-btn-primary">
              Explore Collection
            </Link>
            <Link href="/contact" className="hero-btn-outline">
              Book an Appointment
            </Link>
          </div>

          {/* stat strip */}
          <div className="hero-enter hero-enter-4 hero-stat-strip">
            {[
              { num: "500+", label: "Designs" },
              { num: "22KT", label: "Hallmarked" },
              { num: "∞", label: "Lifetime Service" },
            ].map((s) => (
              <div key={s.label} className="hero-stat-item">
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: jewellery showcase ── */}
        <div className="hero-image-col">
          <div className="hero-corner hero-corner--tl" />
          <div className="hero-corner hero-corner--tr" />
          <div className="hero-corner hero-corner--bl" />
          <div className="hero-corner hero-corner--br" />
          <div className="hero-orbit slow-spin" />
          <div className="hero-orbit-inner" />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <div className="hero-image-stack">
              <div className="hero-glow" />
              <Image
                src="/cheroImage-removebg-preview2.png"
                alt="Handcrafted gold diamond jewellery"
                fill
                className="object-contain hero-jewel-img"
                priority
                quality={95}
                sizes="(max-width: 768px) 70vw, 45vw"
              />
            </div>
          </div>
          <div className="hero-img-caption">
            <span className="hero-img-caption-dot" />
            <span className="hero-img-caption-text">Handcrafted · BIS Hallmarked</span>
          </div>
        </div>
      </section>

      {/* ── ticker bar ── */}
      <div style={{
        background: "linear-gradient(180deg, #06060f, rgba(10,10,28,0.97))",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
        padding: "0.85rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
            <span key={i} style={{
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(180,170,150,0.65)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.7rem",
              fontWeight: 500,
              marginRight: "3.5rem",
              fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)",
            }}>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(212,175,55,0.6)", display: "inline-block", flexShrink: 0 }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}