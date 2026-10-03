import { categories, menuItems } from "@/data/demo-menu";
import type { MenuCategory, MenuItem, Order } from "@/types/domain";
export interface MenuRepository {
  getMenu(
    restaurantId: string,
  ): Promise<{ categories: MenuCategory[]; items: MenuItem[] }>;
}
export interface OrderRepository {
  submitOrder(order: Order): Promise<{ orderId: string }>;
}
export const demoMenuRepository: MenuRepository = {
  async getMenu(restaurantId) {
    return {
      categories,
      items: menuItems.filter((p) => p.restaurantId === restaurantId),
    };
  },
};
// No OrderRepository implementation: demonstration must never report a real order as received.
