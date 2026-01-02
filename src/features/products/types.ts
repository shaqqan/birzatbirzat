export interface Product {
  id: number;
  name?: Record<string, string>;
  title?: string;
  description?: Record<string, string> | string | null;
  image?: string | null;
  images?: string[];
  price: number;
  discountPrice?: number | null;
  displayPrice?: number;
  displayDiscountPrice?: number | null;
  unit?: string;
  weight?: string;
  stock?: number;
  categoryId?: number;
  category?: string;
  isHit?: boolean;
  isNew?: boolean;
  nutritionFacts?: NutritionFacts;
  brand?: string;
  storage?: string;
  shelfLife?: string;
}

export interface ProductCardItem {
  id: number;
  image: string;
  title: string;
  weight?: string;
  price: number;
  discountPrice?: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isHit?: boolean;
}

export interface NutritionFacts {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface Banner {
  id: string;
  image: string;
  title: Record<string, string> | null;
  link: string | null;
}
