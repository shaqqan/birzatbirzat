import type { Product, ProductCardItem } from "@/types";

/**
 * Product ni ProductCardItem ga o'girish
 */
export function productToCardItem(
  product: Product,
  quantity = 0,
  onQuantityChange?: (qty: number) => void
): ProductCardItem {
  return {
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
    discountPrice: product.discountPrice,
    weight: product.weight,
    quantity,
    onQuantityChange,
  };
}

/**
 * Product ro'yxatini ProductCardItem ro'yxatiga o'girish
 */
export function productsToCardItems(
  products: Product[],
  quantities: Record<number, number> = {},
  onQuantityChange?: (id: number, qty: number) => void
): ProductCardItem[] {
  return products.map((product) => ({
    ...productToCardItem(
      product,
      quantities[product.id] || 0,
      onQuantityChange ? (qty: number) => onQuantityChange(product.id, qty) : undefined
    ),
  }));
}

/**
 * Mahsulotlar sonini hisoblash
 */
export function getTotalItemsCount(quantities: Record<number, number>): number {
  return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
}

/**
 * Umumiy narxni hisoblash
 */
export function calculateTotalPrice(
  products: Product[],
  quantities: Record<number, number>
): number {
  return products.reduce((sum, product) => {
    const qty = quantities[product.id] || 0;
    const price = product.discountPrice ?? product.price;
    return sum + price * qty;
  }, 0);
}
