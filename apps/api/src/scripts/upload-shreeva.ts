/**
 * Upload Shreeva collection images to Cloudinary and seed MongoDB.
 *
 * Usage:
 *   pnpm --filter api upload-shreeva
 *
 * Reads renamed images from apps/web/public/shreeva/.
 * Idempotent — skips images already on Cloudinary.
 */

import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { cloudinary } from "../upload/cloudinary.js";
import { ProductModel } from "../models/Product.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../../");
const IMAGES_DIR = path.join(REPO_ROOT, "apps/web/public/shreeva");

type Category = "rings" | "necklaces" | "earrings" | "bracelets" | "watches";

interface ProductEntry {
  file: string;
  name: string;
  category: Category;
  weight: number;
  makingCharges: number;
  description: string;
}

const PRODUCTS: ProductEntry[] = [
  {
    file: "bangle_gold_diamond_clasp_ribbed_001.jpeg",
    name: "Gold Diamond Clasp Ribbed Bangle",
    category: "bracelets",
    weight: 10.0,
    makingCharges: 5000,
    description: "Elegant gold bangle with a ribbed design and sparkling diamond clasp in 22kt gold.",
  },
  {
    file: "bangle_rose_gold_black_enamel_002.jpeg",
    name: "Rose Gold Black Enamel Bangle",
    category: "bracelets",
    weight: 5.2,
    makingCharges: 3800,
    description: "Contemporary rose gold bangle featuring bold black enamel accents.",
  },
  {
    file: "bangle_rose_gold_greek_key_003.jpeg",
    name: "Rose Gold Greek Key Bangle",
    category: "bracelets",
    weight: 6.0,
    makingCharges: 4200,
    description: "Luxurious rose gold bangle with classic Greek key pattern and Medusa centre piece.",
  },
  {
    file: "bangle_rose_gold_beaded_004.jpeg",
    name: "Rose Gold Beaded Bangle",
    category: "bracelets",
    weight: 4.5,
    makingCharges: 3500,
    description: "Delicate rose gold bangle entirely encrusted with fine beaded detailing.",
  },
  {
    file: "bracelet_rose_gold_mesh_crown_005.jpeg",
    name: "Rose Gold Mesh Crown Bracelet",
    category: "bracelets",
    weight: 3.8,
    makingCharges: 4000,
    description: "Sleek rose gold mesh bracelet with an ornate crown charm centrepiece.",
  },
  {
    file: "bangle_gold_open_cuff_disc_ends_006.jpeg",
    name: "Gold Open Cuff Disc Bangle",
    category: "bracelets",
    weight: 4.44,
    makingCharges: 3200,
    description: "Minimalist gold open cuff bangle with decorative sunburst disc ends.",
  },
  {
    file: "chain_gold_blue_stone_007.jpeg",
    name: "Gold Blue Stone Long Chain",
    category: "necklaces",
    weight: 1.77,
    makingCharges: 2000,
    description: "Long gold chain studded with vibrant round blue stones, perfect for layering.",
  },
  {
    file: "ring_green_stone_flower_008.jpeg",
    name: "Green Stone Flower Ring",
    category: "rings",
    weight: 1.2,
    makingCharges: 1800,
    description: "Delicate gold ring with a five-petal flower setting of rich green stones.",
  },
  {
    file: "necklace_gold_wavy_mesh_009.jpeg",
    name: "Gold Wavy Mesh Necklace",
    category: "necklaces",
    weight: 8.5,
    makingCharges: 5000,
    description: "Striking gold necklace with a flowing wavy mesh design for a modern look.",
  },
  {
    file: "watch_ladies_LW527_diamond_band_010.jpeg",
    name: "Ladies Diamond Band Watch LW527",
    category: "watches",
    weight: 15.11,
    makingCharges: 8000,
    description: "Glamorous ladies watch with a bold diamond-pattern gold band and black dial.",
  },
  {
    file: "necklace_gold_crystal_spacers_011.jpeg",
    name: "Gold Crystal Spacers Chain",
    category: "necklaces",
    weight: 7.2,
    makingCharges: 4500,
    description: "Elegant multi-strand gold chain with crystal cube spacers for a refined look.",
  },
  {
    file: "ring_gold_diamond_cut_9k_012.jpeg",
    name: "Gold Diamond Cut Ring",
    category: "rings",
    weight: 3.5,
    makingCharges: 2500,
    description: "Bold dome-shaped gold ring with intricate diamond-cut faceting, sold as set of 3.",
  },
  {
    file: "kada_gold_chain_weave_013.jpeg",
    name: "Gold Chain Weave Kada",
    category: "bracelets",
    weight: 10.0,
    makingCharges: 6000,
    description: "Heavy gold kada with a two-tone chain weave pattern running through the centre.",
  },
  {
    file: "kada_gold_lightweight_014.jpeg",
    name: "Gold Lightweight Kada",
    category: "bracelets",
    weight: 8.71,
    makingCharges: 5500,
    description: "Sleek everyday gold kada with a polished flat profile and subtle ribbing.",
  },
  {
    file: "watch_gents_GW639_titan_skeleton_015.jpeg",
    name: "Gents Titan Skeleton Watch GW639",
    category: "watches",
    weight: 49.34,
    makingCharges: 12000,
    description: "Premium gents Titan automatic watch with skeleton dial and studded rose gold band.",
  },
  {
    file: "earring_bali_square_hoop_gold_016.jpeg",
    name: "Gold Square Hoop Bali Earrings",
    category: "earrings",
    weight: 1.1,
    makingCharges: 1500,
    description: "Minimalist square hoop bali earrings in polished 22kt gold.",
  },
  {
    file: "earring_tops_gold_ball_stud_017.jpeg",
    name: "Gold Ball Stud Tops",
    category: "earrings",
    weight: 1.12,
    makingCharges: 1200,
    description: "Classic gold ball stud earrings with a faceted diamond-cut finish.",
  },
  {
    file: "earring_bali_oval_hoop_gold_018.jpeg",
    name: "Gold Oval Hoop Bali Earrings",
    category: "earrings",
    weight: 1.94,
    makingCharges: 1800,
    description: "Sleek elongated oval hoop bali earrings with a high-polish 22kt gold finish.",
  },
  {
    file: "watch_ladies_GW875_titan_gold_019.jpeg",
    name: "Ladies Titan Classic Watch GW875",
    category: "watches",
    weight: 21.21,
    makingCharges: 9000,
    description: "Elegant ladies Titan watch with a clean white dial and geometric gold link band.",
  },
  {
    file: "watch_ladies_GW935_titan_square_020.jpeg",
    name: "Ladies Titan Square Watch GW935",
    category: "watches",
    weight: 42.75,
    makingCharges: 11000,
    description: "Sophisticated ladies Titan square watch with teal dial and diamond-studded gold band.",
  },
  {
    file: "necklace_set_rose_gold_flower_021.jpeg",
    name: "Rose Gold Flower Necklace Set",
    category: "necklaces",
    weight: 15.0,
    makingCharges: 8000,
    description: "Stunning rose gold necklace set featuring a floral motif pendant with matching earrings.",
  },
  {
    file: "watch_ladies_LW1947_gold_022.jpeg",
    name: "Ladies Gold Watch LW1947",
    category: "watches",
    weight: 12.85,
    makingCharges: 7000,
    description: "Graceful ladies gold watch with a green dial, crescent motif, and ribbed diamond band.",
  },
  {
    file: "watch_ladies_LW1944_gold_023.jpeg",
    name: "Ladies Gold Watch LW1944",
    category: "watches",
    weight: 12.54,
    makingCharges: 7000,
    description: "Refined ladies gold watch with a green dial and patterned link band with stone accents.",
  },
];

