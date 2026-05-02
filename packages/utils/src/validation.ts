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

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  weight: z.number().positive("Weight must be greater than 0"),
  makingCharges: z.number().min(0, "Making charges cannot be negative"),
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
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const UpdateGoldPriceSchema = z.object({
  // Coerce: JSON / form often sends "9450" as string; z.number() alone returns 400.
  pricePerGram: z.coerce
    .number()
    .refine((n) => Number.isFinite(n) && n > 0, { message: "Gold price must be a number greater than 0" }),
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
  email: z.string().email("Invalid email").optional().nullable(),
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
