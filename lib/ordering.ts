import type { MenuItem, MenuCategory, CartLine } from "../types/domain.ts";
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterMenu(
  items: MenuItem[],
  categories: MenuCategory[],
  query: string,
  categoryId: string | null,
): MenuItem[] {
  const q = normalize(query.trim());
  return items.filter(
    (p) =>
      (!categoryId || p.categoryId === categoryId) &&
      normalize(
        p.name +
          " " +
          p.description +
          " " +
          (categories.find((c) => c.id === p.categoryId)?.name || "") +
          " " +
          (categories.find((c) => c.id === p.categoryId)?.description || ""),
      ).includes(q),
  );
}
export function normalizeLine(
  value: unknown,
  items: MenuItem[],
): CartLine | null {
  if (!value || typeof value !== "object") return null;
  const x = value as Partial<CartLine>;
  const product = items.find((p) => p.id === x.productId && p.available);
  if (
    !product ||
    typeof x.lineId !== "string" ||
    !x.lineId ||
    x.lineId.length > 100 ||
    !Number.isInteger(x.quantity) ||
    x.quantity! < 1 ||
    x.quantity! > 20 ||
    !product.variants.some((v) => v.id === x.variantId) ||
    !Array.isArray(x.optionIds) ||
    x.optionIds.some(
      (id) =>
        typeof id !== "string" || !product.options.some((o) => o.id === id),
    ) ||
    new Set(x.optionIds).size !== x.optionIds.length ||
    !Array.isArray(x.flavorIds) ||
    x.flavorIds.length !== 0 ||
    typeof x.note !== "string"
  )
    return null;
  return {
    lineId: x.lineId,
    productId: product.id,
    variantId: x.variantId!,
    optionIds: [...x.optionIds],
    flavorIds: [],
    quantity: x.quantity!,
    note: x.note.slice(0, 200),
  };
}
export function priceLine(line: CartLine, items: MenuItem[]): number | null {
  const valid = normalizeLine(line, items);
  if (!valid) return null;
  const product = items.find((p) => p.id === valid.productId)!;
  return (
    (product.variants.find((v) => v.id === valid.variantId)!.price +
      valid.optionIds.reduce(
        (n, id) => n + product.options.find((o) => o.id === id)!.price,
        0,
      )) *
    valid.quantity
  );
}
export function restoreCart(raw: string | null, items: MenuItem[]): CartLine[] {
  try {
    const x = JSON.parse(raw || "null");
    if (x?.version !== 1 || !Array.isArray(x.lines)) return [];
    const seen = new Set<string>();
    return x.lines
      .slice(0, 60)
      .map((v: unknown) => normalizeLine(v, items))
      .filter((v: CartLine | null): v is CartLine => {
        if (!v || seen.has(v.lineId)) return false;
        seen.add(v.lineId);
        return true;
      });
  } catch {
    return [];
  }
}
export function updateQuantity(
  lines: CartLine[],
  lineId: string,
  quantity: number,
): CartLine[] {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20)
    return lines;
  return quantity === 0
    ? lines.filter((l) => l.lineId !== lineId)
    : lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l));
}
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
