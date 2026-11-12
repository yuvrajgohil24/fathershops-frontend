export type Language = "en" | "ar";

export interface Category {
  id: number;
  parent_id: number | null;
  name: string | null;
  image: string | null;
}

export interface Price {
  amount: number | null;
  base_amount: number | null;
  currency: string | null;
}

export interface ProductSummary {
  id: number;
  name: string;
  image: string | null;
  sku: string | null;
  price: Price;
  quantity: number;
  in_stock: boolean;
  rating: number;
  reviews: number;
}

export interface ProductOptionValue {
  id: number;
  name: string;
  image: string | null;
  quantity: number;
  price: number;
  price_prefix: string;
}

export interface ProductOption {
  id: number;
  name: string;
  type: string | null;
  required: boolean;
  values: ProductOptionValue[];
}

export interface Product extends ProductSummary {
  description_html: string | null;
  meta: {
    title: string | null;
    description: string | null;
    keywords: string | null;
  };
  images: string[];
  model: string | null;
  type: string | null;
  source: string | null;
  dimensions: {
    weight: number | null;
    weight_class: string | null;
    length: number | null;
    width: number | null;
    height: number | null;
    length_class: string | null;
  };
  options: ProductOption[];
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface CategoryProductsResponse {
  data: ProductSummary[];
  meta: PaginationMeta;
  category: Category;
}
