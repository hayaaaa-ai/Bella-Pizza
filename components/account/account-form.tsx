"use client";
import { useState } from "react";
import Link from "next/link";
import { UserRound, Mail, ShoppingBag, MapPin } from "lucide-react";
import { toast } from "sonner";
export function AccountForm() {
  const [mode, setMode] = useState<"login" | "signup" | "recover">("login");
  return (
    <div className="account-page container">
      <div className="account-intro">
        <span className="eyebrow">Seu espaço na Bella</span>
        <h1>
          Bom ter
          <br />
          <em>você por aqui.</em>
        </h1>
        <p>
          No futuro, sua conta vai reunir pedidos,
          <br />
          endereços e suas escolhas favoritas.
        </p>
        <ul>
          <li>
            <ShoppingBag size={19} />
            Seus pedidos em um só lugar
          </li>
          <li>
            <MapPin size={19} />
            Endereços para facilitar a próxima escolha
          </li>
          <li>
            <UserRound size={19} />
            Uma conta, sem complicação
          </li>
        </ul>
        <Link href="/cardapio" className="text-link">
          Pedir sem criar conta
        </Link>
      </div>
      <section className="account-form">
        <span className="account-icon">
          {mode === "recover" ? <Mail size={24} /> : <UserRound size={24} />}
        </span>
        <h2>
          {mode === "login"
            ? "Entre na sua conta"
            : mode === "signup"
              ? "Crie sua conta"
              : "Recupere seu acesso"}
        </h2>
        <p>
          {mode === "recover"
            ? "Informe seu e-mail para conhecer o fluxo de recuperação."
            : "Esta área será conectada à autenticação na próxima etapa."}
        </p>
        <form
          key={mode}
          onSubmit={(e) => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
            toast.info(
              mode === "recover"
                ? "Recuperação prevista para a próxima etapa. Nenhum e-mail foi enviado."
                : "Esta é uma interface de apresentação. A autenticação será integrada na próxima etapa.",
            );
          }}
          autoComplete="off"
        >
          <label className="field">
            E-mail
            <input
              type="email"
              placeholder="voce@exemplo.com"
              required
              maxLength={160}
              autoComplete="off"
            />
          </label>
          {mode !== "recover" && (
            <label className="field">
              Senha
              <input
                type="password"
                placeholder="Sua senha"
                minLength={8}
                maxLength={128}
                required
                autoComplete="new-password"
              />
              <span className="field-help">
                Nesta prévia, nenhuma senha é salva ou enviada.
              </span>
            </label>
          )}
          {mode === "login" && (
            <button
              type="button"
              className="text-link forgot-link"
              onClick={() => setMode("recover")}
            >
              Esqueci minha senha
            </button>
          )}
          <button className="button primary full" type="submit">
            {mode === "login"
              ? "Entrar"
              : mode === "signup"
                ? "Criar conta"
                : "Solicitar recuperação"}
          </button>
        </form>
        <div className="account-switch">
          {mode === "login" ? (
            <>
              Ainda não tem conta?{" "}
              <button className="text-link" onClick={() => setMode("signup")}>
                Criar conta
              </button>
            </>
          ) : (
            <button className="text-link" onClick={() => setMode("login")}>
              Voltar para entrar
            </button>
          )}
        </div>
        <p className="demo-note">
          Fluxo demonstrativo · sem autenticação ativa.
        </p>
      </section>
    </div>
  );
}
