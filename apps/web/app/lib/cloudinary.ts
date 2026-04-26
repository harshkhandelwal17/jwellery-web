export function cloudinaryUrl(
  url: string,
  opts: { width?: number; quality?: number | "auto" } = {}
): string {
  if (!url.includes("res.cloudinary.com")) return url;
  const { width, quality = "auto" } = opts;
  const parts = ["f_auto", `q_${quality}`, width ? `w_${width},c_limit` : ""].filter(Boolean);
  return url.replace("/upload/", `/upload/${parts.join(",")}/`);
}
