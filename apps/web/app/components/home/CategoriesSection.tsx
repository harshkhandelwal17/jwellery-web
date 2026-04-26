import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Rings", slug: "rings", image: "https://picsum.photos/seed/cat1jw/400/400", count: "24 pieces" },
  { name: "Necklaces", slug: "necklaces", image: "https://picsum.photos/seed/cat2jw/400/400", count: "18 pieces" },
  { name: "Earrings", slug: "earrings", image: "https://picsum.photos/seed/cat3jw/400/400", count: "32 pieces" },
  { name: "Bracelets", slug: "bracelets", image: "https://picsum.photos/seed/cat4jw/400/400", count: "15 pieces" },
];

export default function CategoriesSection() {
  return (
    <section style={{ padding: "6rem 5rem", background: "var(--color-bg)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
          Browse Categories
        </p>
        <h2 style={{ fontFamily: "'Corinthia', cursive", fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)", fontWeight: 400, color: "var(--color-text)" }}>
          Find Your Perfect Piece
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginTop: "0.5rem", fontWeight: 300 }}>
          From bridal sets to everyday elegance
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/products?category=${cat.slug}`}
            className="cat-card-link"
            style={{
              textDecoration: "none", color: "var(--color-text)",
              background: "var(--color-bg-card)",
              borderRadius: "1.25rem", overflow: "hidden",
              border: "1px solid var(--color-border)",
              transition: "all 0.3s", display: "block",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div style={{
              padding: "1.1rem 1.25rem 1.25rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>{cat.name}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "0.15rem" }}>{cat.count}</div>
              </div>
              <div className="cat-arrow" style={{
                width: "2rem", height: "2rem", borderRadius: "50%",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", color: "var(--color-text-muted)",
                transition: "all 0.2s", flexShrink: 0,
              }}>
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .cat-card-link:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(201,128,106,0.14);
          border-color: var(--color-blush-mid) !important;
        }
        .cat-card-link:hover .cat-arrow {
          background: var(--color-blush) !important;
          color: white !important;
          border-color: var(--color-blush) !important;
        }
      `}</style>
    </section>
  );
}
