export interface CartProduct {
  id: number;
  name: Record<string, string>;
  image: string | null;
  displayPrice: number;
  displayDiscountPrice: number | null;
  unit: string;
  stock: number;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: CartProduct;
}

export interface Cart {
  items: CartItem[];
  itemsCount: number;
  deliveryFee: number;
  total: number;
}

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  unit: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface DeliveryTime {
  id: string;
  label: string;
  time: string;
}
