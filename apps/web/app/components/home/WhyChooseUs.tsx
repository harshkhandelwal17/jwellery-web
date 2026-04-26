const reasons = [
  { icon: "◈", title: "Live Gold Pricing", body: "Prices reflect the daily market rate. You always know you're getting honest value for every gram of gold." },
  { icon: "✦", title: "BIS Hallmarked", body: "Every piece carries the BIS hallmark certifying 22KT purity. Authenticity you can see and trust." },
  { icon: "◉", title: "Handcrafted Always", body: "No mass production, ever. Each piece is shaped by skilled karigars with 15+ years of expertise." },
  { icon: "◇", title: "Lifetime Servicing", body: "Bring your Jwell piece in anytime for complimentary cleaning, polishing, and minor repairs." },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "6rem 5rem", background: "var(--color-blush-light)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
          Why Choose Us
        </p>
        <h2 style={{ fontFamily: "'Corinthia', cursive", fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)", fontWeight: 400, color: "var(--color-text)" }}>
          The Jwell Promise
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
        {reasons.map((r) => (
          <div key={r.title} className="why-card" style={{
            background: "white", borderRadius: "1.25rem", padding: "2rem 1.75rem",
            border: "1px solid transparent", transition: "all 0.3s",
          }}>
            <div style={{
              width: "2.75rem", height: "2.75rem",
              background: "var(--color-blush-light)", borderRadius: "0.75rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", marginBottom: "1.25rem",
              color: "var(--color-blush)",
            }}>
              {r.icon}
            </div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-text)" }}>
              {r.title}
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.85, fontWeight: 300 }}>
              {r.body}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .why-card:hover {
          border-color: var(--color-blush-mid) !important;
          box-shadow: 0 12px 36px rgba(201,128,106,0.12);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
