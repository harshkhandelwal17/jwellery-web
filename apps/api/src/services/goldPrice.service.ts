import { GoldPriceModel } from "../models/GoldPrice.model.js";

export interface MetalRates {
  pricePerGram: number;
  goldPricePerGram: number;
  silverPricePerGram: number;
  diamondPricePerGram: number;
  updatedAt: Date | null;
}

export interface UpdateMetalRatesInput {
  pricePerGram?: number;
  goldPricePerGram?: number;
  silverPricePerGram?: number;
  diamondPricePerGram?: number;
}

function toMetalRates(doc: {
  pricePerGram?: number;
  goldPricePerGram?: number;
  silverPricePerGram?: number;
  diamondPricePerGram?: number;
  updatedAt?: Date | null;
}): MetalRates {
  const gold = doc.goldPricePerGram ?? doc.pricePerGram ?? 0;
  return {
    pricePerGram: gold,
    goldPricePerGram: gold,
    silverPricePerGram: doc.silverPricePerGram ?? 0,
    diamondPricePerGram: doc.diamondPricePerGram ?? 0,
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function getCurrentGoldPrice(): Promise<number> {
  const doc = await GoldPriceModel.findOne().lean();
  return doc?.goldPricePerGram ?? doc?.pricePerGram ?? 0;
}

export async function getCurrentGoldPriceDoc(): Promise<MetalRates | null> {
  const doc = await GoldPriceModel.findOne().lean();
  if (!doc) return null;
  return toMetalRates(doc);
}

export async function updateGoldPrice(input: UpdateMetalRatesInput): Promise<MetalRates> {
  const normalizedGold = input.goldPricePerGram ?? input.pricePerGram;
  const setData: Record<string, number | Date> = {
    updatedAt: new Date(),
  };

  if (normalizedGold !== undefined) {
    setData["goldPricePerGram"] = normalizedGold;
    // Keep legacy field in sync.
    setData["pricePerGram"] = normalizedGold;
  }
  if (input.silverPricePerGram !== undefined) {
    setData["silverPricePerGram"] = input.silverPricePerGram;
  }
  if (input.diamondPricePerGram !== undefined) {
    setData["diamondPricePerGram"] = input.diamondPricePerGram;
  }

  const doc = await GoldPriceModel.findOneAndUpdate(
    {},
    { $set: setData },
    { upsert: true, new: true }
  ).lean();

  // Trigger ISR revalidation on Next.js (best-effort — don't throw if web is down)
  const webUrl = process.env.WEB_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (webUrl && secret) {
    fetch(`${webUrl}/api/revalidate`, {
      method: "POST",
      headers: { "x-revalidate-secret": secret },
    }).catch(() => {/* ignore */});
  }

  return toMetalRates(doc!);
}
