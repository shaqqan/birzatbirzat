import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Text,
  Group,
  Paper,
  TextInput,
  Textarea,
  Button,
  Image,
  Divider,
  Radio,
  UnstyledButton,
  Input,
  ActionIcon,
  Breadcrumbs,
  Anchor,
  Grid,
  GridCol,
} from "@mantine/core";
import {
  IconMapPin,
  IconPhone,
  IconUser,
  IconClock,
  IconCash,
  IconCreditCard,
  IconChevronRight,
  IconChevronLeft,
  IconCheck,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import { AddressModal } from "@/components/ui/AddressModal/AddressModal";
import classes from "./CheckoutPage.module.css";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  quantity: number;
  unit: string;
}

type PaymentMethod = "cash" | "card";
type DeliveryTime = "asap" | "scheduled";

// Mock cart items
const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Молоко 3,2% «Домик в деревне» 930 мл",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 15000,
    oldPrice: 18000,
    quantity: 2,
    unit: "930 мл",
  },
  {
    id: "2",
    name: "Хлеб белый нарезной «Хлебный дом»",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/5102f255-bc19-4909-933a-4df4a1289e58/600x600?webp=true",
    price: 8000,
    oldPrice: null,
    quantity: 1,
    unit: "400 г",
  },
  {
    id: "3",
    name: "Сыр «Российский» 50% 200г",
    image:
      "https://yastatic.net/avatars/get-grocery-goods/2750890/f387e932-ff15-4fb6-9897-6c77e1a48271/600x600?webp=true",
    price: 32000,
    oldPrice: 38000,
    quantity: 1,
    unit: "200 г",
  },
];

const deliveryTimeSlots = [
  { id: "asap", label: "Как можно скорее", time: "15-30 мин" },
  { id: "10-12", label: "10:00 - 12:00", time: "Сегодня" },
  { id: "12-14", label: "12:00 - 14:00", time: "Сегодня" },
  { id: "14-16", label: "14:00 - 16:00", time: "Сегодня" },
  { id: "16-18", label: "16:00 - 18:00", time: "Сегодня" },
  { id: "18-20", label: "18:00 - 20:00", time: "Сегодня" },
];

function formatPrice(price: number): string {
  return price.toLocaleString("uz-UZ");
}

