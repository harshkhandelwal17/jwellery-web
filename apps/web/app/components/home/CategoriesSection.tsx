import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Rings", slug: "rings", fallback: "/shreeva/ring_green_stone_flower_008.jpeg" },
  { name: "Necklaces", slug: "necklaces", fallback: "/shreeva/necklace_gold_wavy_mesh_009.jpeg" },
  { name: "Earrings", slug: "earrings", fallback: "/shreeva/earring_bali_oval_hoop_gold_018.jpeg" },
  { name: "Bracelets", slug: "bracelets", fallback: "/shreeva/kada_gold_chain_weave_013.jpeg" },
  { name: "Bridal", slug: "bridal", fallback: "/shreeva/necklace_set_rose_gold_flower_021.jpeg" },
  { name: "Watches", slug: "watches", fallback: "/shreeva/watch_ladies_GW875_titan_gold_019.jpeg" },
];

interface Props {
  categoryImages?: Record<string, string | undefined>;
}

export default function CategoriesSection({ categoryImages = {} }: Props) {
  return (
    <section className="categories-section" style={{ padding: "5rem 5rem", background: "var(--color-bg)" }}>
      <style>{`
        .categories-section { padding: 5rem 5rem; }
        .categories-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 900px) {
          .categories-grid { grid-template-columns: repeat(3, 1fr); max-width: 100%; }
        }
        @media (max-width: 768px) {
          .categories-section { padding: 2.5rem 1rem !important; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; gap: 0.75rem; }
          .categories-section h2 { font-size: 1.25rem !important; }
          .categories-section .section-subtitle { font-size: 0.6rem !important; }
          .categories-section .section-desc { font-size: 0.8rem !important; }
          .cat-card-link .cat-name { font-size: 0.75rem !important; }
          .cat-arrow { width: 1.4rem !important; height: 1.4rem !important; font-size: 0.6rem !important; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p className="section-subtitle" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-blush)", marginBottom: "0.5rem" }}>
          Browse Categories
        </p>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-text)" }}>
          Find Your Perfect Piece
        </h2>
        <p className="section-desc" style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginTop: "0.5rem", fontWeight: 300 }}>
          From lightweight bridal to everyday elegance
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
              <div className="cat-name" style={{ fontSize: "0.85rem", fontWeight: 500 }}>{cat.name}</div>
              <div className="cat-arrow cat-arrow-icon" style={{
                width: "1.6rem", height: "1.6rem", borderRadius: "50%",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", color: "var(--color-text-muted)",
                transition: "transform 0.2s ease, background 0.2s, color 0.2s, border-color 0.2s",
                flexShrink: 0,
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
        .cat-card-link:hover .cat-arrow-icon {
          transform: rotate(45deg) scale(1.05);
        }
      `}</style>
    </section>
  );
}
