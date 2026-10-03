"use client";
import { Plus, UtensilsCrossed } from "lucide-react";
import type { MenuItem } from "@/types/domain";
import { useCart } from "@/components/cart/cart-provider";
import { Photo } from "@/components/home/photo";
import { money } from "@/lib/ordering";
export function ProductCard({ product: p }: { product: MenuItem }) {
  const cart = useCart();
  return (
    <article className={`product-card ${!p.available ? "unavailable" : ""}`}>
      <div className="card-photo">
        {p.imageKey ? (
          <Photo imageKey={p.imageKey} sizes="(max-width:767px) 110px, 25vw" />
        ) : (
          <div className="photo-empty">
            <UtensilsCrossed strokeWidth={1} />
            <span>Foto em breve</span>
          </div>
        )}
        {p.imageKey && <small>Imagem ilustrativa</small>}
      </div>
      <div className="card-copy">
        <span className="card-label">Exemplo de cardápio</span>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <div className="card-bottom">
          <div>
            {p.available ? (
              <>
                <small>A partir de</small>
                <strong>
                  {money(Math.min(...p.variants.map((v) => v.price)))}
                </strong>
              </>
            ) : (
              <span className="unavailable-label">Indisponível no momento</span>
            )}
          </div>
          <button
            className="add-button"
            disabled={!p.available}
            onClick={() => cart.openProduct(p.id)}
            aria-label={`Adicionar ${p.name}`}
          >
            <Plus size={17} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
