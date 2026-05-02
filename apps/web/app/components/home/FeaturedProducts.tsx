import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import ProductCard from "../products/ProductCard";

interface Props {
  products: ProductWithPrice[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section
      className="featured-section section-shell"
      style={{
        padding: "clamp(3.25rem, 7vw, 6rem) clamp(1rem, 4vw, 3rem)",
        background: "var(--color-bg-warm)",
      }}
    >
      <style>{`
        .featured-section .section-inner { width: min(1180px, 100%); margin: 0 auto; }
        .featured-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; width: 100%; }
        .featured-strip {
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
          .featured-header { flex-direction: row; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
          .featured-header h2 { font-size: 1.1rem !important; }
          .featured-header a { font-size: 0.7rem !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        }
        .featured-header a:hover {
          color: var(--color-gold) !important;
          border-color: var(--color-gold) !important;
        }
      `}</style>

      <div className="section-inner">
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
            <p className="text-xs mt-2 max-w-md" style={{ color: "var(--color-text-mid)", fontWeight: 300, lineHeight: 1.5 }}>
              Highlights are chosen in admin (“Feature on homepage”). Remaining slots show newest pieces so the row stays full.
            </p>
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
        {products.length === 0 ? (
          <div
            className="col-span-full text-center py-12 px-4 rounded-2xl border"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-bg-card)",
              color: "var(--color-text-mid)",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            <p className="mb-2" style={{ color: "var(--color-text)" }}>
              No pieces to show yet
            </p>
            <p className="text-sm mb-4">
              The catalogue could not be loaded from the API, or there are no products. On Vercel, set{" "}
              <code style={{ fontSize: "0.8em" }}>API_URL</code> or{" "}
              <code style={{ fontSize: "0.8em" }}>NEXT_PUBLIC_API_URL</code> to your{" "}
              <strong>Express API</strong> base — must end with{" "}
              <code style={{ fontSize: "0.8em" }}>/api</code> (not your Next.js site URL). Redeploy the web app after saving env.
            </p>
            <Link
              href="/products"
              style={{
                fontSize: "0.8rem",
                color: "var(--color-gold)",
                textDecoration: "underline",
              }}
            >
              Open catalogue →
            </Link>
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
        </div>
      </div>
    </section>
  );
}
