export type ProductCategory = 'Fresh Eggs' | 'Fresh Chicken' | 'Farm Supplies' | 'Premium Packs';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  unit: string; // e.g. "12 Eggs", "30 Eggs Tray", "1 KG", "10 KG"
  images: string[];
  features?: string[];
  nutritionFacts?: Record<string, string>;
  isFeatured?: boolean;
  badge?: string; // e.g. "Farm Fresh", "Best Seller", "Organic", "Save 15%"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'Cash on Delivery' | 'Bank Transfer' | 'EasyPaisa / JazzCash';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode?: string;
  deliveryInstructions?: string;
  deliverySlot?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface UserAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: UserAddress[];
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  badge: string;
  itemCount: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string; // international format without plus for wa.me, e.g. "923001234567"
  displayWhatsApp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  businessHours: string;
  currency: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  announcementText: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}
