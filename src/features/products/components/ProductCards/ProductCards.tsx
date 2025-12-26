import { Text, Group, Grid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ProductCard, ProductCardProps } from "../ProductCard";
import classes from "./ProductCards.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";

interface ProductCardsProps {
  title?: string;
  items: ProductCardProps[];
  variant?: "vertical" | "horizontal";
}

export function ProductCards({
  title,
  items,
  variant = "vertical",
}: ProductCardsProps) {
  return (
    <div className={classes.container}>
      {title && (
        <Group
          justify="space-between"
          align="center"
          className={classes.header}
          gap={8}
        >
          <Text className={classes.title}>{title}</Text>
          <div className={classes.viewAll}>
            <Text className={classes.viewAllText}>Все</Text>
            <IconChevronRight
              size={16}
              stroke={2}
              color="var(--mantine-color-gray-6)"
            />
          </div>
        </Group>
      )}

      {variant === "horizontal" ? (
        <Carousel
          slideSize={{
            base: "46%",
            sm: "33.33%",
            xl: "25%",
          }}
          slideGap="sm"
          classNames={{
            control: classes.carouselControl,
          }}
        >
          {items.map((item, index) => (
            <Carousel.Slide key={index}>
              <ProductCard {...item} />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Grid gutter={10}>
          {items.map((item, index) => (
            <Grid.Col
              span={{ base: 6, sm: 4, xl: 3 }}
              key={index}
              className={classes.gridItem}
            >
              <ProductCard {...item} fullWidth />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </div>
  );
}
