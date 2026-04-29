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
  // New hierarchical category fields
  mainCategory?: MainCategory;
  subCategory?: string;
  occasion?: Occasion;
}

export type MainCategory =
  | "Diamond Jewellery"
  | "Silver Jewellery"
  | "Chic Everyday Jewellery"
  | "Gold Jewellery"
  | "Bridal Collection"
  | "Unique Categories";

export type Occasion = "Everyday" | "Festive" | "Minimal" | "Statement";

// Subcategories by main category
export const SUBCATEGORIES: Record<MainCategory, string[]> = {
  "Diamond Jewellery": [
    "Necklaces and Chains",
    "Earrings",
    "Bracelets",
    "Rings",
    "Pendants",
  ],
  "Silver Jewellery": [
    "Necklaces and Chains",
    "Bracelets",
    "Earrings",
    "Anklets",
    "Chains",
    "Toe Rings",
    "Rings",
    "Pendants",
  ],
  "Chic Everyday Jewellery": [
    "Chains",
    "Pendants",
    "Minimal Earrings",
    "Bracelets",
    "Others",
  ],
  "Gold Jewellery": [
    "Necklaces and Chains",
    "Bracelets",
    "Earrings",
    "Chains",
    "Rings",
    "Pendants",
  ],
  "Bridal Collection": [],
  "Unique Categories": [],
};

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
  mainCategory?: MainCategory;
  subCategory?: string;
  occasion?: Occasion;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productId?: string;
  productName?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnquiryInput {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productId?: string;
  productName?: string;
}

export type UpdateEnquiryStatusInput = { status: "new" | "contacted" | "closed" };
