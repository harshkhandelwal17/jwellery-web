import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Loader2, Upload, X, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { toast } from "@/hooks/use-toast.js";
import { createProduct, updateProduct, getGoldPrice } from "@jwell/api-client";
import { CreateProductSchema, formatCurrency, calculatePrice } from "@jwell/utils";
import type { ProductWithPrice } from "@jwell/types";
import type { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL as string;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

// FormData type derived from Zod schema
// Using z.input to get the pre-transform shape (description is optional)
type FormData = z.input<typeof CreateProductSchema>;

interface Props {
  product?: ProductWithPrice;
}

const CATEGORIES = ["rings", "necklaces", "earrings", "bracelets", "watches"] as const;

const MAIN_CATEGORIES = [
  "Diamond Jewellery",
  "Silver Jewellery",
  "Chic Everyday Jewellery",
  "Gold Jewellery",
  "Bridal Collection",
  "Unique Categories",
] as const;

const SUBCATEGORIES: Record<string, string[]> = {
  "Diamond Jewellery": [
    "Necklaces and Chains",
    "Earrings",
    "Bracelets",
    "Rings",
    "Pendants",
  ],
  "Silver Jewellery": [
    "Necklaces and Chains",
    "Bracelets",
    "Earrings",
    "Anklets",
    "Chains",
    "Toe Rings",
    "Rings",
    "Pendants",
  ],
  "Chic Everyday Jewellery": [
    "Chains",
    "Pendants",
    "Minimal Earrings",
    "Bracelets",
    "Others",
  ],
  "Gold Jewellery": [
    "Necklaces and Chains",
    "Bracelets",
    "Earrings",
    "Chains",
    "Rings",
    "Pendants",
  ],
  "Bridal Collection": [],
  "Unique Categories": [],
};

const OCCASIONS = ["Everyday", "Festive", "Minimal", "Statement"] as const;

export default function ProductForm({ product }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!product;
  const [imagePreview, setImagePreview] = useState<string>(product?.image ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: goldPrice } = useQuery({
    queryKey: ["gold-price"],
    queryFn: () => getGoldPrice(API_URL),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          weight: product.weight,
          makingCharges: product.makingCharges,
          image: product.image,
          category: product.category,
          description: product.description,
          modelPath: product.modelPath ?? undefined,
          mainCategory: product.mainCategory,
          subCategory: product.subCategory,
          occasion: product.occasion,
        }
      : undefined,
  });

  const weight = watch("weight") ?? 0;
  const makingCharges = watch("makingCharges") ?? 0;
  const goldRate = goldPrice?.pricePerGram ?? 0;
  const livePrice = calculatePrice(goldRate, Number(weight), Number(makingCharges));
  const mainCategoryValue = watch("mainCategory");
  const availableSubCategories: string[] = mainCategoryValue ? SUBCATEGORIES[mainCategoryValue] ?? [] : [];

  async function handleImageUpload(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: { "x-admin-key": ADMIN_KEY },
        body: formData,
      });
      const json = (await res.json()) as { success: boolean; url: string };
      if (!json.success) throw new Error("Upload failed");
      setValue("image", json.url);
      setImagePreview(json.url);
    } catch {
      toast({ variant: "destructive", title: "Image upload failed" });
    } finally {
      setUploadingImage(false);
    }
  }

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const payload: any = { description: "", ...data };
      return isEdit
        ? updateProduct(API_URL, product!.id, payload, ADMIN_KEY)
        : createProduct(API_URL, payload, ADMIN_KEY);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: isEdit ? "Product updated" : "Product created" });
      navigate("/products");
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: isEdit ? "Update failed" : "Create failed",
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display2 text-base">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="e.g. Radiant Solitaire Ring" {...register("name")} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="weight">Weight (grams)</Label>
                  <Input id="weight" type="number" step="0.1" placeholder="e.g. 4.2" {...register("weight", { valueAsNumber: true })} />
                  {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="makingCharges">Making Charges (₹)</Label>
                  <Input id="makingCharges" type="number" step="1" placeholder="e.g. 3500" {...register("makingCharges", { valueAsNumber: true })} />
                  {errors.makingCharges && <p className="text-xs text-red-500 mt-1">{errors.makingCharges.message}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Category</Label>
                <Select
                  defaultValue={product?.category}
                  onValueChange={(v) => setValue("category", v as FormData["category"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Main Category (Optional)</Label>
                <Select
                  value={mainCategoryValue ?? "__none__"}
                  onValueChange={(v) => {
                    setValue("mainCategory", v === "__none__" ? undefined : v as FormData["mainCategory"]);
                    setValue("subCategory", undefined);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a main category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {MAIN_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {mainCategoryValue && availableSubCategories.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <Label>Sub Category (Optional)</Label>
                  <Select
                    value={watch("subCategory") ?? "__none__"}
                    onValueChange={(v) => setValue("subCategory", v === "__none__" ? undefined : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None</SelectItem>
                      {availableSubCategories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label>Occasion (Optional)</Label>
                <Select
                  value={watch("occasion") ?? "__none__"}
                  onValueChange={(v) => setValue("occasion", v === "__none__" ? undefined : v as FormData["occasion"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {OCCASIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe the product…"
                  className="flex w-full rounded-xl border bg-[var(--color-bg)] px-3 py-2.5 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 transition-colors"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                    "--tw-ring-color": "var(--color-blush)",
                  } as React.CSSProperties}
                  {...register("description")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display2 text-base">Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              <input type="hidden" {...register("image")} />
              {imagePreview ? (
                <div className="relative inline-block group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-44 w-44 rounded-xl object-cover border border-[var(--color-border)]"
                  />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); setValue("image", ""); }}
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-44 w-44 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 hover:bg-[var(--color-blush-light)] hover:border-[var(--color-blush)]" style={{ borderColor: "var(--color-border)" }}>
                  {uploadingImage ? (
                    <Loader2 size={24} className="animate-spin" style={{ color: "var(--color-blush)" }} />
                  ) : (
                    <>
                      <Upload size={24} style={{ color: "var(--color-text-muted)" }} />
                      <span className="text-xs mt-2 font-medium" style={{ color: "var(--color-text-muted)" }}>Upload image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </label>
              )}
              {errors.image && <p className="text-xs text-red-500 mt-2">{errors.image.message}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center border border-[var(--color-border)]" style={{ background: "#fef9ee" }}>
                  <Coins size={18} style={{ color: "var(--color-gold)" }} strokeWidth={1.8} />
                </div>
                <CardTitle className="font-display2 text-base">Live Price Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Gold rate</span>
                <span style={{ color: "var(--color-text-mid)" }}>{formatCurrency(goldRate)}/g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Weight × rate</span>
                <span style={{ color: "var(--color-text-mid)" }}>{formatCurrency(goldRate * Number(weight))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Making charges</span>
                <span style={{ color: "var(--color-text-mid)" }}>{formatCurrency(Number(makingCharges))}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center" style={{ borderColor: "var(--color-border)" }}>
                <span className="font-medium text-sm" style={{ color: "var(--color-text)" }}>Final Price</span>
                <span className="text-xl font-semibold font-display2" style={{ color: "var(--color-gold)" }}>
                  {formatCurrency(livePrice)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={mutation.isPending} className="h-11">
              {mutation.isPending && <Loader2 size={16} className="animate-spin" />}
              {isEdit ? "Save Changes" : "Create Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/products")} className="h-11">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
