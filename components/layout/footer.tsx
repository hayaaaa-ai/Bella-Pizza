import Link from "next/link";
import { restaurantConfig as r, contacts } from "@/data/restaurant-config";
import { Camera, Phone } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="footer-brand" href="/">
            Bella Pizza<span>Januária · Minas Gerais</span>
          </Link>
          <p>
            O próximo encontro
            <br />
            pode começar por aqui.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <Link href="/cardapio">Cardápio</Link>
          <Link href="/#sobre">A Bella</Link>
          <Link href="/#localizacao">Como chegar</Link>
          <Link href="/conta">Minha conta</Link>
        </nav>
        <div className="footer-contact">
          <a href={contacts.phone}>
            <Phone size={17} />
            {r.phone}
          </a>
          <a href={contacts.secondaryPhone}>{r.secondaryPhone}</a>
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={17} />@{r.instagram}
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Bella Pizza · Januária, MG</span>
        <span>Prévia de apresentação · pedidos demonstrativos</span>
      </div>
    </footer>
  );
}
