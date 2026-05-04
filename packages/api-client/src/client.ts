import type { ApiResponse, ApiError } from "@jwell/types";

type JsonBody = ApiResponse<unknown> | ApiError | { success: false; errors?: { message?: string; path?: (string | number)[] }[] };

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const { headers: optionHeaders, ...rest } = options ?? {};
  const headers = new Headers();
  const body = rest.body;
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }
  if (optionHeaders) {
    new Headers(optionHeaders as HeadersInit).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const res = await fetch(url, {
    // Cross-origin public APIs should not send cookies by default.
    // This avoids intermittent 403/CORS issues from stale third-party cookies.
    credentials: rest.credentials ?? "omit",
    ...rest,
    headers,
  });

  const text = await res.text();
  const ct = res.headers.get("content-type") ?? "";
  let json: JsonBody | Record<string, unknown> = {};

  if (text) {
    if (ct.includes("application/json")) {
      try {
        json = JSON.parse(text) as JsonBody;
      } catch {
        throw new Error(`Invalid JSON response (HTTP ${res.status})`);
      }
    } else if (!res.ok) {
      throw new Error(text.slice(0, 240) || `HTTP ${res.status}`);
    }
  }

  if (!res.ok || typeof json !== "object" || json === null || !("success" in json) || !json.success) {
    const withIssues = json as { error?: string; errors?: { message?: string; path?: (string | number)[] }[] };
    const fromZod = withIssues.errors?.map((e) => e.message ?? String(e.path?.[0] ?? "field")).filter(Boolean);
    const msg =
      withIssues.error ?? (fromZod && fromZod.length > 0 ? fromZod.join("; ") : null) ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return (json as ApiResponse<T>).data as T;
}
