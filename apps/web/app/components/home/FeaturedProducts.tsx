import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import ProductCard from "../products/ProductCard";

interface Props {
  products: ProductWithPrice[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="featured-section" style={{ padding: "6rem 5rem", background: "var(--color-bg-warm)" }}>
      <style>{`
        .featured-section { padding: 6rem 5rem; }
        .featured-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 960px; margin: 0 auto; }
        @media (max-width: 768px) {
          .featured-section { padding: 3rem 1.25rem !important; }
          .featured-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .featured-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
        }
      `}</style>

      <div className="featured-header" style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", marginBottom: "3rem",
      }}>
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
            Featured
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-text)" }}>
            Loved This Season
          </h2>
        </div>
        <Link href="/products" style={{
          fontSize: "0.75rem", color: "var(--color-text-mid)",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
          borderBottom: "1px solid var(--color-border)", paddingBottom: "2px",
          transition: "color 0.2s, border-color 0.2s",
          whiteSpace: "nowrap",
        }}>
          See all pieces →
        </Link>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
