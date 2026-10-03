import Link from "next/link";
export default function Addresses() {
  return (
    <div className="container simple-page">
      <span className="eyebrow">Minha conta</span>
      <h1>Seus endereços.</h1>
      <p>
        Os endereços poderão ser salvos quando a conta estiver integrada. Nesta
        apresentação, nenhum endereço pessoal é armazenado.
      </p>
      <Link className="button primary" href="/conta">
        Voltar para minha conta
      </Link>
    </div>
  );
}
