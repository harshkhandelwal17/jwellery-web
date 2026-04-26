import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-dark-800)" }}
    >
      {/* Watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display leading-none opacity-5 whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "var(--color-ivory-50)",
          }}
        >
          Jwell
        </span>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <p
          className="text-xs tracking-widest uppercase mb-6"
          style={{ color: "var(--color-blush-300)" }}
        >
          Begin Your Journey
        </p>

        <h2
          className="font-display leading-none mb-8"
          style={{
            fontSize: "clamp(3.5rem, 7vw, 6rem)",
            color: "var(--color-ivory-50)",
          }}
        >
          Find Your Forever Piece
        </h2>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "var(--color-text-300)" }}
        >
          Whether it&apos;s a gift for someone special or a treat for yourself,
          our jewellery experts are here to help you find the perfect piece.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="inline-block text-xs tracking-widest uppercase px-8 py-4 transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--color-blush-400)",
              color: "#fff",
            }}
          >
            Shop Collections
          </Link>
          <Link
            href="/contact"
            className="inline-block text-xs tracking-widest uppercase px-8 py-4 border transition-all hover:opacity-80"
            style={{
              borderColor: "var(--color-ivory-200)",
              color: "var(--color-ivory-50)",
            }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
