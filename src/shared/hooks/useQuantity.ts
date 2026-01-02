import { useState, useCallback } from "react";

interface UseQuantityReturn {
  quantities: Map<number, number>;
  getQuantity: (id: number) => number;
  setQuantity: (id: number, quantity: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  reset: (id: number) => void;
  resetAll: () => void;
}

export const useQuantity = (
  initialQuantities?: Map<number, number>
): UseQuantityReturn => {
  const [quantities, setQuantities] = useState<Map<number, number>>(
    initialQuantities || new Map()
  );

  const getQuantity = useCallback(
    (id: number) => {
      return quantities.get(id) || 0;
    },
    [quantities]
  );

  const setQuantity = useCallback((id: number, quantity: number) => {
    setQuantities((prev) => {
      const next = new Map(prev);
      if (quantity <= 0) {
        next.delete(id);
      } else {
        next.set(id, quantity);
      }
      return next;
    });
  }, []);

  const increment = useCallback((id: number) => {
    setQuantities((prev) => {
      const next = new Map(prev);
      next.set(id, (prev.get(id) || 0) + 1);
      return next;
    });
  }, []);

  const decrement = useCallback((id: number) => {
    setQuantities((prev) => {
      const next = new Map(prev);
      const current = prev.get(id) || 0;
      if (current <= 1) {
        next.delete(id);
      } else {
        next.set(id, current - 1);
      }
      return next;
    });
  }, []);

  const reset = useCallback((id: number) => {
    setQuantities((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setQuantities(new Map());
  }, []);

  return {
    quantities,
    getQuantity,
    setQuantity,
    increment,
    decrement,
    reset,
    resetAll,
  };
};
