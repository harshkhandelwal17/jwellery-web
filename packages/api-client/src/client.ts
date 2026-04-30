import type { ApiResponse, ApiError } from "@jwell/types";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  const json = (await res.json()) as ApiResponse<T> | ApiError;

  if (!res.ok || !json.success) {
    throw new Error((json as ApiError).error ?? `HTTP ${res.status}`);
  }

  return (json as ApiResponse<T>).data;
}
