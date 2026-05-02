import { getProducts, getProduct } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function fetchProducts(): Promise<ProductWithPrice[]> {
  try {
    return await getProducts(API_URL);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[API] fetchProducts:", err);
    return [];
  }
}

export async function fetchProduct(id: string): Promise<ProductWithPrice | null> {
  try {
    return await getProduct(API_URL, id);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[API] fetchProduct:", id, err);
    return null;
  }
}
