import { Schema, model, Types } from "mongoose";

// NOTE: no finalPrice field — price is always computed, never stored
interface IProduct {
  _id: Types.ObjectId;
  name: string;
  weight: number;
  makingCharges: number;
  image: string;
  category: "rings" | "necklaces" | "earrings" | "bracelets" | "watches";
  description: string;
  modelPath: string | null;
  createdAt: Date;
  updatedAt: Date;
  // New hierarchical category fields
  mainCategory?: string;
  subCategory?: string;
  occasion?: string;
}

const MAIN_CATEGORIES = [
  "Diamond Jewellery",
  "Silver Jewellery",
  "Chic Everyday Jewellery",
  "Gold Jewellery",
  "Bridal Collection",
  "Unique Categories",
] as const;

const OCCASIONS = ["Everyday", "Festive", "Minimal", "Statement"] as const;

const ProductSchema = new Schema<IProduct>(
  {
    name:          { type: String, required: true, trim: true },
    weight:        { type: Number, required: true, min: 0 },
    makingCharges: { type: Number, required: true, min: 0 },
    image:         { type: String, default: "" },
    category:      { type: String, required: true, enum: ["rings", "necklaces", "earrings", "bracelets", "watches"] },
    description:   { type: String, default: "" },
    modelPath:     { type: String, default: null },
    mainCategory:  { type: String, enum: MAIN_CATEGORIES, default: null },
    subCategory:   { type: String, default: null },
    occasion:      { type: String, enum: OCCASIONS, default: null },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", ProductSchema);
