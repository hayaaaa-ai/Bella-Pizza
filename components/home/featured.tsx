"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Photo } from "./photo";
import { menuItems } from "@/data/demo-menu";
import { money } from "@/lib/ordering";
import { useCart } from "@/components/cart/cart-provider";
export function Featured() {
  const cart = useCart();
  const products = menuItems.filter((p) => p.featured);
  const big = products[2];
  return (
    <section className="featured container" id="destaques">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Para abrir o apetite</span>
          <h2>
            Deu vontade?
            <br />
            <em>Escolha seu próximo pedaço.</em>
          </h2>
        </div>
        <Link className="text-link" href="/cardapio">
          Ver todo o cardápio
        </Link>
      </div>
      <p className="demo-note featured-note">
        Uma prévia do futuro cardápio · produtos e valores de exemplo.
      </p>
      <div className="featured-grid">
        <article className="featured-main">
          <Photo
            imageKey={big.imageKey}
            sizes="(max-width:767px) 100vw, 55vw"
          />
          <span className="photo-caption">Fotografia ilustrativa</span>
          <div className="featured-main-copy">
            <span>UM CONVITE À MESA</span>
            <h3>{big.name}</h3>
            <p>{big.description}</p>
            <button
              className="button light"
              onClick={() => cart.openProduct(big.id)}
            >
              Escolher essa pizza
              <Plus size={17} />
            </button>
          </div>
        </article>
        <div className="featured-side">
          <div className="featured-side-heading">
            <span>Comece por aqui.</span>
            <p>
              Escolhas para experimentar
              <br />o seu futuro pedido.
            </p>
          </div>
          {products.slice(0, 2).map((p) => (
            <article className="featured-small" key={p.id}>
              <Photo imageKey={p.imageKey} sizes="130px" />
              <div>
                <span className="card-label">Produto de exemplo</span>
                <h3>{p.name}</h3>
                <p>A partir de {money(p.variants[0].price)}</p>
                <button
                  className="text-link"
                  onClick={() => cart.openProduct(p.id)}
                >
                  Escolher <Plus size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
