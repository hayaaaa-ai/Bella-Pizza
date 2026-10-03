import Link from "next/link";
export default function Profile() {
  return (
    <div className="container simple-page">
      <span className="eyebrow">Minha conta</span>
      <h1>Seu perfil.</h1>
      <p>
        Esta área receberá seus dados depois da integração com a autenticação.
        Nenhuma sessão foi criada nesta prévia.
      </p>
      <Link className="button primary" href="/conta">
        Voltar para minha conta
      </Link>
    </div>
  );
}
