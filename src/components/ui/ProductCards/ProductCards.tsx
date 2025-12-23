import { Text, Group, Grid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ProductCard } from "../ProductCard/ProductCard";
import classes from "./ProductCards.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";

export interface ProductCardProps {
  image: string;
  title: string;
  weight?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  discountPrice?: number;
  currency?: string;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

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
          gap={10}
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
          slideSize={{ base: "50%", sm: "33.33%", md: "25%", lg: "25%", xl: "20%" }}
          slideGap="md"
          classNames={{
            control: classes.carouselControl,
          }}
        >
          {items.map((item, index) => (
            <Carousel.Slide key={index}>
              <ProductCard {...item}/>
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Grid gutter={10}>
          {items.map((item, index) => (
            <Grid.Col span={{base : 12, md: 4, lg: 4, xl: 3}} key={index} className={classes.gridItem}>
              <ProductCard {...item}  fullWidth/>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </div>
  );
}
