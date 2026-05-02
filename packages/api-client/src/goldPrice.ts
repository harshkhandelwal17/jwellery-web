import type { GoldPrice, UpdateGoldPriceInput } from "@jwell/types";
import { apiFetch } from "./client";

export async function getGoldPrice(baseUrl: string): Promise<GoldPrice> {
  return apiFetch<GoldPrice>(`${baseUrl}/gold-price`, { cache: "no-store" });
}

export async function updateGoldPrice(
  baseUrl: string,
  data: UpdateGoldPriceInput,
  adminKey: string
): Promise<GoldPrice> {
  return apiFetch<GoldPrice>(`${baseUrl}/gold-price`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "x-admin-key": adminKey },
  });
}
