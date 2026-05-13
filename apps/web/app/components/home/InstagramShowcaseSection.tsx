import Link from "next/link";
import Image from "next/image";
import type { ProductWithPrice } from "@jwell/types";
import { imageSrcNeedsUnoptimized, productImageUrl } from "../../lib/cloudinary";

interface Props {
  products: ProductWithPrice[];
}

export default function InstagramShowcaseSection({ products }: Props) {
  const fallbackCards = [
    {
      id: "fallback-ring",
      name: "Signature Ring",
      image: "/cheroImage-removebg-preview1.png",
      mainCategory: "Gold Jewellery",
      weight: 12,
      calculatedPrice: 0,
    },
    {
      id: "fallback-necklace",
      name: "Heritage Necklace",
      image: "/about-main.jpg",
      mainCategory: "Bridal Collection",
      weight: 36,
      calculatedPrice: 0,
    },
    {
      id: "fallback-earring",
      name: "Royal Earrings",
      image: "/about-accent.jpg",
      mainCategory: "Diamond Jewellery",
      weight: 8,
      calculatedPrice: 0,
    },
  ];

  const sourceCards = products.length > 0 ? products : fallbackCards;
  const track = [...sourceCards, ...sourceCards, ...sourceCards];

  return (
    <section
      className="ig-showcase-section section-shell"
      style={{
        padding: "clamp(1.25rem, 3.5vw, 2.2rem) 0 clamp(2rem, 5vw, 3rem)",
        background:
          "linear-gradient(180deg, rgba(6,6,16,1) 0%, rgba(8,8,22,0.98) 100%)",
      }}
      aria-label="Signature product carousel"
    >
      <style>{`
        .ig-showcase-inner {
          width: min(1280px, 100%);
          margin: 0 auto;
        }
        .ig-showcase-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          padding: 0 clamp(1rem, 3.5vw, 2.4rem);
          margin-bottom: 1rem;
        }
        .ig-showcase-kicker {
          margin: 0;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.82);
        }
        .ig-showcase-title {
          margin: 0.3rem 0 0;
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2.2vw, 1.65rem);
          color: var(--color-text);
          letter-spacing: 0.03em;
        }
        .ig-showcase-link {
          text-decoration: none;
          color: var(--color-text-mid);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          border-bottom: 1px solid rgba(212, 175, 55, 0.35);
          padding-bottom: 0.1rem;
          transition: color 0.25s ease, border-color 0.25s ease;
          white-space: nowrap;
        }
        .ig-showcase-link:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }

        .ig-marquee {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
        }
        .ig-marquee-track {
          display: flex;
          gap: 0.95rem;
          width: max-content;
          animation: ig-scroll 34s linear infinite;
          padding: 0 clamp(0.7rem, 2vw, 1.6rem);
        }
        @keyframes ig-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ig-marquee-track { animation: none; }
        }

        .ig-card {
          width: clamp(140px, 17vw, 230px);
          text-decoration: none;
          color: var(--color-text);
          border-radius: 1.05rem;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.2);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015)),
            rgba(10, 10, 22, 0.9);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.28);
          transition: transform 0.28s ease, border-color 0.28s ease;
          flex-shrink: 0;
        }
        .ig-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.55);
        }
        .ig-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background: rgba(255, 255, 255, 0.03);
        }
        .ig-card-img {
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .ig-card:hover .ig-card-img {
          transform: scale(1.05);
        }
        .ig-card-content {
          padding: 0.55rem 0.62rem 0.68rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .ig-card-name {
          font-size: 0.69rem;
          font-weight: 500;
          line-height: 1.35;
          color: var(--color-text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ig-card-meta {
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ig-card-price {
          margin-top: 0.12rem;
          font-size: 0.74rem;
          color: var(--color-gold);
          font-family: var(--font-display);
          letter-spacing: 0.03em;
        }

        @media (max-width: 768px) {
          .ig-showcase-head {
            padding-inline: 0.95rem;
            margin-bottom: 0.75rem;
          }
          .ig-showcase-link {
            font-size: 0.65rem;
          }
          .ig-marquee-track {
            gap: 0.72rem;
            animation-duration: 28s;
            padding-inline: 0.7rem;
          }
          .ig-card {
            width: clamp(120px, 42vw, 160px);
            border-radius: 0.85rem;
          }
          .ig-card-content {
            padding: 0.5rem 0.55rem 0.58rem;
          }
          .ig-card-name {
            font-size: 0.63rem;
          }
          .ig-card-price {
            font-size: 0.68rem;
          }
        }
      `}</style>

      <div className="ig-showcase-inner">
        <div className="ig-showcase-head">
          <div>
            <p className="ig-showcase-kicker">Social spotlight</p>
            <h2 className="ig-showcase-title">As seen in our latest drops</h2>
          </div>
          <Link href="/products" className="ig-showcase-link">
            View full collection
          </Link>
        </div>

        <div className="ig-marquee">
          <div className="ig-marquee-track">
            {track.map((product, i) => (
              <Link
                href={products.length > 0 ? `/products/${product.id}` : "/products"}
                key={`${product.id}-${i}`}
                className="ig-card"
              >
                <div className="ig-card-img-wrap">
                  <Image
                    src={productImageUrl(product.image, { width: 420, quality: 86 })}
                    alt={product.name}
                    fill
                    className="ig-card-img"
                    sizes="(max-width: 768px) 44vw, 220px"
                    unoptimized={imageSrcNeedsUnoptimized(product.image)}
                  />
                </div>
                <div className="ig-card-content">
                  <span className="ig-card-name">{product.name}</span>
                  <span className="ig-card-meta">
                    {product.mainCategory ?? "Jewellery"} · {product.weight}g
                  </span>
                  <span className="ig-card-price">
                    Enquire for Price
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
