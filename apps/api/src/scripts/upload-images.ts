/**
 * Bulk upload local jewellery images to Cloudinary and seed MongoDB.
 *
 * Usage:
 *   pnpm --filter api upload-images
 *
 * Reads from JEWELLERY_DATA_PATH env var (defaults to <repo-root>/Jewellery_Data).
 * Uploads only the first MAX_PER_CATEGORY images per category (default 20).
 * Skips images already uploaded (idempotent via Cloudinary public_id).
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { cloudinary } from "../upload/cloudinary.js";
import { ProductModel } from "../models/Product.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../../../");
const DATA_ROOT =
  process.env.JEWELLERY_DATA_PATH ?? path.join(REPO_ROOT, "Jewellery_Data");

// How many images to upload per category (change as needed)
const MAX_PER_CATEGORY = Number(process.env.MAX_PER_CATEGORY ?? "20");
const CONCURRENCY = 3; // parallel uploads

// ─── Product name generators ───────────────────────────────────────────────

const RING_NAMES = [
  "Floral Diamond Ring",
  "Solitaire Elegance Ring",
  "Twisted Band Ring",
  "Eternity Band Ring",
  "Vintage Cluster Ring",
  "Princess Cut Ring",
  "Pavé Diamond Ring",
  "Infinity Love Ring",
  "Royal Crown Ring",
  "Chevron Stackable Ring",
  "Rose Gold Halo Ring",
  "Art Deco Ring",
  "Bezel Set Ring",
  "Cathedral Setting Ring",
  "Micropavé Band Ring",
  "Split Shank Ring",
  "Bypass Swirl Ring",
  "East-West Oval Ring",
  "Hidden Halo Ring",
  "Three-Stone Ring",
];

const NECKLACE_NAMES = [
  "Layered Chain Necklace",
  "Temple Choker Necklace",
  "Diamond Pendant Necklace",
  "Pearl Drop Necklace",
  "Heritage Mangalsutra",
  "Delicate Bar Necklace",
  "Floral Motif Necklace",
  "Kundan Statement Necklace",
  "Filigree Locket Necklace",
  "Celestial Star Necklace",
  "Vintage Cameo Necklace",
  "Polki Haar Necklace",
  "Chain Link Necklace",
  "South Sea Pearl Necklace",
  "Emerald Pendant Necklace",
  "Antique Coin Necklace",
  "Minimalist Charm Necklace",
  "Royal Rani Haar",
  "Floral Jadau Necklace",
  "Solitaire Diamond Necklace",
];

const RING_DESCRIPTIONS = [
  "A breathtaking 22kt gold ring with intricate detailing, perfect for any occasion.",
  "Handcrafted solitaire ring in 22kt gold, a timeless symbol of elegance.",
  "Contemporary twisted band in 22kt gold with a lustrous polished finish.",
  "Classic eternity band set with brilliant-cut stones in 22kt gold.",
  "Vintage-inspired cluster ring featuring a stunning central stone in 22kt gold.",
];

const NECKLACE_DESCRIPTIONS = [
  "Exquisite layered chain necklace in 22kt gold, perfect for festive occasions.",
  "Traditional temple choker with intricate carvings in 22kt gold.",
  "Elegant diamond pendant necklace set in 22kt gold with a delicate chain.",
  "Lustrous pearl drop necklace with 22kt gold accents and fine craftsmanship.",
  "Heritage mangalsutra with black bead chain and ornate 22kt gold pendant.",
];

function pickName(names: string[], index: number) {
  return names[index % names.length]!;
}
function pickDescription(descs: string[], index: number) {
  return descs[index % descs.length]!;
}

// Weight/making-charges ranges
function ringParams(index: number) {
  const weights = [3.2, 4.1, 3.8, 5.0, 4.5, 3.6, 4.9, 3.3, 5.2, 4.0];
  const charges = [2800, 3200, 3500, 4000, 3800, 2500, 4500, 3000, 4200, 3600];
  return {
    weight: weights[index % weights.length]!,
    makingCharges: charges[index % charges.length]!,
  };
}
function necklaceParams(index: number) {
  const weights = [14.5, 18.2, 22.0, 16.8, 20.5, 12.3, 25.0, 17.6, 19.1, 23.4];
  const charges = [
    6500, 8000, 9500, 7200, 10000, 5500, 12000, 7800, 8800, 9200,
  ];
  return {
    weight: weights[index % weights.length]!,
    makingCharges: charges[index % charges.length]!,
  };
}

// ─── Cloudinary upload (idempotent) ──────────────────────────────────────────

async function uploadToCloudinary(
  filePath: string,
  publicId: string,
): Promise<string> {
  try {
    // Check if already uploaded
    const existing = await cloudinary.api.resource(publicId);
    console.log(`  ↩  Already uploaded: ${publicId}`);
    return existing.secure_url as string;
  } catch {
    // Not found — upload fresh
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: "jwell/products",
      overwrite: false,
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    });
    return result.secure_url;
  }
}

// ─── Process one category ────────────────────────────────────────────────────

async function processCategory(
  category: "rings" | "necklaces",
  dirName: "ring" | "necklace",
  names: string[],
  descriptions: string[],
  paramsFn: (i: number) => { weight: number; makingCharges: number },
) {
  const dirPath = path.join(DATA_ROOT, dirName);
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Directory not found: ${dirPath}`);
    return;
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .slice(0, MAX_PER_CATEGORY);

  console.log(`\n📂 ${category} — ${files.length} images to upload`);

  // Process in chunks for concurrency
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const chunk = files.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (file, chunkIdx) => {
        const globalIdx = i + chunkIdx;
        const filePath = path.join(dirPath, file);
        const baseName = path.basename(file, path.extname(file));
        const publicId = `jwell/products/${dirName}/${baseName}`;

        try {
          console.log(`  ↑ [${globalIdx + 1}/${files.length}] ${file}`);
          const imageUrl = await uploadToCloudinary(filePath, publicId);

          const existing = await ProductModel.findOne({ image: imageUrl });
          if (existing) {
            console.log(`  ✓  Product already in DB: ${existing.name}`);
            return;
          }

          const { weight, makingCharges } = paramsFn(globalIdx);
          await ProductModel.create({
            name: pickName(names, globalIdx),
            weight,
            makingCharges,
            image: imageUrl,
            category,
            description: pickDescription(descriptions, globalIdx),
            modelPath: null,
          });
          console.log(
            `  ✓  Saved: ${pickName(names, globalIdx)} (${imageUrl.slice(-30)})`,
          );
        } catch (err) {
          console.error(
            `  ✗  Failed: ${file}`,
            err instanceof Error ? err.message : err,
          );
        }
      }),
    );
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in .env");
  if (!process.env.CLOUDINARY_CLOUD_NAME)
    throw new Error("CLOUDINARY_CLOUD_NAME is not set");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");
  console.log(`📁 Reading images from: ${DATA_ROOT}`);
  console.log(`🔢 Max per category: ${MAX_PER_CATEGORY}`);

  await processCategory(
    "rings",
    "ring",
    RING_NAMES,
    RING_DESCRIPTIONS,
    ringParams,
  );
  await processCategory(
    "necklaces",
    "necklace",
    NECKLACE_NAMES,
    NECKLACE_DESCRIPTIONS,
    necklaceParams,
  );

  const total = await ProductModel.countDocuments();
  console.log(`\n🎉 Done! Total products in DB: ${total}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
