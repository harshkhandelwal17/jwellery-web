import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import ProductTable from "@/components/products/ProductTable.js";
import { getProducts } from "@jwell/api-client";
import { ADMIN_API_URL } from "@/lib/api-config.js";

const API_URL = ADMIN_API_URL;
const PAGE_SIZE = 9;

export default function ProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(API_URL),
  });

  const availableCategories = useMemo(() => {
    const set = new Set(products?.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const query = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (categoryFilter === "all" || p.category === categoryFilter) &&
        (!query ||
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.mainCategory?.toLowerCase().includes(query) ?? false))
    );
  }, [products, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="admin-section-label mb-2">Catalogue</p>
          <h1 className="admin-page-title">
            Products
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {products ? `${products.length} products` : "Loading…"}
          </p>
        </div>
        <Button onClick={() => navigate("/products/new")} className="self-start sm:self-auto">
          <PlusCircle size={16} strokeWidth={1.8} />
          Add Product
        </Button>
      </div>

      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by product name, category, or main category..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {availableCategories.map((cat) => {
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                setPage(1);
              }}
              className="text-xs tracking-widest uppercase px-3 py-1.5 border rounded-full transition-colors"
              style={
                isActive
                  ? { background: "var(--color-gold)", color: "#000", borderColor: "var(--color-gold)" }
                  : { color: "var(--color-text-mid)", borderColor: "var(--color-border)" }
              }
            >
              {cat === "all" ? "All" : cat}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "var(--color-blush-light)" }} />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center border border-[var(--color-border)]"
            style={{ background: "var(--color-bg-card)" }}
          >
            <Package size={32} style={{ color: "var(--color-blush)" }} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="font-medium font-display2" style={{ color: "var(--color-text)" }}>No products yet</p>
            <p className="text-sm mt-1 max-w-xs mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Add your first product to build your jewellery catalogue
            </p>
          </div>
          <Button onClick={() => navigate("/products/new")}>
            <PlusCircle size={16} strokeWidth={1.8} />
            Add Product
          </Button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-14" style={{ color: "var(--color-text-muted)" }}>
          No products match this search.
        </div>
      ) : (
        <>
          <ProductTable products={paginatedProducts} />
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Prev
              </Button>
              <span className="text-xs px-3" style={{ color: "var(--color-text-muted)" }}>
                Page {page} of {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
