import {
  Box,
  Button,
  Flex,
  Text,
  ActionIcon,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
  IconArrowLeft,
  IconChevronDown,
  IconBrandApple,
  IconCreditCard,
  IconCash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { Container } from "@/components/shared";
import classes from "./MobileCheckoutPage.module.css";

// Constants
const PAYMENT_METHODS = [
  { id: "apple_pay", icon: IconBrandApple, label: "Apple Pay" },
  { id: "card", icon: IconCreditCard, label: "Банковской картой" },
  { id: "cash", icon: IconCash, label: "Наличными курьеру" },
] as const;

const PHONE_MASK = "+{998} (00) 000-00-00";

const inputClassNames = {
  root: classes.input,
  label: classes.fieldLabel,
  input: classes.fieldInput,
};

const inputSmallClassNames = {
  root: classes.inputSmall,
  label: classes.fieldLabel,
  input: classes.fieldInput,
};

// Helpers
const formatPrice = (price: number): string =>
  price.toLocaleString("ru-RU").replace(",", " ");

// Components
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <Box className={classes.section}>
      <Text className={classes.sectionTitle}>{title}</Text>
      {children}
    </Box>
  );
}

export function MobileCheckoutPage() {
  const navigate = useNavigate();

  // Form state
  const [address] = useState("Ул. Мирзо Улугбек, 24. Ташкент, Узбекистан");
  const [entrance, setEntrance] = useState("");
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [comment, setComment] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("apple_pay");

  const totalPrice = 24980;

  const handlePay = () => {
    // Simulate payment processing
    // In real app, this would call payment API
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo
    navigate(`/payment-result?status=${isSuccess ? "success" : "error"}`);
  };

  return (
    <Flex direction="column" className={classes.page}>
      {/* Header */}
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
          <Text className={classes.title}>Оформление заказа</Text>
        </Flex>
      </Box>

      <Box className={classes.content}>
        <Container>
          {/* Delivery Address */}
          <Section title="Куда">
            <Box className={classes.card}>
              <Flex
                className={classes.addressRow}
                align="center"
                justify="space-between"
                onClick={() => navigate("/addresses/add")}
              >
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text className={classes.fieldLabel}>Адрес доставки</Text>
                  <Text className={classes.fieldValue} lineClamp={1}>
                    {address}
                  </Text>
                </Box>
                <IconChevronDown
                  size={20}
                  color="var(--mantine-color-gray-5)"
                  style={{ flexShrink: 0 }}
                />
              </Flex>

              <Flex gap={8}>
                <TextInput
                  label="Подъезд"
                  placeholder="—"
                  value={entrance}
                  onChange={(e) => setEntrance(e.target.value)}
                  variant="unstyled"
                  classNames={inputSmallClassNames}
                />
                <TextInput
                  label="Этаж"
                  placeholder="—"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  variant="unstyled"
                  classNames={inputSmallClassNames}
                />
                <TextInput
                  label="Квартира"
                  placeholder="—"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  variant="unstyled"
                  classNames={inputSmallClassNames}
                />
              </Flex>

              <Textarea
                placeholder="Комментарий для курьера"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="filled"
                autosize
                minRows={2}
                maxRows={4}
                styles={{
                  input: {
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    color: "var(--mantine-color-gray-9)",
                  },
                }}
              />
            </Box>
          </Section>

          {/* Recipient */}
          <Section title="Получатель">
            <Box className={classes.card}>
              <TextInput
                label="ФИО"
                placeholder="Введите ФИО"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                variant="unstyled"
                classNames={inputClassNames}
              />
              <Box className={classes.input}>
                <Text className={classes.fieldLabel}>Номер телефона</Text>
                <IMaskInput
                  mask={PHONE_MASK}
                  value={recipientPhone}
                  unmask={false}
                  onAccept={setRecipientPhone}
                  placeholder="+998 (00) 000-00-00"
                  className={classes.fieldInput}
                  inputMode="numeric"
                />
              </Box>
            </Box>
          </Section>

          {/* Delivery Time */}
          <Section title="Время доставки">
            <DateTimePicker
              label="Дата и время"
              placeholder="Выберите дату и время"
              value={deliveryDate}
              onChange={(value) =>
                setDeliveryDate(value ? new Date(value) : null)
              }
              variant="unstyled"
              valueFormat="DD.MM.YYYY HH:mm"
              minDate={new Date()}
              classNames={inputClassNames}
            />
          </Section>

          {/* Payment Method */}
          <Section title="Способ оплаты">
            <Radio.Group value={selectedPayment} onChange={setSelectedPayment}>
              <Flex direction="column" gap={8}>
                {PAYMENT_METHODS.map(({ id, icon: Icon, label }) => {
                  const isSelected = selectedPayment === id;
                  const color = isSelected ? "gray.9" : "gray.6";
                  return (
                    <Flex
                      key={id}
                      className={classes.paymentRow}
                      align="center"
                      justify="space-between"
                      onClick={() => setSelectedPayment(id)}
                    >
                      <Flex align="center" gap={12}>
                        <Box className={classes.paymentIcon} c={color}>
                          <Icon size={20} />
                        </Box>
                        <Text className={classes.paymentLabel} c={color}>
                          {label}
                        </Text>
                      </Flex>
                      <Radio value={id} classNames={{ radio: classes.radio }} />
                    </Flex>
                  );
                })}
              </Flex>
            </Radio.Group>
          </Section>
        </Container>
      </Box>

      {/* Footer */}
      <Box className={classes.footer}>
        <Button
          fullWidth
          size="lg"
          className={classes.payButton}
          onClick={handlePay}
          leftSection={<Text fw={600}>Оплатить</Text>}
          rightSection={<Text fw={600}>{formatPrice(totalPrice)} сум</Text>}
        />
      </Box>
    </Flex>
  );
}
