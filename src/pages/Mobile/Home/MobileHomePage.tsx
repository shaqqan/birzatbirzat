import { BottomNavbar, ProductCards } from "@/components/ui";
import { Header } from "../../../components/ui/Header/Header";
import {
  addQuantityHandlers,
  discountProducts,
  frequentlyBoughtProducts,
} from "@/mocks/products";
import { useCallback, useState } from "react";
import { Container } from "@/components/ui/Container/Container";

export function MobileHomePage() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = useCallback(
    (productId: number, quantity: number) => {
      setQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(0, quantity),
      }));
    },
    []
  );

  return (
    <>
      <Header />
      <Container>
        <ProductCards
          title="Новогодняя скидка"
          variant="vertical"
          items={addQuantityHandlers(
            discountProducts,
            quantities,
            handleQuantityChange
          )}
        />
        <ProductCards
          title="Часто покупают"
          variant="horizontal"
          items={addQuantityHandlers(
            frequentlyBoughtProducts,
            quantities,
            handleQuantityChange
          )}
        />
      </Container>
      <BottomNavbar />
    </>
  );
}
