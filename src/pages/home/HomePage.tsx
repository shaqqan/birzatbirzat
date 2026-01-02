import { BottomNavbar, Header, Container } from "@/shared/ui";
import { ProductCards } from "@/features/products";
import { addQuantityHandlers, specialProducts } from "@/mocks/products";
import { useCallback, useState } from "react";
import { MobileBannerCorusel } from "@/shared/ui/MobileBanner/MobileBanner";
import { Box, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Categories } from "@/features/home/components/Categories/Categories";

export function HomePage() {
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
      </Box>
      <Container>
        <ProductCards
          title="Новинки"
          variant="vertical"
          items={addQuantityHandlers(
            specialProducts,
            quantities,
            handleQuantityChange
          )}
        />
      </Container>
      <BottomNavbar />
    </Flex>
  );
}

export default HomePage;
