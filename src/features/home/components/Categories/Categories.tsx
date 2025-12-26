import { Card, Group, Image, Text } from "@mantine/core";
import classes from "./Categories.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

const categories = [
  {
    title: "Скидки и акции",
    image: "/categories/1.png",
  },
  {
    title: "Молочные продукты",
    image: "/categories/2.png",
  },
  {
    title: "Овощи и фрукты",
    image: "/categories/3.png",
  },
  {
    title: "Мясные продукты",
    image: "/categories/4.png",
  },
];

export function Categories() {
  return (
    <div className={classes.categories}>
      <Group
        justify="space-between"
        align="center"
        className={classes.header}
        gap={8}
      >
        <Text className={classes.title}>Категории</Text>
        <div className={classes.viewAll}>
          <Text className={classes.viewAllText}>Все</Text>
          <IconChevronRight
            size={16}
            stroke={2}
            color="var(--mantine-color-gray-6)"
          />
        </div>
      </Group>

      <Carousel slideGap="12px" withControls={false} slideSize={"118px"}>
        {categories.map((category) => (
          <Carousel.Slide key={category.title}>
            <Card className={classes.categoryCard} w="100%">
              <Text className={classes.categoryTitle}>{category.title}</Text>
              <Image
                src={category.image}
                alt={category.title}
                className={classes.categoryImage}
              />
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
