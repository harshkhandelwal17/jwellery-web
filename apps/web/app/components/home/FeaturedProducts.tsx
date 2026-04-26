import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import ProductCard from "../products/ProductCard";

interface Props {
  products: ProductWithPrice[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section style={{ padding: "6rem 5rem", background: "var(--color-bg-warm)" }}>
      <div style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", marginBottom: "3rem",
      }}>
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
            Featured
          </p>
          <h2 style={{ fontFamily: "'Corinthia', cursive", fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)", fontWeight: 400, color: "var(--color-text)" }}>
            Loved This Season
          </h2>
        </div>
        <Link href="/products" style={{
          fontSize: "0.75rem", color: "var(--color-text-mid)",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
          borderBottom: "1px solid var(--color-border)", paddingBottom: "2px",
          transition: "color 0.2s, border-color 0.2s",
        }}>
          See all pieces →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
