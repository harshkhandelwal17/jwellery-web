import type { ProductWithPrice, CreateProductInput, UpdateProductInput } from "@jwell/types";
import { apiFetch } from "./client";

export interface GetProductsParams {
  sort?: "price_asc" | "price_desc" | "weight_asc" | "weight_desc";
  mainCategory?: string;
  subCategory?: string;
  occasion?: string;
}

export async function getProducts(
  baseUrl: string,
  params?: GetProductsParams
): Promise<ProductWithPrice[]> {
  const searchParams = new URLSearchParams();
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.mainCategory) searchParams.set("mainCategory", params.mainCategory);
  if (params?.subCategory) searchParams.set("subCategory", params.subCategory);
  if (params?.occasion) searchParams.set("occasion", params.occasion);
  const query = searchParams.toString();
  return apiFetch<ProductWithPrice[]>(
    `${baseUrl}/products${query ? `?${query}` : ""}`
  );
}

export async function getProduct(
  baseUrl: string,
  id: string
): Promise<ProductWithPrice> {
  return apiFetch<ProductWithPrice>(`${baseUrl}/products/${id}`);
}

export async function createProduct(
  baseUrl: string,
  data: CreateProductInput,
  adminKey: string
): Promise<ProductWithPrice> {
  return apiFetch<ProductWithPrice>(`${baseUrl}/products`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "x-admin-key": adminKey },
  });
}

export async function updateProduct(
  baseUrl: string,
  id: string,
  data: UpdateProductInput,
  adminKey: string
): Promise<ProductWithPrice> {
  return apiFetch<ProductWithPrice>(`${baseUrl}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "x-admin-key": adminKey },
  });
}

export async function deleteProduct(
  baseUrl: string,
  id: string,
  adminKey: string
): Promise<void> {
  await apiFetch<void>(`${baseUrl}/products/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
}
