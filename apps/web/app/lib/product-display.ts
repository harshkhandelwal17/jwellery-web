import type { ProductWithPrice } from "@jwell/types";

/**
 * Homepage “Featured / Loved This Season”: admin-flagged first (by spotlight order),
 * then fill remaining slots with newest products so the strip is never empty when DB has stock.
 */
export function pickHomeSpotlight(products: ProductWithPrice[], max = 4): ProductWithPrice[] {
  const featured = products
    .filter((p) => p.featuredOnHome === true)
    .sort((a, b) => {
      const ao = a.homeSpotlightOrder ?? 999;
      const bo = b.homeSpotlightOrder ?? 999;
      if (ao !== bo) return ao - bo;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const ids = new Set(featured.map((p) => p.id));
  const rest = products
    .filter((p) => !ids.has(p.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const out = [...featured];
  for (const p of rest) {
    if (out.length >= max) break;
    out.push(p);
  }
  return out.slice(0, max);
}
