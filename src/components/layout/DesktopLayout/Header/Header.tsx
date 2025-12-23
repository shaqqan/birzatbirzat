import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Input,
  Menu,
  Modal,
  Stack,
  Text,
  Group,
  UnstyledButton,
} from "@mantine/core";
import {
  IconSearch,
  IconMapPin,
  IconUser,
  IconShoppingBag,
  IconHeart,
  IconCreditCard,
  IconLogout,
} from "@tabler/icons-react";
import { AddressModal } from "@/components/ui/AddressModal";
import { LoginModal } from "@/components/ui/LoginModal";
import classes from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();
  const [addressModalOpened, setAddressModalOpened] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [logoutModalOpened, setLogoutModalOpened] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const handleAddressConfirm = (
    address: string,
    coordinates: [number, number]
  ) => {
    setSelectedAddress(address);
    console.log("Selected coordinates:", coordinates);
  };

  const handleLogout = () => {
    setLogoutModalOpened(false);
    // TODO: Implement actual logout logic
    console.log("User logged out");
  };

  const isLoggedIn = true;

  return (
    <header className={classes.header}>
      <div className={`${classes.headerContent} container`}>
        <div className={classes.headerLeft}>
          <img src="/logo/full-logo.svg" alt="logo" />
          <Input
            placeholder="Search"
            size="md"
            radius="lg"
            leftSection={<IconSearch size={18} />}
            styles={{
              input: {
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-gray-9)",
                border: "none",
                width: "320px",
              },
            }}
          />
        </div>
        <div className={classes.headerRight}>
          <Button
            variant="light"
            size="md"
            radius="lg"
            leftSection={<IconMapPin size={18} />}
            onClick={() => setAddressModalOpened(true)}
            styles={{
              root: {
                backgroundColor: "var(--mantine-color-gray-1)",
                color: "var(--mantine-color-gray-9)",
                border: "none",
                maxWidth: "300px",
              },
            }}
          >
            {selectedAddress ? selectedAddress : "Адрес доставки"}
          </Button>
          {!isLoggedIn ? (
            <Button
              variant="light"
              size="md"
              radius="lg"
              onClick={() => setLoginModalOpened(true)}
              styles={{
                root: {
                  backgroundColor: "var(--mantine-color-gray-1)",
                  color: "var(--mantine-color-gray-9)",
                  border: "none",
                  width: "100px",
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-gray-2)",
                  },
                },
              }}
            >
              Войти
            </Button>
          ) : (
            <Menu
              width={220}
              position="bottom-end"
              offset={8}
              shadow="lg"
              radius="md"
              trigger="hover"
              openDelay={100}
              closeDelay={200}
              withArrow
              styles={{
                dropdown: {
                  border: "1px solid var(--mantine-color-gray-2)",
                  padding: "8px",
                },
                item: {
                  borderRadius: "8px",
                  padding: "10px 12px",
                },
              }}
            >
              <Menu.Target>
                <UnstyledButton className={classes.avatarButton}>
                  <Avatar
                    src={"/avatar/begis.jpg"}
                    size={40}
                    radius="xl"
                    color="red"
                  >
                    <IconUser size={20} />
                  </Avatar>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconUser size={18} />}
                  className={classes.menuItem}
                  onClick={() => navigate("/profile")}
                >
                  Профиль
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconShoppingBag size={18} />}
                  className={classes.menuItem}
                  onClick={() => navigate("/orders")}
                >
                  Заказы
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconHeart size={18} />}
                  className={classes.menuItem}
                  onClick={() => navigate("/favorites")}
                >
                  Избранное
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconCreditCard size={18} />}
                  className={classes.menuItem}
                >
                  Способы оплаты
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  leftSection={<IconLogout size={18} />}
                  color="red"
                  className={classes.menuItem}
                  onClick={() => setLogoutModalOpened(true)}
                >
                  Выйти
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>

      <AddressModal
        opened={addressModalOpened}
        onClose={() => setAddressModalOpened(false)}
        onConfirm={handleAddressConfirm}
      />

      <LoginModal
        opened={loginModalOpened}
        onClose={() => setLoginModalOpened(false)}
        onSendOtp={(phone) => {
          console.log("OTP sent to:", phone);
        }}
        onVerifyOtp={(phone, otp) => {
          console.log("Verify OTP:", phone, otp);
        }}
      />

      <Modal
        opened={logoutModalOpened}
        onClose={() => setLogoutModalOpened(false)}
        centered
        radius="lg"
        padding="xl"
        size="sm"
        withCloseButton={false}
      >
        <Stack align="center" gap="md">
          <Text fw={600} size="lg" ta="center">
            Выйти из аккаунта
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Вы уверены, что хотите выйти? Вам нужно будет войти снова.
          </Text>
          <Group mt="md" w="100%" grow>
            <Button
              variant="outline"
              color="gray"
              radius="md"
              onClick={() => setLogoutModalOpened(false)}
            >
              Отмена
            </Button>
            <Button
              variant="filled"
              color="red"
              radius="md"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </Group>
        </Stack>
      </Modal>
    </header>
  );
}
