import { UnstyledButton } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import classes from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  price?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      size = "md",
      fullWidth = false,
      disabled = false,
      loading = false,
      price,
      leftSection,
      rightSection,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <UnstyledButton
        ref={ref}
        className={`${classes.root} ${className || ""}`}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-disabled={disabled || undefined}
        data-with-price={price ? true : undefined}
        disabled={disabled || loading}
        {...props}
      >
        {leftSection && <span className={classes.leftSection}>{leftSection}</span>}
        <span className={classes.label}>{children}</span>
        {price && <span className={classes.price}>{price}</span>}
        {rightSection && !price && <span className={classes.rightSection}>{rightSection}</span>}
      </UnstyledButton>
    );
  }
);

Button.displayName = "Button";
