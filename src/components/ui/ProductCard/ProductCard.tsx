import { useState } from "react";
import { Button, ActionIcon, Group, Image } from "@mantine/core";
import {
  IconMinus,
  IconPlus,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./ProductCard.module.css";
import { DiscountBadge } from "../DiscountBadge/DiscountBadge";
import { HitBadge } from "../HitBadge/HitBadge";

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
  fullWidth = false,
  isHit = false,
  showDiscount = true,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange?.(quantity + 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange?.(quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange?.(quantity - 1);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
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
          variant={favorite ? "filled" : "white"}
          color={favorite ? "red" : "gray"}
          size="md"
          radius="xl"
          onClick={handleFavoriteClick}
        >
          {favorite ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
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
          {quantity === 0 ? (
            <Button
              variant="filled"
              fullWidth
              className={classes.button}
              onClick={handleAdd}
            >
              В корзину
            </Button>
          ) : (
            <Group className={classes.counter} justify="space-between">
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
          )}
        </div>
      </div>
    </div>
  );
};
