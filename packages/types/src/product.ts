/** Shown on cards when set by admin (e.g. “Top Rated”, “Bestseller”). */
export type ProductPromoBadge =
  | "bestseller"
  | "top_rated"
  | "staff_pick"
  | "new_arrival";

export const PRODUCT_PROMO_BADGE_LABELS: Record<ProductPromoBadge, string> = {
  bestseller: "Bestseller",
  top_rated: "Top Rated",
  staff_pick: "Staff Pick",
  new_arrival: "New Arrival",
};

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
  occasion?: Occasion;  /** Purity/standard label (e.g., "22KT", "925", "Lab Grown") */
  purity?: string;  /** Admin: show in homepage “Featured / Loved This Season” block (ordered by homeSpotlightOrder). */
  featuredOnHome?: boolean;
  /** Lower = earlier in that block (1 first). Default 999 = end of featured group. */
  homeSpotlightOrder?: number;
  promoBadge?: ProductPromoBadge;
  /** Optional SKU / item code for inventory */
  sku?: string;
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
  pricePerGramUsed: number;
  metalTypeUsed: "gold" | "silver" | "diamond";
  /** Legacy alias kept for old UI components. */
  goldPriceUsed: number;
}

export type ProductCategory = "rings" | "necklaces" | "earrings" | "bracelets" | "watches";

export interface CreateProductInput {
  name: string;
  weight: number;
  makingCharges: number;
  /** Empty until Cloudinary upload or manual URL */
  image?: string;
  category: ProductCategory;
  description: string;
  modelPath?: string | null;
  mainCategory?: MainCategory;
  subCategory?: string;
  occasion?: Occasion;
  purity?: string;
  featuredOnHome?: boolean;
  homeSpotlightOrder?: number;
  promoBadge?: ProductPromoBadge;
  sku?: string;
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
