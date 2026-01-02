// API
export { productsApi } from "./api/products.api";

// Hooks
export { useProducts, useProduct, useSliderBanners } from "./hooks/useProducts";

// Components
export { ProductCard } from "./components/ProductCard";
export type { ProductCardProps } from "./components/ProductCard/ProductCard";
export { ProductCards } from "./components/ProductCards";
export { CategoryCard } from "./components/CategoryCard";
export { DiscountBadge } from "./components/DiscountBadge";
export { HitBadge } from "./components/HitBadge";

// Types
export type { Product, ProductCardItem, NutritionFacts, ProductsResponse, Banner } from "./types";
