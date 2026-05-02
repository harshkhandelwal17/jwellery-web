import type { Request, Response, NextFunction } from "express";
import * as goldPriceService from "../services/goldPrice.service.js";

export async function getGoldPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const row = await goldPriceService.getCurrentGoldPriceDoc();
    const pricePerGram = row?.pricePerGram ?? 0;
    res.json({
      success: true,
      data: {
        id: "gold",
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
    const data = await goldPriceService.updateGoldPrice(req.body.pricePerGram);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}
