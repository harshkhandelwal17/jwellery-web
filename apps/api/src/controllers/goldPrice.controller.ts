import type { Request, Response, NextFunction } from "express";
import * as goldPriceService from "../services/goldPrice.service.js";

export async function getGoldPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = await goldPriceService.getCurrentGoldPriceDoc();
    const pricePerGram = row?.goldPricePerGram ?? row?.pricePerGram ?? 0;
    res.json({
      success: true,
      data: {
        id: "gold",
        goldPricePerGram: pricePerGram,
        silverPricePerGram: row?.silverPricePerGram ?? 0,
        diamondPricePerGram: row?.diamondPricePerGram ?? 0,
        pricePerGram,
        updatedAt: row?.updatedAt ? row.updatedAt.toISOString() : new Date(0).toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateGoldPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await goldPriceService.updateGoldPrice(req.body);
    const updatedAt = data.updatedAt instanceof Date ? data.updatedAt.toISOString() : String(data.updatedAt);
    res.json({
      success: true,
      data: {
        id: "gold",
        goldPricePerGram: data.goldPricePerGram,
        silverPricePerGram: data.silverPricePerGram,
        diamondPricePerGram: data.diamondPricePerGram,
        pricePerGram: data.pricePerGram,
        updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}
