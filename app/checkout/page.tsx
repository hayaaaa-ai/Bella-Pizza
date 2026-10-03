import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";
export const metadata: Metadata = { title: "Seu pedido" };
export default function CheckoutPage() {
  return <CheckoutFlow />;
}
