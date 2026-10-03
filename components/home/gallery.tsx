import { Photo } from "./photo";
import { Camera } from "lucide-react";
import { contacts, restaurantConfig as r } from "@/data/restaurant-config";
export function Gallery() {
  return (
    <section className="gallery container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Mais um motivo para reunir</span>
          <h2>
            Pizza no centro.
            <br />
            <em>A conversa em volta.</em>
          </h2>
        </div>
        <a
          className="instagram-link"
          href={contacts.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Camera size={20} />
          <span>
            Acompanhe a Bella<small>@{r.instagram}</small>
          </span>
        </a>
      </div>
      <div className="gallery-grid">
        <figure>
          <Photo imageKey="serve" sizes="(max-width:767px) 65vw, 60vw" />
          <figcaption>Fotografia ilustrativa</figcaption>
        </figure>
        <figure>
          <Photo imageKey="hero" sizes="(max-width:767px) 35vw, 35vw" />
          <figcaption>Fotografia ilustrativa</figcaption>
        </figure>
      </div>
    </section>
  );
}
