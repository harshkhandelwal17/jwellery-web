import Link from "next/link";

export default function CTASection() {
  return (
    <section className="cta-section" style={{
      textAlign: "center",
      background: "var(--color-dark-footer)",
      color: "white", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        .cta-section { padding: 8rem 5rem; }
        @media (max-width: 768px) { .cta-section { padding: 4rem 1.5rem; } }
        .cta-btn:hover {
          background: var(--color-blush) !important;
          border-color: var(--color-blush) !important;
        }
      `}</style>

      {/* Watermark */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Corinthia', cursive",
        fontSize: "22rem", lineHeight: 1,
        color: "rgba(255,255,255,0.03)",
        pointerEvents: "none", whiteSpace: "nowrap",
      }}>
        Shreeva
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush-mid)", marginBottom: "1rem" }}>
          Ready to begin?
        </p>
        <h2 style={{
          fontFamily: "'Corinthia', cursive",
          fontSize: "clamp(3.5rem, 6vw, 6rem)",
          fontWeight: 400, lineHeight: 1.1, marginBottom: "1.25rem",
        }}>
          Find the Piece That<br />Speaks to You
        </h2>
        <p style={{ opacity: 0.6, fontSize: "0.92rem", fontWeight: 300, marginBottom: "3rem", maxWidth: "460px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
          Visit us in Jaipur or enquire online — we would love to help you find something truly special.
        </p>
        <Link href="/contact" className="cta-btn" style={{
          display: "inline-block",
          border: "1px solid rgba(255,255,255,0.35)", color: "white",
          padding: "0.875rem 2.75rem",
          fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
          textDecoration: "none", fontWeight: 500, transition: "all 0.25s",
        }}>
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
