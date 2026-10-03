"use client";
import { useEffect, useState } from "react";
import { Search, X, UtensilsCrossed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { demoMenuRepository } from "@/lib/repositories";
import { filterMenu } from "@/lib/ordering";
import { restaurantConfig } from "@/data/restaurant-config";
import type { MenuItem, MenuCategory } from "@/types/domain";
import { ProductCard } from "./product-card";
export function Catalog() {
  const [data, setData] = useState<{
    items: MenuItem[];
    categories: MenuCategory[];
  } | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let current = true;
    demoMenuRepository
      .getMenu(restaurantConfig.id)
      .then((d) => {
        if (current) setData(d);
      })
      .catch(() => {
        if (current) setFailed(true);
      });
    return () => {
      current = false;
    };
  }, [retry]);
  const products = data
    ? filterMenu(data.items, data.categories, query, category)
    : [];
  return (
    <section className="catalog">
      <div className="catalog-tools">
        <div
          className="category-tabs"
          role="group"
          aria-label="Categorias do cardápio"
        >
          <button
            aria-pressed={!category}
            className={!category ? "active" : ""}
            onClick={() => setCategory(null)}
          >
            Todos
          </button>
          {data?.categories.map((c) => (
            <button
              key={c.id}
              aria-pressed={category === c.id}
              className={category === c.id ? "active" : ""}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="search-field">
          <Search size={18} />
          <label className="sr-only" htmlFor="menu-search">
            Buscar no cardápio
          </label>
          <input
            id="menu-search"
            placeholder="Buscar no cardápio"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>
      <p className="catalog-disclaimer">
        Cardápio demonstrativo · sabores, fotos e valores ilustrativos.
      </p>
      {failed ? (
        <div className="empty-state">
          <h3>Não conseguimos carregar o cardápio agora.</h3>
          <p>Tente novamente em alguns instantes.</p>
          <button
            className="button secondary"
            onClick={() => {
              setFailed(false);
              setRetry((n) => n + 1);
            }}
          >
            Tentar novamente
          </button>
        </div>
      ) : !data ? (
        <div className="product-grid" aria-label="Carregando cardápio">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton className="h-72 w-full" key={n} />
          ))}
        </div>
      ) : products.length ? (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <UtensilsCrossed size={36} />
          <h3>Não encontramos esse sabor.</h3>
          <p>Tente outro nome ou veja todas as opções.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
          >
            Ver todas as opções
          </button>
        </div>
      )}
    </section>
  );
}
