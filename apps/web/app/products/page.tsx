import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts, type GetProductsParams } from "../lib/api";
import Link from "next/link";

export const revalidate = 300;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price_asc", label: "Price · Low to high" },
  { value: "price_desc", label: "Price · High to low" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
  { value: "weight_asc", label: "Weight · Light first" },
  { value: "weight_desc", label: "Weight · Heavy first" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function parseSort(raw: string | undefined): SortValue {
  const v = raw as SortValue;
  return SORT_OPTIONS.some((o) => o.value === v) ? v : "newest";
}

function categoryHref(slug: string, q: string | undefined, sort: SortValue): string {
  const p = new URLSearchParams();
  if (slug !== "all") p.set("category", slug);
  if (q?.trim()) p.set("q", q.trim());
  if (sort && sort !== "newest") p.set("sort", sort);
  const qs = p.toString();
  return qs ? `/products?${qs}` : "/products";
}

const CATEGORIES: { slug: string; label: string }[] = [
  { slug: "all", label: "All Jewellery" },
  { slug: "rings", label: "Rings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "bracelets", label: "Bracelets" },
  { slug: "watches", label: "Watches" },
  { slug: "bridal", label: "Bridal" },
  { slug: "lab-grown-diamond", label: "Lab Grown Diamond" },
  { slug: "silver-gold", label: "Silver & Gold" },
  { slug: "flick", label: "Flick Jewellery" },
  { slug: "silver-collection", label: "Silver Collection" },
];

const CRAFT_EDIT = [
  { slug: "lab-grown-diamond", title: "Lab Grown Diamond", desc: "Brilliant and modern luxury." },
  { slug: "silver-gold", title: "Silver & Gold", desc: "Classic tones, contemporary styling." },
  { slug: "flick", title: "Flick Jewellery", desc: "Lightweight pieces with bold character." },
  { slug: "silver-collection", title: "Silver Collection", desc: "Refined sterling essentials." },
];

// Maps URL slugs to mainCategory values in the DB
const MAIN_CATEGORY_MAP: Record<string, string | string[]> = {
  "bridal":           "Bridal Collection",
  "lab-grown-diamond": "Diamond Jewellery",
  "silver-collection": "Silver Jewellery",
  "flick":            "Chic Everyday Jewellery",
  "silver-gold":      ["Silver Jewellery", "Gold Jewellery"],
};

// Old-system category slugs that map directly to p.category
const OLD_CATEGORY_SLUGS = ["rings", "necklaces", "earrings", "bracelets", "watches"];

interface Props {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const activeSlug = sp.category ?? "all";
  const q = sp.q?.trim() ?? "";
  const sort = parseSort(sp.sort);

  const needsClientMainFilter =
    activeSlug !== "all" &&
    Boolean(MAIN_CATEGORY_MAP[activeSlug]) &&
    Array.isArray(MAIN_CATEGORY_MAP[activeSlug]);

  const apiParams: GetProductsParams = {
    sort,
    ...(q ? { search: q } : {}),
  };

  if (activeSlug !== "all" && OLD_CATEGORY_SLUGS.includes(activeSlug)) {
    apiParams.category = activeSlug;
  } else if (
    activeSlug !== "all" &&
    MAIN_CATEGORY_MAP[activeSlug] &&
    !Array.isArray(MAIN_CATEGORY_MAP[activeSlug])
  ) {
    apiParams.mainCategory = MAIN_CATEGORY_MAP[activeSlug] as string;
  }

  let products = needsClientMainFilter
    ? await fetchProducts({ sort, ...(q ? { search: q } : {}) })
    : await fetchProducts(apiParams);

  if (needsClientMainFilter) {
    const mc = MAIN_CATEGORY_MAP[activeSlug] as string[];
    products = products.filter((p) => mc.includes(p.mainCategory ?? ""));
  }

  const noStockGlobally = products.length === 0 && activeSlug === "all" && !q;

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
        {/* Page header */}
        <div
          className="py-10 md:py-16 text-center border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="hero-enter hero-enter-1 text-[0.65rem] md:text-xs tracking-widest uppercase mb-2 md:mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Handcrafted Luxury
          </p>
          <h1
            className="hero-enter hero-enter-2 font-display leading-none text-3xl md:text-6xl"
            style={{ color: "var(--color-text)" }}
          >
            Our Collections
          </h1>
          <p style={{ marginTop: "0.8rem", color: "var(--color-text-mid)", fontSize: "0.88rem" }}>
            Discover premium jewellery crafted for everyday elegance and special moments.
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
            .category-filter { flex-wrap: nowrap !important; overflow-x: auto !important; padding-bottom: 0.75rem !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
            .category-filter::-webkit-scrollbar { display: none; }
            .category-filter a { white-space: nowrap !important; font-size: 0.6rem !important; padding: 0.5rem 0.9rem !important; flex-shrink: 0; }
          }
          .category-filter-wrap {
            position: sticky;
            top: 74px;
            z-index: 30;
            backdrop-filter: blur(8px);
            background: linear-gradient(180deg, rgba(8,8,30,0.92), rgba(8,8,30,0.78));
            border: 1px solid var(--color-border);
            border-radius: 0.9rem;
            padding: 0.8rem;
            margin-bottom: 1.8rem;
          }
          @media (max-width: 768px) {
            .category-filter-wrap {
              top: 72px;
              padding: 0.65rem 0.6rem;
            }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
          {/* Category filter */}
          <div className="category-filter-wrap hero-enter hero-enter-3">
            <div className="category-filter flex flex-wrap gap-2 md:gap-3">
              {CATEGORIES.map((cat) => {
                const isActive = activeSlug === cat.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={categoryHref(cat.slug, q || undefined, sort)}
                    className="text-xs tracking-widest uppercase px-5 py-2.5 border transition-all"
                    style={
                      isActive
                        ? {
                            backgroundColor: "var(--color-gold)",
                            borderColor: "var(--color-gold)",
                            color: "#000000",
                            fontWeight: 600,
                            borderRadius: "999px",
                          }
                        : {
                            borderColor: "var(--color-gold)",
                            color: "var(--color-gold)",
                            backgroundColor: "rgba(255,255,255,0.02)",
                            borderRadius: "999px",
                          }
                    }
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Search & sort (GET → shareable URLs, works with ISR) */}
            <form
              action="/products"
              method="get"
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8"
            >
              {activeSlug !== "all" ? (
                <input type="hidden" name="category" value={activeSlug} />
              ) : null}
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search name, description, SKU…"
                className="flex-1 min-w-[200px] rounded-full border px-4 py-2.5 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              />
              <select
                name="sort"
                defaultValue={sort}
                className="rounded-full border px-4 py-2.5 text-xs tracking-wider uppercase bg-[var(--color-bg)] cursor-pointer"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest uppercase"
                style={{ background: "var(--color-gold)", color: "#000" }}
              >
                Apply
              </button>
            </form>
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <div
              className="text-center py-24 max-w-lg mx-auto px-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {noStockGlobally ? (
                <>
                  <p style={{ color: "var(--color-text)", marginBottom: "0.5rem" }}>
                    No products loaded
                  </p>
                  <p className="text-sm leading-relaxed">
                    The API returned an empty list or the server could not reach it. Set{" "}
                    <code className="text-xs">API_URL</code> or{" "}
                    <code className="text-xs">NEXT_PUBLIC_API_URL</code> to your deployed API base
                    (ending in <code className="text-xs">/api</code>), redeploy, or use{" "}
                    <strong>Revalidate</strong> in dev after fixing env.
                  </p>
                </>
              ) : (
                <p>
                  {q
                    ? "No pieces match your search. Try different keywords."
                    : "No products found in this category."}
                </p>
              )}
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
        <div style={{ background: "var(--color-bg-warm)", padding: "3rem 0 2.5rem", borderTop: "1px solid var(--color-border)" }} className="md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div style={{ textAlign: "center", marginBottom: "2rem" }} className="md:mb-12">
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.5rem" }}>
                Curated For You
              </p>
              <h2 className="text-xl md:text-4xl" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: "0.08em", color: "var(--color-text)" }}>
                Signature Picks
              </h2>
            </div>
            <style>{`
              .craft-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
              @media (max-width: 768px) {
                .craft-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
                .craft-card { padding: 1.25rem !important; }
                .craft-card h3 { font-size: 0.8rem !important; }
                .craft-card p { font-size: 0.7rem !important; margin-bottom: 0.75rem !important; }
                .craft-card .craft-icon { width: 2rem !important; height: 2rem !important; font-size: 0.9rem !important; margin-bottom: 0.75rem !important; }
              }
              .craft-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(212,175,55,0.16) !important; border-color: var(--color-gold) !important; }
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
                    background: "linear-gradient(150deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                    borderRadius: "1.25rem",
                    padding: "2.5rem 1.75rem",
                    border: "1px solid var(--color-border)",
                    display: "block",
                  }}
                >
                  <div className="craft-icon" style={{
                    width: "2.5rem", height: "2.5rem",
                    background: "rgba(212, 175, 55, 0.1)", borderRadius: "0.5rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", marginBottom: "1.25rem",
                    color: "var(--color-gold)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                  }}>
                    ◈
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.4rem", fontFamily: "'Cinzel', serif", letterSpacing: "0.04em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-mid)", fontWeight: 300, lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", fontWeight: 500 }}>
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
