import Link from "next/link";
import Image from "next/image";

const TICKER_ITEMS = [
  "BIS Hallmarked 22KT Gold",
  "Handcrafted in Jaipur",
  "Live Market Pricing",
  "Lifetime Servicing",
  "Free Home Delivery",
  "30+ Years of Craft",
];

export default function HeroSection({ heroImages: _ }: { heroImages?: string[] } = {}) {
  return (
    <>
      <style>{`
        .hero-btn-primary:hover { background: var(--color-blush) !important; }
        .hero-btn-link:hover { color: var(--color-blush) !important; }
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 96px);
          background: var(--color-bg);
        }
        .hero-text {
          padding: 5rem 4rem 5rem 5rem;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
        }
        .hero-image-col {
          height: calc(100vh - 96px);
          position: relative;
          background: #edf1fc;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; min-height: auto; }
          .hero-text { padding: 3rem 1.5rem 2rem; align-items: center; text-align: center; }
          .hero-text h1 { font-size: clamp(4rem, 14vw, 6rem) !important; }
          .hero-text-rule { justify-content: center; }
          .hero-cta { justify-content: center; }
          .hero-image-col { height: 60vw; min-height: 260px; max-height: 420px; }
          .hero-image-col img { padding: 1.5rem !important; }
          .hero-gold-tag { bottom: 1rem !important; left: 1rem !important; }
        }
      `}</style>

      <section className="hero-section">
        {/* Text side */}
        <div className="hero-text">
          <p className="hero-enter hero-enter-1" style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
            Feel the Luxury
          </p>

          <h1 className="hero-enter hero-enter-2" style={{
            fontFamily: "'Corinthia', cursive",
            fontSize: "clamp(5rem, 9vw, 8.5rem)",
            fontWeight: 400, lineHeight: 1.0,
            color: "var(--color-text)",
          }}>
            Moments To<br />Mementos
          </h1>

          <div className="hero-enter hero-enter-3 hero-text-rule" style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.75rem 0" }}>
            <span style={{ display: "block", width: "2.5rem", height: "1px", background: "var(--color-blush-mid)" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--color-blush)", textTransform: "uppercase" }}>
              Handcrafted since 1992
            </span>
          </div>

          <p className="hero-enter hero-enter-4" style={{ fontSize: "0.92rem", fontWeight: 400, color: "var(--color-text-muted)", lineHeight: 1.9, maxWidth: "360px" }}>
            It&apos;s more than an adornment. It&apos;s a feeling, a memory,
            a mark of love. Crafted with care. Delivered with heart.
          </p>

          <div className="hero-enter hero-enter-5 hero-cta" style={{ display: "flex", gap: "1.25rem", marginTop: "2.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/products" className="hero-btn-primary" style={{
              background: "var(--color-text)", color: "var(--color-bg-card)",
              padding: "0.8rem 2.25rem",
              fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: 500, transition: "all 0.25s",
            }}>
              Shop Our Pieces
            </Link>
            <Link href="/products" className="hero-btn-link" style={{
              color: "var(--color-text-mid)", fontSize: "0.82rem",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
              transition: "color 0.2s", fontWeight: 400,
            }}>
              Explore collection →
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div className="hero-image-col">
          <div className="hero-float" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/heroImage.webp"
              alt="Handcrafted gold diamond ring"
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ padding: "3rem" }}
            />
          </div>

          <div className="hero-gold-tag gold-badge-pulse" style={{
            position: "absolute", bottom: "2.5rem", left: "2rem",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--color-border)",
            padding: "0.875rem 1.25rem",
            zIndex: 10,
          }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Live Gold Rate</div>
            <div style={{ fontFamily: "'Corinthia', cursive", fontSize: "1.6rem", color: "var(--color-gold)", marginTop: "0.1rem" }}>₹9,450 /g</div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div style={{
        background: "var(--color-blush-light)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "0.875rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
            <span key={i} style={{
              fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--color-text-mid)", display: "inline-flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-blush)", display: "inline-block", flexShrink: 0 }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
