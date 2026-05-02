import { getProducts, getProduct, type GetProductsParams } from "@jwell/api-client";
import type { ProductWithPrice } from "@jwell/types";

export type { GetProductsParams };

/**
 * Server components use this. On Vercel, set one of:
 * - `JWELL_API_BASE` or `API_URL` or `NEXT_PUBLIC_API_URL`
 * Value must be the **API** origin including `/api`, e.g. `https://your-api.vercel.app/api`
 * (not the Next.js site URL — otherwise `/products` hits the wrong host and you get no data).
 */
function serverApiBase(): string {
  const raw =
    process.env.JWELL_API_BASE?.trim() ||
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:4000/api";

  let base = raw.replace(/\/$/, "");

  if (!base.endsWith("/api")) {
    console.warn(
      "[jwell] API base should end with /api (example: https://xxx.vercel.app/api). Current:",
      base
    );
  }

  return base;
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
