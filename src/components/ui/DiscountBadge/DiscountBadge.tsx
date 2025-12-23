import classes from "./DiscountBadge.module.css";

export interface DiscountBadgeProps {
  discount: number;
}

export const DiscountBadge = ({ discount }: DiscountBadgeProps) => {
  if (discount <= 0) return null;

  return (
    <div className={classes.badge}>
      <span>-{discount}%</span>
    </div>
  );
};
