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
  { id: "favorites", name: "Избранное", icon: "❤️", href: "/favorites" },
  { id: "pharmacy", name: "Аптека", icon: "💊", href: "/catalog/pharmacy" },
  { id: "pet-supplies", name: "Зоотовары", icon: "🐾", href: "/catalog/pet-supplies" },
  { id: "new", name: "Новинки", icon: "✨", href: "/catalog/new" },
  { id: "yandex-lavka", name: "Придумано Яндекс Лавкой", icon: "🏪", href: "/catalog/yandex-lavka" },
  {
    id: "ready-food",
    name: "Готовая еда",
    icon: "🍱",
    children: [
      { id: "salads", name: "Салаты", icon: "🥗", href: "/catalog/salads" },
      { id: "soups", name: "Супы", icon: "🍲", href: "/catalog/soups" },
      { id: "main-dishes", name: "Горячие блюда", icon: "🍖", href: "/catalog/main-dishes" },
    ],
  },
  { id: "flowers", name: "Цветы и новогодние растения", icon: "🌸", href: "/catalog/flowers" },
  { id: "vegetables", name: "Овощной прилавок", icon: "🥒", href: "/catalog/vegetables" },
  {
    id: "dairy",
    name: "Молочный прилавок",
    icon: "🥛",
    children: [
      { id: "milk", name: "Молоко", icon: "🥛", href: "/catalog/milk" },
      { id: "cheese", name: "Сыр", icon: "🧀", href: "/catalog/cheese" },
      { id: "yogurt", name: "Йогурт", icon: "🥄", href: "/catalog/yogurt" },
    ],
  },
  { id: "bakery", name: "Булочная", icon: "🥐", href: "/catalog/bakery" },
  { id: "drinks", name: "Вода и напитки", icon: "🥤", href: "/catalog/drinks" },
];

interface CatalogItemProps {
  item: CatalogItem;
  level?: number;
  currentPath: string;
  onNavigate: (href: string) => void;
}

function CatalogItemComponent({ item, level = 0, currentPath, onNavigate }: CatalogItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  // Check if this item or any of its children is active
  const isActive = item.href === currentPath;
  const hasActiveChild = hasChildren && item.children!.some((child) => child.href === currentPath);

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
            <span className={classes.icon}>{item.icon}</span>
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
