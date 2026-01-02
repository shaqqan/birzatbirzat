import { BottomNavbar } from "@/shared/ui";
import { Container } from "@/shared/ui";
import { ProductCards } from "@/features/products";
import type { ProductCardProps } from "@/features/products";
import { specialProducts, type MockProduct } from "@/mocks/products";
import { Box, Button, Flex, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./FavoritesPage.module.css";

export function FavoritesPage() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [favoriteProducts, setFavoriteProducts] = useState(specialProducts);

  const handleQuantityChange = useCallback(
    (productId: number, quantity: number) => {
      setQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(0, quantity),
      }));
    },
    []
  );

  const handleRemoveFromFavorites = useCallback((productId: number) => {
    setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const getFavoriteItems = (
    products: MockProduct[],
    quantities: Record<number, number>,
    onQuantityChange: (id: number, qty: number) => void,
    onRemoveFromFavorites: (id: number) => void
  ): ProductCardProps[] => {
    return products.map((product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
      onQuantityChange: (qty: number) => onQuantityChange(product.id, qty),
      isFavorite: true,
      onFavoriteToggle: () => onRemoveFromFavorites(product.id),
    }));
  };

  const itemCount = favoriteProducts.length;

  const getItemCountText = (count: number) => {
    if (count === 1) return "товар";
    if (count >= 2 && count <= 4) return "товара";
    return "товаров";
  };

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Text className={classes.title}>Избранное</Text>
      </Box>

      {favoriteProducts.length === 0 ? (
        <Container>
          <Box className={classes.emptyState}>
            <Box className={classes.emptyIconWrapper}>
              <IconHeart size={48} className={classes.emptyIcon} />
            </Box>
            <Text className={classes.emptyTitle}>В избранном пока пусто</Text>
            <Text className={classes.emptyDescription}>
              Добавляйте товары в избранное, нажимая на сердечко
            </Text>
            <Button
              variant="filled"
              radius="md"
              size="md"
              mt="md"
              className={classes.shopButton}
              onClick={() => navigate("/")}
            >
              Перейти к покупкам
            </Button>
          </Box>
        </Container>
      ) : (
        <>
          <Box className={classes.itemCountWrapper}>
            <Text className={classes.itemCount}>
              {itemCount} {getItemCountText(itemCount)}
            </Text>
          </Box>

          <Container>
            <ProductCards
              variant="vertical"
              items={getFavoriteItems(
                favoriteProducts,
                quantities,
                handleQuantityChange,
                handleRemoveFromFavorites
              )}
            />
          </Container>
        </>
      )}

      <BottomNavbar />
    </Flex>
  );
}
