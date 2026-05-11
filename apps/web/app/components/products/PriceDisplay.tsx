import { formatCurrency } from "@jwell/utils";
import type { ProductWithPrice } from "@jwell/types";

interface Props {
  product: ProductWithPrice;
}

export default function PriceDisplay({ product }: Props) {
  const metalLabel =
    product.metalTypeUsed === "silver"
      ? "Silver"
      : product.metalTypeUsed === "diamond"
        ? "Diamond"
        : "Gold";
  const unitRate = product.pricePerGramUsed ?? product.goldPriceUsed;

  return (
    <div
      className="p-5 md:p-6 rounded-xl border"
      style={{
        borderColor: "var(--color-border)",
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <p
        className="text-xs tracking-widest uppercase mb-2 font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        Live Price
      </p>

      <div
        className="font-display leading-none mb-4 tracking-tight"
        style={{
          fontSize: "clamp(1.85rem, 4.5vw, 2.65rem)",
          color: "var(--color-gold)",
        }}
      >
        {formatCurrency(product.calculatedPrice)}
      </div>

      <div className="space-y-2 text-xs" style={{ color: "var(--color-text-mid)" }}>
        <div className="flex justify-between gap-3">
          <span className="text-left">
            {metalLabel} ({product.weight}g × ₹{unitRate.toLocaleString("en-IN")}/g)
          </span>
          <span className="shrink-0 tabular-nums">
            {formatCurrency(unitRate * product.weight)}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Making charges</span>
          <span className="shrink-0 tabular-nums">{formatCurrency(product.makingCharges)}</span>
        </div>
        <div
          className="flex justify-between pt-2.5 border-t font-semibold text-[0.8125rem]"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          <span>Total</span>
          <span className="tabular-nums">{formatCurrency(product.calculatedPrice)}</span>
        </div>
      </div>

      <p
        className="mt-3 text-[0.7rem] leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        Price calculated at ₹{unitRate.toLocaleString("en-IN")}/g {metalLabel.toLowerCase()} rate
      </p>
    </div>
  );
}
