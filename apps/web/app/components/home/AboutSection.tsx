import Image from "next/image";

interface Props {
  mainImage?: string;
  accentImage?: string;
}

const FALLBACK_MAIN = "https://picsum.photos/seed/abjw1/500/625";
const FALLBACK_ACCENT = "https://picsum.photos/seed/abjw2/400/400";

export default function AboutSection({ mainImage, accentImage }: Props) {
  return (
    <section className="about-section" style={{ background: "var(--color-bg)" }}>
      <style>{`
        .about-section { padding: 7rem 5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .about-image-wrap { position: relative; height: 520px; }
        @media (max-width: 768px) {
          .about-section { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.25rem; }
          .about-image-wrap { height: 300px; }
        }
      `}</style>

      {/* Overlapping images */}
      <div className="about-image-wrap scroll-reveal">
        <div style={{
          position: "absolute", top: 0, left: 0, width: "72%", height: "88%",
          borderRadius: "1.5rem", overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          background: "var(--color-bg-card)",
        }}>
          <Image
            src={mainImage ?? FALLBACK_MAIN}
            alt="Gold jewellery piece"
            fill
            quality={90}
            style={{ objectFit: "contain", padding: "1.5rem" }}
            sizes="(max-width: 768px) 70vw, 35vw"
          />
        </div>
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: "52%",
          borderRadius: "1.25rem", aspectRatio: "1/1", overflow: "hidden",
          border: "4px solid var(--color-bg)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          background: "var(--color-bg-card)",
        }}>
          <Image
            src={accentImage ?? FALLBACK_ACCENT}
            alt="Gold jewellery detail"
            fill
            quality={88}
            style={{ objectFit: "contain", padding: "1rem" }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Text */}
      <div className="scroll-reveal">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
          Our Journey
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
          fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3, marginBottom: "1.5rem",
          color: "var(--color-text)",
        }}>
          Jewellery Crafted with<br />
          <span style={{ color: "var(--color-gold)" }}>Heart &amp; Heritage</span>
        </h2>

        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "1rem", fontWeight: 300 }}>
          Since 1987, GP Jewellers has been a trusted name in the bustling gold markets of Sarafa, Indore, built through years of dedication and strong customer relationships. Our roots, however, go even deeper—grounded in a rich ancestral legacy of craftsmanship and expertise in jewellery.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "1rem", fontWeight: 300 }}>
          For decades, we have proudly served customers across Madhya Pradesh, earning their trust with every piece we create. Today, we take a new step forward—expanding our presence across India.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "1rem", fontWeight: 300 }}>
          Same trust. Same relationships. Just a new platform. With this vision, we introduce Shreeva Jewellers—a brand that goes beyond jewellery. We aim to become a part of your stories, your milestones, and the celebrations that define who you are. We stand with you—not just in your special moments, but in your journey of self-expression.
        </p>

        <div style={{
          display: "flex", gap: "2.5rem", marginTop: "2.5rem",
          paddingTop: "2rem", borderTop: "1px solid var(--color-border)",
          flexWrap: "wrap",
        }}>
          {[
            { num: "4K+", label: "Happy Customers" },
            { num: "22KT", label: "Pure Gold" },
            { num: "BIS", label: "Hallmarked" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--color-gold)", lineHeight: 1, letterSpacing: "0.04em" }}>
                {s.num}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-mid)", marginTop: "0.2rem", fontWeight: 400 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
