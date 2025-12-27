// Re-export from features for backwards compatibility
export {
  ProductCard,
  ProductCards,
  CategoryCard,
  DiscountBadge,
  HitBadge,
} from "@/features/products";
export type {
  ProductCardProps,
  CategoryCardProps,
  DiscountBadgeProps,
  HitBadgeProps,
} from "@/features/products";

export { QuantityCounter, CartButton, Basket } from "@/features/cart";
export type { QuantityCounterProps, CartButtonProps } from "@/features/cart";

export { LoginModal } from "@/features/auth";

// Re-export from shared
export { Button, Container, Section } from "@/components/shared";
export type { ButtonProps, ContainerProps, SectionProps } from "@/components/shared";

// Sliders & Carousels (still in ui/)
export { BannerSlider } from "./BannerSlider";
export type { BannerSliderProps, BannerItem } from "./BannerSlider";

export { BannerCarousel } from "./Carousel/Carousel";

// Navigation (still in ui/)
export { BottomNavbar } from "./BottomNavbar/BottomNavbar";

// Layout (still in ui/)
export { Footer } from "./Footer";

// Modals (still in ui/)
export { AddressModal } from "./AddressModal/AddressModal";

// Splash Screen
export { SplashScreen } from "./SplashScreen";
