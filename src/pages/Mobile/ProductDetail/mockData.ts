import type { Product } from "@/types";

export const mockProduct: Product = {
  id: 1,
  image:
    "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
  title: "Молоко цельное 3,4%-6% «Нашей дойки» пастеризованное, 900 мл.",
  price: 14990,
  discountPrice: 12490,
  weight: "900 мл",
  description:
    "Цельное пастеризованное молоко «Нашей дойки» с жирностью 3,4%-6%. Натуральный вкус, свежесть и польза для всей семьи.",
  brand: "Нашей дойки",
  category: "Молочные продукты",
  nutritionFacts: {
    calories: 85,
    proteins: 3,
    fats: 6,
    carbs: 4.7,
  },
  storage: "от +2 °C до +4 °C",
  shelfLife: "10 д.",
};

export const similarProducts: Product[] = [
  {
    id: 2,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 2,5% «Простоквашино» 930 мл",
    price: 17900,
    weight: "930 мл",
  },
  {
    id: 3,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Молоко 3,2% «Parmalat» 1 л",
    price: 22900,
    weight: "1 л",
  },
  {
    id: 4,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко топленое 4% 500 мл",
    price: 14900,
    weight: "500 мл",
  },
  {
    id: 5,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Молоко безлактозное 1,5% 900 мл",
    price: 28900,
    weight: "900 мл",
  },
];

export const boughtWithProducts: Product[] = [
  {
    id: 8,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Хлопья овсяные «Геркулес» 500 г",
    price: 12900,
    weight: "500 г",
  },
  {
    id: 9,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Мёд натуральный цветочный 350 г",
    price: 45900,
    discountPrice: 38900,
    weight: "350 г",
  },
  {
    id: 10,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сахар белый рафинированный 1 кг",
    price: 9900,
    weight: "1 кг",
  },
  {
    id: 11,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Какао-порошок «Золотой ярлык» 100 г",
    price: 18900,
    weight: "100 г",
  },
];

export const nutritionConfig = [
  { key: "calories" as const, label: "ккал", suffix: "" },
  { key: "proteins" as const, label: "белки", suffix: "" },
  { key: "fats" as const, label: "жиры", suffix: "" },
  { key: "carbs" as const, label: "углеводы", suffix: "" },
];

export const productSections = [
  { title: "Похожие товары", products: similarProducts },
  { title: "С этим товаром покупают", products: boughtWithProducts },
];
