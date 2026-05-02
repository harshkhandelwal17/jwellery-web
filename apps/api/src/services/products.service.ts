import { calculatePrice } from "@jwell/utils";
import { ProductModel } from "../models/Product.model.js";
import { GoldPriceModel } from "../models/GoldPrice.model.js";
import type { ProductWithPrice } from "@jwell/types";

export interface GetProductsOptions {
  sort?: "price_desc" | "price_asc" | "weight_desc" | "weight_asc";
  occasion?: string;
  mainCategory?: string;
  subCategory?: string;
}

// Map old category to new mainCategory for backward compatibility
export function mapOldCategoryToMainCategory(
  oldCategory: string
): string | undefined {
  const mapping: Record<string, string> = {
    rings: "Gold Jewellery",
    necklaces: "Gold Jewellery",
    earrings: "Gold Jewellery",
    bracelets: "Gold Jewellery",
    watches: "Unique Categories",
  };
  return mapping[oldCategory];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProductWithPrice(p: any, goldRate: number): ProductWithPrice {
  return {
    id:              String(p._id),
    name:            p.name as string,
    weight:          p.weight as number,
    makingCharges:   p.makingCharges as number,
    image:           p.image as string,
    category:        p.category as ProductWithPrice["category"],
    description:     p.description as string,
    modelPath:       (p.modelPath as string | null) ?? null,
    createdAt:       p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt),
    updatedAt:       p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt),
    calculatedPrice: calculatePrice(goldRate, p.weight as number, p.makingCharges as number),
    goldPriceUsed:   goldRate,
    mainCategory:    p.mainCategory ?? mapOldCategoryToMainCategory(p.category as string),
    subCategory:     p.subCategory ?? undefined,
    occasion:        p.occasion ?? undefined,
  };
}

// Reverse map: mainCategory → old category values that default to it
const MAIN_CATEGORY_TO_OLD: Record<string, string[]> = {
  "Gold Jewellery":    ["rings", "necklaces", "earrings", "bracelets"],
  "Unique Categories": ["watches"],
};

export async function getProducts(options?: GetProductsOptions): Promise<ProductWithPrice[]> {
  const query: Record<string, unknown> = {};

  // Apply filters
  if (options?.occasion) {
    query.occasion = options.occasion;
  }
  if (options?.mainCategory) {
    const oldCategories = MAIN_CATEGORY_TO_OLD[options.mainCategory];
    if (oldCategories) {
      // Include products with the explicit mainCategory OR old products
      // that don't have mainCategory set but whose category maps to it
      query.$or = [
        { mainCategory: options.mainCategory },
        { mainCategory: { $exists: false }, category: { $in: oldCategories } },
        { mainCategory: null, category: { $in: oldCategories } },
      ];
    } else {
      query.mainCategory = options.mainCategory;
    }
  }
  if (options?.subCategory) {
    query.subCategory = options.subCategory;
  }

  const [products, goldDoc] = await Promise.all([
    ProductModel.find(query).lean(),
    GoldPriceModel.findOne().lean(),
  ]);
  const goldRate = goldDoc?.pricePerGram ?? 0;

  let result = products.map((p) => toProductWithPrice(p, goldRate));

  // Apply sorting
  if (options?.sort) {
    result = result.sort((a, b) => {
      switch (options.sort) {
        case "price_desc":
          return b.calculatedPrice - a.calculatedPrice;
        case "price_asc":
          return a.calculatedPrice - b.calculatedPrice;
        case "weight_desc":
          return b.weight - a.weight;
        case "weight_asc":
          return a.weight - b.weight;
        default:
          return 0;
      }
    });
  }

  return result;
}

export async function getProduct(id: string): Promise<ProductWithPrice | null> {
  const [product, goldDoc] = await Promise.all([
    ProductModel.findById(id).lean(),
    GoldPriceModel.findOne().lean(),
  ]);
  if (!product) return null;
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return toProductWithPrice(product, goldRate);
}

export async function createProduct(data: {
  name: string; weight: number; makingCharges: number;
  image?: string; category: string; description?: string; modelPath?: string | null;
}): Promise<ProductWithPrice> {
  const product = await ProductModel.create({ ...data, image: data.image?.trim() ?? "" });
  const goldDoc = await GoldPriceModel.findOne().lean();
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return toProductWithPrice(product.toObject(), goldRate);
}

export async function updateProduct(id: string, data: Partial<{
  name: string; weight: number; makingCharges: number;
  image: string; category: string; description: string; modelPath: string | null;
}>): Promise<ProductWithPrice | null> {
  const product = await ProductModel.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!product) return null;
  const goldDoc = await GoldPriceModel.findOne().lean();
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return toProductWithPrice(product, goldRate);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await ProductModel.findByIdAndDelete(id);
  return result !== null;
}
