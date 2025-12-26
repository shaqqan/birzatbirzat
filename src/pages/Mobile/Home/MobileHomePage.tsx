import { BottomNavbar } from "@/components/ui";
import { Header } from "@/components/ui/Header/Header";
import { ProductCards } from "@/features/products";
import { Container } from "@/components/shared";
import {
  addQuantityHandlers,
  specialProducts,
} from "@/mocks/products";
import { useCallback, useState } from "react";
import { MobileBannerCorusel } from "@/components/ui/MobileBanner/MobileBanner";
import { Box, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Categories } from "@/features/home/components/Categories/Categories";

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
      <Categories />
      <Box style={{ paddingLeft: "16px", gap: "16px" }}>
        <ProductCards
          title="Спецпредложения"
          variant="horizontal"
          items={addQuantityHandlers(
            specialProducts,
            quantities,
            handleQuantityChange
          )}
        />
        <ProductCards
          title="Новинки"
          variant="horizontal"
          items={addQuantityHandlers(
            specialProducts,
            quantities,
            handleQuantityChange
          )}
        />
      </Box>
      <BottomNavbar />
    </Flex>
  );
}
