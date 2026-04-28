import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import ProductTable from "@/components/products/ProductTable.js";
import { getProducts } from "@jwell/api-client";

const API_URL = import.meta.env.VITE_API_URL as string;

export default function ProductsPage() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(API_URL),
  });

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
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}
