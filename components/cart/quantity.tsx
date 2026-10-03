"use client";
import { Minus, Plus } from "lucide-react";
export function Quantity({
  value,
  onChange,
  label = "Quantidade",
  min = 1,
}: {
  value: number;
  onChange: (q: number) => void;
  label?: string;
  min?: number;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Diminuir ${label.toLowerCase()}`}
      >
        <Minus size={15} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 20}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
