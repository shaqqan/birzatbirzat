import { api } from "@/shared/api";
import type { Cart, CartItem } from "../types";

export const cartApi = {
  async getCart(): Promise<Cart> {
    const response = await api.get<Cart>("/web/cart");
    return response.data;
  },

  async addItem(productId: number, quantity: number): Promise<CartItem> {
    const response = await api.post<CartItem>("/web/cart/items", { productId, quantity });
    return response.data;
  },

  async updateItem(productId: number, quantity: number): Promise<CartItem> {
    const response = await api.put<CartItem>(`/web/cart/items/${productId}`, { quantity });
    return response.data;
  },

  async removeItem(productId: number): Promise<void> {
    await api.delete(`/web/cart/items/${productId}`);
  },

  async clearCart(): Promise<void> {
    await api.delete("/web/cart");
  },
};
