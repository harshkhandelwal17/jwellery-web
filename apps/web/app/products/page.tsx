import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts } from "../lib/api";
import type { ProductCategory } from "@jwell/types";

export const revalidate = 300;

const CATEGORIES: { slug: ProductCategory | "all"; label: string }[] = [
  { slug: "all", label: "All" },
  { slug: "rings", label: "Rings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "bracelets", label: "Bracelets" },
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = category as ProductCategory | undefined;

  const allProducts = await fetchProducts();
  const products = active
    ? allProducts.filter((p) => p.category === active)
    : allProducts;

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: "var(--color-ivory-50)" }}>
        {/* Page header */}
        <div
          className="py-16 text-center border-b"
          style={{ borderColor: "var(--color-ivory-200)" }}
        >
          <p
            className="hero-enter hero-enter-1 text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--color-blush-400)" }}
          >
            Handcrafted Luxury
          </p>
          <h1
            className="hero-enter hero-enter-2 font-display leading-none"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              color: "var(--color-text-900)",
            }}
          >
            Our Collections
          </h1>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
          {/* Category filter */}
          <div className="hero-enter hero-enter-3 flex flex-wrap gap-2 mb-8 md:gap-3 md:mb-12">
            {CATEGORIES.map((cat) => {
              const isActive =
                (!active && cat.slug === "all") || active === cat.slug;
              return (
                <a
                  key={cat.slug}
                  href={
                    cat.slug === "all"
                      ? "/products"
                      : `/products?category=${cat.slug}`
                  }
                  className="text-xs tracking-widest uppercase px-5 py-2.5 border transition-all"
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-text-900)",
                          borderColor: "var(--color-text-900)",
                          color: "var(--color-ivory-50)",
                        }
                      : {
                          borderColor: "var(--color-ivory-200)",
                          color: "var(--color-text-700)",
                          backgroundColor: "transparent",
                        }
                  }
                >
                  {cat.label}
                </a>
              );
            })}
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <div
              className="text-center py-24"
              style={{ color: "var(--color-text-500)" }}
            >
              No products found in this category.
            </div>
          ) : (
            <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 220px))", gap: "1rem" }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
