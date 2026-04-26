import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductForm from "@/components/products/ProductForm.js";
import { getProduct } from "@jwell/api-client";

const API_URL = import.meta.env.VITE_API_URL as string;

export default function ProductFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(API_URL, id!),
    enabled: isEdit,
  });

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          {isEdit ? "Edit Product" : "New Product"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          {isEdit ? "Update product details" : "Fill in the details to add a new product"}
        </p>
      </div>

      {isEdit && isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: "var(--color-blush-light)" }} />
          ))}
        </div>
      ) : (
        <ProductForm product={isEdit ? product : undefined} />
      )}
    </div>
  );
}
