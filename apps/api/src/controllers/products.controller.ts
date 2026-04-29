import type { Request, Response, NextFunction } from "express";
import * as productsService from "../services/products.service.js";

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const options: productsService.GetProductsOptions = {};

    // Parse sorting
    const sort = req.query.sort as string | undefined;
    if (sort && ["price_desc", "price_asc", "weight_desc", "weight_asc"].includes(sort)) {
      options.sort = sort as productsService.GetProductsOptions["sort"];
    }

    // Parse occasion filter
    const occasion = req.query.occasion as string | undefined;
    if (occasion) {
      options.occasion = occasion;
    }

    // Parse mainCategory filter
    const mainCategory = req.query.mainCategory as string | undefined;
    if (mainCategory) {
      options.mainCategory = mainCategory;
    }

    // Parse subCategory filter
    const subCategory = req.query.subCategory as string | undefined;
    if (subCategory) {
      options.subCategory = subCategory;
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
