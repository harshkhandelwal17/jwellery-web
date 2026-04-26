import type {
  Product,
  ProductWithPrice,
  CreateProductInput,
  UpdateProductInput,
} from "@jwell/types";
import { apiFetch } from "./client";

export async function getProducts(baseUrl: string): Promise<ProductWithPrice[]> {
  return apiFetch<ProductWithPrice[]>(`${baseUrl}/products`);
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
): Promise<Product> {
  return apiFetch<Product>(`${baseUrl}/products`, {
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
): Promise<Product> {
  return apiFetch<Product>(`${baseUrl}/products/${id}`, {
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
