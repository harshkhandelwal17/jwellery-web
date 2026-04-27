import { getProducts, getProduct } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = process.env.API_URL!;

export async function fetchProducts(): Promise<ProductWithPrice[]> {
  try {
    return await getProducts(API_URL);
  } catch {
    return [];
  }
}

export async function fetchProduct(id: string): Promise<ProductWithPrice | null> {
  try {
    return await getProduct(API_URL, id);
  } catch {
    return null;
  }
}
