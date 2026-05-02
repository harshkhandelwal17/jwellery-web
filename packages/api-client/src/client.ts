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

  const json = (await res.json()) as ApiResponse<T> | ApiError | { success: false; errors?: { message?: string }[] };

  if (!res.ok || !("success" in json) || !json.success) {
    const withIssues = json as { error?: string; errors?: { message?: string; path?: (string | number)[] }[] };
    const fromZod = withIssues.errors?.map((e) => e.message ?? String(e.path?.[0] ?? "field")).filter(Boolean);
    const msg = withIssues.error ?? (fromZod && fromZod.length > 0 ? fromZod.join("; ") : null) ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return (json as ApiResponse<T>).data;
}
