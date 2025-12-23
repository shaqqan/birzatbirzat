import {
  Stack,
  Text,
  Group,
  Image,
  ActionIcon,
  Box,
  Divider,
} from "@mantine/core";
import { IconMinus, IconPlus, IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./Basket.module.css";

interface BasketItem {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  quantity: number;
  unit: string;
}

const basketItems: BasketItem[] = [
  {
    id: "1",
    name: "Молоко 3,2% «Домик в деревне» 930 мл",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 999000,
    oldPrice: 899000,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "2",
    name: "Product 2",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 200,
    oldPrice: 250,
    quantity: 1,
    unit: "930 мл",
  },
  {
    id: "4",
    name: "Product 3",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "1",
    name: "Product 1",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "2",
    name: "Product 2",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 200,
    oldPrice: 250,
    quantity: 1,
    unit: "930 мл",
  },
  {
    id: "4",
    name: "Product 3",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "1",
    name: "Product 1",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "2",
    name: "Product 2",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 200,
    oldPrice: 250,
    quantity: 1,
    unit: "930 мл",
  },
  {
    id: "4",
    name: "Product 3",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "1",
    name: "Product 1",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "2",
    name: "Product 2",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 200,
    oldPrice: 250,
    quantity: 1,
    unit: "930 мл",
  },
  {
    id: "4",
    name: "Product 3",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "1",
    name: "Product 1",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "2",
    name: "Product 2",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 200,
    oldPrice: 250,
    quantity: 1,
    unit: "930 мл",
  },
  {
    id: "4",
    name: "Product 3",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
  {
    id: "1",
    name: "Product 1",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 100,
    oldPrice: null,
    quantity: 1,
    unit: "500 мл",
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString("uz-UZ");
}

export function Basket() {
  const navigate = useNavigate();
  const totalPrice = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalOldPrice = basketItems.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
    0
  );
  const hasSavings = totalOldPrice > totalPrice;
  const itemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  if (basketItems.length === 0) {
    return (
      <div className={classes.basket}>
        <div className={classes.emptyState}>
          <Text className={classes.emptyTitle}>Корзина пуста</Text>
          <Text className={classes.emptyDescription}>
            Доставка бесплатно, а это всегда приятно
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.basket}>
      <div className={classes.header}>
        <Group justify="space-between" align="center">
          <div>
            <Group gap={8} align="baseline">
              <Text className={classes.deliveryTime}>5-15 min</Text>
              <Text className={classes.itemCount}>{itemCount} товаров</Text>
            </Group>
            <Text className={classes.deliveryNote}>Доставка бесплатна</Text>
          </div>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="md"
            className={classes.infoButton}
          >
            <IconInfoCircle size={20} />
          </ActionIcon>
        </Group>
      </div>

      <Stack gap={0} className={classes.items}>
        {basketItems.map((item, index) => (
          <Box key={item.id}>
            <div className={classes.itemRow}>
              <div className={classes.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.name}
                  w={56}
                  h={56}
                  fit="contain"
                  className={classes.productImage}
                />
              </div>

              <Box className={classes.productInfo}>
                <Text className={classes.productName}>{item.name}</Text>
                <div className={classes.priceRow}>
                  <Text className={classes.price}>
                    {formatPrice(item.price)} сум
                  </Text>
                  {item.oldPrice && (
                    <Text className={classes.oldPrice}>
                      {formatPrice(item.oldPrice)} сум
                    </Text>
                  )}
                  <Text className={classes.unit}>{item.unit}</Text>
                </div>
              </Box>

              <div className={classes.quantityControl}>
                <ActionIcon
                  variant="transparent"
                  color="dark"
                  size={28}
                  className={classes.quantityButton}
                >
                  <IconMinus size={18} stroke={2} />
                </ActionIcon>
                <Text className={classes.quantity}>{item.quantity}</Text>
                <ActionIcon
                  variant="transparent"
                  color="dark"
                  size={28}
                  className={classes.quantityButton}
                >
                  <IconPlus size={18} stroke={2} />
                </ActionIcon>
              </div>
            </div>
            {index < basketItems.length - 1 && (
              <Divider className={classes.divider} />
            )}
          </Box>
        ))}
      </Stack>

      <div className={classes.footer}>
        <button className={classes.checkoutButton} onClick={() => navigate("/checkout")}>
          <span className={classes.checkoutContent}>
            <span className={classes.checkoutText}>Оформить</span>
            <span className={classes.priceGroup}>
              <span className={classes.totalPrice}>
                {formatPrice(totalPrice)} so'm
              </span>
              {hasSavings && (
                <span className={classes.totalOldPrice}>
                  {formatPrice(totalOldPrice)} so'm
                </span>
              )}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
