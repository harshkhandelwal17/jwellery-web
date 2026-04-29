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
        @media (max-width: 768px) {
          .cta-section { padding: 3rem 1rem !important; }
          .cta-section h2 { font-size: 1.25rem !important; }
          .cta-section .cta-subtitle { font-size: 0.6rem !important; }
          .cta-section .cta-desc { font-size: 0.8rem !important; margin-bottom: 1.5rem !important; }
          .cta-btns { flex-direction: column !important; gap: 0.75rem !important; }
          .cta-btns a { padding: 0.7rem 1.5rem !important; font-size: 0.7rem !important; }
          .cta-watermark { font-size: 10rem !important; }
        }
        .cta-btn:hover {
          background: var(--color-blush) !important;
          border-color: var(--color-blush) !important;
        }
        .cta-wa-btn:hover { background: #1ebe5a !important; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      `}</style>

      {/* Watermark */}
      <div className="cta-watermark" style={{
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
        <p className="cta-subtitle" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush-mid)", marginBottom: "1rem" }}>
          Ready to begin?
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
          fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.2, marginBottom: "1.25rem",
        }}>
          Find the Piece That<br />Speaks to You
        </h2>
        <p className="cta-desc" style={{ opacity: 0.6, fontSize: "0.92rem", fontWeight: 300, marginBottom: "3rem", maxWidth: "460px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
          Visit us in Jaipur or enquire online — we would love to help you find something truly special.
        </p>
        <div className="cta-btns">
          <Link href="/contact" className="cta-btn" style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.35)", color: "white",
            padding: "0.875rem 2.75rem",
            fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: 500, transition: "all 0.25s",
          }}>
            Get in Touch
          </Link>
          <a href="https://wa.me/919111452626" target="_blank" rel="noopener noreferrer" className="cta-wa-btn" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "#25D366", color: "white",
            padding: "0.875rem 2.25rem",
            fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: 500, transition: "background 0.25s",
            border: "none",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
