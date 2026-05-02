const CRAFT_FEATURES = [
  { icon: "◈", title: "Intricate Designs" },
  { icon: "✦", title: "Precision Crafting" },
  { icon: "◇", title: "High-Quality Finishes" },
  { icon: "◉", title: "Timeless Creations" },
];

export default function CuratedSection() {
  return (
    <section className="curated-section section-shell" style={{ background: "var(--color-bg)" }}>
      <style>{`
        .curated-section { padding: 6rem 5rem; }
        .curated-content { max-width: 900px; margin: 0 auto; }
        .curated-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; margin-top: 3rem; }
        .curated-card {
          background: linear-gradient(155deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid var(--color-border);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .curated-card:hover {
          box-shadow: 0 12px 36px rgba(212,175,55,0.12);
          transform: translateY(-4px);
          border-color: var(--color-gold) !important;
        }
        .craft-icon {
          font-size: 1.5rem;
          color: var(--color-gold);
          margin-bottom: 0.75rem;
        }
        @media (max-width: 768px) {
          .curated-section { padding: 3rem 1rem !important; }
          .curated-section h2 { font-size: 1.25rem !important; margin-bottom: 1rem !important; }
          .curated-section .section-subtitle { font-size: 0.6rem !important; }
          .curated-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 1.5rem !important; }
          .curated-card { padding: 1rem !important; }
          .craft-icon { font-size: 1.25rem !important; margin-bottom: 0.5rem !important; }
          .curated-card h3 { font-size: 0.75rem !important; }
        }
      `}</style>

      <div className="curated-content">
        <div style={{ textAlign: "center" }}>
          <p className="section-subtitle" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
            Our Expertise
          </p>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 600, letterSpacing: "0.08em",
            color: "var(--color-text)", marginBottom: "1.5rem",
          }}>
            Crafted Excellence
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300 }}>
            Every design is shaped with sharp detailing, balanced proportions, and premium finishing for a refined luxury look.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "1.1rem auto 0", lineHeight: 1.85, fontWeight: 300 }}>
            Minimal everyday pieces or statement bridal styles, each collection keeps comfort, finish, and elegance in focus.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "1.1rem auto 0", lineHeight: 1.85, fontWeight: 300 }}>
            Our digital-first journey is designed to support future showroom experience with the same premium brand identity.
          </p>
        </div>

        <div className="curated-grid">
          {CRAFT_FEATURES.map((f) => (
            <div key={f.title} className="curated-card scroll-reveal">
              <div className="craft-icon">{f.icon}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text)" }}>
                {f.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
