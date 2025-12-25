import { useState, useCallback } from "react";
import type { CartItem } from "@/types/cart";

interface UseCartReturn {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string | number) => number;
  totalItems: number;
  totalPrice: number;
}

export const useCart = (initialItems: CartItem[] = []): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + (item.quantity || 1),
          };
          return updated;
        }
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string | number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (id: string | number) => {
      return items.find((item) => item.id === id)?.quantity || 0;
    },
    [items]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    totalItems,
    totalPrice,
  };
};
