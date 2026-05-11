export interface GoldPrice {
  id: string;
  goldPricePerGram: number;
  silverPricePerGram: number;
  diamondPricePerGram: number;
  /** Legacy alias kept for backward compatibility with existing UI. */
  pricePerGram: number;
  updatedAt: string;
}

export interface UpdateGoldPriceInput {
  goldPricePerGram?: number;
  silverPricePerGram?: number;
  diamondPricePerGram?: number;
  /** Legacy input alias for gold. */
  pricePerGram?: number;
}
