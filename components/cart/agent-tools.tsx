"use client";
import { useEffect, useRef } from "react";
import { useCart } from "./cart-provider";
import { menuItems, categories } from "@/data/demo-menu";
import { filterMenu } from "@/lib/ordering";
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => unknown;
};
type ModelContext = {
  registerTool: (
    tool: Tool,
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
function objectInput(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Expected an object.");
  return input as Record<string, unknown>;
}
export function AgentTools() {
  const cart = useCart();
  const latest = useRef(cart);
  useEffect(() => {
    latest.current = cart;
  }, [cart]);
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tools: Tool[] = [
      {
        name: "read_demo_menu",
        description:
          "Read Bella Pizza illustrative menu, optionally filtered by a search query. All products, prices and photos are examples, not the current official menu.",
        inputSchema: {
          type: "object",
          properties: { query: { type: "string", maxLength: 120 } },
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute(input) {
          const x = objectInput(input);
          if (
            Object.keys(x).some((k) => k !== "query") ||
            (x.query !== undefined &&
              (typeof x.query !== "string" || x.query.length > 120))
          )
            throw new Error("Invalid search input.");
          return {
            isDemo: true,
            items: filterMenu(
              menuItems,
              categories,
              (x.query as string) || "",
              null,
            ),
          };
        },
      },
      {
        name: "read_demo_cart",
        description:
          "Read the current locally staged demo cart and subtotal in BRL cents. No real order or payment is created.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute(input) {
          if (Object.keys(objectInput(input)).length)
            throw new Error("This tool accepts no fields.");
          return {
            isDemo: true,
            ready: latest.current.ready,
            lines: latest.current.lines,
            subtotalCents: latest.current.subtotal,
            currency: "BRL",
          };
        },
      },
    ];
    for (const tool of tools) {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {
        /* Optional browser support must not interrupt ordering. */
      }
    }
    return () => lifecycle.abort();
  }, []);
  return null;
}
