import { Schema, model } from "mongoose";

interface IGoldPrice {
  pricePerGram: number;
  goldPricePerGram: number;
  silverPricePerGram: number;
  diamondPricePerGram: number;
  updatedAt: Date;
}

const GoldPriceSchema = new Schema<IGoldPrice>({
  // Legacy field retained for compatibility; mirrors goldPricePerGram.
  pricePerGram: { type: Number, required: true, min: 0, default: 0 },
  goldPricePerGram: { type: Number, required: true, min: 0, default: 0 },
  silverPricePerGram: { type: Number, required: true, min: 0, default: 0 },
  diamondPricePerGram: { type: Number, required: true, min: 0, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const GoldPriceModel = model<IGoldPrice>("GoldPrice", GoldPriceSchema);
