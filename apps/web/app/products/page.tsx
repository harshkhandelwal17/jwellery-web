import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts } from "../lib/api";
import type { ProductCategory } from "@jwell/types";

export const revalidate = 300;

const CATEGORIES: { slug: string; label: string }[] = [
  { slug: "all", label: "All Jewellery" },
  { slug: "rings", label: "Rings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "bracelets", label: "Bracelets" },
  { slug: "bridal", label: "Bridal" },
  { slug: "lab-grown-diamond", label: "Lab Grown Diamond" },
  { slug: "silver-gold", label: "Silver & Gold" },
  { slug: "flick", label: "Flick Jewellery" },
  { slug: "silver-collection", label: "Silver Collection" },
];

const CRAFT_EDIT = [
  { slug: "lab-grown-diamond", title: "Lab Grown Diamond", desc: "Brilliant, ethical, and exquisite", bg: "#f0eaff" },
  { slug: "silver-gold", title: "Silver & Gold", desc: "The timeless duo, reimagined", bg: "#fff8e8" },
  { slug: "flick", title: "Flick Jewellery", desc: "Bold statements, light wear", bg: "#eafff4" },
  { slug: "silver-collection", title: "Silver Collection", desc: "Pure elegance in sterling silver", bg: "#eaf0ff" },
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = category as ProductCategory | undefined;
  const activeSlug = category ?? "all";

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
              const isActive = activeSlug === cat.slug;
              return (
                <a
                  key={cat.slug}
                  href={cat.slug === "all" ? "/products" : `/products?category=${cat.slug}`}
                  className="text-xs tracking-widest uppercase px-5 py-2.5 border transition-all"
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-text)",
                          borderColor: "var(--color-text)",
                          color: "white",
                        }
                      : {
                          borderColor: "var(--color-border)",
                          color: "var(--color-text-muted)",
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

        {/* The Craft Edit */}
        <div style={{ background: "var(--color-blush-light)", padding: "5rem 0" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
                Curated For You
              </p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.08em", color: "var(--color-text)" }}>
                The Craft Edit
              </h2>
            </div>
            <style>{`
              .craft-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
              @media (max-width: 768px) { .craft-grid { grid-template-columns: repeat(2, 1fr); } }
              .craft-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(201,150,42,0.16) !important; }
              .craft-card { transition: all 0.3s; }
            `}</style>
            <div className="craft-grid">
              {CRAFT_EDIT.map((item) => (
                <a
                  key={item.slug}
                  href={`/products?category=${item.slug}`}
                  className="craft-card"
                  style={{
                    textDecoration: "none",
                    background: item.bg,
                    borderRadius: "1.25rem",
                    padding: "2.5rem 1.75rem",
                    border: "1px solid var(--color-border)",
                    display: "block",
                  }}
                >
                  <div style={{
                    width: "2.5rem", height: "2.5rem",
                    background: "white", borderRadius: "0.5rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", marginBottom: "1.25rem",
                    color: "var(--color-gold)",
                    border: "1px solid var(--color-border)",
                  }}>
                    ◈
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.4rem", fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 300, lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-blush)", fontWeight: 500 }}>
                    Explore →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
