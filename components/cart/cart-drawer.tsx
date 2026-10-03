"use client";
import Link from "next/link";
import { ShoppingBag, X, Trash2, Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "./cart-provider";
import { Quantity } from "./quantity";
import { menuItems } from "@/data/demo-menu";
import { media } from "@/data/media";
import { money, priceLine } from "@/lib/ordering";
export default function CartDrawer() {
  const cart = useCart();
  return (
    <Sheet open={cart.cartOpen} onOpenChange={cart.setCartOpen}>
      <SheetContent
        className="cart-drawer"
        showCloseButton={false}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          cart.restoreFocus();
        }}
      >
        <div className="panel-top">
          <SheetTitle>
            Seu pedido <small>({cart.count})</small>
          </SheetTitle>
          <SheetClose asChild>
            <button className="icon-button" aria-label="Fechar pedido">
              <X />
            </button>
          </SheetClose>
        </div>
        <SheetDescription className="demo-note">
          Produtos e valores de exemplo para esta apresentação.
        </SheetDescription>
        {!cart.lines.length ? (
          <div className="empty-state">
            <ShoppingBag size={38} strokeWidth={1} />
            <h3>Seu pedido começa aqui.</h3>
            <p>
              Escolha uma pizza no cardápio
              <br />e monte do seu jeito.
            </p>
            <Link
              className="button primary"
              href="/cardapio"
              onClick={() => cart.setCartOpen(false)}
            >
              Ver cardápio
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.lines.map((line) => {
                const p = menuItems.find((p) => p.id === line.productId)!;
                return (
                  <article className="cart-line" key={line.lineId}>
                    <img
                      src={media[p.imageKey]?.src}
                      alt={`Imagem ilustrativa: ${p.name}`}
                      width={76}
                      height={76}
                    />
                    <div className="cart-line-main">
                      <div className="cart-line-title">
                        <h3>{p.name}</h3>
                        <strong>
                          {money(priceLine(line, menuItems) || 0)}
                        </strong>
                      </div>
                      <p>
                        {p.variants.find((v) => v.id === line.variantId)?.name}
                        {line.optionIds.map((id) => (
                          <span key={id}>
                            {" "}
                            · {p.options.find((o) => o.id === id)?.name}
                          </span>
                        ))}
                      </p>
                      {line.note && <p className="cart-note">{line.note}</p>}
                      <div className="cart-line-controls">
                        <Quantity
                          value={line.quantity}
                          min={0}
                          onChange={(q) => cart.changeQuantity(line.lineId, q)}
                          label={`Quantidade de ${p.name}`}
                        />
                        <button
                          className="icon-button"
                          aria-label={`Editar ${p.name}`}
                          onClick={() => cart.openProduct(p.id, line.lineId)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label={`Remover ${p.name}`}
                          onClick={() => cart.remove(line.lineId)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="cart-bottom">
              <div className="total-row">
                <span>Subtotal</span>
                <strong>{money(cart.subtotal)}</strong>
              </div>
              <p className="demo-note">
                Entrega e condições serão confirmadas pela pizzaria.
              </p>
              <Link
                href="/checkout"
                className="button primary full"
                onClick={() => cart.setCartOpen(false)}
              >
                Continuar para finalizar
              </Link>
              <button
                className="text-link"
                onClick={() => cart.setCartOpen(false)}
              >
                Continuar escolhendo
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
