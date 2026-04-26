import { GoldPriceModel } from "../models/GoldPrice.model.js";

export async function getCurrentGoldPrice(): Promise<number> {
  const doc = await GoldPriceModel.findOne().lean();
  return doc?.pricePerGram ?? 0;
}

export async function updateGoldPrice(pricePerGram: number): Promise<{ pricePerGram: number; updatedAt: Date }> {
  const doc = await GoldPriceModel.findOneAndUpdate(
    {},
    { pricePerGram, updatedAt: new Date() },
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

  return { pricePerGram: doc!.pricePerGram, updatedAt: doc!.updatedAt };
}
