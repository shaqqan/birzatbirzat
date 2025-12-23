import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Group,
  Text,
  ActionIcon,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { ProductCards } from "@/components/ui/ProductCards/ProductCards";
import type { Product } from "@/types";
import classes from "./CatalogPage.module.css";

// Category data
const categories: Record<string, { name: string; icon: string }> = {
  "pharmacy": { name: "Аптека", icon: "💊" },
  "pet-supplies": { name: "Зоотовары", icon: "🐾" },
  "new": { name: "Новинки", icon: "✨" },
  "ready-food": { name: "Готовая еда", icon: "🍱" },
  "vegetables": { name: "Овощной прилавок", icon: "🥒" },
  "dairy": { name: "Молочный прилавок", icon: "🥛" },
  "bakery": { name: "Булочная", icon: "🥐" },
  "drinks": { name: "Вода и напитки", icon: "🥤" },
};

// Mock products
const mockProducts: Product[] = [
  {
    id: 1,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 3,2% «Домик в деревне» 930 мл",
    price: 18900,
    discountPrice: 15900,
    weight: "930 мл",
  },
  {
    id: 2,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Молоко 2,5% «Простоквашино» 930 мл",
    price: 17900,
    weight: "930 мл",
  },
  {
    id: 3,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сыр «Российский» 200 г",
    price: 42900,
    weight: "200 г",
  },
  {
    id: 4,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Творог 9% 200 г",
    price: 18900,
    weight: "200 г",
  },
  {
    id: 5,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сметана 20% 300 г",
    price: 15900,
    discountPrice: 12900,
    weight: "300 г",
  },
  {
    id: 6,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Масло сливочное 82,5% 180 г",
    price: 32900,
    weight: "180 г",
  },
  {
    id: 7,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Йогурт клубничный 250 г",
    price: 12900,
    weight: "250 г",
  },
  {
    id: 8,
    image: "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Кефир 2,5% 1 л",
    price: 14900,
    weight: "1 л",
  },
];

export function CatalogPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const category = categoryId ? categories[categoryId] : null;
  const categoryName = category?.name || "Каталог";
  const categoryIcon = category?.icon || "📦";

  const handleQuantityChange = useCallback((productId: number, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, qty),
    }));
  }, []);

  const productItems = mockProducts.map((p) => ({
    id: p.id,
    image: p.image,
    title: p.title,
    price: p.price,
    discountPrice: p.discountPrice,
    weight: p.weight,
    quantity: quantities[p.id] || 0,
    onQuantityChange: (qty: number) => handleQuantityChange(p.id, qty),
  }));

  const breadcrumbItems = [
    { title: "Главная", href: "/" },
    { title: categoryName, href: "#" },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Header */}
        <Group className={classes.header}>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <IconChevronLeft size={24} />
          </ActionIcon>
          <Breadcrumbs>
            {breadcrumbItems.map((item, index) => (
              <Anchor
                href={item.href}
                key={index}
                className={classes.breadcrumbLink}
                onClick={(e) => {
                  if (item.href !== "#") {
                    e.preventDefault();
                    navigate(item.href);
                  }
                }}
              >
                {item.title}
              </Anchor>
            ))}
          </Breadcrumbs>
        </Group>

        {/* Title */}
        <Group gap="sm" align="center">
          <Text className={classes.categoryIcon}>{categoryIcon}</Text>
          <Text className={classes.pageTitle}>{categoryName}</Text>
          <Text className={classes.productCount}>
            {mockProducts.length} товаров
          </Text>
        </Group>

        {/* Products Grid */}
        <ProductCards items={productItems} variant="vertical" />
      </Stack>
    </Container>
  );
}
