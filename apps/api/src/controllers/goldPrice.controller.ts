import type { Request, Response, NextFunction } from "express";
import * as goldPriceService from "../services/goldPrice.service.js";

export async function getGoldPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const pricePerGram = await goldPriceService.getCurrentGoldPrice();
    res.json({ success: true, data: { pricePerGram } });
  } catch (err) { next(err); }
}

export async function updateGoldPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await goldPriceService.updateGoldPrice(req.body.pricePerGram);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}
