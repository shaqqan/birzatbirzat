import { Button, ActionIcon, Group } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import classes from "./QuantityCounter.module.css";

export interface QuantityCounterProps {
  quantity: number;
  onIncrement: (e?: React.MouseEvent) => void;
  onDecrement: (e?: React.MouseEvent) => void;
  onAdd?: (e?: React.MouseEvent) => void;
  addButtonText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact";
}

export const QuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  onAdd,
  addButtonText = "В корзину",
  size = "sm",
  variant = "default",
}: QuantityCounterProps) => {
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIncrement(e);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDecrement(e);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.(e);
  };

  if (quantity === 0) {
    return (
      <Button
        variant="filled"
        fullWidth
        className={`${classes.button} ${classes[size]} ${classes[variant]}`}
        onClick={handleAdd}
      >
        {addButtonText}
      </Button>
    );
  }

  return (
    <Group
      className={`${classes.counter} ${classes[size]} ${classes[variant]}`}
      justify="space-between"
    >
      <ActionIcon
        variant="filled"
        className={classes.counterButton}
        onClick={handleDecrement}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <span className={classes.quantity}>{quantity}</span>

      <ActionIcon
        variant="filled"
        className={classes.counterButton}
        onClick={handleIncrement}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
};
