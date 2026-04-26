import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Rings", slug: "rings", image: "https://picsum.photos/seed/rings2/600/750", count: "48 styles" },
  { name: "Necklaces", slug: "necklaces", image: "https://picsum.photos/seed/necklace2/600/750", count: "36 styles" },
  { name: "Earrings", slug: "earrings", image: "https://picsum.photos/seed/earring2/600/750", count: "52 styles" },
  { name: "Bracelets", slug: "bracelets", image: "https://picsum.photos/seed/bracelet2/600/750", count: "24 styles" },
];

export default function CategoriesSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-ivory-50)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--color-blush-400)" }}
          >
            Shop by Category
          </p>
          <h2
            className="font-display leading-none"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              color: "var(--color-text-900)",
            }}
          >
            Our Collections
          </h2>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group block"
            >
              <div
                className="img-zoom relative overflow-hidden mb-4"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(46,36,32,0.7) 0%, transparent 60%)" }}
                >
                  <span
                    className="text-xs tracking-widest uppercase px-3 py-2 border text-white border-white/60"
                  >
                    View All →
                  </span>
                </div>
              </div>
              <div>
                <h3
                  className="font-display text-2xl leading-none mb-1"
                  style={{ color: "var(--color-text-900)" }}
                >
                  {cat.name}
                </h3>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: "var(--color-text-500)" }}
                >
                  {cat.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
