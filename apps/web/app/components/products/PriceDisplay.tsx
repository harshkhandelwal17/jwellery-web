import { formatCurrency } from "@jwell/utils";
import type { ProductWithPrice } from "@jwell/types";

interface Props {
  product: ProductWithPrice;
}

export default function PriceDisplay({ product }: Props) {
  return (
    <div
      className="p-6 border"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        Live Price
      </p>

      <div
        className="font-display leading-none mb-4"
        style={{ fontSize: "3rem", color: "var(--color-gold)" }}
      >
        {formatCurrency(product.calculatedPrice)}
      </div>

      <div className="space-y-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
        <div className="flex justify-between">
          <span>Gold ({product.weight}g × ₹{product.goldPriceUsed.toLocaleString("en-IN")}/g)</span>
          <span>{formatCurrency(product.goldPriceUsed * product.weight)}</span>
        </div>
        <div className="flex justify-between">
          <span>Making Charges</span>
          <span>{formatCurrency(product.makingCharges)}</span>
        </div>
        <div
          className="flex justify-between pt-2 border-t font-medium"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          <span>Total</span>
          <span>{formatCurrency(product.calculatedPrice)}</span>
        </div>
      </div>

      <p
        className="mt-3 text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        Price calculated at ₹{product.goldPriceUsed.toLocaleString("en-IN")}/g gold rate
      </p>
    </div>
  );
}
