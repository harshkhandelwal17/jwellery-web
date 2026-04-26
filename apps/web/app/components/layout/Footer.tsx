import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-auto pt-16 pb-8"
      style={{ backgroundColor: "var(--color-dark-900)", color: "var(--color-text-300)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: "#3e342a" }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="font-display text-5xl mb-4"
              style={{ color: "var(--color-ivory-50)" }}
            >
              Jwell
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-text-300)" }}>
              Handcrafted luxury jewellery made from the finest gold. Each piece tells a story of timeless elegance and masterful craftsmanship.
            </p>
            <p className="mt-4 text-xs tracking-widest uppercase" style={{ color: "var(--color-gold-500)" }}>
              BIS Hallmarked · Lifetime Warranty
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--color-ivory-100)" }}
            >
              Collections
            </h4>
            {["Rings", "Necklaces", "Earrings", "Bracelets"].map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat.toLowerCase()}`}
                className="block text-sm py-1 transition-colors hover:opacity-80"
                style={{ color: "var(--color-text-300)" }}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--color-ivory-100)" }}
            >
              Information
            </h4>
            {[
              { href: "/contact", label: "Contact Us" },
              { href: "/contact", label: "Book Appointment" },
              { href: "/products", label: "All Products" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-sm py-1 transition-colors hover:opacity-80"
                style={{ color: "var(--color-text-300)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: "var(--color-text-500)" }}>
          <span>© {new Date().getFullYear()} JWELL. All rights reserved.</span>
          <span className="tracking-widest uppercase">Crafted with love in India</span>
        </div>
      </div>
    </footer>
  );
}
