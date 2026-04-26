import "dotenv/config";
import mongoose from "mongoose";
import { ProductModel } from "./models/Product.model.js";
import { GoldPriceModel } from "./models/GoldPrice.model.js";

const GOLD_RATE = 9450;

const PRODUCTS = [
  {
    name: "Radiant Solitaire Ring",
    weight: 4.2,
    makingCharges: 3500,
    image: "https://picsum.photos/seed/ring1/600/800",
    category: "rings",
    description: "A stunning solitaire ring featuring a round brilliant diamond set in 22kt gold.",
    modelPath: null,
  },
  {
    name: "Heritage Temple Necklace",
    weight: 18.5,
    makingCharges: 8500,
    image: "https://picsum.photos/seed/necklace1/600/800",
    category: "necklaces",
    description: "Intricate temple work necklace in 22kt gold, inspired by South Indian heritage.",
    modelPath: null,
  },
  {
    name: "Cascading Jhumka Earrings",
    weight: 6.8,
    makingCharges: 4200,
    image: "https://picsum.photos/seed/earring1/600/800",
    category: "earrings",
    description: "Traditional jhumka earrings with a contemporary cascading design in 22kt gold.",
    modelPath: null,
  },
  {
    name: "Filigree Charm Bracelet",
    weight: 8.3,
    makingCharges: 5800,
    image: "https://picsum.photos/seed/bracelet1/600/800",
    category: "bracelets",
    description: "Delicate filigree charm bracelet with intricate hand-crafted detailing in 22kt gold.",
    modelPath: null,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in .env");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await GoldPriceModel.findOneAndUpdate(
    {},
    { pricePerGram: GOLD_RATE, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  console.log(`Gold price set to ₹${GOLD_RATE}/g`);

  await ProductModel.deleteMany({});
  await ProductModel.insertMany(PRODUCTS);
  console.log(`Seeded ${PRODUCTS.length} products`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => { console.error(err); process.exit(1); });
