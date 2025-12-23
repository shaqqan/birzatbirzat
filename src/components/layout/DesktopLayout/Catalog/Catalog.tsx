import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Text, UnstyledButton, Group, Collapse } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./Catalog.module.css";

interface CatalogItem {
  id: string;
  name: string;
  icon: string;
  href?: string;
  children?: CatalogItem[];
}

const catalogItems: CatalogItem[] = [
  { id: "main-menu", name: "Главное меню", icon: "🏠", href: "/" },
  {
    id: "favorites",
    name: "Избранное",
    icon: "https://yastatic.net/avatars/get-bunker/998550/748f162f2a455be453ab7604f0173751c22fa44b/orig",
    href: "/favorites",
  },
  {
    id: "pharmacy",
    name: "Аптека",
    icon: "https://yastatic.net/avatars/get-bunker/994123/fec294587fb074ce8fbc2ebb435b3aaa6e33a169/orig",
    href: "/catalog/pharmacy",
  },
  {
    id: "pet-supplies",
    name: "Зоотовары",
    icon: "https://yastatic.net/avatars/get-bunker/60661/c94a17b4b722caf27059df98986db8add807e484/orig",
    href: "/catalog/pet-supplies",
  },
  {
    id: "new",
    name: "Новинки",
    icon: "https://yastatic.net/avatars/get-bunker/135516/4f69cf88dde911466f08e3cdd72244acebc13844/orig",
    href: "/catalog/new",
  },
  {
    id: "yandex-lavka",
    name: "Придумано Яндекс Лавкой",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2998515/bccfe9f8e863453f9babb72d4d9b0d0e/40x40-webp",
    href: "/catalog/yandex-lavka",
  },
  {
    id: "ready-food",
    name: "Готовая еда",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2998515/ce37fb1b262f4c5fbe6066d13d0c467c/40x40-webp",
    children: [
      { id: "salads", name: "Салаты", icon: "🥗", href: "/catalog/salads" },
      { id: "soups", name: "Супы", icon: "🍲", href: "/catalog/soups" },
      {
        id: "main-dishes",
        name: "Горячие блюда",
        icon: "🍖",
        href: "/catalog/main-dishes",
      },
    ],
  },
  {
    id: "flowers",
    name: "Цветы и новогодние растения",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2791769/19597a94a5964d6081a6ade3c9c4af4c/40x40-webp",
    href: "/catalog/flowers",
  },
  {
    id: "vegetables",
    name: "Овощной прилавок",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/9e5b5c3d91a7469a852c3163dfef5e3c/40x40-webp",
    href: "/catalog/vegetables",
  },
  {
    id: "dairy",
    name: "Молочный прилавок",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/7e196d537e5b46d79062a2ed5dfc4ccd/40x40-webp",
    children: [
      { id: "milk", name: "Молоко", icon: "🥛", href: "/catalog/milk" },
      { id: "cheese", name: "Сыр", icon: "🧀", href: "/catalog/cheese" },
      { id: "yogurt", name: "Йогурт", icon: "🥄", href: "/catalog/yogurt" },
    ],
  },
  {
    id: "bakery",
    name: "Булочная",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/8bb1188be474444eba935dc81ed58da3/40x40-webp",
    href: "/catalog/bakery",
  },
  {
    id: "drinks",
    name: "Вода и напитки",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/4f6a267fd6db40bc9ca316f035b976f2/40x40-webp",
    href: "/catalog/drinks",
  },
  {
    id: "sweets",
    name: "Сладкое и снеки",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/c6b09b3a8e784154ac2da9f300ca0816/40x40-webp",
    href: "/catalog/sweets",
  },
  // Мясо, птица, рыба
  {
    id: "meat",
    name: "Мясо, птица, рыба",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/3201a7d60b5642acafe22e44174815ea/40x40-webp",
    href: "/catalog/meat",
  },
  // Заморозка
  {
    id: "frozen",
    name: "Заморозка",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/a9bafdc7c58b487f957b1f99e639e132/40x40-webp",
    href: "/catalog/frozen",
  },
  // Здоровый образ жизни
  {
    id: "health",
    name: "Здоровый образ жизни",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/4be273adbb78492387226be8c0bc56c0/40x40-webp",
    href: "/catalog/health",
  },
  // Бакалея
  {
    id: "bakery",
    name: "Бакалея",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/b002614ff95b41b499a4112860785e49/40x40-webp",
    href: "/catalog/bakery",
  },
  // Для детей
  {
    id: "children",
    name: "Для детей",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/0da1aa3776a442cc8f7c378fafe5d4c8/40x40-webp",
    href: "/catalog/children",
  },
  // Творчество и хобби
  {
    id: "hobby",
    name: "Творчество и хобби",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2791769/0cf88ff10ddc4f94ae74340744557cca/40x40-webp",
    href: "/catalog/hobby",
  },
  // Дом, милый дом
  {
    id: "home",
    name: "Дом, милый дом",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2756334/bf5ef93a3a5c4381b87ddc695bcdc5f1/40x40-webp",
    href: "/catalog/home",
  },
  {
    id: "bakery",
    name: "Булочная",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/8bb1188be474444eba935dc81ed58da3/40x40-webp",
    href: "/catalog/bakery",
  },
  {
    id: "drinks",
    name: "Вода и напитки",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/4f6a267fd6db40bc9ca316f035b976f2/40x40-webp",
    href: "/catalog/drinks",
  },
  {
    id: "sweets",
    name: "Сладкое и снеки",
    icon: "https://yastatic.net/avatars/get-grocery-goods/2750890/c6b09b3a8e784154ac2da9f300ca0816/40x40-webp",
    href: "/catalog/sweets",
  },
];

const isUrl = (str: string) =>
  str.startsWith("http://") || str.startsWith("https://");

interface CatalogItemProps {
  item: CatalogItem;
  level?: number;
  currentPath: string;
  onNavigate: (href: string) => void;
}

function CatalogItemComponent({
  item,
  level = 0,
  currentPath,
  onNavigate,
}: CatalogItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  // Check if this item or any of its children is active
  const isActive = item.href === currentPath;
  const hasActiveChild =
    hasChildren && item.children!.some((child) => child.href === currentPath);

  const [opened, setOpened] = useState(!!hasActiveChild);

  const handleClick = () => {
    if (hasChildren) {
      setOpened((o) => !o);
    } else if (item.href) {
      onNavigate(item.href);
    }
  };

  return (
    <>
      <UnstyledButton
        className={classes.item}
        onClick={handleClick}
        data-level={level}
        data-active={isActive || undefined}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        <Group gap="sm" wrap="nowrap" justify="space-between">
          <Group gap="sm" wrap="nowrap">
            <span className={classes.icon}>
              {isUrl(item.icon) ? (
                <img src={item.icon} alt="" className={classes.iconImg} />
              ) : (
                item.icon
              )}
            </span>
            <Text className={classes.itemName}>{item.name}</Text>
          </Group>
          {hasChildren && (
            <IconChevronRight
              size={16}
              className={classes.chevron}
              data-opened={opened || undefined}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasChildren && (
        <Collapse in={opened}>
          {item.children!.map((child) => (
            <CatalogItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

export function Catalog() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div className={classes.catalog}>
      <Text className={classes.title}>Каталог</Text>
      <div className={classes.items}>
        <Stack gap={2}>
          {catalogItems.map((item) => (
            <CatalogItemComponent
              key={item.id}
              item={item}
              currentPath={location.pathname}
              onNavigate={handleNavigate}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
}
