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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
            Products
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {products ? `${products.length} products` : "Loading…"}
          </p>
        </div>
        <Button onClick={() => navigate("/products/new")}>
          <PlusCircle size={16} />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: "var(--color-blush-light)" }} />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--color-blush-light)" }}>
            <Package size={28} style={{ color: "var(--color-blush)" }} />
          </div>
          <div className="text-center">
            <p className="font-medium" style={{ color: "var(--color-text)" }}>No products yet</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>Add your first product to get started</p>
          </div>
          <Button onClick={() => navigate("/products/new")}>
            <PlusCircle size={16} />
            Add Product
          </Button>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}
