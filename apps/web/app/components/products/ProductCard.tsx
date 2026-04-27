import Link from "next/link";
import Image from "next/image";
import type { ProductWithPrice } from "@jwell/types";
import { formatCurrency } from "@jwell/utils";
import { cloudinaryUrl } from "../../lib/cloudinary";

interface Props {
  product: ProductWithPrice;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`}
      className="product-card-link"
      style={{
        background: "var(--color-bg-card)",
        borderRadius: "1.25rem", overflow: "hidden",
        border: "1px solid var(--color-border)",
        textDecoration: "none", color: "var(--color-text)",
        transition: "all 0.3s", display: "block",
      }}
    >
      {/* Image */}
      <div className="product-img-wrap" style={{ position: "relative" }}>
        <Image
          src={cloudinaryUrl(product.image, { width: 800, quality: 90 })}
          alt={product.name}
          width={400}
          height={533}
          quality={90}
          style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Body */}
      <div style={{ padding: "0.75rem 0.875rem 0.875rem" }}>
        <span style={{
          display: "inline-block",
          background: "var(--color-blush-light)", color: "var(--color-blush)",
          padding: "0.12rem 0.55rem", borderRadius: "100px",
          fontSize: "0.58rem", letterSpacing: "0.08em", fontWeight: 500,
          marginBottom: "0.4rem", textTransform: "capitalize",
        }}>
          {product.category}
        </span>

        <div style={{ fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ fontSize: "0.67rem", color: "var(--color-text-muted)", marginTop: "0.15rem" }}>
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
            width: "1.6rem", height: "1.6rem", borderRadius: "50%",
            background: "var(--color-blush)", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", flexShrink: 0,
            transition: "transform 0.2s ease",
          }}>
            →
          </span>
        </div>
      </div>

      <style>{`
        .product-card-link:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(201,128,106,0.14);
        }
        .product-card-link:hover .arrow-btn {
          transform: scale(1.15) translateX(2px);
        }
      `}</style>
    </Link>
  );
}
