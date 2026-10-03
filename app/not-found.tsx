import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container simple-page not-found">
      <span className="eyebrow">Bella Pizza · 404</span>
      <h1>
        Esse pedaço
        <br />
        <em>não está por aqui.</em>
      </h1>
      <p>Vamos voltar para onde a escolha começa?</p>
      <Link href="/cardapio" className="button primary">
        Voltar ao cardápio
      </Link>
    </div>
  );
}
