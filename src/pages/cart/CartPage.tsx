import { BottomNavbar } from "@/shared/ui";
import { Container } from "@/shared/ui";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CartPage.module.css";

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
}

function SwipeableItem({ children, onDelete }: SwipeableItemProps) {
  const [translateX, setTranslateX] = useState(0);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = translateX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.touches[0].clientX - startXRef.current;
    const newTranslate = Math.min(0, Math.max(-80, currentXRef.current + diff));
    setTranslateX(newTranslate);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    if (translateX < -40) {
      setTranslateX(-80);
    } else {
      setTranslateX(0);
    }
  };

  return (
    <Box className={classes.swipeableContainer}>
      <Box className={classes.deleteAction} onClick={onDelete}>
        <IconTrash size={22} color="white" />
      </Box>
      <Box
        className={classes.swipeableContent}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </Box>
    </Box>
  );
}

interface BasketItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  weight: string;
}

const initialBasketItems: BasketItem[] = [
  {
    id: 1,
    name: "«Простоквашино» Молоко 2,5% пастеризованное",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 8490,
    oldPrice: 12490,
    quantity: 1,
    weight: "930 мл",
  },
  {
    id: 2,
    name: "«Простоквашино» Молоко 2,5% пастеризованное",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 10490,
    quantity: 1,
    weight: "900 мл",
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU").replace(",", " ");
}

export function CartPage() {
  const navigate = useNavigate();
  const [basketItems, setBasketItems] =
    useState<BasketItem[]>(initialBasketItems);

  const handleIncrement = (id: number) => {
    setBasketItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setBasketItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryPrice = 6000;
  const finalPrice = totalPrice + deliveryPrice;

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Group justify="space-between" align="center">
          <Text className={classes.title}>Корзина</Text>
          <ActionIcon variant="subtle" color="red" size="lg">
            <IconTrash size={22} />
          </ActionIcon>
        </Group>
      </Box>

      <Box className={classes.itemCountWrapper}>
        <Text className={classes.itemCount}>{itemCount} товара</Text>
      </Box>

      <Stack gap={0}>
        {basketItems.map((item) => (
          <Box key={item.id}>
            <SwipeableItem onDelete={() => handleRemove(item.id)}>
              <Flex
                className={classes.basketItem}
                style={{ marginLeft: "16px" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  w={96}
                  h={96}
                  fit="contain"
                  className={classes.itemImage}
                />
                <Box className={classes.itemInfo}>
                  <Text className={classes.itemName}>{item.name}</Text>
                  <Flex align="center" gap={8}>
                    <Text className={classes.itemPrice}>
                      {formatPrice(item.price)} сум
                    </Text>
                    {item.oldPrice && (
                      <Text className={classes.itemOldPrice}>
                        {formatPrice(item.oldPrice)} сум
                      </Text>
                    )}
                  </Flex>
                  <Text className={classes.itemWeight}>{item.weight}</Text>
                  <Flex className={classes.quantityControl}>
                    <ActionIcon
                      variant="subtle"
                      color="dark"
                      size="md"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <IconMinus size={18} />
                    </ActionIcon>
                    <Text className={classes.quantity}>{item.quantity}</Text>
                    <ActionIcon
                      variant="subtle"
                      color="dark"
                      size="md"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <IconPlus size={18} />
                    </ActionIcon>
                  </Flex>
                </Box>
              </Flex>
            </SwipeableItem>
            <Divider className={classes.divider} />
          </Box>
        ))}
      </Stack>

      <Container>
        <Box className={classes.promoSection}>
          <Flex
            align="center"
            justify="space-between"
            className={classes.promoCard}
          >
            <Flex align="center" gap={12}>
              <Text className={classes.promoIcon}>%</Text>
              <Box>
                <Text className={classes.promoTitle}>Есть промокод?</Text>
                <Text className={classes.promoSubtitle}>
                  Выберите или введите новый
                </Text>
              </Box>
            </Flex>
            <IconChevronRight size={20} color="var(--mantine-color-gray-5)" />
          </Flex>
        </Box>

        <Box className={classes.summary}>
          <Flex justify="space-between" className={classes.summaryRow}>
            <Text className={classes.summaryLabel}>Товары ({itemCount})</Text>
            <Text className={classes.summaryValue}>
              {formatPrice(totalPrice)} сум
            </Text>
          </Flex>
          <Flex justify="space-between" className={classes.summaryRow}>
            <Text className={classes.summaryLabel}>Доставка</Text>
            <Text className={classes.summaryValue}>
              {formatPrice(deliveryPrice)} сум
            </Text>
          </Flex>
          <Divider my="sm" />
          <Flex justify="space-between" className={classes.totalRow}>
            <Text className={classes.totalLabel}>Всего</Text>
            <Text className={classes.totalValue}>
              {formatPrice(finalPrice)} сум
            </Text>
          </Flex>
        </Box>
      </Container>

      <Box className={classes.footer}>
        <Button
          fullWidth
          size="lg"
          className={classes.checkoutButton}
          onClick={() => navigate("/checkout")}
        >
          Оформить заказ
        </Button>
      </Box>

      <BottomNavbar />
    </Flex>
  );
}
