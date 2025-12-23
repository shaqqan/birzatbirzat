import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Group,
  Button,
  ActionIcon,
  Text,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconHeart,
  IconMinus,
  IconPlus,
  IconShare,
} from "@tabler/icons-react";
import { ProductCards } from "@/components/ui/ProductCards/ProductCards";
import { DiscountBadge } from "@/components/ui/DiscountBadge/DiscountBadge";
import type { Product, ProductCardItem } from "@/types";
import {
  mockProduct,
  productSections,
  nutritionConfig,
} from "./mockData";
import classes from "./ProductDetailPage.module.css";

// Helper function to prepare products for ProductCards
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

// Calculate discount percentage
function calculateDiscount(price: number, discountPrice?: number): number {
  if (!discountPrice) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});

  // In real app, fetch product by id from API
  const product = useMemo(
    () => ({ ...mockProduct, id: Number(id) || mockProduct.id }),
    [id]
  );

  const handleAdd = useCallback(() => setQuantity(1), []);
  const handleIncrement = useCallback(() => setQuantity((q) => q + 1), []);
  const handleDecrement = useCallback(() => setQuantity((q) => Math.max(0, q - 1)), []);
  const toggleFavorite = useCallback(() => setIsFavorite((f) => !f), []);

  const handleProductQuantityChange = useCallback((productId: number, qty: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, qty),
    }));
  }, []);

  const discountPercent = calculateDiscount(product.price, product.discountPrice);

  const breadcrumbItems = [
    { title: "Главная", href: "/" },
    { title: product.category || "", href: "/catalog" },
    { title: product.title, href: "#" },
  ];

  return (
    <Stack gap="xl" className={classes.container}>
      {/* Header with back button */}
      <Group className={classes.header}>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={() => navigate(-1)}
        >
          <IconChevronLeft size={24} />
        </ActionIcon>
        <Breadcrumbs className={classes.breadcrumbs}>
          {breadcrumbItems.map((item, index) => (
            <Anchor
              href={item.href}
              key={index}
              className={classes.breadcrumbLink}
              onClick={(e) => {
                if (item.href !== "#") {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      </Group>

      {/* Product Main Section */}
      <div className={classes.productMain}>
        {/* Image */}
        <div className={classes.imageSection}>
          <div className={classes.imageContainer}>
            <img
              src={product.image}
              alt={product.title}
              className={classes.image}
            />
            <DiscountBadge discount={discountPercent} />
          </div>
        </div>

        {/* Product Info */}
        <div className={classes.infoSection}>
          <Group justify="space-between" align="flex-start">
            <Text className={classes.brand}>{product.brand}</Text>
            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                color={isFavorite ? "red" : "gray"}
                size="lg"
                onClick={toggleFavorite}
              >
                <IconHeart
                  size={24}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconShare size={24} />
              </ActionIcon>
            </Group>
          </Group>

          <Text className={classes.title}>{product.title}</Text>
          <Text className={classes.weight}>{product.weight}</Text>

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

          {/* Add to cart */}
          <div className={classes.cartSection}>
            {quantity === 0 ? (
              <Button
                variant="filled"
                size="lg"
                fullWidth
                className={classes.addButton}
                onClick={handleAdd}
              >
                В корзину
              </Button>
            ) : (
              <Group className={classes.counter} justify="space-between">
                <ActionIcon
                  variant="filled"
                  size="xl"
                  className={classes.counterButton}
                  onClick={handleDecrement}
                >
                  <IconMinus size={20} />
                </ActionIcon>
                <Text className={classes.quantity}>{quantity}</Text>
                <ActionIcon
                  variant="filled"
                  size="xl"
                  className={classes.counterButton}
                  onClick={handleIncrement}
                >
                  <IconPlus size={20} />
                </ActionIcon>
              </Group>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className={classes.descriptionSection}>
              <Text className={classes.sectionTitle}>Описание</Text>
              <Text className={classes.description}>{product.description}</Text>
            </div>
          )}

          {/* Nutrition Facts */}
          {product.nutritionFacts && (
            <div className={classes.nutritionSection}>
              <Text className={classes.sectionTitle}>
                Пищевая ценность на 100 г
              </Text>
              <div className={classes.nutritionGrid}>
                {nutritionConfig.map(({ key, label, suffix }) => (
                  <div key={key} className={classes.nutritionItem}>
                    <Text className={classes.nutritionValue}>
                      {product.nutritionFacts![key]}{suffix}
                    </Text>
                    <Text className={classes.nutritionLabel}>{label}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Storage Info */}
          {(product.storage || product.shelfLife) && (
            <div className={classes.storageSection}>
              <Group justify="space-between">
                {product.storage && (
                  <div>
                    <Text className={classes.storageLabel}>Условия хранения</Text>
                    <Text className={classes.storageValue}>{product.storage}</Text>
                  </div>
                )}
                {product.shelfLife && (
                  <div>
                    <Text className={classes.storageLabel}>Срок годности</Text>
                    <Text className={classes.storageValue}>{product.shelfLife}</Text>
                  </div>
                )}
              </Group>
            </div>
          )}
        </div>
      </div>

      {/* Product Sections */}
      {productSections.map(({ title, products }) => (
        <ProductCards
          key={title}
          title={title}
          variant="horizontal"
          items={prepareProductItems(
            products,
            productQuantities,
            handleProductQuantityChange
          )}
        />
      ))}
    </Stack>
  );
}
