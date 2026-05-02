import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Badge } from "@/components/ui/badge.js";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog.js";
import { toast } from "@/hooks/use-toast.js";
import { deleteProduct } from "@jwell/api-client";
import { formatCurrency, normalizeImageUrl } from "@jwell/utils";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

const NO_IMG = "https://picsum.photos/seed/jwell-admin-thumb/400/300";

interface Props {
  products: ProductWithPrice[];
}

export default function ProductTable({ products }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(API_URL, id, ADMIN_KEY),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteId(null);
      toast({ title: "Product deleted" });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    },
  });

  const categoryColors: Record<string, "default" | "gold" | "outline"> = {
    rings: "default",
    necklaces: "gold",
    earrings: "outline",
    bracelets: "outline",
    watches: "outline",
  };

  return (
    <>
      {/* Card-based product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(13,10,34,0.10)] hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-warm)]">
              <img
                src={p.image?.trim() ? normalizeImageUrl(p.image) : NO_IMG}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.currentTarget.src = "/fallback.jpg";
                }}
              />
              {/* Category badge — top-left */}
              <div className="absolute top-3 left-3">
                <Badge variant={categoryColors[p.category] ?? "outline"}>
                  {p.category}
                </Badge>
              </div>
              {/* Actions — top-right, visible on hover */}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/products/${p.id}/edit`)}
                  className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(p.id)}
                  className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <div>
                <h3 className="font-medium text-sm truncate" style={{ color: "var(--color-text)" }}>
                  {p.name}
                </h3>
                <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {p.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {p.weight}g · {formatCurrency(p.makingCharges)}
                </div>
                <div className="text-sm font-semibold font-display2" style={{ color: "var(--color-gold)" }}>
                  {formatCurrency(p.calculatedPrice)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display2">Delete product?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The product will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
