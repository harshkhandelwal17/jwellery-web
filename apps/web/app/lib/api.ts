import { getProducts, getProduct, type GetProductsParams } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

export type { GetProductsParams };

/**
 * Server components use this. On Vercel, `API_URL` is often unset while
 * `NEXT_PUBLIC_API_URL` is set for the browser — without a fallback the server
 * defaulted to localhost and returned no products (empty home + catalogue).
 */
function serverApiBase(): string {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:4000/api";
  return raw.replace(/\/$/, "");
}

export async function fetchProducts(params?: GetProductsParams): Promise<ProductWithPrice[]> {
  const base = serverApiBase();
  try {
    return await getProducts(base, params);
  } catch (err) {
    console.error("[jwell] fetchProducts failed", { base, params, err });
    return [];
  }
}

export async function fetchProduct(id: string): Promise<ProductWithPrice | null> {
  const base = serverApiBase();
  try {
    return await getProduct(base, id);
  } catch (err) {
    console.error("[jwell] fetchProduct failed", { base, id, err });
    return null;
  }
}
