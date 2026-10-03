export interface RestaurantConfig {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  secondaryPhone: string;
  instagram: string;
  whatsapp: string | null;
  demo: boolean;
}
export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: string;
  isIllustrative: boolean;
  source: string;
}
export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}
export interface ProductOption {
  id: string;
  name: string;
  price: number;
}
export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  imageKey: string;
  available: boolean;
  isDemo: boolean;
  variants: ProductVariant[];
  options: ProductOption[];
  featured?: boolean;
}
export interface CartLine {
  lineId: string;
  productId: string;
  variantId: string;
  optionIds: string[];
  flavorIds: string[];
  quantity: number;
  note: string;
}
export interface Address {
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  reference: string;
  city: string;
  state: string;
}
export interface CheckoutDraft {
  name: string;
  phone: string;
  fulfillment: "delivery" | "pickup";
  address: Address;
  paymentMethodId: string;
  changeFor: string;
}
export interface Order {
  restaurantId: string;
  customerId: string | null;
  items: CartLine[];
  fulfillment: "delivery" | "pickup";
  address: Address | null;
  subtotal: number;
  deliveryFee: number | null;
  discount: number;
  total: number | null;
  paymentMethod: string;
  paymentStatus: "pending";
  orderStatus: "draft";
}
