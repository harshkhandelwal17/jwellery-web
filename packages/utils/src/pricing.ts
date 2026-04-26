/**
 * THE canonical price formula — single source of truth.
 * Used by: backend products.service.ts (authoritative)
 *          admin ProductForm.tsx (live preview only)
 */
export function calculatePrice(
  pricePerGram: number,
  weightInGrams: number,
  makingCharges: number
): number {
  return pricePerGram * weightInGrams + makingCharges;
}
