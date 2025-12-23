import { UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import classes from "./CartButton.module.css";

export interface CartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemCount: number;
  itemLabel?: string;
  totalPrice: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const CartButton = forwardRef<HTMLButtonElement, CartButtonProps>(
  (
    {
      itemCount,
      itemLabel = "товара",
      totalPrice,
      children,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <UnstyledButton
        ref={ref}
        className={`${classes.root} ${className || ""}`}
        data-disabled={disabled || undefined}
        disabled={disabled}
        {...props}
      >
        <span className={classes.count}>
          {itemCount} {itemLabel}
        </span>
        <span className={classes.label}>{children}</span>
        <span className={classes.price}>{totalPrice}</span>
      </UnstyledButton>
    );
  }
);

CartButton.displayName = "CartButton";
