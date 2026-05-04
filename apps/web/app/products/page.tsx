import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/products/ProductCard";
import { fetchProducts, type GetProductsParams } from "../lib/api";
import Link from "next/link";

// Always fetch fresh data — new products added in admin must appear immediately
export const dynamic = "force-dynamic";

// ─── Sort ─────────────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "newest",      label: "Newest first" },
  { value: "oldest",      label: "Oldest first" },
  { value: "price_asc",   label: "Price · Low to high" },
  { value: "price_desc",  label: "Price · High to low" },
  { value: "name_asc",    label: "Name A–Z" },
  { value: "name_desc",   label: "Name Z–A" },
  { value: "weight_asc",  label: "Weight · Light first" },
  { value: "weight_desc", label: "Weight · Heavy first" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];
function parseSort(raw: string | undefined): SortValue {
  const v = raw as SortValue;
  return SORT_OPTIONS.some((o) => o.value === v) ? v : "newest";
}

// ─── Main category tabs ────────────────────────────────────────────────────────
const MAIN_TABS = [
  { key: "all",               label: "All",              accent: "#d4af37", subCategories: [] },
  {
    key: "Gold Jewellery",    label: "Gold",             accent: "#d4af37", badge: "22KT",
    subCategories: [
      { label: "Rings",      slug: "rings" },
      { label: "Necklaces",  slug: "necklaces-and-chains" },
      { label: "Earrings",   slug: "earrings" },
      { label: "Bracelets",  slug: "bracelets" },
      { label: "Chains",     slug: "chains" },
      { label: "Pendants",   slug: "pendants" },
    ],
  },
  {
    key: "Silver Jewellery",  label: "Silver",           accent: "#b0b8c8", badge: "925",
    subCategories: [
      { label: "Rings",      slug: "rings" },
      { label: "Necklaces",  slug: "necklaces-and-chains" },
      { label: "Earrings",   slug: "earrings" },
      { label: "Bracelets",  slug: "bracelets" },
      { label: "Anklets",    slug: "anklets" },
      { label: "Toe Rings",  slug: "toe-rings" },
      { label: "Chains",     slug: "chains" },
      { label: "Pendants",   slug: "pendants" },
    ],
  },
  {
    key: "Diamond Jewellery", label: "Lab Grown Diamond", accent: "#a8d8f0", badge: "IGI",
    subCategories: [
      { label: "Rings",      slug: "rings" },
      { label: "Necklaces",  slug: "necklaces-and-chains" },
      { label: "Earrings",   slug: "earrings" },
      { label: "Bracelets",  slug: "bracelets" },
      { label: "Pendants",   slug: "pendants" },
    ],
  },
] as const;

type MainTabKey = (typeof MAIN_TABS)[number]["key"];

const SUB_LABELS: Record<string, string> = {
  "rings":                "Rings",
  "necklaces-and-chains": "Necklaces & Chains",
  "earrings":             "Earrings",
  "bracelets":            "Bracelets",
  "chains":               "Chains",
  "pendants":             "Pendants",
  "anklets":              "Anklets",
  "toe-rings":            "Toe Rings",
};

const SUB_SLUG_TO_DB: Record<string, string> = {
  "rings":                "Rings",
  "necklaces-and-chains": "Necklaces and Chains",
  "earrings":             "Earrings",
  "bracelets":            "Bracelets",
  "chains":               "Chains",
  "pendants":             "Pendants",
  "anklets":              "Anklets",
  "toe-rings":            "Toe Rings",
};

