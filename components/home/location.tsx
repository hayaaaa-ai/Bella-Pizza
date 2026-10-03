import Link from "next/link";
import { MapPin, Phone, Camera } from "lucide-react";
import { contacts, restaurantConfig as r } from "@/data/restaurant-config";
import { Photo } from "./photo";
export function Location() {
  return (
    <>
      <section className="location container" id="localizacao">
        <div className="location-copy">
          <span className="eyebrow">Nossa localização</span>
          <h2>
            Tem Bella
            <br />
            <em>em Januária.</em>
          </h2>
          <div className="address-block">
            <MapPin size={22} strokeWidth={1.5} />
            <div>
              <strong>{r.address}</strong>
              <p>{r.city} · Minas Gerais</p>
            </div>
          </div>
          <a
            className="button primary"
            href={contacts.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Como chegar
          </a>
        </div>
        <div className="location-contact" id="contato">
          <span className="eyebrow">Vamos conversar?</span>
          <h3>Fale com a Bella.</h3>
          <p>
            Consulte o cardápio oficial, as opções
            <br />
            disponíveis e as condições do seu pedido.
          </p>
          <a className="contact-row" href={contacts.phone}>
            <Phone size={19} />
            <span>
              <small>Telefone</small>
              <strong>{r.phone}</strong>
            </span>
          </a>
          <a className="contact-row" href={contacts.secondaryPhone}>
            <Phone size={19} />
            <span>
              <small>Outro contato</small>
              <strong>{r.secondaryPhone}</strong>
            </span>
          </a>
          <a
            className="contact-row"
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={19} />
            <span>
              <small>Instagram</small>
              <strong>@{r.instagram}</strong>
            </span>
          </a>
        </div>
      </section>
      <section className="final-cta container">
        <div>
          <span className="eyebrow">A próxima noite começa aqui</span>
          <h2>
            Já sabe com quem
            <br />
            vai <em>dividir?</em>
          </h2>
          <Link href="/cardapio" className="button primary">
            Ver cardápio
          </Link>
        </div>
        <div className="final-cta-image">
          <Photo imageKey="serve" sizes="(max-width:767px) 100vw, 40vw" />
          <span className="photo-caption">Fotografia ilustrativa</span>
        </div>
      </section>
    </>
  );
}
