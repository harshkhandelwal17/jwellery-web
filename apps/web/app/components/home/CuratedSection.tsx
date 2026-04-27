const BLESSINGS = [
  { label: "Khatu Shyam Ji", note: "Our Guiding Light" },
  { label: "Our Father", note: "The Pillar of Our Journey" },
  { label: "Dada Ji", note: "The Root of Our Values" },
  { label: "Pr. Dada Ji", note: "Our Founding Legacy" },
];

export default function CuratedSection() {
  return (
    <section className="curated-section" style={{ background: "var(--color-bg)" }}>
      <style>{`
        .curated-section { padding: 6rem 5rem; }
        .curated-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; margin-top: 3rem; }
        .curated-frame {
          border: 2px solid var(--color-gold);
          border-radius: 1rem;
          background: var(--color-blush-light);
          aspect-ratio: 4/5;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: 1.25rem 1rem;
          position: relative; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .curated-frame:hover {
          box-shadow: 0 12px 36px rgba(201,150,42,0.22);
          transform: translateY(-4px);
        }
        .curated-frame-inner {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .curated-icon {
          font-size: 3.5rem; opacity: 0.18; color: var(--color-gold);
          font-family: 'Corinthia', cursive;
        }
        .curated-label-box {
          position: relative; z-index: 1;
          background: var(--color-dark-footer);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          text-align: center; width: 100%;
          border: 1px solid rgba(201,150,42,0.3);
        }
        @media (max-width: 768px) {
          .curated-section { padding: 3.5rem 1.25rem; }
          .curated-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
      `}</style>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
          Our Sacred Corner
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
          fontWeight: 600, letterSpacing: "0.08em",
          color: "var(--color-text)", marginBottom: "1rem",
        }}>
          Blessings &amp; Heritage
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300, fontStyle: "italic" }}>
          We are new in this — but grounded by the blessings of those who came before us.
        </p>
      </div>

      <div className="curated-grid">
        {BLESSINGS.map((b) => (
          <div key={b.label} className="curated-frame scroll-reveal">
            <div className="curated-frame-inner">
              <span className="curated-icon">✦</span>
            </div>
            <div className="curated-label-box">
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "0.05em", fontFamily: "'Cinzel', serif" }}>
                {b.label}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", marginTop: "0.25rem", fontWeight: 300 }}>
                {b.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
