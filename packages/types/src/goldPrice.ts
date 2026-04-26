export interface GoldPrice {
  id: string;
  pricePerGram: number;
  updatedAt: string;
}

export interface UpdateGoldPriceInput {
  pricePerGram: number;
}
