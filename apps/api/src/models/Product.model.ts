import { Schema, model, Types } from "mongoose";

// NOTE: no finalPrice field — price is always computed, never stored
interface IProduct {
  _id: Types.ObjectId;
  name: string;
  weight: number;
  makingCharges: number;
  image: string;
  category: "rings" | "necklaces" | "earrings" | "bracelets";
  description: string;
  modelPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name:          { type: String, required: true, trim: true },
    weight:        { type: Number, required: true, min: 0 },
    makingCharges: { type: Number, required: true, min: 0 },
    image:         { type: String, required: true },
    category:      { type: String, required: true, enum: ["rings", "necklaces", "earrings", "bracelets"] },
    description:   { type: String, default: "" },
    modelPath:     { type: String, default: null },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", ProductSchema);
