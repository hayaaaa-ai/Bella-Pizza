import test from "node:test";
import assert from "node:assert/strict";
import { readStoredCart, writeStoredCart } from "../lib/cart-storage.ts";
import { menuItems } from "../data/demo-menu.ts";
test("unavailable browser storage keeps the memory cart usable", () => {
  const blocked = {
    getItem() {
      throw new Error("SecurityError");
    },
    setItem() {
      throw new Error("QuotaExceededError");
    },
  };
  assert.deepEqual(readStoredCart(blocked, menuItems), []);
  assert.equal(writeStoredCart(blocked, []), false);
});
test("only normalized cart fields are restored; checkout data is excluded", () => {
  const line = {
    lineId: "test",
    productId: menuItems[0].id,
    variantId: menuItems[0].variants[0].id,
    optionIds: [],
    flavorIds: [],
    quantity: 1,
    note: "Sem cebola",
    name: "Private customer",
    phone: "123",
    address: { street: "Private" },
  };
  const restored = readStoredCart(
    {
      getItem: () => JSON.stringify({ version: 1, lines: [line] }),
      setItem() {},
    },
    menuItems,
  );
  assert.equal(restored.length, 1);
  assert.deepEqual(Object.keys(restored[0]).sort(), [
    "flavorIds",
    "lineId",
    "note",
    "optionIds",
    "productId",
    "quantity",
    "variantId",
  ]);
  let saved = "";
  assert.equal(
    writeStoredCart(
      {
        getItem: () => null,
        setItem: (_key, value) => {
          saved = value;
        },
      },
      restored,
    ),
    true,
  );
  assert.equal(saved.includes("Private"), false);
});
