import type { Product } from "@/types";

export const mockProduct: Product = {
  id: 1,
  image:
    "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
  title: "Молоко 3,2% «Домик в деревне» 930 мл",
  price: 18900,
  discountPrice: 15900,
  weight: "930 мл",
  description:
    "Натуральное молоко с массовой долей жира 3,2%. Изготовлено из свежего коровьего молока. Подходит для приготовления каш, выпечки и употребления в чистом виде.",
  brand: "Домик в деревне",
  category: "Молочные продукты",
  nutritionFacts: {
    calories: 58,
    proteins: 2.9,
    fats: 3.2,
    carbs: 4.7,
  },
  storage: "Хранить при температуре от +2°C до +6°C",
  shelfLife: "14 суток",
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
  {
    id: 6,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Молоко безлактозное 1,5% 900 мл",
    price: 28900,
    weight: "900 мл",
  },
  {
    id: 7,
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

export const popularProducts: Product[] = [
  {
    id: 12,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Бананы 1 кг",
    price: 19900,
    weight: "1 кг",
  },
  {
    id: 13,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Яйца куриные С1 10 шт",
    price: 24900,
    weight: "10 шт",
  },
  {
    id: 14,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Хлеб белый нарезной 400 г",
    price: 8900,
    weight: "400 г",
  },
  {
    id: 15,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Куриная грудка охлаждённая 500 г",
    price: 54900,
    discountPrice: 47900,
    weight: "500 г",
  },
];

export const viewedProducts: Product[] = [
  {
    id: 16,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сыр «Российский» 200 г",
    price: 42900,
    weight: "200 г",
  },
  {
    id: 17,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Масло сливочное 82,5% 180 г",
    price: 32900,
    weight: "180 г",
  },
  {
    id: 18,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    title: "Сметана 20% 300 г",
    price: 15900,
    discountPrice: 12900,
    weight: "300 г",
  },
  {
    id: 19,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Творог 9% 200 г",
    price: 18900,
    weight: "200 г",
  },
];

// Nutrition facts configuration for rendering
export const nutritionConfig = [
  { key: "calories" as const, label: "ккал", suffix: "" },
  { key: "proteins" as const, label: "Белки", suffix: " г" },
  { key: "fats" as const, label: "Жиры", suffix: " г" },
  { key: "carbs" as const, label: "Углеводы", suffix: " г" },
];

// Product sections configuration
export const productSections = [
  { title: "Похожие товары", products: similarProducts },
  { title: "С этим товаром покупают", products: boughtWithProducts },
  { title: "Популярное", products: popularProducts },
  { title: "Просмотренные товары", products: viewedProducts },
];
