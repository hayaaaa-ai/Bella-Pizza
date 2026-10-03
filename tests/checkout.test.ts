import test from "node:test";
import assert from "node:assert/strict";
import { validateCheckout, describeSelection } from "../lib/checkout.ts";
import { menuItems } from "../data/demo-menu.ts";
import type { CheckoutDraft, CartLine } from "../types/domain.ts";
const draft: CheckoutDraft = {
  name: "Cliente de teste",
  phone: "38999990000",
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
  paymentMethodId: "dinheiro",
  changeFor: "50,00",
};
test("completion rejects cash amount made insufficient by a cart edit", () => {
  assert.equal(validateCheckout(draft, 3990), null);
  assert.deepEqual(validateCheckout(draft, 7980), {
    step: 3,
    message: "O valor para troco deve ser igual ou maior que o subtotal.",
  });
  assert.equal(validateCheckout({ ...draft, changeFor: "100,00" }, 7980), null);
});
test("pickup does not require a stale delivery address and real input is revalidated", () => {
  assert.equal(validateCheckout(draft, 3990), null);
  assert.equal(
    validateCheckout({ ...draft, fulfillment: "delivery" }, 3990)?.step,
    2,
  );
  assert.equal(validateCheckout({ ...draft, phone: "12" }, 3990)?.step, 1);
  assert.equal(
    validateCheckout({ ...draft, paymentMethodId: "" }, 3990)?.step,
    3,
  );
});
test("review distinguishes selected size, extras and different notes", () => {
  const line: CartLine = {
    lineId: "a",
    productId: "mucarela",
    variantId: "grande",
    optionIds: ["borda-queijo"],
    flavorIds: [],
    quantity: 1,
    note: "Sem cebola",
  };
  const description = describeSelection(line, menuItems);
  assert.match(description, /Grande/);
  assert.match(description, /Borda de queijo/);
  assert.match(description, /Observação: Sem cebola/);
  assert.notEqual(
    description,
    describeSelection({ ...line, lineId: "b", note: "Bem assada" }, menuItems),
  );
});
