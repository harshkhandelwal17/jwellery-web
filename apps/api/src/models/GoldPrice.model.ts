import { Schema, model } from "mongoose";

interface IGoldPrice {
  pricePerGram: number;
  updatedAt: Date;
}

const GoldPriceSchema = new Schema<IGoldPrice>({
  pricePerGram: { type: Number, required: true, min: 0 },
  updatedAt:    { type: Date, default: Date.now },
});

export const GoldPriceModel = model<IGoldPrice>("GoldPrice", GoldPriceSchema);
