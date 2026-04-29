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
