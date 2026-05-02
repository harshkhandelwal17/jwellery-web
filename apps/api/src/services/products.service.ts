import { calculatePrice } from "@jwell/utils";
import { ProductModel } from "../models/Product.model.js";
import { GoldPriceModel } from "../models/GoldPrice.model.js";
import type { ProductPromoBadge, ProductWithPrice } from "@jwell/types";

export interface GetProductsOptions {
  sort?:
    | "price_desc"
    | "price_asc"
    | "weight_desc"
    | "weight_asc"
    | "newest"
    | "oldest"
    | "name_asc"
    | "name_desc";
  occasion?: string;
  mainCategory?: string;
  subCategory?: string;
  /** Legacy catalogue slug: rings, necklaces, … */
  category?: string;
  /** Case-insensitive match on name or description */
  search?: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  const sku = typeof p.sku === "string" && p.sku.trim() ? p.sku.trim() : undefined;
  const promo = p.promoBadge as ProductPromoBadge | null | undefined;
  const order =
    typeof p.homeSpotlightOrder === "number" && Number.isFinite(p.homeSpotlightOrder)
      ? p.homeSpotlightOrder
      : 999;

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
    featuredOnHome:  p.featuredOnHome === true,
    homeSpotlightOrder: order,
    promoBadge:      promo ?? undefined,
    sku,
  };
}

// Reverse map: mainCategory → old category values that default to it
const MAIN_CATEGORY_TO_OLD: Record<string, string[]> = {
  "Gold Jewellery":    ["rings", "necklaces", "earrings", "bracelets"],
  "Unique Categories": ["watches"],
};

function buildMongoQuery(options?: GetProductsOptions): Record<string, unknown> {
  const andConditions: Record<string, unknown>[] = [];

  if (options?.occasion) {
    andConditions.push({ occasion: options.occasion });
  }
  if (options?.mainCategory) {
    const oldCategories = MAIN_CATEGORY_TO_OLD[options.mainCategory];
    if (oldCategories) {
      andConditions.push({
        $or: [
          { mainCategory: options.mainCategory },
          { mainCategory: { $exists: false }, category: { $in: oldCategories } },
          { mainCategory: null, category: { $in: oldCategories } },
        ],
      });
    } else {
      andConditions.push({ mainCategory: options.mainCategory });
    }
  }
  if (options?.subCategory) {
    andConditions.push({ subCategory: options.subCategory });
  }
  if (options?.category) {
    andConditions.push({ category: options.category });
  }
  const q = options?.search?.trim();
  if (q) {
    const safe = escapeRegex(q);
    andConditions.push({
      $or: [
        { name: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { sku: { $regex: safe, $options: "i" } },
      ],
    });
  }

  return andConditions.length > 0 ? { $and: andConditions } : {};
}

export async function getProducts(options?: GetProductsOptions): Promise<ProductWithPrice[]> {
  const query = buildMongoQuery(options);

  const [products, goldDoc] = await Promise.all([
    ProductModel.find(query).lean(),
    GoldPriceModel.findOne().lean(),
  ]);
  const goldRate = goldDoc?.pricePerGram ?? 0;

  let result = products.map((p) => toProductWithPrice(p, goldRate));

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
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name_asc":
          return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
        case "name_desc":
          return b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
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

export async function createProduct(data: Record<string, unknown>): Promise<ProductWithPrice> {
  const image = typeof data["image"] === "string" ? data["image"].trim() : "";
  const product = await ProductModel.create({ ...data, image });
  const goldDoc = await GoldPriceModel.findOne().lean();
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return toProductWithPrice(product.toObject(), goldRate);
}

export async function updateProduct(
  id: string,
  data: Record<string, unknown>
): Promise<ProductWithPrice | null> {
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
