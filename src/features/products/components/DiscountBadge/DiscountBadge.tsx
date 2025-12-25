import { memo } from "react";
import classes from "./DiscountBadge.module.css";

export interface DiscountBadgeProps {
  discount: number;
  size?: "sm" | "md" | "lg";
  bottom?: number | string;
  left?: number | string;
  top?: number | string;
  right?: number | string;
}

export const DiscountBadge = memo(function DiscountBadge({
  discount,
  size = "md",
  bottom,
  left,
  top,
  right,
}: DiscountBadgeProps) {
  if (discount <= 0) return null;

  const positionStyle = {
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
  };

  return (
    <div className={`${classes.badge} ${classes[size]}`} style={positionStyle}>
      <span>-{discount}%</span>
    </div>
  );
});
