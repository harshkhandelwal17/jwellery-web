import { getProducts, getProduct } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function fetchProducts(): Promise<ProductWithPrice[]> {
  try {
    const products = await getProducts(API_URL);
    console.log("[API] Products loaded:", products.length, "items");
    return products;
  } catch (err) {
    console.error("[API] Failed to load products:", err);
    return [];
  }
}

export async function fetchProduct(id: string): Promise<ProductWithPrice | null> {
  try {
    const product = await getProduct(API_URL, id);
    console.log("[API] Product loaded:", product?.name, product?.image);
    return product;
  } catch (err) {
    console.error("[API] Failed to load product:", id, err);
    return null;
  }
}
