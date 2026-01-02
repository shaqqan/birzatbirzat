import { BottomNavbar } from "@/shared/ui";
import { Container } from "@/shared/ui";
import { Avatar, Box, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconChevronRight,
  IconHeart,
  IconLanguage,
  IconLogout,
  IconMapPin,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfilePage.module.css";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  path?: string;
  onClick?: () => void;
  iconBg?: string;
  iconColor?: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "ru", name: "Русский", nativeName: "Русский" },
  { code: "uz", name: "O'zbekcha", nativeName: "O'zbekcha" },
  { code: "en", name: "English", nativeName: "English" },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [languageModalOpened, { open: openLanguageModal, close: closeLanguageModal }] = useDisclosure(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ru");

  const currentLanguage = languages.find(l => l.code === selectedLanguage);

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
      subtitle: currentLanguage?.nativeName || "Русский",
      onClick: openLanguageModal,
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

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    closeLanguageModal();
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

      {/* Language Modal */}
      <Modal
        opened={languageModalOpened}
        onClose={closeLanguageModal}
        title="Выберите язык"
        centered
        radius="lg"
        size="sm"
        classNames={{
          header: classes.modalHeader,
          title: classes.modalTitle,
          body: classes.modalBody,
        }}
      >
        <Box className={classes.languageList}>
          {languages.map((language) => (
            <Flex
              key={language.code}
              className={classes.languageItem}
              data-selected={selectedLanguage === language.code || undefined}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <Text className={classes.languageName}>{language.nativeName}</Text>
              {selectedLanguage === language.code && (
                <IconCheck size={20} className={classes.checkIcon} />
              )}
            </Flex>
          ))}
        </Box>
      </Modal>

      <BottomNavbar />
    </Flex>
  );
}
