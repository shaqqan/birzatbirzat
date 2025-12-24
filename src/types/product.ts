export interface NutritionFacts {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
  weight: string;
  description?: string;
  brand?: string;
  category?: string;
  nutritionFacts?: NutritionFacts;
  storage?: string;
  shelfLife?: string;
}

export interface ProductCardItem {
  id?: number;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
  weight?: string;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  isHit?: boolean;
  showDiscount?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}
