import { ActionIcon, Image } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./ProductCard.module.css";
import { DiscountBadge } from "../DiscountBadge";
import { HitBadge } from "../HitBadge";
import { QuantityCounter } from "@/features/cart/components";

export interface ProductCardProps {
  id?: number;
  image: string;
  title: string;
  weight?: string;
  price: number;
  discountPrice?: number;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isFavoriteLoading?: boolean;
  fullWidth?: boolean;
  isHit?: boolean;
  showDiscount?: boolean;
  style?: React.CSSProperties;
}

export const ProductCard = ({
  id,
  image,
  title,
  weight,
  price,
  discountPrice,
  quantity = 0,
  onQuantityChange,
  isFavorite = false,
  onFavoriteToggle,
  isFavoriteLoading = false,
  fullWidth = false,
  isHit = false,
  showDiscount = true,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  const handleAdd = () => {
    onQuantityChange?.(quantity + 1);
  };

  const handleIncrement = () => {
    onQuantityChange?.(quantity + 1);
  };

  const handleDecrement = () => {
    onQuantityChange?.(quantity - 1);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  const discountInPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div
      className={classes.card}
      onClick={handleCardClick}
      style={{
        cursor: id ? "pointer" : "default",
        width: fullWidth ? "100%" : undefined,
      }}
    >
      <div className={classes.imageContainer}>
        <Image src={image} alt={title} className={classes.image} />
        {isHit && <HitBadge size="sm" />}
        {showDiscount && <DiscountBadge discount={discountInPercent} />}
        <ActionIcon
          className={classes.favoriteButton}
          variant={isFavorite ? "filled" : "white"}
          color={isFavorite ? "red" : "gray"}
          size="md"
          radius="xl"
          onClick={handleFavoriteClick}
          loading={isFavoriteLoading}
        >
          {isFavorite ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
        </ActionIcon>
      </div>
      <div className={classes.content}>
        {/* Price */}
        <div className={classes.priceContainer}>
          <p
            className={`${classes.price} ${
              discountPrice ? classes.priceDiscount : ""
            }`}
          >
            {(discountPrice ?? price).toLocaleString()} сум
          </p>
          {discountPrice && (
            <p className={classes.originalPrice}>
              {price.toLocaleString()} сум
            </p>
          )}
        </div>

        {/* Title */}
        <p className={classes.title} title={title}>
          {title}
        </p>

        {/* Weight */}
        {weight && <p className={classes.weight}>{weight}</p>}

        {/* Counter Buttons */}
        <div className={classes.buttonContainer}>
          <QuantityCounter
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </div>
  );
};
