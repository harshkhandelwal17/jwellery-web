const CRAFT_FEATURES = [
  { icon: "◈", title: "Intricate Designs" },
  { icon: "✦", title: "Precision Crafting" },
  { icon: "◇", title: "High-Quality Finishes" },
  { icon: "◉", title: "Timeless Creations" },
];

export default function CuratedSection() {
  return (
    <section className="curated-section" style={{ background: "var(--color-bg)" }}>
      <style>{`
        .curated-section { padding: 6rem 5rem; }
        .curated-content { max-width: 900px; margin: 0 auto; }
        .curated-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; margin-top: 3rem; }
        .curated-card {
          background: var(--color-bg-card);
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
            Our Crafts
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300 }}>
            At Shreeva Jewellers, craftsmanship lies at the heart of everything we create. With a legacy rooted in generations of expertise, each piece is thoughtfully designed to reflect both tradition and individuality.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "1.5rem auto 0", lineHeight: 1.85, fontWeight: 300 }}>
            We specialize in intricate and distinctive jewellery designs, carefully balancing detail, precision, and artistry. From minimal, everyday pieces that add a touch of elegance to your daily style, to bold statement creations that define special occasions—our collection is crafted to suit every moment and every personality.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "1.5rem auto 0", lineHeight: 1.85, fontWeight: 300 }}>
            Every design goes through a meticulous process, where skilled artisans bring concepts to life with fine detailing and high-quality finishes. We pay close attention to the smallest elements, ensuring that each piece not only looks beautiful but also feels meaningful and timeless.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "720px", margin: "1.5rem auto 0", lineHeight: 1.85, fontWeight: 300 }}>
            Our craft is not just about jewellery—it is about creating pieces that become a part of your story, your identity, and your most cherished celebrations.
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
