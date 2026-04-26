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
import { formatCurrency } from "@jwell/utils";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = import.meta.env.VITE_API_URL as string;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

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
  };

  return (
    <>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Product</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Category</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Weight</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Making</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Price</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--color-text-muted)" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y" style={{ borderColor: "var(--color-border)" }}>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--color-bg)] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium truncate max-w-[180px]" style={{ color: "var(--color-text)" }}>{p.name}</p>
                      <p className="text-xs truncate max-w-[180px]" style={{ color: "var(--color-text-muted)" }}>{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={categoryColors[p.category] ?? "outline"}>
                    {p.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "var(--color-text-mid)" }}>
                  {p.weight}g
                </td>
                <td className="px-4 py-3 text-right" style={{ color: "var(--color-text-mid)" }}>
                  {formatCurrency(p.makingCharges)}
                </td>
                <td className="px-4 py-3 text-right font-medium" style={{ color: "var(--color-gold)" }}>
                  {formatCurrency(p.calculatedPrice)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/products/${p.id}/edit`)}
                      className="h-8 w-8"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(p.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
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
