export const QUERY_KEYS = {
  CART: ["cart"],
  FAVORITES: ["favorites"],
  ADDRESSES: ["addresses"],
  ORDERS: ["orders"],
  PRODUCTS: ["products"],
  PRODUCT: (id: number) => ["product", id],
  CATEGORIES: ["categories"],
  BANNERS: ["sliderBanners"],
} as const;
