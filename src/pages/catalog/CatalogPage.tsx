import { BottomNavbar } from "@/shared/ui";
import { Container } from "@/shared/ui";
import { Box, Card, Flex, Image, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import classes from "./CatalogPage.module.css";

const categories = [
  {
    id: 1,
    title: "Скидки и акции",
    image: "/categories/1.png",
  },
  {
    id: 2,
    title: "Молочные продукты",
    image: "/categories/2.png",
  },
  {
    id: 3,
    title: "Макароны, крупы, мука",
    image: "/categories/4.png",
  },
  {
    id: 4,
    title: "Мясо и мясные продукты",
    image: "/categories/5.png",
  },
  {
    id: 5,
    title: "Масло, соусы, специи",
    image: "/categories/5.png",
  },
  {
    id: 6,
    title: "Овощи и фрукты",
    image: "/categories/3.png",
  },
  {
    id: 7,
    title: "Замороженные продукты",
    image: "/categories/4.png",
  },
  {
    id: 8,
    title: "Вода, соки, напитки",
    image: "/categories/6.png",
  },
];

export function CatalogPage() {
  const [searchValue, setSearchValue] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchValue.trim()) {
      return categories;
    }
    const searchLower = searchValue.toLowerCase().trim();
    return categories.filter((category) =>
      category.title.toLowerCase().includes(searchLower)
    );
  }, [searchValue]);

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Text className={classes.title}>Каталог</Text>
      </Box>

      <Container>
        <TextInput
          variant="mobile"
          placeholder="Поиск продуктов.."
          leftSection={<IconSearch size={20} />}
          className={classes.search}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </Container>

      <Container className={classes.content}>
        <SimpleGrid cols={2} spacing="sm">
          {filteredCategories.map((category) => (
            <Card key={category.id} className={classes.categoryCard}>
              <Text className={classes.categoryTitle}>{category.title}</Text>
              <Image
                src={category.image}
                alt={category.title}
                className={classes.categoryImage}
              />
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <BottomNavbar />
    </Flex>
  );
}
