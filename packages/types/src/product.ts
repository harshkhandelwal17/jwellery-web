export interface Product {
  id: string;
  name: string;
  weight: number;
  makingCharges: number;
  image: string;
  category: ProductCategory;
  description: string;
  modelPath: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithPrice extends Product {
  calculatedPrice: number;
  goldPriceUsed: number;
}

export type ProductCategory = "rings" | "necklaces" | "earrings" | "bracelets" | "watches";

export interface CreateProductInput {
  name: string;
  weight: number;
  makingCharges: number;
  image: string;
  category: ProductCategory;
  description: string;
  modelPath?: string | null;
}

export type UpdateProductInput = Partial<CreateProductInput>;
