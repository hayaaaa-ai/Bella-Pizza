import Link from "next/link";
import { MapPin, UtensilsCrossed } from "lucide-react";
import { Photo } from "./photo";
import { restaurantConfig, contacts } from "@/data/restaurant-config";
export function Hero() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="small-rule" /> Bella Pizza · Januária, MG
          </span>
          <h1 id="hero-title">
            Sua noite
            <br />
            pede <em>Bella.</em>
          </h1>
          <p>
            Tem encontros que começam
            <br className="desktop-break" /> com uma boa pizza.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/cardapio">
              Pedir agora
            </Link>
            <Link className="button secondary" href="/cardapio">
              Ver cardápio
            </Link>
          </div>
          <a
            className="hero-address"
            href={contacts.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={17} />
            <span>
              {restaurantConfig.address}
              <br />
              <small>Januária · Minas Gerais</small>
            </span>
          </a>
        </div>
        <div className="hero-photo">
          <Photo
            imageKey="hero"
            priority
            sizes="(max-width: 767px) 100vw, 55vw"
          />
          <div className="photo-corner">
            <UtensilsCrossed size={22} />
            <span>
              Junte a turma.
              <br />
              <strong>O próximo pedaço é seu.</strong>
            </span>
          </div>
          <span className="photo-caption">Fotografia ilustrativa</span>
        </div>
        <span className="hero-number" aria-hidden="true">
          01 / À MESA
        </span>
      </section>
      <div className="intro-strip container">
        <span>
          Uma pausa.
          <br />
          <strong>Uma pizza. Uma boa companhia.</strong>
        </span>
        <span className="intro-strip-note">
          Bella Pizza
          <br />
          <strong>Januária, Minas Gerais</strong>
        </span>
      </div>
    </>
  );
}
