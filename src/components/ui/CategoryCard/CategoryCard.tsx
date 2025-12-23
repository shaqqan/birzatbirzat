import { UnstyledButton, Text } from "@mantine/core";
import classes from "./CategoryCard.module.css";

export interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  onClick?: () => void;
}

export function CategoryCard({ title, image, onClick }: CategoryCardProps) {
  return (
    <UnstyledButton className={classes.root} onClick={onClick}>
      <div className={classes.content}>
        <Text className={classes.title}>{title}</Text>
      </div>
      <div className={classes.imageWrapper}>
        <img src={image} alt={title} className={classes.image} />
      </div>
    </UnstyledButton>
  );
}
