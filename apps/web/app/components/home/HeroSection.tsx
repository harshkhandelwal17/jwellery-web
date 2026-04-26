import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-ivory-50)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
          {/* Text side */}
          <div className="md:py-24 order-2 md:order-1">
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--color-blush-400)" }}
            >
              Forever Luxury
            </p>

            <h1
              className="font-display leading-none mb-8"
              style={{
                fontSize: "clamp(5rem, 10vw, 8.5rem)",
                color: "var(--color-text-900)",
              }}
            >
              Moments
              <br />
              To
              <br />
              Mementos
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-10 max-w-sm"
              style={{ color: "var(--color-text-500)" }}
            >
              Handcrafted luxury jewellery that captures life&apos;s most
              precious moments. Each piece is a testament to timeless
              elegance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-block text-xs tracking-widest uppercase px-8 py-4 transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-text-900)",
                  color: "var(--color-ivory-50)",
                }}
              >
                Explore Collections
              </Link>
              <Link
                href="/contact"
                className="inline-block text-xs tracking-widest uppercase px-8 py-4 border transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--color-text-900)",
                  color: "var(--color-text-900)",
                }}
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="order-1 md:order-2 relative">
            <div
              className="relative mx-auto md:mx-0 overflow-hidden"
              style={{
                aspectRatio: "4/5",
                maxWidth: "520px",
                marginLeft: "auto",
              }}
            >
              <Image
                src="https://picsum.photos/seed/jwellhero/800/1000"
                alt="Luxury jewellery collection"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gold rate badge */}
              <div
                className="absolute bottom-6 left-6 px-4 py-3 text-xs"
                style={{
                  backgroundColor: "var(--color-ivory-50)",
                  color: "var(--color-text-900)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: "var(--color-text-500)" }}
                >
                  Today&apos;s Gold Rate
                </div>
                <div
                  className="font-display text-2xl leading-none"
                  style={{ color: "var(--color-gold-500)" }}
                >
                  ₹9,450/g
                </div>
              </div>
            </div>

            {/* Decorative background blob */}
            <div
              className="absolute -top-10 -right-10 w-80 h-80 rounded-full -z-10 opacity-40"
              style={{ backgroundColor: "var(--color-blush-100)" }}
            />
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div
        className="mt-16 py-4 overflow-hidden border-t border-b"
        style={{
          borderColor: "var(--color-ivory-200)",
          backgroundColor: "var(--color-ivory-100)",
        }}
      >
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {[
                "Handcrafted Gold Jewellery",
                "BIS Hallmarked",
                "Lifetime Warranty",
                "Free Shipping Above ₹25,000",
                "Custom Orders Welcome",
                "100+ Designs",
                "Trusted Since 2003",
                "Expert Craftsmen",
              ].map((text) => (
                <span
                  key={text}
                  className="mx-8 text-xs tracking-widest uppercase"
                  style={{ color: "var(--color-text-500)" }}
                >
                  {text}
                  <span
                    className="mx-8"
                    style={{ color: "var(--color-blush-300)" }}
                  >
                    ✦
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
