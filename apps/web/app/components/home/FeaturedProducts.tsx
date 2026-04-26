import Link from "next/link";
import type { ProductWithPrice } from "@jwell/types";
import ProductCard from "../products/ProductCard";

interface Props {
  products: ProductWithPrice[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--color-ivory-100)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--color-blush-400)" }}
            >
              Handpicked For You
            </p>
            <h2
              className="font-display leading-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "var(--color-text-900)",
              }}
            >
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/products"
            className="self-start md:self-auto text-xs tracking-widest uppercase border-b pb-0.5 transition-opacity hover:opacity-60"
            style={{
              color: "var(--color-text-700)",
              borderColor: "var(--color-text-700)",
            }}
          >
            View All Collections →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
