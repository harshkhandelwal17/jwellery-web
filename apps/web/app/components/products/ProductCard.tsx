import Link from "next/link";
import Image from "next/image";
import type { ProductWithPrice } from "@jwell/types";
import { formatCurrency } from "@jwell/utils";

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
          src={product.image}
          alt={product.name}
          width={400}
          height={533}
          style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Body */}
      <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
        {/* Badge — pill */}
        <span style={{
          display: "inline-block",
          background: "var(--color-blush-light)", color: "var(--color-blush)",
          padding: "0.18rem 0.7rem", borderRadius: "100px",
          fontSize: "0.62rem", letterSpacing: "0.08em", fontWeight: 500,
          marginBottom: "0.6rem", textTransform: "capitalize",
        }}>
          {product.category}
        </span>

        <div style={{ fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.35 }}>{product.name}</div>
        <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
          22KT · {product.weight}g
        </div>

        {/* Price row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "0.875rem", paddingTop: "0.875rem",
          borderTop: "1px solid var(--color-border)",
        }}>
          <span style={{ fontFamily: "'Corinthia', cursive", fontSize: "1.5rem", color: "var(--color-gold)", lineHeight: 1 }}>
            {formatCurrency(product.calculatedPrice)}
          </span>
          <span style={{
            width: "1.875rem", height: "1.875rem", borderRadius: "50%",
            background: "var(--color-blush)", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem", flexShrink: 0,
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
      `}</style>
    </Link>
  );
}
