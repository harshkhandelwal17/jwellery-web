import type { Request, Response, NextFunction } from "express";
import * as productsService from "../services/products.service.js";

const SORT_MODES = new Set<string>([
  "price_desc",
  "price_asc",
  "weight_desc",
  "weight_asc",
  "newest",
  "oldest",
  "name_asc",
  "name_desc",
]);

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const options: productsService.GetProductsOptions = {};

    const sort = req.query.sort as string | undefined;
    if (sort && SORT_MODES.has(sort)) {
      options.sort = sort as productsService.GetProductsOptions["sort"];
    }

    const occasion = req.query.occasion as string | undefined;
    if (occasion) {
      options.occasion = occasion;
    }

    const mainCategory = req.query.mainCategory as string | undefined;
    if (mainCategory) {
      options.mainCategory = mainCategory;
    }

    const subCategory = req.query.subCategory as string | undefined;
    if (subCategory) {
      options.subCategory = subCategory;
    }

    const category = req.query.category as string | undefined;
    if (category) {
      options.category = category;
    }

    const q = req.query.q as string | undefined;
    if (q?.trim()) {
      options.search = q.trim();
    }

    const products = await productsService.getProducts(options);
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
}

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productsService.getProduct(req.params["id"] as string);
    if (!product) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productsService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productsService.updateProduct(req.params["id"] as string, req.body);
    if (!product) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await productsService.deleteProduct(req.params["id"] as string);
    if (!deleted) { res.status(404).json({ success: false, error: "Product not found" }); return; }
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}
