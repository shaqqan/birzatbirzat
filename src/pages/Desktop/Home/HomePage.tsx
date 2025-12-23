import { useState } from "react";
import { Stack } from "@mantine/core";
import { BottomNavbar } from "@/components/ui/BottomNavbar/BottomNavbar";
import { ProductCards } from "@/components/ui/ProductCards/ProductCards";
import { Carousel } from "@/components/ui/Carousel/Carousel";

const frequentlyBoughtProducts = [
  {
    id: 1,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 3,2% «Домик в деревне» 930 мл",
    price: 18900,
    weight: "930 мл",
  },
  {
    id: 2,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Хлеб белый «Нарезной» 400 г",
    price: 8900,
    weight: "400 г",
  },
  {
    id: 3,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Яйца куриные С1 10 шт",
    price: 24900,
    weight: "10 шт",
  },
  {
    id: 4,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Масло сливочное 82,5% 180 г",
    price: 32900,
    weight: "180 г",
  },
  {
    id: 5,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сметана 20% «Простоквашино» 300 г",
    price: 15900,
    weight: "300 г",
  },
  {
    id: 6,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сыр «Российский» 200 г",
    price: 42900,
    weight: "200 г",
  },
  {
    id: 5,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сметана 20% «Простоквашино» 300 г",
    price: 15900,
    weight: "300 г",
  },
  {
    id: 6,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сыр «Российский» 200 г",
    price: 42900,
    weight: "200 г",
  },
];

const discountProducts = [
  {
    id: 7,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Ржаной хлеб «Wasa Fiber»",
    price: 16990,
    discountPrice: 14490,
    weight: "230 г",
  },
  {
    id: 8,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 3,2–4,0% «Правильное молоко» 2 л",
    price: 38900,
    discountPrice: 29900,
    weight: "2 л",
  },
  {
    id: 9,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Йогурт «Чудо» клубника 290 г",
    price: 14900,
    discountPrice: 11900,
    weight: "290 г",
  },
  {
    id: 10,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Творог 5% «Домик в деревне» 200 г",
    price: 19900,
    discountPrice: 15900,
    weight: "200 г",
  },
  {
    id: 11,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Кефир 2,5% «Простоквашино» 930 мл",
    price: 16900,
    discountPrice: 13900,
    weight: "930 мл",
  },
  {
    id: 12,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сок «Добрый» яблоко 1 л",
    price: 15900,
    discountPrice: 12900,
    weight: "1 л",
  },
];

const popularProducts = [
  {
    id: 13,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Бананы 1 кг",
    price: 19900,
    weight: "1 кг",
  },
  {
    id: 14,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Помидоры черри 250 г",
    price: 24900,
    weight: "250 г",
  },
  {
    id: 15,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Огурцы свежие 500 г",
    price: 14900,
    weight: "500 г",
  },
  {
    id: 16,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Яблоки «Голден» 1 кг",
    price: 29900,
    weight: "1 кг",
  },
  {
    id: 17,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Апельсины 1 кг",
    price: 34900,
    weight: "1 кг",
  },
  {
    id: 18,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Лимоны 500 г",
    price: 22900,
    weight: "500 г",
  },
];

const newProducts = [
  {
    id: 19,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Гранола с орехами 300 г",
    price: 45900,
    weight: "300 г",
  },
  {
    id: 20,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Смузи манго-маракуйя 250 мл",
    price: 35900,
    weight: "250 мл",
  },
  {
    id: 21,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Хумус классический 200 г",
    price: 28900,
    weight: "200 г",
  },
  {
    id: 22,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Чиа семена 150 г",
    price: 39900,
    weight: "150 г",
  },
  {
    id: 23,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Кокосовое молоко 400 мл",
    price: 32900,
    weight: "400 мл",
  },
  {
    id: 24,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Протеиновый батончик 60 г",
    price: 18900,
    weight: "60 г",
  },
];

const recentlyViewedProducts = [
  {
    id: 25,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Куриная грудка 500 г",
    price: 54900,
    weight: "500 г",
  },
  {
    id: 26,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Фарш говяжий 400 г",
    price: 48900,
    weight: "400 г",
  },
  {
    id: 27,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Лосось стейк 200 г",
    price: 89900,
    weight: "200 г",
  },
  {
    id: 28,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Креветки 300 г",
    price: 79900,
    weight: "300 г",
  },
  {
    id: 29,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Колбаса «Докторская» 400 г",
    price: 42900,
    weight: "400 г",
  },
  {
    id: 30,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Сосиски «Молочные» 300 г",
    price: 32900,
    weight: "300 г",
  },
];

export function HomePage() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  const addQuantityHandlers = (products: typeof frequentlyBoughtProducts) =>
    products.map((product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
      onQuantityChange: (qty: number) => handleQuantityChange(product.id, qty),
    }));

  return (
    <Stack gap="xl">
      <Carousel />

      <ProductCards
        title="Новогодняя скидка"
        items={addQuantityHandlers(discountProducts)}
      />

      <ProductCards
        title="Часто покупают"
        items={addQuantityHandlers(frequentlyBoughtProducts)}
      />

      <ProductCards
        title="Популярное"
        items={addQuantityHandlers(popularProducts)}
      />

      <ProductCards title="Новинки" items={addQuantityHandlers(newProducts)} />

      <ProductCards
        title="Недавно просмотренные"
        items={addQuantityHandlers(recentlyViewedProducts)}
      />

      <BottomNavbar />
    </Stack>
  );
}
