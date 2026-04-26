export function formatCurrency(amount: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWeight(grams: number): string {
  return `${grams}g`;
}

export function formatGoldRate(pricePerGram: number): string {
  return `${formatCurrency(pricePerGram)}/g`;
}