// ─── URL helper ───────────────────────────────────────────────────────────────
function buildHref(
  mainCat: string,
  subSlug: string | undefined,
  q: string | undefined,
  sort: SortValue
): string {
  const p = new URLSearchParams();
  if (mainCat !== "all") p.set("mainCategory", mainCat);
  if (subSlug) p.set("subCategory", subSlug);
  if (q?.trim()) p.set("q", q.trim());
  if (sort && sort !== "newest") p.set("sort", sort);
  const qs = p.toString();
  return qs ? `/products?${qs}` : "/products";
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface Props {
  searchParams: Promise<{
    mainCategory?: string;
    subCategory?: string;
    category?: string;
    q?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const sort = parseSort(sp.sort);

  // Resolve active main tab
  let activeCat: MainTabKey = "all";
  if (sp.mainCategory && MAIN_TABS.some((t) => t.key === sp.mainCategory)) {
    activeCat = sp.mainCategory as MainTabKey;
  } else if (sp.category) {
    const legacy: Record<string, MainTabKey> = {
      "lab-grown-diamond": "Diamond Jewellery",
      "silver-collection": "Silver Jewellery",
    };
    activeCat = legacy[sp.category] ?? "all";
  }

  const activeSubSlug = sp.subCategory ?? "";
  const activeTab = MAIN_TABS.find((t) => t.key === activeCat)!;

  // Fetch
  const apiParams: GetProductsParams = { sort, ...(q ? { search: q } : {}) };
  if (activeCat !== "all") {
    apiParams.mainCategory = activeCat;
  }

  let products = await fetchProducts(apiParams);

  // Filter by subcategory client-side
  if (activeSubSlug && SUB_SLUG_TO_DB[activeSubSlug]) {
    const dbSub = SUB_SLUG_TO_DB[activeSubSlug];
    products = products.filter((p) => p.subCategory === dbSub);
  }

  // Legacy ?category= support
  if (
    sp.category &&
    ["rings", "necklaces", "earrings", "bracelets", "watches"].includes(sp.category) &&
    activeCat === "all"
  ) {
    products = products.filter((p) => p.category === sp.category);
  }

  const noStockGlobally = products.length === 0 && activeCat === "all" && !q && !activeSubSlug;

  const titleParts: string[] = [];
  if (activeCat !== "all") titleParts.push(activeTab.label);
  if (activeSubSlug && SUB_LABELS[activeSubSlug]) titleParts.push(SUB_LABELS[activeSubSlug]);
  const pageTitle = titleParts.length ? titleParts.join(" · ") : "Our Collections";

  const subCategories =
    "subCategories" in activeTab
      ? (activeTab as { subCategories: readonly { label: string; slug: string }[] }).subCategories
      : ([] as { label: string; slug: string }[]);

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
        <style>{`
          @media (max-width: 768px) {
            .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          }
          .pf-bar {
            position: sticky;
            top: 70px;
            z-index: 30;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background: linear-gradient(180deg, rgba(8,8,30,0.94), rgba(8,8,30,0.82));
            border-bottom: 1px solid var(--color-border);
            padding: 0.75rem clamp(1rem, 4vw, 3rem);
          }
          .pf-main-tabs {
            display: flex;
            gap: 0.5rem;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 2px;
            scrollbar-width: none;
          }
          .pf-main-tabs::-webkit-scrollbar { display: none; }
          .pf-tab {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.5rem 1.1rem;
            border-radius: 999px;
            border: 1px solid;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-decoration: none;
            white-space: nowrap;
            transition: background 0.2s, color 0.2s, border-color 0.2s;
            flex-shrink: 0;
          }
          .pf-tab-badge {
            font-size: 0.52rem;
            padding: 0.1rem 0.35rem;
            border-radius: 2px;
            font-weight: 700;
            letter-spacing: 0.1em;
          }
          .pf-sub-row {
            display: flex;
            gap: 0.4rem;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-top: 0.6rem;
            scrollbar-width: none;
            border-top: 1px solid rgba(255,255,255,0.05);
            margin-top: 0.6rem;
          }
          .pf-sub-row::-webkit-scrollbar { display: none; }
          .pf-sub-chip {
            padding: 0.3rem 0.75rem;
            border-radius: 999px;
            border: 1px solid;
            font-size: 0.62rem;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-decoration: none;
            white-space: nowrap;
            transition: background 0.15s, border-color 0.15s;
            flex-shrink: 0;
          }
          .pf-form {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            padding-top: 0.75rem;
            margin-top: 0.6rem;
            border-top: 1px solid rgba(255,255,255,0.05);
          }
          @media (max-width: 640px) {
            .pf-tab { font-size: 0.6rem; padding: 0.4rem 0.8rem; }
            .pf-sub-chip { font-size: 0.58rem; }
          }
        `}</style>

        {/* Page hero */}
        <div className="py-10 md:py-14 text-center border-b" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-[0.62rem] tracking-widest uppercase mb-2" style={{ color: "var(--color-gold)" }}>
            Shreeva Jewellers
          </p>
          <h1 className="font-display leading-none text-3xl md:text-5xl" style={{ color: "var(--color-text)" }}>
            {pageTitle}
          </h1>
          <p style={{ marginTop: "0.7rem", color: "var(--color-text-mid)", fontSize: "0.85rem" }}>
            {activeCat === "all"
              ? "Discover premium jewellery crafted for every occasion."
              : activeCat === "Gold Jewellery"
              ? "BIS Hallmarked 22KT gold, priced at live market rates."
              : activeCat === "Silver Jewellery"
              ? "Certified 925 Sterling Silver — same craftsmanship, lighter price."
              : "Lab-grown diamonds — certified, sustainable, brilliant."}
          </p>
        </div>

        {/* Sticky filter bar */}
        <div className="pf-bar">
          {/* Main tabs: All / Gold / Silver / Lab Grown */}
          <div className="pf-main-tabs">
            {MAIN_TABS.map((tab) => {
              const isActive = activeCat === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={buildHref(tab.key, undefined, q || undefined, sort)}
                  className="pf-tab"
                  style={
                    isActive
                      ? { background: tab.accent, borderColor: tab.accent, color: "#000" }
                      : { borderColor: tab.accent + "55", color: tab.accent, background: tab.accent + "10" }
                  }
                >
                  {tab.label}
                  {"badge" in tab && tab.badge && (
                    <span
                      className="pf-tab-badge"
                      style={
                        isActive
                          ? { background: "rgba(0,0,0,0.25)", color: "#000" }
                          : { background: tab.accent + "20", color: tab.accent }
                      }
                    >
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sub-category chips */}
          {activeCat !== "all" && subCategories.length > 0 && (
            <div className="pf-sub-row">
              <Link
                href={buildHref(activeCat, undefined, q || undefined, sort)}
                className="pf-sub-chip"
                style={
                  !activeSubSlug
                    ? { background: activeTab.accent, borderColor: activeTab.accent, color: "#000" }
                    : { borderColor: activeTab.accent + "40", color: activeTab.accent, background: "transparent" }
                }
              >
                All
              </Link>
              {subCategories.map((sub) => {
                const isSubActive = activeSubSlug === sub.slug;
                return (
                  <Link
                    key={sub.slug}
                    href={buildHref(activeCat, sub.slug, q || undefined, sort)}
                    className="pf-sub-chip"
                    style={
                      isSubActive
                        ? { background: activeTab.accent, borderColor: activeTab.accent, color: "#000" }
                        : { borderColor: activeTab.accent + "40", color: activeTab.accent, background: "transparent" }
                    }
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Search + sort */}
          <form action="/products" method="get" className="pf-form">
            {activeCat !== "all" && <input type="hidden" name="mainCategory" value={activeCat} />}
            {activeSubSlug && <input type="hidden" name="subCategory" value={activeSubSlug} />}
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search name, description, SKU…"
              className="flex-1 min-w-[180px] rounded-full border px-4 py-2 text-sm bg-[var(--color-bg)] focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            />
            <select
              name="sort"
              defaultValue={sort}
              className="rounded-full border px-4 py-2 text-xs tracking-wider uppercase bg-[var(--color-bg)] cursor-pointer"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase"
              style={{ background: "var(--color-gold)", color: "#000" }}
            >
              Apply
            </button>
          </form>
        </div>

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
          {products.length === 0 ? (
            <div
              className="text-center py-24 max-w-lg mx-auto px-4"
              style={{ color: "var(--color-text-mid)" }}
            >
              {noStockGlobally ? (
                <>
                  <p style={{ color: "var(--color-text)", marginBottom: "0.5rem" }}>No products loaded</p>
                  <p className="text-sm leading-relaxed">
                    The API returned an empty list. Set{" "}
                    <code className="text-xs">API_URL</code> or{" "}
                    <code className="text-xs">NEXT_PUBLIC_API_URL</code>, then redeploy.
                  </p>
                </>
              ) : (
                <p>
                  {q
                    ? "No pieces match your search — try different keywords."
                    : "No products found in this category yet."}
                </p>
              )}
            </div>
          ) : (
            <div
              className="products-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 220px))",
                gap: "1rem",
              }}
            >
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
