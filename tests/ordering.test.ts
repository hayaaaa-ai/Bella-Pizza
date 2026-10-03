import { test } from "node:test";
import assert from "node:assert/strict";
import {
  filterMenu,
  priceLine,
  restoreCart,
  updateQuantity,
  normalizeLine,
} from "../lib/ordering.ts";
const items = [
  {
    id: "pizza",
    restaurantId: "bella",
    categoryId: "pizzas",
    name: "Muçarela",
    description: "Molho e queijo",
    imageKey: "hero",
    available: true,
    isDemo: true,
    variants: [{ id: "grande", name: "Grande", price: 4900 }],
    options: [{ id: "borda", name: "Borda", price: 800 }],
  },
  {
    id: "off",
    restaurantId: "bella",
    categoryId: "pizzas",
    name: "Outra",
    description: "",
    imageKey: "hero",
    available: false,
    isDemo: true,
    variants: [{ id: "grande", name: "Grande", price: 4000 }],
    options: [],
  },
];
const cats = [{ id: "pizzas", name: "Pizzas", description: "Salgadas" }];
const line = {
  lineId: "one",
  productId: "pizza",
  variantId: "grande",
  optionIds: ["borda"],
  flavorIds: [],
  quantity: 2,
  note: "Sem cebola",
};
test("search handles accents, description and category", () => {
  assert.equal(filterMenu(items, cats, "mucarela", null).length, 1);
  assert.equal(filterMenu(items, cats, "queijo", null).length, 1);
  assert.equal(filterMenu(items, cats, "salgadas", null).length, 2);
  assert.equal(filterMenu(items, cats, "", "absent").length, 0);
});
test("subtotal includes variant and extras in integer cents", () => {
  assert.equal(priceLine(line, items), 11400);
  assert.equal(priceLine({ ...line, variantId: "bad" }, items), null);
});
test("restore rejects malformed, obsolete and unavailable cart content", () => {
  assert.deepEqual(restoreCart("{broken", items), []);
  assert.deepEqual(
    restoreCart(JSON.stringify({ version: 0, lines: [line] }), items),
    [],
  );
  assert.deepEqual(
    restoreCart(
      JSON.stringify({
        version: 1,
        lines: [
          { ...line, productId: "removed" },
          { ...line, productId: "off" },
          { ...line, quantity: NaN },
        ],
      }),
      items,
    ),
    [],
  );
  assert.equal(
    restoreCart(JSON.stringify({ version: 1, lines: [line] }), items)[0]
      .quantity,
    2,
  );
});
test("line normalization rejects invalid quantities/options and bounds notes", () => {
  assert.equal(normalizeLine({ ...line, quantity: -1 }, items), null);
  assert.equal(normalizeLine({ ...line, quantity: 1.5 }, items), null);
  assert.equal(normalizeLine({ ...line, optionIds: ["unknown"] }, items), null);
  assert.equal(
    normalizeLine({ ...line, note: "x".repeat(300) }, items)?.note.length,
    200,
  );
  assert.equal(
    priceLine({ ...line, optionIds: ["borda", "borda"] }, items),
    null,
  );
});
test("quantity controls preserve distinct customizations and remove only chosen line", () => {
  const lines = [line, { ...line, lineId: "two", note: "Outra observação" }];
  assert.equal(updateQuantity(lines, "one", 3)[0].quantity, 3);
  assert.equal(updateQuantity(lines, "one", 0)[0].lineId, "two");
  assert.deepEqual(updateQuantity(lines, "one", Infinity), lines);
});
