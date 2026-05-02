import Link from "next/link";

const BRIDAL_FEATURES = [
  {
    icon: "◈",
    title: "Lightweight Sets",
    body: "Full bridal sets crafted to feel feather-light — so you can dance, celebrate, and shine all day.",
  },
  {
    icon: "◇",
    title: "Minimal Necklaces",
    body: "Delicate neckpieces that frame your neckline beautifully without weighing you down.",
  },
  {
    icon: "✦",
    title: "Delicate Earrings",
    body: "From subtle studs to elegant drops — perfect for the modern bride who believes less is more.",
  },
];

export default function BridalSection() {
  return (
    <section className="bridal-section section-shell" style={{ background: "var(--color-bg-warm)" }}>
      <style>{`
        .bridal-section { padding: 6rem 5rem; }
        .bridal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
        @media (max-width: 768px) {
          .bridal-section { padding: 3rem 1rem !important; }
          .bridal-section h2 { font-size: 1.1rem !important; }
          .bridal-section .section-subtitle { font-size: 0.6rem !important; }
          .bridal-section .section-desc { font-size: 0.8rem !important; }
          .bridal-grid { grid-template-columns: 1fr; gap: 0.75rem; margin-top: 1.5rem !important; }
          .bridal-card { padding: 1.25rem !important; }
          .bridal-card .card-title { font-size: 0.9rem !important; }
          .bridal-card .card-body { font-size: 0.8rem !important; }
        }
        .bridal-card:hover {
          border-color: var(--color-gold) !important;
          box-shadow: 0 12px 36px rgba(212,175,55,0.12);
          transform: translateY(-4px);
        }
        .bridal-card { transition: all 0.3s ease-in-out; }
      `}</style>

      <div style={{ textAlign: "center" }}>
        <p className="section-subtitle" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
          Bridal Collection
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
          fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3,
          color: "var(--color-text)",
          marginBottom: "1.25rem",
        }}>
          Light as a Blessing,<br />
          <span style={{ color: "var(--color-gold)" }}>Radiant as a Bride</span>
        </h2>
        <p className="section-desc" style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.85, fontWeight: 300 }}>
          Lightweight bridal designs that look grand, feel comfortable, and photograph beautifully.
        </p>
      </div>

      <div className="bridal-grid">
        {BRIDAL_FEATURES.map((f) => (
          <div key={f.title} className="bridal-card scroll-reveal" style={{
            background: "linear-gradient(150deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            borderRadius: "1.25rem",
            padding: "2.25rem 2rem",
            border: "1px solid transparent",
          }}>
            <div style={{
              width: "2.75rem", height: "2.75rem",
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "0.75rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", marginBottom: "1.25rem",
              color: "var(--color-gold)",
            }}>
              {f.icon}
            </div>
            <h3 className="card-title" style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              {f.title}
            </h3>
            <p className="card-body" style={{ fontSize: "0.82rem", color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link href="/products?category=bridal" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--color-text)", borderBottom: "1px solid var(--color-gold)",
          paddingBottom: "0.15rem", textDecoration: "none",
          fontWeight: 500, transition: "all 0.3s ease-in-out",
        }}>
          Explore Bridal Collection →
        </Link>
      </div>
    </section>
  );
}
