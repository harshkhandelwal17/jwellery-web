import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import ProductCard from "../products/ProductCard";

interface Props {
  products: ProductWithPrice[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="featured-section section-shell" style={{ padding: "6rem 5rem", background: "var(--color-bg-warm)" }}>
      <style>{`
        .featured-section { padding: 6rem 5rem; }
        .featured-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; max-width: 1060px; margin: 0 auto; }
        .featured-strip {
          max-width: 1060px;
          margin: 0 auto 1.1rem;
          display: flex;
          gap: 0.7rem;
          align-items: center;
          opacity: 0.9;
        }
        .featured-strip span {
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-mid);
        }
        @media (max-width: 768px) {
          .featured-section { padding: 3rem 1rem !important; }
          .featured-header { flex-direction: row; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
          .featured-header h2 { font-size: 1.1rem !important; }
          .featured-header a { font-size: 0.7rem !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; max-width: 100%; }
        }
        .featured-header a:hover {
          color: var(--color-gold) !important;
          border-color: var(--color-gold) !important;
        }
      `}</style>

      <div className="featured-strip">
        <span className="gold-dot" />
        <span>Trending in 2026</span>
      </div>

      <div className="featured-header mb-6 md:mb-12" style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
      }}>
        <div>
          <p className="section-kicker" style={{ marginBottom: "0.5rem" }}>
            Featured
          </p>
          <h2 className="section-heading" style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)" }}>
            Loved This Season
          </h2>
        </div>
        <Link href="/products" style={{
          fontSize: "0.75rem", color: "var(--color-text-mid)",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
          borderBottom: "1px solid var(--color-border)", paddingBottom: "2px",
          transition: "all 0.3s ease-in-out",
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