async function uploadToCloudinary(filePath: string, publicId: string): Promise<string> {
  try {
    const existing = await cloudinary.api.resource(publicId);
    console.log(`  ↩  Already uploaded: ${publicId}`);
    return existing.secure_url as string;
  } catch {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: "jwell/products/shreeva",
      overwrite: false,
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    });
    return result.secure_url;
  }
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in .env");
  if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error("CLOUDINARY_CLOUD_NAME is not set");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");
  console.log(`📁 Uploading from: ${IMAGES_DIR}`);

  for (let i = 0; i < PRODUCTS.length; i++) {
    const entry = PRODUCTS[i]!;
    const filePath = path.join(IMAGES_DIR, entry.file);
    const baseName = entry.file.replace(/\.[^.]+$/, "");
    const publicId = `jwell/products/shreeva/${baseName}`;

    console.log(`\n[${i + 1}/${PRODUCTS.length}] ${entry.file}`);

    try {
      const imageUrl = await uploadToCloudinary(filePath, publicId);

      const existing = await ProductModel.findOne({ image: imageUrl });
      if (existing) {
        console.log(`  ✓  Already in DB: ${existing.name}`);
        continue;
      }

      await ProductModel.create({
        name: entry.name,
        weight: entry.weight,
        makingCharges: entry.makingCharges,
        image: imageUrl,
        category: entry.category,
        description: entry.description,
        modelPath: null,
      });
      console.log(`  ✓  Saved: ${entry.name}`);
    } catch (err) {
      console.error(`  ✗  Failed: ${entry.file}`, err instanceof Error ? err.message : err);
    }
  }

  const total = await ProductModel.countDocuments();
  console.log(`\n🎉 Done! Total products in DB: ${total}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
