import { BottomNavbar } from "@/components/ui";
import { Container } from "@/components/shared";
import { Avatar, Box, Flex, Text } from "@mantine/core";
import {
  IconChevronRight,
  IconHeart,
  IconLanguage,
  IconLogout,
  IconMapPin,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./MobileProfilePage.module.css";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  path?: string;
  onClick?: () => void;
  iconBg?: string;
  iconColor?: string;
}

export function MobileProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: "Орынбаев Бегис",
    phone: "+998 90 123 45 67",
    avatar: "/avatar/begis.jpg",
  };

  const menuItems: MenuItem[] = [
    {
      icon: <IconShoppingBag size={20} />,
      label: "Мои заказы",
      subtitle: "История и статус заказов",
      path: "/orders",
      iconBg: "var(--mantine-color-blue-1)",
      iconColor: "var(--mantine-color-blue-6)",
    },
    {
      icon: <IconHeart size={20} />,
      label: "Избранное",
      subtitle: "Сохранённые товары",
      path: "/favorites",
      iconBg: "var(--mantine-color-red-1)",
      iconColor: "var(--mantine-color-red-6)",
    },
    {
      icon: <IconMapPin size={20} />,
      label: "Мои адреса",
      subtitle: "Адреса доставки",
      path: "/addresses",
      iconBg: "var(--mantine-color-green-1)",
      iconColor: "var(--mantine-color-green-6)",
    },
    {
      icon: <IconLanguage size={20} />,
      label: "Язык",
      subtitle: "Русский",
      path: "/language",
      iconBg: "var(--mantine-color-violet-1)",
      iconColor: "var(--mantine-color-violet-6)",
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Text className={classes.title}>Профиль</Text>
      </Box>

      <Container>
        {/* User Card */}
        <Box className={classes.userCard} onClick={handleEditProfile}>
          <Box className={classes.userCardTop}>
            <Box className={classes.avatarWrapper}>
              <Avatar src={user.avatar} size={80} radius="50%">
                <IconUser size={32} />
              </Avatar>
            </Box>
            <Box className={classes.userInfo}>
              <Text className={classes.userName}>{user.name}</Text>
              <Text className={classes.userPhone}>{user.phone}</Text>
            </Box>
          </Box>
        </Box>

        {/* Menu Items */}
        <Box className={classes.menuSection}>
          <Text className={classes.sectionTitle}>Мои данные</Text>
          <Box className={classes.menuCard}>
            {menuItems.map((item, index) => (
              <Box key={index}>
                <Flex
                  className={classes.menuItem}
                  onClick={() => handleMenuClick(item)}
                >
                  <Box
                    className={classes.menuIcon}
                    style={{
                      backgroundColor: item.iconBg,
                      color: item.iconColor,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box className={classes.menuContent}>
                    <Text className={classes.menuLabel}>{item.label}</Text>
                    {item.subtitle && (
                      <Text className={classes.menuSubtitle}>
                        {item.subtitle}
                      </Text>
                    )}
                  </Box>
                  <IconChevronRight
                    size={20}
                    color="var(--mantine-color-gray-4)"
                  />
                </Flex>
                {index < menuItems.length - 1 && (
                  <Box className={classes.menuDivider} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Logout Button */}
        <Flex className={classes.logoutButton} onClick={handleLogout}>
          <IconLogout size={20} />
          <Text>Выйти из аккаунта</Text>
        </Flex>

        {/* App Version */}
        <Text className={classes.version}>Версия 1.0.0</Text>
      </Container>

      <BottomNavbar />
    </Flex>
  );
}
