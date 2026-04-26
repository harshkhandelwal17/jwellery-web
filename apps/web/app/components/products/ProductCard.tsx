import Link from "next/link";
import Image from "next/image";
import type { ProductWithPrice } from "@jwell/types";
import { formatCurrency } from "@jwell/utils";

interface Props {
  product: ProductWithPrice;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-106"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-1"
          style={{
            backgroundColor: "var(--color-ivory-50)",
            color: "var(--color-text-700)",
          }}
        >
          {product.category}
        </div>
      </div>

      {/* Details */}
      <div>
        <h3
          className="text-sm tracking-wide mb-1 group-hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-900)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-xs mb-2"
          style={{ color: "var(--color-text-500)" }}
        >
          {product.weight}g · Making ₹{product.makingCharges.toLocaleString("en-IN")}
        </p>
        <div
          className="font-display text-2xl leading-none"
          style={{ color: "var(--color-gold-500)" }}
        >
          {formatCurrency(product.calculatedPrice)}
        </div>
      </div>
    </Link>
  );
}
