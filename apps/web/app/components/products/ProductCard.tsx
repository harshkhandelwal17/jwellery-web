import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import { formatCurrency } from "@jwell/utils";
import { cloudinaryUrl, normalizeImageUrl } from "../../lib/cloudinary";
import SafeImage from "./SafeImage";

interface Props {
  product: ProductWithPrice;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`}
      className="product-card-link"
      style={{
        background: "var(--color-bg-card)",
        borderRadius: "1rem", overflow: "hidden",
        border: "1px solid var(--color-border)",
        textDecoration: "none", color: "var(--color-text)",
        transition: "all 0.3s ease-in-out", display: "block",
      }}
    >
      {/* Image */}
      <div className="product-img-wrap" style={{ position: "relative", aspectRatio: "3/4" }}>
        <SafeImage
          src={cloudinaryUrl(normalizeImageUrl(product.image), { width: 800, quality: 90 })}
          alt={product.name}
          fill
          quality={90}
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Body */}
      <div style={{ padding: "0.75rem 0.875rem 0.875rem" }}>
        <span style={{
          display: "inline-block",
          background: "rgba(212, 175, 55, 0.1)", color: "var(--color-gold)",
          padding: "0.2rem 0.65rem", borderRadius: "100px",
          fontSize: "0.58rem", letterSpacing: "0.08em", fontWeight: 500,
          marginBottom: "0.4rem", textTransform: "capitalize",
          border: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          {product.category}
        </span>

        <div style={{ fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.4, color: "var(--color-text)" }}>{product.name}</div>
        <div style={{ fontSize: "0.68rem", color: "var(--color-text-mid)", marginTop: "0.2rem" }}>
          22KT · {product.weight}g
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "0.625rem", paddingTop: "0.625rem",
          borderTop: "1px solid var(--color-border)",
        }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-gold)", lineHeight: 1, letterSpacing: "0.02em" }}>
            {formatCurrency(product.calculatedPrice)}
          </span>
          <span className="arrow-btn" style={{
            width: "1.8rem", height: "1.8rem", borderRadius: "50%",
            background: "var(--color-gold)", color: "#000000",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.8rem", flexShrink: 0,
            transition: "all 0.3s ease-in-out",
            fontWeight: 600
          }}>
            →
          </span>
        </div>
      </div>

      <style>{`
        .product-card-link:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: var(--color-gold);
          box-shadow: 0 12px 40px rgba(212,175,55,0.15);
        }
        .product-card-link:hover .arrow-btn {
          transform: scale(1.1);
          background: var(--color-gold-light);
        }
      `}</style>
    </Link>
  );
}
