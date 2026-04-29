export function normalizeImageUrl(url: string): string {
  if (!url) return url;
  // Fix path duplication
  let fixed = url.replace(/jwell\/products\/jwell\/products/g, "jwell/products");
  // Force HTTPS
  fixed = fixed.replace(/^http:\/\//, "https://");
  return fixed;
}
