const reasons = [
  { icon: "◈", title: "Live Gold Pricing", body: "Prices reflect the daily market rate. You always know you're getting honest value for every gram of gold." },
  { icon: "✦", title: "BIS Hallmarked", body: "Every piece carries the BIS hallmark certifying 22KT purity. Authenticity you can see and trust." },
  { icon: "◉", title: "Handcrafted Always", body: "No mass production, ever. Each piece is shaped by skilled karigars with 15+ years of expertise." },
  { icon: "◇", title: "Lifetime Servicing", body: "Bring your Shreeva Jewellers piece in anytime for complimentary cleaning, polishing, and minor repairs." },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" style={{ background: "var(--color-bg-warm)" }}>
      <style>{`
        .why-section { padding: 6rem 5rem; }
        .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) {
          .why-section { padding: 3rem 1rem !important; }
          .why-section h2 { font-size: 1.1rem !important; }
          .why-section .section-subtitle { font-size: 0.6rem !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          .why-card { padding: 1.25rem !important; }
          .why-card .why-icon { width: 2.25rem !important; height: 2.25rem !important; font-size: 0.9rem !important; margin-bottom: 0.75rem !important; }
          .why-card h3 { fontSize: 0.75rem !important; margin-bottom: 0.35rem !important; }
          .why-card p { font-size: 0.7rem !important; line-height: 1.6 !important; }
        }
        .why-card:hover {
          border-color: var(--color-gold) !important;
          box-shadow: 0 12px 36px rgba(212,175,55,0.1);
          transform: translateY(-4px);
        }
        .why-card:hover .why-icon { 
          transform: scale(1.12);
          background: var(--color-gold) !important;
          color: #000000 !important;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p className="section-subtitle" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
          Why Choose Us
        </p>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-text)" }}>
          The Shreeva Jewellers Promise
        </h2>
      </div>

      <div className="why-grid">
        {reasons.map((r) => (
          <div key={r.title} className="why-card scroll-reveal" style={{
            background: "var(--color-surface)", borderRadius: "1.25rem", padding: "2rem 1.75rem",
            border: "1px solid transparent", transition: "all 0.3s",
          }}>
            <div className="why-icon" style={{
              width: "2.75rem", height: "2.75rem",
              background: "rgba(212, 175, 55, 0.1)", borderRadius: "0.75rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", marginBottom: "1.25rem",
              color: "var(--color-gold)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              transition: "all 0.3s ease-in-out",
            }}>
              {r.icon}
            </div>
            <h3 className="card-title" style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              {r.title}
            </h3>
            <p className="card-body" style={{ fontSize: "0.82rem", color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