const breadcrumbItems = [
  { title: "Главная", href: "/" },
  { title: "Оформление заказа", href: "#" },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressModalOpened, setAddressModalOpened] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>("asap");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<CartItem[]>(cartItems);

  const handleAddressConfirm = useCallback((newAddress: string) => {
    setAddress(newAddress);
  }, []);

  const handleQuantityChange = useCallback((itemId: string, delta: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const oldSubtotal = items.reduce(
    (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
    0
  );
  const savings = oldSubtotal - subtotal;
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isFormValid =
    name.trim() && phone.replace(/\D/g, "").length >= 9 && address.trim();

  const handleSubmit = () => {
    if (!isFormValid) return;

    const orderData = {
      customer: { name, phone },
      address,
      deliveryTime: selectedTimeSlot,
      paymentMethod,
      comment,
      items,
      total,
    };

    console.log("Order submitted:", orderData);
    // Here you would send the order to the API
  };

  return (
    <Grid className={classes.container}>
      <GridCol span={72 / 10}>
        <div className={classes.mainContent}>
          {/* Header with back button and breadcrumbs */}
          <Group className={classes.header}>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={() => navigate(-1)}
              className={classes.backButton}
            >
              <IconChevronLeft size={24} />
            </ActionIcon>
            <Breadcrumbs className={classes.breadcrumbs}>
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

          <Text className={classes.pageTitle}>Оформление заказа</Text>

          <Paper className={classes.formCard} radius="lg">
            {/* Contact Information */}
            <div className={classes.formSection}>
              <Text className={classes.sectionTitle}>Контактные данные</Text>
              <Stack gap="md" mt="md">
                <TextInput
                  label="Имя"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftSection={<IconUser size={18} />}
                  radius="md"
                  size="lg"
                  classNames={{ label: classes.inputLabel }}
                />
                <Input.Wrapper
                  label="Номер телефона"
                  classNames={{ label: classes.inputLabel }}
                >
                  <Input
                    component={IMaskInput}
                    mask="+998 (00) 000-00-00"
                    placeholder="+998 (__) ___-__-__"
                    value={phone}
                    onAccept={(value: string) => setPhone(value)}
                    leftSection={<IconPhone size={18} />}
                    radius="md"
                    size="lg"
                  />
                </Input.Wrapper>
              </Stack>
            </div>

            <Divider my="xl" />

            {/* Delivery Address */}
            <div className={classes.formSection}>
              <Text className={classes.sectionTitle}>Адрес доставки</Text>
              <UnstyledButton
                className={classes.addressButton}
                onClick={() => setAddressModalOpened(true)}
              >
                <Group gap="sm" wrap="nowrap">
                  <div className={classes.addressIcon}>
                    <IconMapPin size={20} />
                  </div>
                  <div className={classes.addressContent}>
                    {address ? (
                      <Text className={classes.addressText}>{address}</Text>
                    ) : (
                      <Text className={classes.addressPlaceholder}>
                        Выберите адрес доставки
                      </Text>
                    )}
                  </div>
                  <IconChevronRight size={20} className={classes.chevron} />
                </Group>
              </UnstyledButton>
            </div>

            <Divider my="xl" />

            {/* Delivery Time */}
            <div className={classes.formSection}>
              <Text className={classes.sectionTitle}>Время доставки</Text>
              <Radio.Group
                value={deliveryTime}
                onChange={(value) => setDeliveryTime(value as DeliveryTime)}
                mt="md"
              >
                <Stack gap="sm">
                  <Radio
                    value="asap"
                    label={
                      <Group gap="xs">
                        <Text size="sm" fw={500}>
                          Как можно скорее
                        </Text>
                        <Text size="xs" c="dimmed">
                          15-30 мин
                        </Text>
                      </Group>
                    }
                    classNames={{ radio: classes.radio }}
                  />
                  <Radio
                    value="scheduled"
                    label={
                      <Text size="sm" fw={500}>
                        Выбрать время
                      </Text>
                    }
                    classNames={{ radio: classes.radio }}
                  />
                </Stack>
              </Radio.Group>

              {deliveryTime === "scheduled" && (
                <div className={classes.timeSlots}>
                  {deliveryTimeSlots.slice(1).map((slot) => (
                    <UnstyledButton
                      key={slot.id}
                      className={`${classes.timeSlot} ${
                        selectedTimeSlot === slot.id
                          ? classes.timeSlotActive
                          : ""
                      }`}
                      onClick={() => setSelectedTimeSlot(slot.id)}
                    >
                      <Text className={classes.timeSlotLabel}>
                        {slot.label}
                      </Text>
                      <Text className={classes.timeSlotTime}>{slot.time}</Text>
                      {selectedTimeSlot === slot.id && (
                        <IconCheck
                          size={16}
                          className={classes.timeSlotCheck}
                        />
                      )}
                    </UnstyledButton>
                  ))}
                </div>
              )}
            </div>

            <Divider my="xl" />

            {/* Payment Method */}
            <div className={classes.formSection}>
              <Text className={classes.sectionTitle}>Способ оплаты</Text>
              <div className={classes.paymentMethods}>
                <UnstyledButton
                  className={`${classes.paymentMethod} ${
                    paymentMethod === "cash" ? classes.paymentMethodActive : ""
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div className={classes.paymentIcon}>
                    <IconCash size={24} />
                  </div>
                  <div className={classes.paymentInfo}>
                    <Text className={classes.paymentTitle}>Наличными</Text>
                    <Text className={classes.paymentDescription}>
                      Оплата курьеру при получении
                    </Text>
                  </div>
                  {paymentMethod === "cash" && (
                    <div className={classes.paymentCheck}>
                      <IconCheck size={16} />
                    </div>
                  )}
                </UnstyledButton>

                <UnstyledButton
                  className={`${classes.paymentMethod} ${
                    paymentMethod === "card" ? classes.paymentMethodActive : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className={classes.paymentIcon}>
                    <IconCreditCard size={24} />
                  </div>
                  <div className={classes.paymentInfo}>
                    <Text className={classes.paymentTitle}>Картой</Text>
                    <Text className={classes.paymentDescription}>
                      Visa, Mastercard, Humo, UzCard
                    </Text>
                  </div>
                  {paymentMethod === "card" && (
                    <div className={classes.paymentCheck}>
                      <IconCheck size={16} />
                    </div>
                  )}
                </UnstyledButton>
              </div>
            </div>

            <Divider my="xl" />

            {/* Comment */}
            <div className={classes.formSection}>
              <Text className={classes.sectionTitle}>Комментарий к заказу</Text>
              <Textarea
                placeholder="Код от домофона, этаж, пожелания к заказу..."
                variant="filled"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                radius="lg"
                size="lg"
                minRows={5}
                maxRows={8}
                mt="md"
                classNames={{ input: classes.commentInput }}
              />
            </div>
          </Paper>
        </div>
      </GridCol>
      {/* Order Summary Sidebar */}
      <Grid.Col span={48 / 10}>
        <div className={classes.sidebar}>
          <Paper className={classes.summaryCard} radius="lg" p="xl">
            <Group justify="space-between" align="center" mb="md">
              <Text className={classes.summaryTitle}>Ваш заказ</Text>
              <Group gap="xs">
                <IconClock size={14} className={classes.deliveryIcon} />
                <Text className={classes.deliveryNote}>15-30 мин</Text>
              </Group>
            </Group>

            <Text className={classes.itemCount} mb="sm">
              {itemCount} товаров
            </Text>

            <div className={classes.cartItems}>
              {items.map((item) => (
                <div key={item.id} className={classes.cartItem}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w={56}
                    h={56}
                    fit="contain"
                    radius="md"
                    className={classes.cartItemImage}
                  />
                  <div className={classes.cartItemInfo}>
                    <Text className={classes.cartItemName}>{item.name}</Text>
                    <Group gap="xs" align="center">
                      <Text className={classes.cartItemPrice}>
                        {formatPrice(item.price)} сум
                      </Text>
                      {item.oldPrice && (
                        <Text className={classes.cartItemOldPrice}>
                          {formatPrice(item.oldPrice)}
                        </Text>
                      )}
                    </Group>
                  </div>
                  <div className={classes.quantityControl}>
                    <button
                      className={classes.quantityButton}
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <IconMinus size={14} />
                    </button>
                    <Text className={classes.quantity}>{item.quantity}</Text>
                    <button
                      className={classes.quantityButton}
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <IconPlus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Divider my="md" />

            <Stack gap="xs">
              <Group justify="space-between">
                <Text className={classes.summaryLabel}>Товары</Text>
                <Text className={classes.summaryValue}>
                  {formatPrice(subtotal)} сум
                </Text>
              </Group>
              {savings > 0 && (
                <Group justify="space-between">
                  <Text className={classes.summaryLabel}>Скидка</Text>
                  <Text className={classes.savingsValue}>
                    -{formatPrice(savings)} сум
                  </Text>
                </Group>
              )}
              <Group justify="space-between">
                <Text className={classes.summaryLabel}>Доставка</Text>
                <Text className={classes.freeDelivery}>Бесплатно</Text>
              </Group>
            </Stack>

            <Divider my="md" />

            <Group justify="space-between" align="center">
              <Text className={classes.totalLabel}>Итого</Text>
              <Text className={classes.totalValue}>
                {formatPrice(total)} сум
              </Text>
            </Group>

            <Button
              size="lg"
              radius="md"
              fullWidth
              mt="xl"
              className={classes.submitButton}
              disabled={!isFormValid || items.length === 0}
              onClick={handleSubmit}
            >
              Оформить заказ
            </Button>
          </Paper>
        </div>
      </Grid.Col>
      <AddressModal
        opened={addressModalOpened}
        onClose={() => setAddressModalOpened(false)}
        onConfirm={handleAddressConfirm}
      />
    </Grid>
  );
}
