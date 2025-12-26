import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Group,
  Button,
  ActionIcon,
  Text,
  Collapse,
  Flex,
} from "@mantine/core";
import {
  IconHeart,
  IconMinus,
  IconPlus,
  IconShare,
  IconChevronLeft,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";
import { ProductCards, DiscountBadge, HitBadge } from "@/features/products";
import type { Product, ProductCardItem } from "@/types";
import { mockProduct, productSections, nutritionConfig } from "./mockData";
import classes from "./MobileProductDetailPage.module.css";
import { Container } from "@/components/ui/Container/Container";

function prepareProductItems(
  products: Product[],
  quantities: Record<number, number>,
  onQuantityChange: (id: number, qty: number) => void
): ProductCardItem[] {
  return products.map((p) => ({
    id: p.id,
    image: p.image,
    title: p.title,
    price: p.price,
    discountPrice: p.discountPrice,
    weight: p.weight,
    quantity: quantities[p.id] || 0,
    onQuantityChange: (qty: number) => onQuantityChange(p.id, qty),
  }));
}

function calculateDiscount(price: number, discountPrice?: number): number {
  if (!discountPrice) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function MobileProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [detailsOpened, setDetailsOpened] = useState(false);
  const [productQuantities, setProductQuantities] = useState<
    Record<number, number>
  >({});

  const product = useMemo(
    () => ({ ...mockProduct, id: Number(id) || mockProduct.id, isHit: true }),
    [id]
  );

  const handleAdd = useCallback(() => setQuantity(1), []);
  const handleIncrement = useCallback(() => setQuantity((q) => q + 1), []);
  const handleDecrement = useCallback(
    () => setQuantity((q) => Math.max(0, q - 1)),
    []
  );
  const toggleFavorite = useCallback(() => setIsFavorite((f) => !f), []);
  const toggleDetails = useCallback(() => setDetailsOpened((o) => !o), []);

  const handleProductQuantityChange = useCallback(
    (productId: number, qty: number) => {
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(0, qty),
      }));
    },
    []
  );

  const discountPercent = calculateDiscount(
    product.price,
    product.discountPrice
  );

  return (
    <Flex direction="column" className={classes.page}>
      {/* Header */}
      <Group className={classes.header} justify="space-between">
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={() => navigate(-1)}
        >
          <IconChevronLeft size={24} />
        </ActionIcon>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color={isFavorite ? "red" : "gray"}
            size="lg"
            onClick={toggleFavorite}
          >
            <IconHeart
              size={24}
              fill={isFavorite ? "var(--mantine-color-red-filled)" : "none"}
              color={
                isFavorite ? "var(--mantine-color-red-filled)" : "currentColor"
              }
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconShare size={24} />
          </ActionIcon>
        </Group>
      </Group>

      {/* Scrollable Content */}
      <div className={classes.content}>
        {/* Product Image */}
        <div className={classes.imageSection}>
          <div className={classes.imageContainer}>
            <img
              src={product.image}
              alt={product.title}
              className={classes.image}
            />
          </div>
          {discountPercent > 0 && (
            <DiscountBadge
              discount={discountPercent}
              size="md"
              bottom={16}
              left={16}
            />
          )}
          {product.isHit && <HitBadge />}
        </div>

        {/* Product Info */}
        <Stack gap="sm" className={classes.infoSection}>
          {/* Title */}
          <Text className={classes.title}>{product.title}</Text>

          {/* Price */}
          <div className={classes.priceContainer}>
            <Text
              className={`${classes.price} ${
                product.discountPrice ? classes.priceDiscount : ""
              }`}
            >
              {(product.discountPrice ?? product.price).toLocaleString()} сум
            </Text>
            {product.discountPrice && (
              <Text className={classes.originalPrice}>
                {product.price.toLocaleString()} сум
              </Text>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <Text className={classes.description}>{product.description}</Text>
          )}

          {/* Details Accordion */}
          <div
            className={classes.detailsToggle}
            onClick={toggleDetails}
            role="button"
            tabIndex={0}
          >
            <Text className={classes.detailsTitle}>Подробнее о товаре</Text>
            {detailsOpened ? (
              <IconChevronUp size={20} />
            ) : (
              <IconChevronDown size={20} />
            )}
          </div>

          <Collapse in={detailsOpened}>
            <Stack gap="md" className={classes.detailsContent}>
              {/* Nutrition Facts */}
              {product.nutritionFacts && (
                <div>
                  <Text className={classes.sectionLabel}>На 100 граммов</Text>
                  <div className={classes.nutritionGrid}>
                    {nutritionConfig.map(({ key, label, suffix }) => (
                      <div key={key} className={classes.nutritionItem}>
                        <Text className={classes.nutritionValue}>
                          {product.nutritionFacts![key]}
                          {suffix}
                        </Text>
                        <Text className={classes.nutritionLabel}>{label}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Info */}
              {(product.storage || product.shelfLife) && (
                <div className={classes.storageGrid}>
                  {product.shelfLife && (
                    <div>
                      <Text className={classes.storageLabel}>
                        Срок годности, условия хранения
                      </Text>
                      <Text className={classes.storageValue}>
                        {product.shelfLife}, {product.storage}
                      </Text>
                    </div>
                  )}
                </div>
              )}

              {/* Manufacturer */}
              {product.brand && (
                <div>
                  <Text className={classes.storageLabel}>
                    Производитель, страна
                  </Text>
                  <Text className={classes.storageValue}>
                    {product.brand}, Россия
                  </Text>
                </div>
              )}

              {/* Brand */}
              {product.brand && (
                <div>
                  <Text className={classes.storageLabel}>Бренд</Text>
                  <Text className={classes.storageValue}>{product.brand}</Text>
                </div>
              )}
            </Stack>
          </Collapse>
        </Stack>

        {/* Related Products */}
        <Container>
          {productSections.slice(0, 2).map(({ title, products }) => (
            <ProductCards
              key={title}
              title={title}
              variant="vertical"
              items={prepareProductItems(
                products,
                productQuantities,
                handleProductQuantityChange
              )}
            />
          ))}
        </Container>
      </div>

      {/* Fixed Bottom Bar */}
      <div className={classes.bottomBar}>
        <div className={classes.bottomContent}>
          {quantity === 0 ? (
            <>
              <div className={classes.quantitySelector}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  className={classes.quantityButton}
                  onClick={handleDecrement}
                  disabled={quantity === 0}
                >
                  <IconMinus size={20} />
                </ActionIcon>
                <Text className={classes.quantityText}>1</Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  className={classes.quantityButton}
                  onClick={handleIncrement}
                >
                  <IconPlus size={20} />
                </ActionIcon>
              </div>
              <Button
                variant="filled"
                className={classes.addButton}
                onClick={handleAdd}
              >
                Перейти в корзину
              </Button>
            </>
          ) : (
            <>
              <div className={classes.quantitySelector}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  className={classes.quantityButton}
                  onClick={handleDecrement}
                >
                  <IconMinus size={20} />
                </ActionIcon>
                <Text className={classes.quantityText}>{quantity}</Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  className={classes.quantityButton}
                  onClick={handleIncrement}
                >
                  <IconPlus size={20} />
                </ActionIcon>
              </div>
              <Button
                variant="filled"
                className={classes.addButton}
                onClick={() => navigate("/cart")}
              >
                Перейти в корзину
              </Button>
            </>
          )}
        </div>
      </div>
    </Flex>
  );
}
