"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function HeroGoldRateTag({ className, style }: Props) {
  const [pricePerGram, setPricePerGram] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/gold-price`)
      .then((r) => r.json())
      .then((d: { success?: boolean; data?: { pricePerGram?: number } }) => {
        if (d.success && typeof d.data?.pricePerGram === "number") {
          setPricePerGram(d.data.pricePerGram);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className={`gold-badge-pulse ${className ?? ""}`.trim()} style={style}>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-mid)" }}>
        Live Gold Rate
      </div>
      <div
        style={{
          fontFamily: "var(--font-display, 'Cinzel', serif)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--color-gold)",
          marginTop: "0.25rem",
          letterSpacing: "0.04em",
        }}
      >
        {pricePerGram ? `₹${pricePerGram.toLocaleString("en-IN")} /g` : "Loading…"}
      </div>
    </div>
  );
}
