import Link from "next/link";
export default function Orders() {
  return (
    <div className="container simple-page">
      <span className="eyebrow">Minha conta</span>
      <h1>Seus pedidos.</h1>
      <p>
        Nenhum pedido anterior nesta apresentação. O histórico estará disponível
        quando a conta for integrada.
      </p>
      <Link className="button primary" href="/cardapio">
        Ver cardápio
      </Link>
      <Link className="text-link" href="/conta">
        Voltar para minha conta
      </Link>
    </div>
  );
}
