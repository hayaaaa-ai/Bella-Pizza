import Link from "next/link";
import { Photo } from "./photo";
export function Editorial() {
  return (
    <section className="editorial" id="sobre">
      <div className="container editorial-grid">
        <div className="editorial-photo">
          <Photo imageKey="slice" sizes="(max-width:767px) 100vw, 45vw" />
          <span className="photo-caption">Fotografia ilustrativa</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">A Bella, em Januária</span>
          <h2>
            A melhor parte
            <br />é <em>estar junto.</em>
          </h2>
          <p>
            No meio da conversa, dos planos e das risadas, sempre cabe mais um
            pedaço.
          </p>
          <p>
            A Bella Pizza fica na Praça Emílio de Matos, em Januária. Um
            endereço para colocar no roteiro do próximo encontro.
          </p>
          <Link className="button secondary" href="/#localizacao">
            Encontre a Bella
          </Link>
          <span className="editorial-signature">
            Bella Pizza<span>JANUÁRIA · MINAS GERAIS</span>
          </span>
        </div>
      </div>
    </section>
  );
}
