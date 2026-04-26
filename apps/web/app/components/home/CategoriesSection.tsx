import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Rings", slug: "rings", fallback: "https://picsum.photos/seed/rings88/400/400" },
  { name: "Necklaces", slug: "necklaces", fallback: "https://picsum.photos/seed/neck88/400/400" },
  { name: "Earrings", slug: "earrings", fallback: "https://picsum.photos/seed/ear88/400/400" },
  { name: "Bracelets", slug: "bracelets", fallback: "https://picsum.photos/seed/brac88/400/400" },
];

interface Props {
  categoryImages?: Record<string, string | undefined>;
}

export default function CategoriesSection({ categoryImages = {} }: Props) {
  return (
    <section className="categories-section" style={{ padding: "5rem 5rem", background: "var(--color-bg)" }}>
      <style>{`
        .categories-section { padding: 5rem 5rem; }
        .categories-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 900px; margin: 0 auto; }
        @media (max-width: 768px) {
          .categories-section { padding: 3rem 1.25rem !important; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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

      <div className="categories-grid">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/products?category=${cat.slug}`}
            className="cat-card-link"
            style={{
              textDecoration: "none", color: "var(--color-text)",
              background: "var(--color-bg-card)",
              borderRadius: "0.875rem", overflow: "hidden",
              border: "1px solid var(--color-border)",
              transition: "all 0.3s", display: "block",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
              <Image
                src={categoryImages[cat.slug] ?? cat.fallback}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 225px"
                quality={85}
              />
            </div>
            <div style={{
              padding: "0.75rem 0.875rem 0.875rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{cat.name}</div>
              <div className="cat-arrow" style={{
                width: "1.6rem", height: "1.6rem", borderRadius: "50%",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", color: "var(--color-text-muted)",
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
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(201,128,106,0.14);
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
