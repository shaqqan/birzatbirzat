import { BottomNavbar } from "@/components/ui";
import { Header } from "@/components/ui/Header/Header";
import { ProductCards } from "@/features/products";
import { Container } from "@/components/shared";
import {
  addQuantityHandlers,
  discountProducts,
  frequentlyBoughtProducts,
} from "@/mocks/products";
import { useCallback, useState } from "react";
import { MobileBannerCorusel } from "@/components/ui/MobileBanner/MobileBanner";
import { Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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
    <Flex direction="column" gap="md">
      <Header />
      <Container>
        <TextInput
          variant="mobile"
          placeholder="Поиск продуктов..."
          leftSection={<IconSearch size={20} />}
        />
      </Container>
      <MobileBannerCorusel />
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
    </Flex>
  );
}
