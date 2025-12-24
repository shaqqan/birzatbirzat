import type { CartItem, PaymentMethod } from "./cart";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivering" | "delivered" | "cancelled";

export interface OrderItem extends Omit<CartItem, "id"> {
  id: string;
  productId: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryTime: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}
