import type { CheckoutDraft, CartLine, MenuItem } from "../types/domain.ts";
import { demoPaymentMethods } from "../data/demo-payments.ts";
export function validateCheckout(
  draft: CheckoutDraft,
  subtotal: number,
  throughStep = 3,
): { step: number; message: string } | null {
  if (
    draft.name.trim().length < 2 ||
    ![10, 11].includes(draft.phone.replace(/\D/g, "").length)
  )
    return { step: 1, message: "Informe seu nome e um telefone com DDD." };
  if (
    throughStep >= 2 &&
    draft.fulfillment === "delivery" &&
    (!/^\d{8}$/.test(draft.address.cep.replace(/\D/g, "")) ||
      !draft.address.street.trim() ||
      !draft.address.number.trim() ||
      !draft.address.district.trim() ||
      !draft.address.city.trim() ||
      !/^[A-Za-z]{2}$/.test(draft.address.state))
  )
    return {
      step: 2,
      message: "Confira o CEP, rua, número, bairro, cidade e estado.",
    };
  if (throughStep >= 3) {
    if (!demoPaymentMethods.some((p) => p.id === draft.paymentMethodId))
      return {
        step: 3,
        message: "Escolha uma opção de pagamento para a demonstração.",
      };
    const amount = Number(draft.changeFor.replace(",", "."));
    if (
      draft.paymentMethodId === "dinheiro" &&
      draft.changeFor &&
      (!Number.isFinite(amount) || Math.round(amount * 100) < subtotal)
    )
      return {
        step: 3,
        message: "O valor para troco deve ser igual ou maior que o subtotal.",
      };
  }
  return null;
}
export function describeSelection(line: CartLine, items: MenuItem[]): string {
  const product = items.find((p) => p.id === line.productId);
  if (!product) return "";
  const variant = product.variants.find((v) => v.id === line.variantId)?.name;
  const options = line.optionIds
    .map((id) => product.options.find((o) => o.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  return [variant, options, line.note ? `Observação: ${line.note}` : ""]
    .filter(Boolean)
    .join(" · ");
}
