import { memo } from "react";
import classes from "./HitBadge.module.css";

export interface HitBadgeProps {
  size?: "sm" | "md" | "lg";
  bottom?: number | string;
  left?: number | string;
  top?: number | string;
  right?: number | string;
}

export const HitBadge = memo(function HitBadge({
  size = "md",
  bottom,
  left,
  top,
  right,
}: HitBadgeProps) {
  const positionStyle = {
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
  };

  return (
    <div className={`${classes.badge} ${classes[size]}`} style={positionStyle}>
      <span>HIT</span>
    </div>
  );
});
