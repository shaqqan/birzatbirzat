import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenManager } from "@/shared/api";
import { cartApi } from "../api/cart.api";
import type { Cart } from "../types";
import { QUERY_KEYS } from "@/shared/constants";

export function useCart() {
  return useQuery<Cart>({
    queryKey: QUERY_KEYS.CART,
    queryFn: cartApi.getCart,
    enabled: tokenManager.isAuthenticated(),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartApi.updateItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => cartApi.removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART });
    },
  });
}
