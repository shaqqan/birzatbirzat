// All entities for the project - TypeORM compatible

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  DeleteDateColumn,
} from "typeorm";

// ==================== ENUMS ====================

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MANAGER = "manager",
  COURIER = "courier",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  DELIVERING = "delivering",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum PromoCodeType {
  PERCENT = "percent",
  FIXED = "fixed",
}

export enum DeliveryType {
  ASAP = "asap",
  SCHEDULED = "scheduled",
}

// ==================== USER ====================

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 20 })
  phone: string;

  @Index({ unique: true })
  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

// ==================== ADDRESS ====================

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 50, nullable: true })
  building: string;

  @Column({ length: 50, nullable: true })
  apartment: string;

  @Column({ length: 50, nullable: true })
  entrance: string;

  @Column({ length: 50, nullable: true })
  floor: string;

  @Column({ length: 50, nullable: true })
  intercom: string;

  @Column({ type: "text", nullable: true })
  comment: string;

  @Column({ length: 100, nullable: true })
  label: string; // "Дом", "Работа", etc.

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== CATEGORY ====================

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.children, { nullable: true })
  @JoinColumn({ name: "parentId" })
  parent: Category;

  @Column({ nullable: true })
  parentId: number;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== BRAND ====================

@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  website: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== PRODUCT ====================

@Entity("products")
@Index(["isActive", "isHit"])
@Index(["isActive", "discountPrice"])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  discountPrice: number;

  @Column({ length: 50 })
  weight: string;

  @Column({ length: 50, nullable: true })
  unit: string; // кг, шт, л, мл, г

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: "simple-array", nullable: true })
  images: string[];

  @Column({ default: false })
  isHit: boolean;

  @Column({ default: false })
  isNew: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: 0 })
  stockQuantity: number;

  @Column({ length: 100, nullable: true })
  sku: string;

  @Column({ length: 100, nullable: true })
  barcode: string;

  // Nutrition Facts (embedded)
  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  calories: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  proteins: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  fats: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  carbs: number;

  // Storage info
  @Column({ type: "text", nullable: true })
  storageConditions: string;

  @Column({ length: 100, nullable: true })
  shelfLife: string;

  @Column({ length: 255, nullable: true })
  manufacturer: string;

  @Column({ length: 100, nullable: true })
  countryOfOrigin: string;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  @JoinColumn({ name: "brandId" })
  brand: Brand;

  @Column({ nullable: true })
  brandId: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

// ==================== CART ITEM ====================

@Entity("cart_items")
@Index(["userId", "productId"], { unique: true })
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== FAVORITE ====================

@Entity("favorites")
@Index(["userId", "productId"], { unique: true })
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Product, (product) => product.favorites, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;
}

// ==================== PROMO CODE ====================

@Entity("promo_codes")
export class PromoCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 50 })
  code: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "enum", enum: PromoCodeType })
  type: PromoCodeType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discount: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  minOrderAmount: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  maxDiscountAmount: number;

  @Column({ nullable: true })
  usageLimit: number;

  @Column({ default: 0 })
  usedCount: number;

  @Column({ nullable: true })
  usageLimitPerUser: number;

  @Column({ type: "timestamp", nullable: true })
  startsAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.promoCode)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== DELIVERY TIME SLOT ====================

@Entity("delivery_time_slots")
export class DeliveryTimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  label: string; // "Как можно скорее", "10:00 - 12:00"

  @Column({ length: 20, nullable: true })
  startTime: string; // "10:00"

  @Column({ length: 20, nullable: true })
  endTime: string; // "12:00"

  @Column({ type: "enum", enum: DeliveryType, default: DeliveryType.SCHEDULED })
  type: DeliveryType;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== ORDER ====================

@Entity("orders")
@Index(["userId", "status"])
@Index(["createdAt"])
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ length: 20 })
  orderNumber: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  deliveryFee: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  total: number;

  @Column({ type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  // Delivery info
  @Column({ type: "text" })
  deliveryAddress: string;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  deliveryLatitude: number;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  deliveryLongitude: number;

  @Column({ length: 100, nullable: true })
  deliveryTime: string;

  @Column({ type: "timestamp", nullable: true })
  scheduledDeliveryAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deliveredAt: Date;

  // Customer info (denormalized for order history)
  @Column({ length: 100 })
  customerName: string;

  @Column({ length: 20 })
  customerPhone: string;

  @Column({ length: 255, nullable: true })
  customerEmail: string;

  @Column({ type: "text", nullable: true })
  comment: string;

  // Relations
  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => PromoCode, (promoCode) => promoCode.orders, { nullable: true })
  @JoinColumn({ name: "promoCodeId" })
  promoCode: PromoCode;

  @Column({ nullable: true })
  promoCodeId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "courierId" })
  courier: User;

  @Column({ nullable: true })
  courierId: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== ORDER ITEM ====================

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  productTitle: string;

  @Column({ nullable: true })
  productImageUrl: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  discountPrice: number;

  @Column()
  quantity: number;

  @Column({ length: 50, nullable: true })
  weight: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  total: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order: Order;

  @Column()
  orderId: string;

  @ManyToOne(() => Product, (product) => product.orderItems, { nullable: true })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ nullable: true })
  productId: number;

  @CreateDateColumn()
  createdAt: Date;
}

// ==================== BANNER ====================

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  mobileImageUrl: string;

  @Column({ nullable: true })
  linkUrl: string;

  @Column({ length: 50, nullable: true })
  buttonText: string;

  @Column({ length: 7, nullable: true })
  backgroundColor: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "timestamp", nullable: true })
  startsAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ==================== RECENTLY VIEWED ====================

@Entity("recently_viewed")
@Index(["userId", "productId"], { unique: true })
export class RecentlyViewed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column()
  productId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  viewedAt: Date;
}

// ==================== NOTIFICATION ====================

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: "text" })
  message: string;

  @Column({ length: 50, nullable: true })
  type: string; // order_status, promo, system

  @Column({ type: "json", nullable: true })
  data: Record<string, unknown>;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}

// ==================== SETTINGS ====================

@Entity("settings")
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 100 })
  key: string;

  @Column({ type: "text" })
  value: string;

  @Column({ length: 50, nullable: true })
  type: string; // string, number, boolean, json

  @Column({ type: "text", nullable: true })
  description: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
