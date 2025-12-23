import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import { IconHeart, IconTrash } from "@tabler/icons-react";
import {
  ProductCards,
  ProductCardProps,
} from "@/components/ui/ProductCards/ProductCards";
import classes from "./FavoritesPage.module.css";

const initialFavorites: ProductCardProps[] = [
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 3,2% «Домик в деревне» 930 мл",
    price: 18900,
    weight: "930 мл",
    quantity: 0,
  },
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Хлеб белый «Нарезной» 400 г",
    price: 12900,
    oldPrice: 8900,
    weight: "400 г",
    quantity: 0,
  },
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Яйца куриные С1 10 шт",
    price: 24900,
    weight: "10 шт",
    quantity: 0,
  },
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Бананы 1 кг",
    price: 19900,
    weight: "1 кг",
    quantity: 0,
  },
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сыр «Российский» 200 г",
    price: 54900,
    oldPrice: 42900,
    weight: "200 г",
    quantity: 0,
  },
  {
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Куриная грудка 500 г",
    price: 54900,
    weight: "500 г",
    quantity: 0,
  },
];

export function FavoritesPage() {
  const [favorites, setFavorites] =
    useState<ProductCardProps[]>(initialFavorites);

  const handleClearAll = () => {
    setFavorites([]);
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Group gap="md" align="baseline">
            <Title order={2} className={classes.pageTitle}>
              Избранное
            </Title>
            {favorites.length > 0 && (
              <Text className={classes.itemCount}>
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "товар"
                  : favorites.length < 5
                  ? "товара"
                  : "товаров"}
              </Text>
            )}
          </Group>
          {favorites.length > 0 && (
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              leftSection={<IconTrash size={16} />}
              onClick={handleClearAll}
            >
              Очистить всё
            </Button>
          )}
        </Group>

        {favorites.length === 0 ? (
          <Paper radius="lg" p="xl" className={classes.emptyState}>
            <div className={classes.emptyIconWrapper}>
              <IconHeart size={48} className={classes.emptyIcon} />
            </div>
            <Text className={classes.emptyTitle}>В избранном пока пусто</Text>
            <Text className={classes.emptyDescription}>
              Добавляйте товары в избранное, нажимая на сердечко
            </Text>
            <Button
              variant="light"
              radius="md"
              size="md"
              mt="md"
              component="a"
              href="/"
            >
              Перейти к покупкам
            </Button>
          </Paper>
        ) : (
          <ProductCards items={favorites} />
        )}
      </Stack>
    </Container>
  );
}
