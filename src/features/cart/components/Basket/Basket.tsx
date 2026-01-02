import {
  Stack,
  Text,
  Group,
  Image,
  ActionIcon,
  Box,
  Divider,
  Flex,
  Loader,
  Center,
  Button,
} from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconInfoCircle,
  IconTruck,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/features/cart";
import { useAuth } from "@/app/providers";
import classes from "./Basket.module.css";

// Helper to get text (prefer Russian, fallback to first available)
const getText = (text: Record<string, string>): string => {
  return text.ru || text.uz || Object.values(text)[0] || "";
};

function formatPrice(price: number): string {
  return price.toLocaleString("uz-UZ");
}

export function Basket() {
  const navigate = useNavigate();
  const { isAuthenticated, openLogin } = useAuth();
  const { data: cart, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart.mutate(productId);
    } else {
      updateCartItem.mutate({ productId, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart.mutate(productId);
  };

  const isUpdating = updateCartItem.isPending || removeFromCart.isPending;

  // Not authenticated - show empty state with login prompt
  if (!isAuthenticated) {
    return (
      <div className={classes.basket}>
        <div className={classes.header}>
          <Group justify="space-between" align="center" mb={16}>
            <Flex>
              <Text className={classes.deliveryTime}>Корзина</Text>
            </Flex>
          </Group>
        </div>
        <div className={classes.emptyState}>
          <Text className={classes.emptyTitle}>Корзина пуста</Text>
          <Text className={classes.emptyDescription}>
            Войдите, чтобы увидеть товары в корзине
          </Text>
          <Button
            variant="light"
            size="sm"
            mt="md"
            onClick={openLogin}
          >
            Войти
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={classes.basket}>
        <div className={classes.header}>
          <Group justify="space-between" align="center" mb={16}>
            <Flex>
              <Text className={classes.deliveryTime}>Корзина</Text>
            </Flex>
          </Group>
        </div>
        <Center py="xl">
          <Loader size="md" />
        </Center>
      </div>
    );
  }

  const items = cart?.items || [];
  const itemCount = cart?.itemsCount || 0;
  const deliveryFee = cart?.deliveryFee || 0;
  const total = cart?.total || 0;

  // Empty cart
  if (items.length === 0) {
    return (
      <div className={classes.basket}>
        <div className={classes.header}>
          <Group justify="space-between" align="center" mb={16}>
            <Flex>
              <Text className={classes.deliveryTime}>Корзина</Text>
            </Flex>
          </Group>
        </div>
        <div className={classes.emptyState}>
          <Text className={classes.emptyTitle}>Корзина пуста</Text>
          <Text className={classes.emptyDescription}>
            Добавьте товары, чтобы оформить заказ
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.basket}>
      <div className={classes.header}>
        <Group justify="space-between" align="center" mb={16}>
          <Flex>
            <Text className={classes.deliveryTime}>Корзина</Text>
            <Text className={classes.itemCount}>({itemCount})</Text>
          </Flex>
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
        {items.map((item, index) => {
          const hasDiscount = !!item.product.displayDiscountPrice;
          const displayPrice = item.product.displayDiscountPrice || item.product.displayPrice;
          const originalPrice = hasDiscount ? item.product.displayPrice : null;

          return (
            <Box key={item.id}>
              <div className={classes.itemRow}>
                <div className={classes.imageWrapper}>
                  <Image
                    src={item.product.image || ""}
                    alt={getText(item.product.name)}
                    w={56}
                    h={56}
                    fit="contain"
                    className={classes.productImage}
                  />
                </div>

                <Box className={classes.productInfo}>
                  <Text className={classes.productName}>
                    {getText(item.product.name)}
                  </Text>
                  <div className={classes.priceRow}>
                    <Text
                      className={
                        hasDiscount ? classes.priceDiscount : classes.price
                      }
                    >
                      {formatPrice(displayPrice)} сум
                    </Text>
                    {originalPrice && (
                      <Text className={classes.oldPrice}>
                        {formatPrice(originalPrice)} сум
                      </Text>
                    )}
                    <Text className={classes.unit}>{item.product.unit}</Text>
                  </div>
                </Box>

                <div className={classes.quantityControl}>
                  {item.quantity === 1 ? (
                    <ActionIcon
                      variant="transparent"
                      color="red"
                      size={28}
                      className={classes.quantityButton}
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isUpdating}
                    >
                      <IconTrash size={20} stroke={1.5} />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      variant="transparent"
                      color="dark"
                      size={28}
                      className={classes.quantityButton}
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      disabled={isUpdating}
                    >
                      <IconMinus size={24} stroke={2} />
                    </ActionIcon>
                  )}
                  <Text className={classes.quantity}>{item.quantity}</Text>
                  <ActionIcon
                    variant="transparent"
                    color="dark"
                    size={28}
                    className={classes.quantityButton}
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    disabled={isUpdating || item.quantity >= item.product.stock}
                  >
                    <IconPlus size={24} stroke={2} />
                  </ActionIcon>
                </div>
              </div>
              {index < items.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </Box>
          );
        })}
      </Stack>

      <div className={classes.footer}>
        <div className={classes.footerInfo}>
          <div className={classes.footerInfoLeft}>
            <div className={classes.footerIcon}>
              <IconTruck size={20} stroke={1.5} />
            </div>
            <div className={classes.footerTextGroup}>
              <span className={classes.footerDeliveryTime}>15-30 мин</span>
              <span className={classes.footerDeliveryNote}>
                {deliveryFee === 0 ? "Бесплатная доставка" : `Доставка: ${formatPrice(deliveryFee)} сум`}
              </span>
            </div>
          </div>
        </div>
        <button
          className={classes.checkoutButton}
          onClick={() => navigate("/checkout")}
        >
          <span className={classes.checkoutContent}>
            <span className={classes.checkoutLeft}>
              <span className={classes.checkoutText}>Оформить</span>
            </span>
            <span className={classes.priceGroup}>
              <span className={classes.totalPrice}>
                {formatPrice(total)} сум
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
