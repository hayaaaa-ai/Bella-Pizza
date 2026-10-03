import type { Metadata } from "next";
import { Catalog } from "@/components/menu/catalog";
import { contacts } from "@/data/restaurant-config";
export const metadata: Metadata = { title: "Cardápio demonstrativo" };
export default function MenuPage() {
  return (
    <div className="menu-page container">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Bella Pizza · Januária</span>
          <h1>
            O que vai ser <em>hoje?</em>
          </h1>
          <p>Escolha, personalize e monte seu pedido.</p>
        </div>
        <a className="text-link" href={contacts.phone}>
          Prefere falar com a Bella?
        </a>
      </div>
      <Catalog />
      <div className="menu-footnote">
        <strong>O cardápio oficial vem na próxima etapa.</strong>
        <p>
          Para conhecer as opções disponíveis hoje, entre em contato com a Bella
          Pizza.
        </p>
        <a className="button secondary" href={contacts.phone}>
          Ligar para a Bella
        </a>
      </div>
    </div>
  );
}
