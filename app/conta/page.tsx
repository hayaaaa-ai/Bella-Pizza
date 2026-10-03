import type { Metadata } from "next";
import { AccountForm } from "@/components/account/account-form";
export const metadata: Metadata = { title: "Minha conta" };
export default function AccountPage() {
  return <AccountForm />;
}
