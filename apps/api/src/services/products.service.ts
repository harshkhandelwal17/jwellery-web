import { calculatePrice } from "@jwell/utils";
import { ProductModel } from "../models/Product.model.js";
import { GoldPriceModel } from "../models/GoldPrice.model.js";
import type { ProductWithPrice } from "@jwell/types";

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
  };
}

export async function getProducts(): Promise<ProductWithPrice[]> {
  const [products, goldDoc] = await Promise.all([
    ProductModel.find().lean(),
    GoldPriceModel.findOne().lean(),
  ]);
  const goldRate = goldDoc?.pricePerGram ?? 0;
  return products.map((p) => toProductWithPrice(p, goldRate));
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
  image: string; category: string; description?: string; modelPath?: string | null;
}): Promise<ProductWithPrice> {
  const product = await ProductModel.create(data);
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
