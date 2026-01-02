import type { ProductCardItem } from "@/features/products";

// Base product type for mock data
export interface MockProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
  weight: string;
  isHit?: boolean;
}

export const specialProducts: MockProduct[] = [
  {
    id: 1,
    image: "/products/1.png",
    title: "Ржаной хлеб «Wasa Fiber»",
    price: 16000,
    discountPrice: 14490,
    isHit: true,
    weight: "250 г",
  },
  {
    id: 2,
    image: "/products/2.png",
    title: "Кофе молотый Mehmet Efendi",
    price: 126990,
    discountPrice: 103890,
    weight: "250 г",
  },
  {
    id: 3,
    image: "/products/1.png",
    title: "Ржаной хлеб «Wasa Fiber»",
    price: 16000,
    discountPrice: 14490,
    isHit: true,
    weight: "250 г",
  },
  {
    id: 4,
    image: "/products/2.png",
    title: "Кофе молотый Mehmet Efendi",
    price: 126990,
    discountPrice: 103890,
    isHit: true,
    weight: "250 г",
  },
  {
    id: 5,
    image: "/products/1.png",
    title: "Ржаной хлеб «Wasa Fiber»",
    price: 16000,
    discountPrice: 14490,
    weight: "250 г",
  },
  {
    id: 6,
    image: "/products/2.png",
    title: "Кофе молотый Mehmet Efendi",
    price: 126990,
    discountPrice: 103890,
    isHit: true,
    weight: "250 г",
  },
];

export const frequentlyBoughtProducts: MockProduct[] = [
  {
    id: 1,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Молоко 3,2% «Домик в деревне» 930 мл",
    price: 16000,
    discountPrice: 14490,
    weight: "930 мл",
    isHit: true,
  },
  {
    id: 2,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2783132/1a8a9267-325c-439c-bf8a-092772581c71/464x464-webp",
    title:
      "Яйцо куриное С1 «Фермер Александров» от кур свободного выгула 9 шт.",
    price: 8900,
    weight: "400 г",
    isHit: true,
  },
  {
    id: 3,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2888787/0f2f238e-0833-4d25-a58e-5108e1f45d62/464x464-webp",
    title: "Лук репчатый 1 кг",
    price: 24900,
    weight: "10 шт",
  },
  {
    id: 4,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2998515/04039977-a7d9-4577-a680-9b32862cc941/464x464-webp",
    title: "Суповой набор говяжий «Из Лавки» охлаждённый 400 г",
    price: 32900,
    weight: "180 г",
    isHit: true,
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

export const discountProducts: MockProduct[] = [
  {
    id: 7,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2888787/0695d226-781c-4e2d-94ed-255d1fb2c37a/464x464-webp",
    title:
      "Сыр Грюйер молодой «Сыроварня Липин Бор» 3 месяца выдержки 50% 180 г",
    price: 16990,
    discountPrice: 14490,
    weight: "230 г",
    isHit: true,
  },
  {
    id: 8,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2888787/5f99b86c-7aef-482c-90af-920d0f849c75/464x464-webp",
    title: "Хлеб Монж 280 г",
    price: 38900,
    discountPrice: 29900,
    weight: "2 л",
  },
  {
    id: 9,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/c1c68abe-ccf4-4f0a-ba7f-a0c0e31ef2c8/464x464-webp",
    title: "Помидоры Пинк Чемпион 500 г",
    price: 14900,
    discountPrice: 11900,
    weight: "290 г",
    isHit: true,
  },
  {
    id: 10,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/6247604/87b2eaff-e7dc-4932-9c97-30e6b97f8392/464x464-webp",
    title: "Картофель отборный 2,5 кг",
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
    isHit: true,
  },
  {
    id: 12,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2791769/51ee53c0-055f-4ed3-99c9-1ff29a072374/464x464-webp",
    title: "Морковь мытая 1 кг",
    price: 15900,
    discountPrice: 12900,
    weight: "1 л",
  },
];

export const popularProducts: MockProduct[] = [
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

export const newProducts: MockProduct[] = [
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
    isHit: true,
  },
  {
    id: 21,
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    title: "Хумус классический 200 г",
    price: 28900,
    weight: "200 г",
    isHit: true,
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

export const recentlyViewedProducts: MockProduct[] = [
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
    isHit: true,
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
    isHit: true,
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

// Helper function to add quantity handlers
export function addQuantityHandlers(
  products: MockProduct[],
  quantities: Record<number, number>,
  onQuantityChange: (id: number, qty: number) => void
): ProductCardItem[] {
  return products.map((product) => ({
    ...product,
    quantity: quantities[product.id] || 0,
    onQuantityChange: (qty: number) => onQuantityChange(product.id, qty),
  }));
}
