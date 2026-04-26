import { getProducts, getProduct } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

const API_URL = process.env.API_URL!;

export async function fetchProducts(): Promise<ProductWithPrice[]> {
  return getProducts(API_URL);
}

export async function fetchProduct(id: string): Promise<ProductWithPrice> {
  return getProduct(API_URL, id);
}
