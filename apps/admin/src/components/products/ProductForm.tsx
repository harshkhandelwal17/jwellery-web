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
import { CreateProductSchema, formatCurrency, calculatePrice, normalizeImageUrl } from "@jwell/utils";
import type { CreateProductInput, ProductPromoBadge, ProductWithPrice, UpdateProductInput } from "@jwell/types";
import { PRODUCT_PROMO_BADGE_LABELS } from "@jwell/types";
import type { z } from "zod";
import { ADMIN_API_URL, ADMIN_API_KEY } from "@/lib/api-config.js";

const API_URL = ADMIN_API_URL;
const ADMIN_KEY = ADMIN_API_KEY ?? "";

// FormData type derived from Zod schema
// Using z.input to get the pre-transform shape (description is optional)
type FormData = z.input<typeof CreateProductSchema>;

interface Props {
  product?: ProductWithPrice;
}

const CATEGORIES = ["rings", "necklaces", "earrings", "bracelets", "watches"] as const;

const MAIN_CATEGORIES = [
  // ── Primary 3 shown prominently ──
  "Gold Jewellery",
  "Silver Jewellery",
  "Diamond Jewellery",
  // ── Other collections ──
  "Chic Everyday Jewellery",
  "Bridal Collection",
  "Unique Categories",
] as const;

/** Auto-assign legacy `category` field from mainCategory so admin doesn't need to pick it manually. */
function autoCategory(mc: string | undefined): "rings" | "necklaces" | "earrings" | "bracelets" | "watches" {
  if (mc === "Silver Jewellery") return "rings"; // neutral fallback; category field is legacy
  if (mc === "Diamond Jewellery") return "rings";
  return "rings";
}

