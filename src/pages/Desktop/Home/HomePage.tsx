import { useState, useCallback } from "react";
import { Stack } from "@mantine/core";
import { BottomNavbar } from "@/components/ui/BottomNavbar/BottomNavbar";
import { ProductCards } from "@/components/ui/ProductCards/ProductCards";
import { BannerCarousel } from "@/components/ui/Carousel/Carousel";
import {
  frequentlyBoughtProducts,
  discountProducts,
  popularProducts,
  newProducts,
  recentlyViewedProducts,
  addQuantityHandlers,
} from "@/mocks/products";

export function HomePage() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = useCallback((productId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  }, []);

  return (
    <Stack gap="xl">
      <BannerCarousel />

      <ProductCards
        title="Новогодняя скидка"
        items={addQuantityHandlers(discountProducts, quantities, handleQuantityChange)}
      />

      <ProductCards
        title="Часто покупают"
        items={addQuantityHandlers(frequentlyBoughtProducts, quantities, handleQuantityChange)}
      />

      <ProductCards
        title="Популярное"
        items={addQuantityHandlers(popularProducts, quantities, handleQuantityChange)}
      />

      <ProductCards
        title="Новинки"
        items={addQuantityHandlers(newProducts, quantities, handleQuantityChange)}
      />

      <ProductCards
        title="Недавно просмотренные"
        items={addQuantityHandlers(recentlyViewedProducts, quantities, handleQuantityChange)}
      />

      <BottomNavbar />
    </Stack>
  );
}
