import { z } from "zod";

export const ProductCategorySchema = z.enum([
  "rings",
  "necklaces",
  "earrings",
  "bracelets",
  "watches",
]);

export const MainCategorySchema = z.enum([
  "Diamond Jewellery",
  "Silver Jewellery",
  "Chic Everyday Jewellery",
  "Gold Jewellery",
  "Bridal Collection",
  "Unique Categories",
]).optional();

export const OccasionSchema = z.enum([
  "Everyday",
  "Festive",
  "Minimal",
  "Statement",
]).optional();

export const ProductPromoBadgeSchema = z.enum([
  "bestseller",
  "top_rated",
  "staff_pick",
  "new_arrival",
]);

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  weight: z.coerce
    .number()
    .refine((n) => Number.isFinite(n) && n > 0, { message: "Weight must be greater than 0" }),
  makingCharges: z.coerce
    .number()
    .refine((n) => Number.isFinite(n) && n >= 0, { message: "Making charges cannot be negative" }),
  image: z.preprocess(
    (v) => (v === undefined || v === null ? "" : String(v).trim()),
    z.union([z.literal(""), z.string().url("Image must be a valid URL or leave empty")])
  ),
  category: ProductCategorySchema,
  description: z.string().max(1000).default(""),
  modelPath: z.string().nullable().optional(),
  mainCategory: MainCategorySchema,
  subCategory: z.string().max(100).optional(),
  occasion: OccasionSchema,
  featuredOnHome: z.boolean().optional().default(false),
  homeSpotlightOrder: z.preprocess(
    (v) => {
      if (v === "" || v === null || v === undefined) return 999;
      const n = typeof v === "number" ? v : Number(v);
      if (!Number.isFinite(n)) return 999;
      const i = Math.floor(n);
      if (i < 1) return 999;
      return Math.min(i, 999);
    },
    z.number().int()
  ),
  promoBadge: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    ProductPromoBadgeSchema.optional()
  ),
  sku: z.preprocess(
    (v) => {
      if (v === undefined || v === null || v === "") return undefined;
      const t = String(v).trim();
      return t.length ? t : undefined;
    },
    z.string().max(64).optional()
  ),
});

export const UpdateProductSchema = CreateProductSchema.partial().extend({
  /** Send `null` from admin to clear the badge. */
  promoBadge: z.union([ProductPromoBadgeSchema, z.null()]).optional(),
});

export const UpdateGoldPriceSchema = z.object({
  pricePerGram: z.preprocess(
    (val) => {
      if (val === null || val === undefined || val === "") return undefined;
      const n = typeof val === "number" ? val : Number(val);
      return Number.isFinite(n) ? n : undefined;
    },
    z
      .number({ invalid_type_error: "Gold price must be a valid number" })
      .refine((n) => n > 0, { message: "Gold price must be greater than 0" })
  ),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

export const CreateEnquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .preprocess((v) => (v === "" || v === null || v === undefined ? undefined : v), z.string().email("Invalid email").optional()),
  message: z.string().max(1000).optional().nullable(),
  productId: z.string().optional().nullable(),
  productName: z.string().optional().nullable(),
});

export const UpdateEnquiryStatusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type UpdateGoldPriceInput = z.infer<typeof UpdateGoldPriceSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type CreateEnquiryInput = z.infer<typeof CreateEnquirySchema>;
export type UpdateEnquiryStatusInput = z.infer<typeof UpdateEnquiryStatusSchema>;

// Re-export schema types for admin
export type { z };
