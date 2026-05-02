/** Local asset — avoids 403 from remote placeholders through `/_next/image`. */
export const PRODUCT_IMAGE_FALLBACK = "/placeholder-jewelry.svg";

/**
 * When `false`, Next.js serves the file via `/_next/image` (remote hosts must be in `remotePatterns`).
 * Many CDNs / signed URLs block that fetcher → **403** in the browser.
 * Rule: optimize only same-site `/…` paths; skip optimizer for every `http(s)://` URL.
 */
export function imageSrcNeedsUnoptimized(src: string): boolean {
  const s = src.trim();
  if (s.endsWith(".svg")) return true;
  if (s.startsWith("/") && !s.startsWith("//")) return false;
  if (/^https?:\/\//i.test(s)) return true;
  return true;
}

export function productImageUrl(
  url: string | undefined,
  opts: { width?: number; quality?: number | "auto" } = {}
): string {
  const t = url?.trim();
  if (!t) return PRODUCT_IMAGE_FALLBACK;
  return cloudinaryUrl(normalizeImageUrl(t), opts);
}

export function normalizeImageUrl(url: string): string {
  if (!url) return url;
  // Fix path duplication
  let fixed = url.replace(/jwell\/products\/jwell\/products/g, "jwell/products");
  // Force HTTPS
  fixed = fixed.replace(/^http:\/\//, "https://");
  return fixed;
}

export function cloudinaryUrl(
  url: string,
  opts: { width?: number; quality?: number | "auto" } = {}
): string {
  const normalized = normalizeImageUrl(url);
  if (!normalized.includes("res.cloudinary.com")) return normalized;
  const { width, quality = "auto" } = opts;
  const parts = ["f_auto", `q_${quality}`, width ? `w_${width},c_limit` : ""].filter(Boolean);
  // Only add transformations if they aren't already present
  if (normalized.includes("/upload/f_auto")) return normalized;
  return normalized.replace("/upload/", `/upload/${parts.join(",")}/`);
}
