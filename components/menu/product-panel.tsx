"use client";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/components/cart/cart-provider";
import { Quantity } from "@/components/cart/quantity";
import { Photo } from "@/components/home/photo";
import { menuItems } from "@/data/demo-menu";
import { priceLine, money } from "@/lib/ordering";
export default function ProductPanel({
  productId,
  lineId,
  onClose,
}: {
  productId: string;
  lineId?: string;
  onClose: () => void;
}) {
  const cart = useCart();
  const product = menuItems.find((p) => p.id === productId)!;
  const original = cart.lines.find((l) => l.lineId === lineId);
  const [variant, setVariant] = useState(
    original?.variantId || product.variants[0].id,
  );
  const [options, setOptions] = useState(original?.optionIds || []);
  const [quantity, setQuantity] = useState(original?.quantity || 1);
  const [note, setNote] = useState(original?.note || "");
  const line = {
    lineId: lineId || "preview",
    productId,
    variantId: variant,
    optionIds: options,
    flavorIds: [],
    quantity,
    note,
  };
  const total = priceLine(line, menuItems);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="product-dialog"
        showCloseButton={false}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          cart.restoreFocus();
        }}
      >
        <DialogClose asChild>
          <button
            className="product-close icon-button"
            aria-label="Fechar produto"
          >
            <X size={22} />
          </button>
        </DialogClose>
        <div className="product-visual">
          <Photo imageKey={product.imageKey} />
          <span className="photo-caption">Imagem ilustrativa</span>
        </div>
        <div className="product-detail">
          <div className="product-heading">
            <span className="eyebrow">Monte seu pedido</span>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.description}</DialogDescription>
            <p className="demo-note">
              Produto, opções e valores demonstrativos.
            </p>
          </div>
          <div className="product-fields">
            <fieldset>
              <legend>
                Escolha o tamanho <small>Obrigatório</small>
              </legend>
              <RadioGroup value={variant} onValueChange={setVariant}>
                {product.variants.map((v) => (
                  <label
                    className={`choice-row ${variant === v.id ? "selected" : ""}`}
                    key={v.id}
                    htmlFor={`variant-${v.id}`}
                  >
                    <RadioGroupItem id={`variant-${v.id}`} value={v.id} />
                    <span>{v.name}</span>
                    <strong>{money(v.price)}</strong>
                  </label>
                ))}
              </RadioGroup>
            </fieldset>
            {product.options.length > 0 && (
              <fieldset>
                <legend>
                  Quer acrescentar algo? <small>Opcional</small>
                </legend>
                {product.options.map((o) => (
                  <label
                    className={`choice-row ${options.includes(o.id) ? "selected" : ""}`}
                    key={o.id}
                    htmlFor={`option-${o.id}`}
                  >
                    <Checkbox
                      id={`option-${o.id}`}
                      checked={options.includes(o.id)}
                      onCheckedChange={(checked) =>
                        setOptions((prev) =>
                          checked
                            ? [...prev, o.id]
                            : prev.filter((id) => id !== o.id),
                        )
                      }
                    />
                    <span>{o.name}</span>
                    <strong>+ {money(o.price)}</strong>
                  </label>
                ))}
              </fieldset>
            )}
            <label className="field">
              Alguma observação?
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={200}
                rows={3}
                placeholder="Ex.: sem cebola"
              />
              <span className="field-help">
                Não inclua dados pessoais. <span>{note.length}/200</span>
              </span>
            </label>
          </div>
          <div className="product-bottom">
            <Quantity value={quantity} onChange={setQuantity} />
            <button
              className="button primary"
              disabled={total === null}
              onClick={() =>
                cart.saveLine({
                  ...line,
                  lineId: lineId || crypto.randomUUID(),
                })
              }
            >
              {lineId ? "Salvar alterações" : "Adicionar ao pedido"}
              <span>{money(total || 0)}</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
