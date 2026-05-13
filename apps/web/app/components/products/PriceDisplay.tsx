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
        Pricing
      </p>

      <div
        className="font-display leading-none mb-4 tracking-tight"
        style={{
          fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)",
          color: "var(--color-gold)",
        }}
      >
        Price On Request
      </div>

      <div className="space-y-2 text-xs" style={{ color: "var(--color-text-mid)" }}>
        <div className="flex justify-between gap-3">
          <span className="text-left">Metal</span>
          <span className="shrink-0">{metalLabel}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Weight</span>
          <span className="shrink-0">{product.weight}g</span>
        </div>
        {product.purity ? (
          <div className="flex justify-between gap-3">
            <span>Standard</span>
            <span className="shrink-0">{product.purity}</span>
          </div>
        ) : null}
      </div>

      <p
        className="mt-3 text-[0.7rem] leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        Final quote ke liye enquiry bhejein, team aapko latest rate ke hisaab se confirm karegi.
      </p>
    </div>
  );
}
