export interface CartItem {
  id: string | number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  quantity: number;
  unit?: string;
  weight?: string;
}

export interface BasketItem extends CartItem {
  isSelected?: boolean;
}

export type PaymentMethod = "cash" | "card" | "online";
export type DeliveryTime = "asap" | "scheduled";

export interface DeliveryTimeSlot {
  id: string;
  label: string;
  time: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: "percent" | "fixed";
}
