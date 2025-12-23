import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Badge,
  Image,
  Collapse,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import {
  IconChevronDown,
  IconPackage,
  IconCheck,
  IconTruck,
  IconClock,
  IconX,
} from "@tabler/icons-react";
import classes from "./OrdersPage.module.css";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "in_progress" | "cancelled" | "pending";
  totalPrice: number;
  deliveryAddress: string;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "RD-2024-001542",
    date: "2024-12-20",
    status: "delivered",
    totalPrice: 156000,
    deliveryAddress: "ул. Навои 25, кв. 42",
    items: [
      {
        id: "1",
        name: "Молоко 3,2% «Домик в деревне» 930 мл",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
        price: 18900,
        quantity: 2,
      },
      {
        id: "2",
        name: "Хлеб белый «Нарезной» 400 г",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
        price: 8900,
        quantity: 1,
      },
      {
        id: "3",
        name: "Яйца куриные С1 10 шт",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
        price: 24900,
        quantity: 1,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "RD-2024-001538",
    date: "2024-12-18",
    status: "in_progress",
    totalPrice: 89000,
    deliveryAddress: "ул. Навои 25, кв. 42",
    items: [
      {
        id: "4",
        name: "Бананы 1 кг",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
        price: 19900,
        quantity: 2,
      },
      {
        id: "5",
        name: "Апельсины 1 кг",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
        price: 34900,
        quantity: 1,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "RD-2024-001520",
    date: "2024-12-15",
    status: "delivered",
    totalPrice: 234000,
    deliveryAddress: "ул. Амира Темура 108",
    items: [
      {
        id: "6",
        name: "Куриная грудка 500 г",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
        price: 54900,
        quantity: 2,
      },
      {
        id: "7",
        name: "Лосось стейк 200 г",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
        price: 89900,
        quantity: 1,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "RD-2024-001498",
    date: "2024-12-10",
    status: "cancelled",
    totalPrice: 45000,
    deliveryAddress: "ул. Навои 25, кв. 42",
    items: [
      {
        id: "8",
        name: "Сыр «Российский» 200 г",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
        price: 42900,
        quantity: 1,
      },
    ],
  },
];

const statusConfig = {
  delivered: {
    label: "Доставлен",
    color: "green",
    icon: IconCheck,
  },
  in_progress: {
    label: "В пути",
    color: "blue",
    icon: IconTruck,
  },
  pending: {
    label: "Ожидает",
    color: "yellow",
    icon: IconClock,
  },
  cancelled: {
    label: "Отменён",
    color: "red",
    icon: IconX,
  },
};

function formatPrice(price: number): string {
  return price.toLocaleString("uz-UZ") + " сум";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [opened, setOpened] = useState(false);
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <Paper radius="lg" className={classes.orderCard} withBorder>
      <UnstyledButton
        className={classes.orderHeader}
        onClick={() => setOpened((o) => !o)}
      >
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <div className={classes.orderInfo}>
            <Group gap="sm" align="center">
              <div className={classes.orderIcon}>
                <IconPackage size={20} />
              </div>
              <div>
                <Text className={classes.orderNumber}>{order.orderNumber}</Text>
                <Text className={classes.orderDate}>{formatDate(order.date)}</Text>
              </div>
            </Group>
          </div>

          <Group gap="md" align="center">
            <Badge
              color={status.color}
              variant="light"
              size="lg"
              radius="md"
              leftSection={<StatusIcon size={14} />}
            >
              {status.label}
            </Badge>
            <IconChevronDown
              size={20}
              className={classes.chevron}
              data-opened={opened || undefined}
            />
          </Group>
        </Group>

        <Group justify="space-between" mt="md">
          <Text className={classes.itemsCount}>
            {order.items.length} {order.items.length === 1 ? "товар" : "товаров"}
          </Text>
          <Text className={classes.totalPrice}>{formatPrice(order.totalPrice)}</Text>
        </Group>
      </UnstyledButton>

      <Collapse in={opened}>
        <Divider my="md" />

        <div className={classes.orderDetails}>
          <Text className={classes.sectionLabel}>Адрес доставки</Text>
          <Text className={classes.deliveryAddress}>{order.deliveryAddress}</Text>

          <Text className={classes.sectionLabel} mt="md">
            Товары
          </Text>
          <Stack gap="sm" mt="xs">
            {order.items.map((item) => (
              <div key={item.id} className={classes.orderItem}>
                <Image
                  src={item.image}
                  w={48}
                  h={48}
                  radius="md"
                  fit="contain"
                  className={classes.itemImage}
                />
                <div className={classes.itemInfo}>
                  <Text className={classes.itemName}>{item.name}</Text>
                  <Group gap="xs">
                    <Text className={classes.itemQuantity}>
                      {item.quantity} шт
                    </Text>
                    <Text className={classes.itemPrice}>
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Group>
                </div>
              </div>
            ))}
          </Stack>
        </div>
      </Collapse>
    </Paper>
  );
}

export function OrdersPage() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2} className={classes.pageTitle}>
          История заказов
        </Title>

        {orders.length === 0 ? (
          <Paper radius="lg" p="xl" className={classes.emptyState}>
            <IconPackage size={64} className={classes.emptyIcon} />
            <Text className={classes.emptyTitle}>Заказов пока нет</Text>
            <Text className={classes.emptyDescription}>
              Ваши заказы будут отображаться здесь
            </Text>
          </Paper>
        ) : (
          <Stack gap="md">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
