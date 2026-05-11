import "dotenv/config";
import mongoose from "mongoose";
import { ProductModel } from "./models/Product.model.js";
import { GoldPriceModel } from "./models/GoldPrice.model.js";

const GOLD_RATE = 9450;
const SILVER_RATE = 110;
const DIAMOND_RATE = 65000;

const PRODUCTS = [
  {
    name: "Radiant Solitaire Ring",
    weight: 4.2,
    makingCharges: 3500,
    image: "",
    category: "rings",
    description: "A stunning solitaire ring featuring a round brilliant diamond set in 22kt gold.",
    modelPath: null,
  },
  {
    name: "Heritage Temple Necklace",
    weight: 18.5,
    makingCharges: 8500,
    image: "",
    category: "necklaces",
    description: "Intricate temple work necklace in 22kt gold, inspired by South Indian heritage.",
    modelPath: null,
  },
  {
    name: "Cascading Jhumka Earrings",
    weight: 6.8,
    makingCharges: 4200,
    image: "",
    category: "earrings",
    description: "Traditional jhumka earrings with a contemporary cascading design in 22kt gold.",
    modelPath: null,
  },
  {
    name: "Filigree Charm Bracelet",
    weight: 8.3,
    makingCharges: 5800,
    image: "",
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
    {
      pricePerGram: GOLD_RATE,
      goldPricePerGram: GOLD_RATE,
      silverPricePerGram: SILVER_RATE,
      diamondPricePerGram: DIAMOND_RATE,
      updatedAt: new Date(),
    },
    { upsert: true, new: true }
  );
  console.log(`Rates set to Gold ₹${GOLD_RATE}/g, Silver ₹${SILVER_RATE}/g, Diamond ₹${DIAMOND_RATE}/g`);

  await ProductModel.deleteMany({});
  await ProductModel.insertMany(PRODUCTS);
  console.log(`Seeded ${PRODUCTS.length} products`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => { console.error(err); process.exit(1); });
