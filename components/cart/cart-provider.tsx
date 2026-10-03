"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { AgentTools } from "./agent-tools";
import { Toaster } from "@/components/ui/sonner";
import { menuItems } from "@/data/demo-menu";
import { normalizeLine, priceLine, updateQuantity } from "@/lib/ordering";
import { readStoredCart, writeStoredCart } from "@/lib/cart-storage";
import type { CartLine } from "@/types/domain";
const CartDrawer = lazy(() => import("./cart-drawer"));
const ProductPanel = lazy(() => import("@/components/menu/product-panel"));
interface CartContextValue {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  openProduct: (productId: string, lineId?: string) => void;
  saveLine: (line: CartLine) => void;
  changeQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  restoreFocus: () => void;
}
const CartContext = createContext<CartContextValue | null>(null);
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider required");
  return ctx;
}
export function CartProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<{
    productId: string;
    lineId?: string;
    returnToCart: boolean;
  } | null>(null);
  const focusTarget = useRef<HTMLElement | null>(null);
  const storageWarned = useRef(false);
  useEffect(() => {
    let current = true;
    // Restore after hydration; the server and first client render stay identical.
    queueMicrotask(() => {
      if (!current) return;
      try {
        setLines(readStoredCart(localStorage, menuItems));
      } catch {
        /* Memory cart remains available when accessing storage is forbidden. */
      }
      setReady(true);
    });
    return () => {
      current = false;
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      if (!writeStoredCart(localStorage, lines))
        throw new Error("Storage unavailable");
    } catch {
      if (!storageWarned.current) {
        toast.info(
          "Seu pedido fica disponível nesta página. Não foi possível salvá-lo neste navegador.",
        );
        storageWarned.current = true;
      }
    }
  }, [lines, ready]);
  const captureFocus = () => {
    if (document.activeElement instanceof HTMLElement)
      focusTarget.current = document.activeElement;
  };
  const restoreFocus = () => {
    requestAnimationFrame(() => {
      if (document.querySelector('[role="dialog"]')) return;
      const target = focusTarget.current?.isConnected
        ? focusTarget.current
        : document.querySelector<HTMLElement>(".cart-button");
      target?.focus();
    });
  };
  const openCart = () => {
    captureFocus();
    setSelected(null);
    setCartOpen(true);
  };
  const openProduct = (productId: string, lineId?: string) => {
    if (!menuItems.some((p) => p.id === productId && p.available)) return;
    if (!cartOpen) captureFocus();
    setCartOpen(false);
    setSelected({ productId, lineId, returnToCart: cartOpen });
  };
  const saveLine = (line: CartLine) => {
    const valid = normalizeLine(line, menuItems);
    if (!valid) {
      toast.error("Revise as opções do produto.");
      return;
    }
    const edit = lines.some((l) => l.lineId === valid.lineId);
    setLines((prev) =>
      edit
        ? prev.map((l) => (l.lineId === valid.lineId ? valid : l))
        : [...prev, valid],
    );
    const returnToCart = selected?.returnToCart;
    setSelected(null);
    toast.success(edit ? "Pedido atualizado" : "Adicionado ao pedido", {
      action: { label: "Ver pedido", onClick: openCart },
    });
    if (returnToCart) setCartOpen(true);
  };
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce(
    (n, l) => n + (priceLine(l, menuItems) || 0),
    0,
  );
  const value: CartContextValue = {
    lines,
    ready,
    count,
    subtotal,
    cartOpen,
    setCartOpen,
    openCart,
    openProduct,
    saveLine,
    changeQuantity: (id, q) => setLines((prev) => updateQuantity(prev, id, q)),
    remove: (id) => setLines((prev) => prev.filter((l) => l.lineId !== id)),
    restoreFocus,
  };
  return (
    <CartContext.Provider value={value}>
      <AgentTools />
      {children}
      <Suspense fallback={null}>
        {cartOpen && <CartDrawer />}
        {selected && (
          <ProductPanel
            key={`${selected.productId}/${selected.lineId || "new"}`}
            productId={selected.productId}
            lineId={selected.lineId}
            onClose={() => {
              const returnToCart = selected.returnToCart;
              setSelected(null);
              if (returnToCart) setCartOpen(true);
            }}
          />
        )}
      </Suspense>
      {count > 0 &&
        !cartOpen &&
        !selected &&
        pathname !== "/checkout" &&
        !pathname.startsWith("/conta") && (
          <button className="mobile-cart-bar" onClick={openCart}>
            <span className="mobile-cart-count">{count}</span>
            <strong>Ver pedido</strong>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(subtotal / 100)}
            </span>
          </button>
        )}
      <Toaster theme="light" position="top-center" richColors closeButton />
    </CartContext.Provider>
  );
}
