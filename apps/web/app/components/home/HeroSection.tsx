import Link from "next/link";
import Image from "next/image";
import HeroGoldRateTag from "./HeroGoldRateTag";

const TICKER_ITEMS = [
  "BIS Hallmarked 22KT Gold",
  "Handcrafted with Love",
  "Live Market Pricing",
  "Lifetime Servicing",
  "Free Home Delivery",
  "Lab Grown Diamonds Available",
];

const BADGES = ["BIS Hallmarked", "Handcrafted", "Live Gold Rate"] as const;

export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-btn-primary {
          background: var(--color-gold) !important;
          color: #000000 !important;
          border: 1px solid var(--color-gold) !important;
          border-radius: 999px !important;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 24px rgba(212,175,55,0.25);
        }
        .hero-btn-primary:hover {
          background: var(--color-gold-light) !important;
          border-color: var(--color-gold-light) !important;
          box-shadow: 0 8px 32px rgba(212,175,55,0.35);
          transform: translateY(-1px);
        }
        .hero-btn-ghost {
          color: var(--color-text-mid) !important;
          border: 1px solid var(--color-border) !important;
          background: rgba(255,255,255,0.03) !important;
          border-radius: 999px !important;
          transition: all 0.3s ease-in-out;
        }
        .hero-btn-ghost:hover {
          color: var(--color-gold) !important;
          border-color: var(--color-gold) !important;
          background: rgba(212,175,55,0.08) !important;
        }
        .hero-section {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: calc(100vh - 96px);
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 80% 60% at 10% 15%, rgba(212,175,55,0.14), transparent 50%),
            radial-gradient(ellipse 70% 50% at 85% 75%, rgba(80, 90, 200, 0.12), transparent 45%),
            var(--color-bg);
        }
        .hero-section::after {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.35;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.07'%3E%3Cpath d='M0 70h140M70 0v140'/%3E%3C/g%3E%3C/svg%3E");
          mask-image: radial-gradient(circle at 40% 35%, black 0%, transparent 72%);
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
          background: linear-gradient(90deg, var(--color-gold), transparent);
          flex-shrink: 0;
        }
        .hero-title-accent {
          background: linear-gradient(105deg, #f4e5b3, var(--color-gold) 45%, #b8860b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-pill {
          font-size: 0.64rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-mid);
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 999px;
          padding: 0.42rem 0.85rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
        }
        .hero-image-col {
          height: calc(100vh - 96px);
          position: relative;
          background:
            radial-gradient(circle at 50% 35%, rgba(212,175,55,0.08), transparent 55%),
            linear-gradient(165deg, rgba(17,17,50,0.9), var(--color-bg-warm));
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          perspective: 1200px;
        }
        .hero-image-col::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, transparent 35%, rgba(8,8,30,0.55) 100%);
          z-index: 1;
        }
        .hero-orbit {
          position: absolute;
          inset: 14% 14%;
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 999px;
          opacity: 0.55;
          z-index: 0;
        }
        .hero-orbit::after {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: inherit;
          border: 1px dashed rgba(212,175,55,0.18);
        }
        .hero-image-stack {
          width: min(440px, 82%);
          aspect-ratio: 4/5;
          border-radius: 1.5rem;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(-10deg) rotateX(4deg);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }
        .hero-image-stack:hover { transform: rotateY(-5deg) rotateX(2deg) scale(1.02); }
        .hero-glow {
          position: absolute;
          inset: -14%;
          background: radial-gradient(circle, rgba(212,175,55,0.28), transparent 62%);
          filter: blur(28px);
          z-index: 0;
        }
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; min-height: auto; }
          .hero-section::after { opacity: 0.22; }
          .hero-text { padding: 2.6rem 1.15rem 1.6rem; align-items: center; text-align: center; }
          .hero-kicker-row { justify-content: center; margin-bottom: 1.25rem; }
          .hero-kicker-line { display: none; }
          .hero-text h1 { font-size: clamp(2rem, 8vw, 3rem) !important; line-height: 1.18 !important; }
          .hero-text .text-lede { font-size: 0.9rem !important; max-width: 20rem !important; }
          .hero-badges { justify-content: center; gap: 0.55rem !important; margin-top: 1rem !important; }
          .hero-pill { font-size: 0.54rem !important; padding: 0.35rem 0.55rem !important; }
          .hero-badges span:last-child { display: none; }
          .hero-cta {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100%;
            max-width: 320px;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-top: 2rem !important;
            gap: 0.75rem !important;
          }
          .hero-cta a { width: 100%; justify-content: center; text-align: center; }
          .hero-image-col { height: min(72vw, 380px); min-height: 260px; }
          .hero-image-col img { padding: 1rem !important; }
          .hero-image-stack { width: 78%; border-radius: 1.05rem; }
          .hero-orbit { inset: 10% 6%; }
          .hero-gold-tag { bottom: 0.85rem !important; left: 0.85rem !important; padding: 0.55rem 0.85rem !important; }
          .hero-gold-tag div:first-child { font-size: 0.52rem !important; letter-spacing: 0.16em !important; }
          .hero-gold-tag div:last-child { font-size: 0.85rem !important; }
        }
      `}</style>

      <section className="hero-section section-shell">
        <div className="hero-text">
          <div className="hero-enter hero-enter-1 hero-kicker-row">
            <span className="hero-kicker-line" aria-hidden />
            <p className="text-caption-gold" style={{ marginBottom: 0 }}>
              Feel with Luxury
            </p>
          </div>

          <h1 className="hero-enter hero-enter-2 luxury-hero-title" style={{
            fontSize: "clamp(2.15rem, 5vw, 4.35rem)",
            lineHeight: 1.12,
            color: "var(--color-text)",
          }}>
            Moments To<br />
            <span className="hero-title-accent">Mementos</span>
          </h1>

          <p className="hero-enter hero-enter-3 text-lede mx-auto md:mx-0" style={{ fontWeight: 400, maxWidth: "24rem", marginTop: "1.15rem" }}>
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
                className="object-contain"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  padding: "2.2rem",
                  borderRadius: "1.5rem",
                  background: "linear-gradient(155deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(212,175,55,0.35)",
                  boxShadow:
                    "0 28px 80px rgba(0,0,0,0.45), 0 12px 40px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              />
            </div>
          </div>

          <HeroGoldRateTag
            className="hero-gold-tag"
            style={{
              position: "absolute",
              bottom: "2.35rem",
              left: "2rem",
              background: "rgba(8,8,30,0.78)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.45)",
              borderRadius: "0.85rem",
              padding: "0.9rem 1.2rem",
              zIndex: 4,
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </section>

      <div style={{
        background: "linear-gradient(180deg, var(--color-bg-card), rgba(17,17,50,0.96))",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "0.9rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
            <span key={i} style={{
              fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--color-text-mid)", display: "inline-flex", alignItems: "center", gap: "0.75rem",
              fontWeight: 500,
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-gold)", display: "inline-block", flexShrink: 0 }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
