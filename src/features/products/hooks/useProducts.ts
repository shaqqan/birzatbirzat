import { useState, useCallback } from "react";
import type { Product, ProductCardItem } from "@/types/product";

interface UseProductsReturn {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
  filterByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  toCardItems: (
    quantityMap: Map<number, number>,
    onQuantityChange: (id: number, qty: number) => void
  ) => ProductCardItem[];
}

export const useProducts = (initialProducts: Product[] = []): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getProductById = useCallback(
    (id: number) => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  const filterByCategory = useCallback(
    (category: string) => {
      return products.filter((p) => p.category === category);
    },
    [products]
  );

  const searchProducts = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description?.toLowerCase().includes(lowerQuery) ||
          p.brand?.toLowerCase().includes(lowerQuery)
      );
    },
    [products]
  );

  const toCardItems = useCallback(
    (
      quantityMap: Map<number, number>,
      onQuantityChange: (id: number, qty: number) => void
    ): ProductCardItem[] => {
      return products.map((product) => ({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        discountPrice: product.discountPrice,
        weight: product.weight,
        quantity: quantityMap.get(product.id) || 0,
        onQuantityChange: (qty: number) => onQuantityChange(product.id, qty),
      }));
    },
    [products]
  );

  return {
    products,
    setProducts,
    getProductById,
    filterByCategory,
    searchProducts,
    toCardItems,
  };
};
