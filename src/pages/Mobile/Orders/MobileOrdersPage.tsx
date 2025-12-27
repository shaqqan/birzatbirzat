import { BottomNavbar } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconRefresh,
  IconShoppingBag,
  IconTruck,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MobileOrdersPage.module.css";

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

type FilterTab = "all" | "active" | "completed";

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
  {
    id: "5",
    orderNumber: "RD-2024-001485",
    date: "2024-12-08",
    status: "pending",
    totalPrice: 67500,
    deliveryAddress: "ул. Навои 25, кв. 42",
    items: [
      {
        id: "9",
        name: "Сок яблочный 1л",
        image:
          "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
        price: 22500,
        quantity: 3,
      },
    ],
  },
];

const statusConfig = {
  delivered: {
    label: "Доставлен",
    color: "green",
    icon: IconCheck,
    bgColor: "var(--mantine-color-green-0)",
    textColor: "var(--mantine-color-green-7)",
  },
  in_progress: {
    label: "В пути",
    color: "blue",
    icon: IconTruck,
    bgColor: "var(--mantine-color-blue-0)",
    textColor: "var(--mantine-color-blue-7)",
  },
  pending: {
    label: "Ожидает",
    color: "yellow",
    icon: IconClock,
    bgColor: "var(--mantine-color-yellow-0)",
    textColor: "var(--mantine-color-yellow-8)",
  },
  cancelled: {
    label: "Отменён",
    color: "red",
    icon: IconX,
    bgColor: "var(--mantine-color-red-0)",
    textColor: "var(--mantine-color-red-7)",
  },
};

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "active", label: "Активные" },
  { key: "completed", label: "Завершённые" },
];

function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU").replace(",", " ") + " сум";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Сегодня";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Вчера";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
}

interface OrderCardProps {
  order: Order;
  onReorder?: () => void;
}

function OrderCard({ order, onReorder }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const previewItems = order.items.slice(0, 3);
  const moreCount = order.items.length - 3;

  return (
    <Box className={classes.orderCard}>
      <Flex
        className={classes.cardHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <Box className={classes.orderMeta}>
          <Flex align="center" gap={8}>
            <Text className={classes.orderNumber}>#{order.orderNumber.split("-").pop()}</Text>
            <Badge
              size="sm"
              radius="sm"
              variant="light"
              color={status.color}
              leftSection={<StatusIcon size={12} />}
              className={classes.statusBadge}
            >
              {status.label}
            </Badge>
          </Flex>
          <Flex align="center" gap={6} mt={4}>
            <Text className={classes.orderDate}>{formatDate(order.date)}</Text>
            <Text className={classes.dot}>•</Text>
            <Text className={classes.itemsCount}>
              {order.items.length} {order.items.length === 1 ? "товар" : "товаров"}
            </Text>
          </Flex>
        </Box>
        <Flex align="center" gap={8}>
          <Text className={classes.totalPrice}>{formatPrice(order.totalPrice)}</Text>
          <IconChevronDown
            size={18}
            className={classes.chevron}
            data-expanded={expanded || undefined}
          />
        </Flex>
      </Flex>

      <Flex className={classes.previewImages}>
        {previewItems.map((item) => (
          <Box key={item.id} className={classes.previewImageWrapper}>
            <Image
              src={item.image}
              alt={item.name}
              w={48}
              h={48}
              fit="contain"
              radius="md"
              className={classes.previewImage}
            />
            {item.quantity > 1 && (
              <Box className={classes.quantityBadge}>
                <Text className={classes.quantityText}>{item.quantity}</Text>
              </Box>
            )}
          </Box>
        ))}
        {moreCount > 0 && (
          <Box className={classes.moreItems}>
            <Text className={classes.moreText}>+{moreCount}</Text>
          </Box>
        )}
      </Flex>

      <Collapse in={expanded}>
        <Divider my="sm" color="gray.2" />

        <Box className={classes.expandedContent}>
          <Box className={classes.addressSection}>
            <Text className={classes.sectionLabel}>Адрес доставки</Text>
            <Text className={classes.addressText}>{order.deliveryAddress}</Text>
          </Box>

          <Box className={classes.itemsSection}>
            <Text className={classes.sectionLabel}>Состав заказа</Text>
            <Stack gap={8} mt={8}>
              {order.items.map((item) => (
                <Flex key={item.id} className={classes.orderItem}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w={56}
                    h={56}
                    fit="contain"
                    radius="md"
                    className={classes.itemImage}
                  />
                  <Box className={classes.itemDetails}>
                    <Text className={classes.itemName}>{item.name}</Text>
                    <Flex align="center" gap={8}>
                      <Text className={classes.itemQuantity}>{item.quantity} шт</Text>
                      <Text className={classes.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Box>

          <Flex className={classes.actionButtons}>
            {order.status === "delivered" && (
              <Button
                variant="light"
                color="primary"
                size="sm"
                leftSection={<IconRefresh size={16} />}
                className={classes.actionButton}
                onClick={onReorder}
              >
                Повторить заказ
              </Button>
            )}
            {order.status === "in_progress" && (
              <Button
                variant="light"
                color="blue"
                size="sm"
                leftSection={<IconTruck size={16} />}
                className={classes.actionButton}
              >
                Отследить
              </Button>
            )}
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
}

export function MobileOrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "active")
      return order.status === "in_progress" || order.status === "pending";
    if (activeTab === "completed")
      return order.status === "delivered" || order.status === "cancelled";
    return true;
  });

  const handleReorder = (orderId: string) => {
    console.log("Reorder:", orderId);
  };

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Flex align="center" gap={12}>
          <ActionIcon
            variant="subtle"
            color="dark"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft size={22} />
          </ActionIcon>
          <Text className={classes.title}>Мои заказы</Text>
        </Flex>
      </Box>

      <Box className={classes.tabsWrapper}>
        <Flex className={classes.tabs}>
          {filterTabs.map((tab) => (
            <Box
              key={tab.key}
              className={classes.tab}
              data-active={activeTab === tab.key || undefined}
              onClick={() => setActiveTab(tab.key)}
            >
              <Text className={classes.tabText}>{tab.label}</Text>
            </Box>
          ))}
        </Flex>
      </Box>

      <Box className={classes.content}>
        {filteredOrders.length === 0 ? (
          <Container>
            <Box className={classes.emptyState}>
              <Box className={classes.emptyIconWrapper}>
                <IconShoppingBag size={48} className={classes.emptyIcon} />
              </Box>
              <Text className={classes.emptyTitle}>
                {activeTab === "all"
                  ? "Заказов пока нет"
                  : activeTab === "active"
                  ? "Нет активных заказов"
                  : "Нет завершённых заказов"}
              </Text>
              <Text className={classes.emptyDescription}>
                {activeTab === "all"
                  ? "Ваши заказы будут отображаться здесь"
                  : "Здесь появятся ваши заказы"}
              </Text>
              <Button
                variant="filled"
                radius="md"
                size="md"
                className={classes.shopButton}
                onClick={() => navigate("/")}
              >
                Перейти к покупкам
              </Button>
            </Box>
          </Container>
        ) : (
          <Container>
            <Stack gap={12}>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onReorder={() => handleReorder(order.id)}
                />
              ))}
            </Stack>
          </Container>
        )}
      </Box>

      <BottomNavbar />
    </Flex>
  );
}
