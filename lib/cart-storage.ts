import { restoreCart } from "./ordering.ts";
import type { MenuItem, CartLine } from "../types/domain.ts";
type CartStorage = Pick<Storage, "getItem" | "setItem">;
export function readStoredCart(
  storage: CartStorage,
  items: MenuItem[],
): CartLine[] {
  try {
    return restoreCart(storage.getItem("bella-cart-v1"), items);
  } catch {
    return [];
  }
}
export function writeStoredCart(
  storage: CartStorage,
  lines: CartLine[],
): boolean {
  try {
    storage.setItem("bella-cart-v1", JSON.stringify({ version: 1, lines }));
    return true;
  } catch {
    return false;
  }
}
