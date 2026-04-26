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
      <div className="about-image-wrap">
        <div style={{
          position: "absolute", top: 0, left: 0, width: "72%", height: "88%",
          borderRadius: "1.5rem", overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          background: "#f0efed",
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
          background: "#f0efed",
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
      <div>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
          Our Story
        </p>
        <h2 style={{
          fontFamily: "'Corinthia', cursive",
          fontSize: "clamp(2.8rem, 4vw, 4.2rem)",
          fontWeight: 400, lineHeight: 1.15, marginBottom: "1.5rem",
          color: "var(--color-text)",
        }}>
          Jewellery Crafted<br />
          with <em style={{ fontStyle: "italic", color: "var(--color-blush)" }}>Heart &amp; Heritage</em>
        </h2>

        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.95, marginBottom: "1rem", fontWeight: 300 }}>
          Since 1992, our artisans in Jaipur have poured love into every ring, necklace, and bangle.
          We believe jewellery is more than gold — it carries your moments, your milestones, your memory.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.95, marginBottom: "1rem", fontWeight: 300 }}>
          Our dynamic gold pricing means you pay exactly what the market says — nothing more.
          Transparent, honest, and always fair.
        </p>

        <div style={{
          display: "flex", gap: "2.5rem", marginTop: "2.5rem",
          paddingTop: "2rem", borderTop: "1px solid var(--color-border)",
          flexWrap: "wrap",
        }}>
          {[
            { num: "30+", label: "Years of Craft" },
            { num: "4K+", label: "Happy Customers" },
            { num: "22KT", label: "Pure Gold" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Corinthia', cursive", fontSize: "2.8rem", color: "var(--color-blush)", lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "0.2rem", fontWeight: 400 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
