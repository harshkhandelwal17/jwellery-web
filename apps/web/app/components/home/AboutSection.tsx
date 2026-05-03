import Image from "next/image";
import { imageSrcNeedsUnoptimized, PRODUCT_IMAGE_FALLBACK } from "../../lib/cloudinary";

interface Props {
  mainImage?: string;
  accentImage?: string;
}

export default function AboutSection({ mainImage, accentImage }: Props) {
  const mainSrc = mainImage ?? PRODUCT_IMAGE_FALLBACK;
  const accentSrc = accentImage ?? PRODUCT_IMAGE_FALLBACK;
  return (
    <section className="about-section section-shell" style={{ background: "var(--color-bg)" }}>
      <style>{`
        .about-section { padding: 7rem 5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .about-image-wrap { position: relative; height: 520px; }
        .about-img-slot {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }
        .about-img-slot img {
          object-fit: cover !important;
          object-position: center;
        }
        .about-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid var(--color-border);
          border-radius: 1.25rem;
          padding: 1.25rem 1.2rem;
        }
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
          <div className="about-img-slot">
            <Image
              src={mainSrc}
              alt="Gold jewellery piece"
              fill
              quality={90}
              unoptimized={imageSrcNeedsUnoptimized(mainSrc)}
              sizes="(max-width: 768px) 70vw, 35vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: "52%",
          borderRadius: "1.25rem", aspectRatio: "1/1", overflow: "hidden",
          border: "4px solid var(--color-bg)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          background: "var(--color-bg-card)",
        }}>
          <div className="about-img-slot">
            <Image
              src={accentSrc}
              alt="Gold jewellery detail"
              fill
              quality={88}
              unoptimized={imageSrcNeedsUnoptimized(accentSrc)}
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="scroll-reveal">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
          Heritage
        </p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
          fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.3, marginBottom: "1.5rem",
          color: "var(--color-text)",
        }}>
          Jewellery Crafted with<br />
          <span style={{ color: "var(--color-gold)" }}>Precision &amp; Trust</span>
        </h2>

        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "0.9rem", fontWeight: 300 }}>
          Built on decades of jewellery expertise, Shreeva blends timeless craftsmanship with modern elegance.
          Each piece is made to feel premium, wearable, and memorable.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "0.8rem", fontWeight: 300 }}>
          We are scaling online with the same trust and service standards that define strong offline jewellery relationships.
          This is a long-term brand journey, not just a catalog.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-mid)", lineHeight: 1.95, marginBottom: "0.8rem", fontWeight: 300 }}>
          As we expand into wider offline presence, every customer touchpoint is being built to feel premium, transparent, and dependable.
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
            { num: "Online → Offline", label: "Growth Vision" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--color-gold)", lineHeight: 1, letterSpacing: "0.04em" }}>
                {s.num}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-mid)", marginTop: "0.2rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="about-card" style={{ marginTop: "1.1rem" }}>
          <p style={{ fontSize: "0.76rem", color: "var(--color-text-mid)", letterSpacing: "0.13em", textTransform: "uppercase" }}>
            Premium Craft. Clean Design. Trusted Quality.
          </p>
        </div>
      </div>
    </section>
  );
}
