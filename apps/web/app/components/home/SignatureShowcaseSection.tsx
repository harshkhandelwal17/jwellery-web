import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  { title: "Bespoke Detailing", value: "200+" },
  { title: "Premium Designs", value: "4.9/5" },
  { title: "On-time Delivery", value: "99%" },
];

export default function SignatureShowcaseSection() {
  return (
    <section className="section-shell" style={{ background: "var(--color-bg)", padding: "6.5rem 0" }}>
      <style>{`
        .signature-wrap {
          width: min(1140px, calc(100% - 2rem));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: 2rem;
          align-items: center;
        }
        .signature-visual {
          position: relative;
          min-height: 460px;
          perspective: 1200px;
        }
        .signature-main-card {
          position: absolute;
          inset: 2rem 3rem 2rem 1rem;
          border-radius: 1.4rem;
          overflow: hidden;
          transform: rotateY(-12deg) rotateX(6deg);
          border: 1px solid rgba(212,175,55,0.4);
          box-shadow: 0 24px 65px rgba(0,0,0,0.4), 0 16px 50px rgba(212,175,55,0.16);
          background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        }
        .signature-float-card {
          position: absolute;
          right: 0;
          bottom: 2rem;
          width: 210px;
          border-radius: 1rem;
          border: 1px solid rgba(212,175,55,0.4);
          background: rgba(8,8,30,0.82);
          backdrop-filter: blur(10px);
          padding: 1rem;
          animation: float 4.6s ease-in-out infinite;
        }
        .signature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
          margin-top: 1.8rem;
        }
        .signature-stat {
          border: 1px solid var(--color-border);
          border-radius: 0.9rem;
          padding: 0.85rem;
          background: rgba(255,255,255,0.02);
        }
        @media (max-width: 900px) {
          .signature-wrap {
            grid-template-columns: 1fr;
          }
          .signature-visual {
            min-height: 330px;
          }
          .signature-main-card {
            inset: 1rem 1.2rem 1rem 0.2rem;
          }
          .signature-float-card {
            width: 170px;
            padding: 0.8rem;
          }
        }
      `}</style>

      <div className="signature-wrap">
        <div className="signature-visual">
          <div className="signature-main-card">
            <Image
              src="/cheroImage-removebg-preview.png"
              alt="Signature jewellery showcase"
              fill
              quality={94}
              className="object-contain"
              sizes="(max-width: 900px) 90vw, 45vw"
              style={{ padding: "1.8rem" }}
            />
          </div>
          <div className="signature-float-card">
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.4rem" }}>
              3D Showcase
            </p>
            <p style={{ fontSize: "0.76rem", lineHeight: 1.6, color: "var(--color-text-mid)" }}>
              Premium ring view built to highlight finish, polish and detail.
            </p>
          </div>
        </div>

        <div>
          <p className="section-kicker">Signature Edit</p>
          <h2 className="section-heading" style={{ marginTop: "0.65rem" }}>
            Designed to Look<br />
            <span style={{ color: "var(--color-gold)" }}>Luxury on Every Screen</span>
          </h2>
          <p style={{ marginTop: "1rem", color: "var(--color-text-mid)", lineHeight: 1.9, fontSize: "0.92rem", maxWidth: "520px" }}>
            From landing impression to product exploration, every block is tuned with smoother depth, premium
            textures, and strong mobile behavior so the website feels upscale, clean, and conversion-friendly.
          </p>

          <div className="signature-grid">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="signature-stat">
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", color: "var(--color-gold)", lineHeight: 1.1 }}>
                  {item.value}
                </p>
                <p style={{ marginTop: "0.3rem", fontSize: "0.68rem", color: "var(--color-text-mid)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            style={{
              marginTop: "1.6rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-gold)",
              paddingBottom: "0.2rem",
              fontSize: "0.74rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Explore Signature Pieces →
          </Link>
        </div>
      </div>
    </section>
  );
}
