import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductForm from "@/components/products/ProductForm.js";
import { getProduct } from "@jwell/api-client";
import { Button } from "@/components/ui/button.js";
import { ADMIN_API_URL } from "@/lib/api-config.js";

const API_URL = ADMIN_API_URL;

export default function ProductFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(API_URL, id!),
    enabled: isEdit,
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Page header */}
      <div className="mb-8">
        <p className="admin-section-label mb-2">{isEdit ? "Edit" : "Create"}</p>
        <h1 className="admin-page-title">
          {isEdit ? "Edit Product" : "New Product"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          {isEdit ? "Update product details" : "Fill in the details to add a new product"}
        </p>
      </div>

      {isEdit && isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: "var(--color-blush-light)" }} />
          ))}
        </div>
      ) : isEdit && (isError || !product) ? (
        <div className="rounded-xl border p-8 text-center space-y-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-medium" style={{ color: "var(--color-text)" }}>
            Product not found
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            This ID may be invalid or the product was removed.
          </p>
          <Button asChild variant="outline">
            <Link to="/products">Back to products</Link>
          </Button>
        </div>
      ) : (
        <ProductForm product={isEdit ? product : undefined} />
      )}
    </div>
  );
}