const MAIN_CATEGORY_LABELS: Record<string, string> = {
  "Gold Jewellery":        "Gold Jewellery (22KT)",
  "Silver Jewellery":      "Silver Jewellery (925)",
  "Diamond Jewellery":     "Lab Grown Diamond",
  "Chic Everyday Jewellery": "Chic Everyday",
  "Bridal Collection":     "Bridal Collection",
  "Unique Categories":     "Unique Categories",
};

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
  const [imagePreview, setImagePreview] = useState<string>(product?.image ? normalizeImageUrl(product.image) : "");
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
          featuredOnHome: product.featuredOnHome ?? false,
          homeSpotlightOrder: product.homeSpotlightOrder ?? 999,
          promoBadge: product.promoBadge,
          sku: product.sku ?? "",
        }
      : {
          name: "",
          weight: 1,
          makingCharges: 0,
          image: "",
          category: "rings",
          description: "",
          modelPath: undefined,
          mainCategory: undefined,
          subCategory: undefined,
          occasion: undefined,
          featuredOnHome: false,
          homeSpotlightOrder: 999,
          promoBadge: undefined,
          sku: "",
        },
  });

  const weight = watch("weight") ?? 0;
  const makingCharges = watch("makingCharges") ?? 0;
  const goldRate = goldPrice?.pricePerGram ?? 0;
  const livePrice = calculatePrice(goldRate, Number(weight), Number(makingCharges));
  const mainCategoryValue = watch("mainCategory");
  const availableSubCategories: string[] = mainCategoryValue ? SUBCATEGORIES[mainCategoryValue] ?? [] : [];

  // Auto-sync legacy category whenever mainCategory changes
  function handleMainCategoryChange(v: string) {
    const mc = v === "__none__" ? undefined : v as FormData["mainCategory"];
    setValue("mainCategory", mc);
    setValue("subCategory", undefined);
    if (mc) setValue("category", autoCategory(mc));
  }

  async function handleImageUpload(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/products/upload`, {
        method: "POST",
        body: formData,
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        url?: string;
        error?: string;
        message?: string;
      };
      if (!res.ok || !json.success || !json.url) {
        const msg = json.error ?? json.message ?? `HTTP ${res.status}`;
        toast({
          variant: "destructive",
          title: "Image upload failed",
          description: msg.includes("Cloudinary") || res.status === 500
            ? "Add Cloudinary env on the API, or save without an image for now."
            : msg,
        });
        return;
      }
      const normalizedUrl = normalizeImageUrl(json.url);
      setValue("image", normalizedUrl);
      setImagePreview(normalizedUrl);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Image upload failed",
        description: e instanceof Error ? e.message : "Network error",
      });
    } finally {
      setUploadingImage(false);
    }
  }

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const payload: Record<string, unknown> = { description: "", ...data };
      const badge = payload["promoBadge"];
      if (badge === undefined || badge === "" || badge === null) {
        if (isEdit) payload["promoBadge"] = null;
        else delete payload["promoBadge"];
      }
      return isEdit
        ? updateProduct(API_URL, product!.id, payload as unknown as UpdateProductInput, ADMIN_KEY)
        : createProduct(API_URL, payload as unknown as CreateProductInput, ADMIN_KEY);
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

              {/* ── Main Category (primary) ── */}
              <div className="flex flex-col gap-1.5">
                <Label>Category <span className="text-[0.65rem] text-muted-foreground ml-1">(required)</span></Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Gold Jewellery", "Silver Jewellery", "Diamond Jewellery"] as const).map((mc) => {
                    const isActive = mainCategoryValue === mc;
                    const labels: Record<string, { short: string; sub: string; color: string }> = {
                      "Gold Jewellery":    { short: "Gold",   sub: "22KT",  color: "#d4af37" },
                      "Silver Jewellery":  { short: "Silver", sub: "925",   color: "#b0b8c8" },
                      "Diamond Jewellery": { short: "Lab Diamond", sub: "IGI", color: "#a8d8f0" },
                    };
                    const meta = labels[mc];
                    return (
                      <button
                        key={mc}
                        type="button"
                        onClick={() => handleMainCategoryChange(mc)}
                        className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-3 px-2 text-center transition-all"
                        style={isActive
                          ? { borderColor: meta.color, background: `${meta.color}18`, color: meta.color }
                          : { borderColor: "var(--color-border)", background: "transparent", color: "var(--color-text-muted)" }
                        }
                      >
                        <span className="text-xs font-semibold tracking-wide">{meta.short}</span>
                        <span className="text-[0.55rem] font-bold tracking-widest uppercase opacity-70">{meta.sub}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Other categories dropdown */}
                <Select
                  value={MAIN_CATEGORIES.slice(3).includes(mainCategoryValue as never) ? mainCategoryValue ?? "__none__" : "__none__"}
                  onValueChange={(v) => {
                    // Only fire when user picks an actual "other" category — not the placeholder
                    if (v !== "__none__") handleMainCategoryChange(v);
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Or choose another collection…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Other collections…</SelectItem>
                    {MAIN_CATEGORIES.slice(3).map((c) => (
                      <SelectItem key={c} value={c}>
                        {MAIN_CATEGORY_LABELS[c] ?? c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="sku">SKU / item code (optional)</Label>
                <Input id="sku" placeholder="e.g. SHR-RING-001" {...register("sku")} />
                {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display2 text-base">Homepage &amp; labels</CardTitle>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                Control the “Featured / Loved This Season” block on the main site. Lower order = shown first among highlighted pieces.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-[var(--color-border)]"
                  {...register("featuredOnHome")}
                />
                <div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>Feature on homepage</span>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    When checked, this piece is prioritised in the featured grid (order below). Others fill remaining slots by newest.
                  </p>
                </div>
              </label>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="homeSpotlightOrder">Homepage order (1 = first)</Label>
                <Input
                  id="homeSpotlightOrder"
                  type="number"
                  min={1}
                  max={999}
                  placeholder="999 = default / last among featured"
                  {...register("homeSpotlightOrder", { valueAsNumber: true })}
                />
                {errors.homeSpotlightOrder && (
                  <p className="text-xs text-red-500 mt-1">{errors.homeSpotlightOrder.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Customer-facing badge</Label>
                <Select
                  value={(watch("promoBadge") as ProductPromoBadge | undefined) ?? "__none__"}
                  onValueChange={(v) =>
                    setValue("promoBadge", v === "__none__" ? undefined : (v as ProductPromoBadge))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="No badge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {(Object.keys(PRODUCT_PROMO_BADGE_LABELS) as ProductPromoBadge[]).map((key) => (
                      <SelectItem key={key} value={key}>
                        {PRODUCT_PROMO_BADGE_LABELS[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.promoBadge && (
                  <p className="text-xs text-red-500 mt-1">{errors.promoBadge.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display2 text-base">Product image (optional)</CardTitle>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                Save without uploading — add Cloudinary keys on the API later for uploads.
              </p>
            </CardHeader>
            <CardContent>
              <input type="hidden" {...register("image")} />
              {imagePreview ? (
                <div className="relative inline-block group">
                  <img
                    src={normalizeImageUrl(imagePreview)}
                    alt="Preview"
                    className="h-44 w-44 rounded-xl object-cover border border-[var(--color-border)]"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback.jpg";
                    }}
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
