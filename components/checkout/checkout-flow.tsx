"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  MapPin,
  ShoppingBag,
  Phone,
  CreditCard,
  Store,
  Truck,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { menuItems } from "@/data/demo-menu";
import { demoPaymentMethods } from "@/data/demo-payments";
import { restaurantConfig as r, contacts } from "@/data/restaurant-config";
import { money, priceLine } from "@/lib/ordering";
import { validateCheckout, describeSelection } from "@/lib/checkout";
import type { CheckoutDraft } from "@/types/domain";
const stages = [
  "Seu pedido",
  "Identificação",
  "Entrega ou retirada",
  "Pagamento",
  "Revisão",
];
const initial: CheckoutDraft = {
  name: "",
  phone: "",
  fulfillment: "pickup",
  address: {
    cep: "",
    street: "",
    number: "",
    district: "",
    complement: "",
    reference: "",
    city: "Januária",
    state: "MG",
  },
  paymentMethodId: "",
  changeFor: "",
};
export function CheckoutFlow() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const completionRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (done) completionRef.current?.focus();
  }, [done]);
  const move = (next: number) => {
    setStep(next);
    setError("");
    setTimeout(() => titleRef.current?.focus(), 0);
  };
  const next = () => {
    const problem = validateCheckout(draft, cart.subtotal, step);
    if (problem) {
      setError(problem.message);
      return;
    }
    move(step + 1);
  };
  const complete = () => {
    const problem = validateCheckout(draft, cart.subtotal);
    if (problem) {
      move(problem.step);
      setError(problem.message);
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const updateAddress = (key: keyof CheckoutDraft["address"], value: string) =>
    setDraft((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  if (!cart.ready)
    return (
      <div className="container checkout-page">
        <p>Preparando seu pedido…</p>
      </div>
    );
  if (!cart.lines.length)
    return (
      <div className="container empty-state checkout-empty">
        <ShoppingBag size={42} strokeWidth={1} />
        <span className="eyebrow">Seu pedido</span>
        <h1>Ainda cabe uma pizza aqui.</h1>
        <p>Escolha uma opção no cardápio para continuar.</p>
        <Link href="/cardapio" className="button primary">
          Ver cardápio
        </Link>
      </div>
    );
  if (done)
    return (
      <div className="container checkout-page">
        <div className="demo-complete">
          <span className="complete-icon">
            <Check size={28} />
          </span>
          <span className="eyebrow">Primeira etapa · apresentação</span>
          <h1 ref={completionRef} tabIndex={-1}>
            Demonstração <em>concluída.</em>
          </h1>
          <p>
            Você percorreu o futuro fluxo de pedidos da Bella.
            <br />
            <strong>Nenhum pedido foi enviado à pizzaria.</strong>
          </p>
          <p>
            Para fazer um pedido real ou consultar o cardápio,
            <br />
            entre em contato com a Bella Pizza.
          </p>
          <a className="button primary" href={contacts.phone}>
            <Phone size={17} />
            Ligar para a Bella
          </a>
          <Link href="/cardapio" className="text-link">
            Voltar ao cardápio
          </Link>
        </div>
      </div>
    );
  return (
    <div className="container checkout-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Bella Pizza · Seu pedido</span>
          <h1>
            Falta pouco para
            <br />
            <em>ficar tudo pronto.</em>
          </h1>
        </div>
        <Link href="/cardapio" className="text-link">
          Continuar escolhendo
        </Link>
      </div>
      <ol className="checkout-steps" aria-label="Etapas do pedido">
        {stages.map((s, i) => (
          <li
            key={s}
            className={i === step ? "current" : i < step ? "finished" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i < step ? <Check size={13} /> : i + 1}</span>
            <small>{s}</small>
          </li>
        ))}
      </ol>
      <div className="checkout-grid">
        <section className="checkout-form">
          <span className="step-eyebrow">ETAPA {step + 1} DE 5</span>
          <h2 ref={titleRef} tabIndex={-1}>
            {stages[step]}
          </h2>
          {step === 0 && (
            <>
              <p className="form-intro">
                Seu pedido, do seu jeito. Confira os itens antes de continuar.
              </p>
              <div className="checkout-items">
                {cart.lines.map((l) => {
                  const p = menuItems.find((p) => p.id === l.productId)!;
                  return (
                    <div key={l.lineId}>
                      <span>
                        <strong>
                          {l.quantity} × {p.name}
                        </strong>
                        <small>{describeSelection(l, menuItems)}</small>
                      </span>
                      <strong>{money(priceLine(l, menuItems) || 0)}</strong>
                      <button
                        className="text-link"
                        onClick={() => cart.openProduct(p.id, l.lineId)}
                      >
                        Editar
                      </button>
                    </div>
                  );
                })}
              </div>
              <button className="button primary full" onClick={() => move(1)}>
                Continuar sem cadastro
              </button>
              <Link className="account-choice" href="/conta">
                Entrar na minha conta
              </Link>
            </>
          )}
          {step === 1 && (
            <>
              <p className="form-intro">
                Só o necessário para identificar seu pedido. Nesta prévia, os
                dados ficam apenas nesta página.
              </p>
              <form
                id="checkout-step-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                <label className="field">
                  Seu nome
                  <input
                    required
                    autoComplete="off"
                    maxLength={80}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                    placeholder="Como podemos chamar você?"
                  />
                </label>
                <label className="field">
                  Telefone com DDD
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="off"
                    maxLength={18}
                    value={draft.phone}
                    onChange={(e) =>
                      setDraft({ ...draft, phone: e.target.value })
                    }
                    placeholder="(38) 99999-9999"
                  />
                </label>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <p className="form-intro">
                Escolha como gostaria de receber. Modalidades e condições reais
                serão confirmadas pela Bella.
              </p>
              <RadioGroup
                value={draft.fulfillment}
                onValueChange={(value) =>
                  setDraft({
                    ...draft,
                    fulfillment: value as "delivery" | "pickup",
                  })
                }
                className="fulfillment-options"
              >
                <label className="choice-tile" htmlFor="pickup">
                  <RadioGroupItem id="pickup" value="pickup" />
                  <Store size={22} />
                  <strong>Retirar no local</strong>
                  <small>Praça Emílio de Matos, 15</small>
                </label>
                <label className="choice-tile" htmlFor="delivery">
                  <RadioGroupItem id="delivery" value="delivery" />
                  <Truck size={22} />
                  <strong>Entrega</strong>
                  <small>Taxa e área a confirmar</small>
                </label>
              </RadioGroup>
              {draft.fulfillment === "pickup" ? (
                <div className="pickup-address">
                  <MapPin size={20} />
                  <p>
                    <strong>{r.address}</strong>
                    <br />
                    {r.city} · {r.state}
                    <br />
                    <small>Disponibilidade de retirada a confirmar.</small>
                  </p>
                </div>
              ) : (
                <form
                  id="checkout-step-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  className="address-form"
                >
                  {(
                    [
                      ["cep", "CEP", "00000-000"],
                      ["street", "Rua", "Nome da rua"],
                      ["number", "Número", "Número ou S/N"],
                      ["district", "Bairro", "Seu bairro"],
                      [
                        "complement",
                        "Complemento (opcional)",
                        "Apartamento, bloco…",
                      ],
                      [
                        "reference",
                        "Referência (opcional)",
                        "Um ponto de referência",
                      ],
                      ["city", "Cidade", "Januária"],
                      ["state", "Estado", "MG"],
                    ] as const
                  ).map(([key, label, placeholder]) => (
                    <label className={`field field-${key}`} key={key}>
                      {label}
                      <input
                        required={!["complement", "reference"].includes(key)}
                        inputMode={key === "cep" ? "numeric" : "text"}
                        autoComplete="off"
                        value={draft.address[key]}
                        onChange={(e) => updateAddress(key, e.target.value)}
                        maxLength={
                          key === "state" ? 2 : key === "cep" ? 9 : 100
                        }
                        placeholder={placeholder}
                      />
                    </label>
                  ))}
                </form>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <p className="form-intro">
                Opções de exemplo. As formas aceitas pela Bella ainda serão
                confirmadas.
              </p>
              <RadioGroup
                value={draft.paymentMethodId}
                onValueChange={(value) =>
                  setDraft({ ...draft, paymentMethodId: value, changeFor: "" })
                }
              >
                {demoPaymentMethods.map((p) => (
                  <label
                    className="payment-choice choice-row"
                    htmlFor={`pay-${p.id}`}
                    key={p.id}
                  >
                    <RadioGroupItem value={p.id} id={`pay-${p.id}`} />
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.detail}</small>
                    </span>
                    <CreditCard size={18} />
                  </label>
                ))}
              </RadioGroup>
              {draft.paymentMethodId === "dinheiro" && (
                <label className="field cash-field">
                  Troco para quanto? <small>Opcional</small>
                  <input
                    inputMode="decimal"
                    value={draft.changeFor}
                    onChange={(e) =>
                      setDraft({ ...draft, changeFor: e.target.value })
                    }
                    placeholder="Ex.: 100,00"
                    maxLength={10}
                  />
                  <span className="field-help">
                    Deixe em branco se não precisar de troco.
                  </span>
                </label>
              )}
            </>
          )}
          {step === 4 && (
            <>
              <p className="form-intro">Confira os dados da demonstração.</p>
              <div className="review-block">
                <div>
                  <small>Identificação</small>
                  <strong>{draft.name}</strong>
                  <span>{draft.phone}</span>
                  <button className="text-link" onClick={() => move(1)}>
                    Alterar
                  </button>
                </div>
                <div>
                  <small>
                    {draft.fulfillment === "pickup"
                      ? "Retirada no local"
                      : "Endereço de entrega"}
                  </small>
                  <strong>
                    {draft.fulfillment === "pickup"
                      ? r.address
                      : `${draft.address.street}, ${draft.address.number}`}
                  </strong>
                  <span>
                    {draft.fulfillment === "pickup"
                      ? `${r.city} · ${r.state}`
                      : `${draft.address.district} · ${draft.address.city}/${draft.address.state}`}
                  </span>
                  {draft.fulfillment === "delivery" && (
                    <>
                      <span>CEP: {draft.address.cep}</span>
                      <span>
                        {draft.address.complement} {draft.address.reference}
                      </span>
                    </>
                  )}
                  <button className="text-link" onClick={() => move(2)}>
                    Alterar
                  </button>
                </div>
                <div>
                  <small>Pagamento · exemplo</small>
                  <strong>
                    {
                      demoPaymentMethods.find(
                        (p) => p.id === draft.paymentMethodId,
                      )?.name
                    }
                  </strong>
                  {draft.changeFor && (
                    <span>Troco para R$ {draft.changeFor}</span>
                  )}
                  <button className="text-link" onClick={() => move(3)}>
                    Alterar
                  </button>
                </div>
              </div>
              <div className="review-demo-note">
                Demonstração: nenhum pedido será enviado à pizzaria.
              </div>
              <button className="button primary full" onClick={complete}>
                Concluir demonstração
              </button>
            </>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {step > 0 && (
            <div className="checkout-form-actions">
              <button
                className="button secondary"
                onClick={() => move(step - 1)}
              >
                Voltar
              </button>
              {step < 4 && (
                <button
                  className="button primary"
                  form={
                    step === 1 ||
                    (step === 2 && draft.fulfillment === "delivery")
                      ? "checkout-step-form"
                      : undefined
                  }
                  type={
                    step === 1 ||
                    (step === 2 && draft.fulfillment === "delivery")
                      ? "submit"
                      : "button"
                  }
                  onClick={
                    step === 1 ||
                    (step === 2 && draft.fulfillment === "delivery")
                      ? undefined
                      : next
                  }
                >
                  Continuar
                </button>
              )}
            </div>
          )}
        </section>
        <aside className="order-summary">
          <span className="eyebrow">Tudo em um lugar</span>
          <h2>Resumo do pedido</h2>
          <div className="summary-items">
            {cart.lines.map((l) => (
              <div key={l.lineId}>
                <span>
                  {l.quantity} ×{" "}
                  {menuItems.find((p) => p.id === l.productId)?.name}
                  <small>{describeSelection(l, menuItems)}</small>
                </span>
                <strong>{money(priceLine(l, menuItems) || 0)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <strong>{money(cart.subtotal)}</strong>
            </div>
            <div>
              <span>
                {draft.fulfillment === "pickup"
                  ? "Retirada"
                  : "Taxa de entrega"}
              </span>
              <span>
                {draft.fulfillment === "pickup" ? "A confirmar" : "A confirmar"}
              </span>
            </div>
            <div className="summary-total">
              <span>
                {draft.fulfillment === "pickup"
                  ? "Total dos itens"
                  : "Total dos itens, sem entrega"}
              </span>
              <strong>{money(cart.subtotal)}</strong>
            </div>
          </div>
          <p className="demo-note">
            Produtos e valores ilustrativos. Nenhum pagamento será realizado.
          </p>
          <a href={contacts.phone} className="summary-help">
            <Phone size={16} />
            Precisa conversar com a Bella?
          </a>
        </aside>
      </div>
    </div>
  );
}
