"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { imageSrcNeedsUnoptimized } from "../../lib/cloudinary";

// ─── Data ────────────────────────────────────────────────────────────────────

export interface SubCat {
  label: string;
  slug: string; // used as ?mainCategory=...&subCategory=...
}

export interface MainCat {
  key: string; // mainCategory value sent to API
  name: string;
  tagline: string;
  badge?: string;
  accentColor: string; // CSS colour for accent elements
  hoverBorder: string;
  hoverGlow: string;
  fallback: string;
  icon: string;
  subCategories: SubCat[];
}

export const MAIN_CATS: MainCat[] = [
  {
    key: "Gold Jewellery",
    name: "Gold Jewellery",
    tagline: "BIS Hallmarked 22KT",
    badge: "22KT",
    accentColor: "#d4af37",
    hoverBorder: "rgba(212,175,55,0.7)",
    hoverGlow: "rgba(212,175,55,0.15)",
    fallback: "/shreeva/necklace_gold_wavy_mesh_009.jpeg",
    icon: "◈",
    subCategories: [
      { label: "Rings", slug: "rings" },
      { label: "Necklaces", slug: "necklaces-and-chains" },
      { label: "Earrings", slug: "earrings" },
      { label: "Bracelets", slug: "bracelets" },
      { label: "Chains", slug: "chains" },
      { label: "Pendants", slug: "pendants" },
    ],
  },
  {
    key: "Silver Jewellery",
    name: "Silver Jewellery",
    tagline: "Certified 925 Sterling",
    badge: "925",
    accentColor: "#b0b8c8",
    hoverBorder: "rgba(176,184,200,0.7)",
    hoverGlow: "rgba(176,184,200,0.12)",
    fallback: "/shreeva/ring_green_stone_flower_008.jpeg",
    icon: "✦",
    subCategories: [
      { label: "Rings", slug: "rings" },
      { label: "Necklaces", slug: "necklaces-and-chains" },
      { label: "Earrings", slug: "earrings" },
      { label: "Bracelets", slug: "bracelets" },
      { label: "Anklets", slug: "anklets" },
      { label: "Toe Rings", slug: "toe-rings" },
      { label: "Chains", slug: "chains" },
      { label: "Pendants", slug: "pendants" },
    ],
  },
  {
    key: "Diamond Jewellery",
    name: "Lab Grown Diamond",
    tagline: "Certified · Modern Luxury",
    badge: "IGI",
    accentColor: "#a8d8f0",
    hoverBorder: "rgba(168,216,240,0.7)",
    hoverGlow: "rgba(168,216,240,0.12)",
    fallback: "/shreeva/ring_gold_diamond_cut_9k_012.jpeg",
    icon: "◇",
    subCategories: [
      { label: "Rings", slug: "rings" },
      { label: "Necklaces", slug: "necklaces-and-chains" },
      { label: "Earrings", slug: "earrings" },
      { label: "Bracelets", slug: "bracelets" },
      { label: "Pendants", slug: "pendants" },
    ],
  },
];

function subCatHref(mainCatKey: string, subSlug: string): string {
  const p = new URLSearchParams();
  p.set("mainCategory", mainCatKey);
  p.set("subCategory", subSlug);
  return `/products?${p.toString()}`;
}

function mainCatHref(mainCatKey: string): string {
  return `/products?mainCategory=${encodeURIComponent(mainCatKey)}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  categoryImages?: Record<string, string | undefined>;
}

export default function CategoriesClient({ categoryImages = {} }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <section
      className="categories-section section-shell"
      aria-label="Browse by category"
      style={{
        padding: "clamp(3.25rem, 7vw, 6rem) clamp(1rem, 4vw, 3rem)",
        background: "var(--color-bg)",
      }}
    >
      <style>{`
        /* ── section header ── */
        .cats-header { text-align: center; margin-bottom: clamp(2rem, 5vw, 3.5rem); }
        .cats-eyebrow { font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--color-gold); margin-bottom: 0.5rem; }
        .cats-title { font-family: 'Cinzel', serif; font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 600; letter-spacing: 0.06em; color: var(--color-text); }
        .cats-desc { font-size: 0.88rem; color: var(--color-text-mid); margin-top: 0.5rem; font-weight: 300; }

        /* ── 3-column main grid ── */
        .cats-main-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 900px) { .cats-main-grid { grid-template-columns: 1fr; max-width: 480px; } }

        /* ── card ── */
        .cat-main-card {
          position: relative;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          transition: border-color 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .cat-main-card:focus-visible { outline: 2px solid var(--color-gold); outline-offset: 3px; }

        /* ── image ── */
        .cat-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .cat-img-wrap img { transition: transform 0.55s ease; }
        .cat-main-card:hover .cat-img-wrap img,
        .cat-main-card[data-open="true"] .cat-img-wrap img { transform: scale(1.06); }

        /* gradient overlay */
        .cat-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(8,8,30,0.75) 100%);
          z-index: 1;
        }

        /* badge in corner */
        .cat-img-badge {
          position: absolute;
          top: 0.75rem; left: 0.75rem;
          z-index: 2;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
          backdrop-filter: blur(6px);
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }

        /* title row inside card */
        .cat-card-footer {
          padding: 0.9rem 1rem 1rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .cat-card-info { flex: 1; }
        .cat-card-name { font-size: 0.9rem; font-weight: 600; color: var(--color-text); font-family: 'Cinzel', serif; letter-spacing: 0.04em; }
        .cat-card-tagline { font-size: 0.65rem; color: var(--color-text-mid); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.15rem; }

        /* chevron button */
        .cat-chevron {
          width: 2rem; height: 2rem; border-radius: 50%;
          border: 1px solid var(--color-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; color: var(--color-text-mid);
          transition: all 0.3s; flex-shrink: 0;
          background: transparent;
          cursor: pointer;
        }
        .cat-chevron svg {
          transition: transform 0.3s ease;
        }
        .cat-main-card[data-open="true"] .cat-chevron svg { transform: rotate(180deg); }

        /* ── subcategory drawer ── */
        .cat-subcats-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s;
          border-top: 0px solid transparent;
        }
        .cat-subcats-wrap[data-open="true"] {
          max-height: 320px;
          border-top: 1px solid var(--color-border);
        }
        .cat-subcats-inner {
          padding: 0.9rem 1rem 1rem;
          display: flex; flex-wrap: wrap; gap: 0.5rem;
        }
        .cat-sub-chip {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .cat-sub-chip:hover { transform: translateY(-2px); }

        /* view-all link */
        .cat-view-all {
          display: block;
          text-align: center;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.55rem 0 0.65rem;
          text-decoration: none;
          border-top: 1px solid var(--color-border);
          transition: background 0.2s;
        }
        .cat-view-all:hover { background: rgba(255,255,255,0.03); }

        /* mobile stacking already handled by grid */
      `}</style>

      <div className="cats-header">
        <p className="cats-eyebrow">Browse Collections</p>
        <h2 className="cats-title">Shop by Category</h2>
        <p className="cats-desc">Gold · Silver · Lab Grown Diamond</p>
      </div>

      <div className="cats-main-grid">
        {MAIN_CATS.map((cat) => {
          const isOpen = openKey === cat.key;
          const imgSrc = categoryImages[cat.key] ?? cat.fallback;

          return (
            <div
              key={cat.key}
              className="cat-main-card"
              data-open={isOpen ? "true" : "false"}
              style={
                isOpen
                  ? { borderColor: cat.hoverBorder, boxShadow: `0 16px 48px ${cat.hoverGlow}` }
                  : undefined
              }
            >
              {/* Clickable image + header area */}
              <button
                type="button"
                onClick={() => toggle(cat.key)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${cat.name} subcategories`}
                style={{ width: "100%", background: "none", border: "none", padding: 0, display: "block", cursor: "pointer", textAlign: "left" }}
              >
                {/* Image */}
                <div className="cat-img-wrap">
                  <Image
                    src={imgSrc}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 90vw, 360px"
                    quality={85}
                    unoptimized={imageSrcNeedsUnoptimized(imgSrc)}
                  />
                  <div className="cat-img-overlay" />
                  {cat.badge && (
                    <span
                      className="cat-img-badge"
                      style={{
                        background: `rgba(8,8,30,0.65)`,
                        border: `1px solid ${cat.accentColor}44`,
                        color: cat.accentColor,
                      }}
                    >
                      {cat.badge}
                    </span>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      left: "0.85rem",
                      zIndex: 2,
                      fontSize: "1.6rem",
                      color: cat.accentColor,
                      lineHeight: 1,
                      textShadow: "0 0 12px rgba(0,0,0,0.6)",
                    }}
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                </div>

                {/* Footer */}
                <div className="cat-card-footer">
                  <div className="cat-card-info">
                    <div className="cat-card-name">{cat.name}</div>
                    <div className="cat-card-tagline">{cat.tagline}</div>
                  </div>
                  <div
                    className="cat-chevron"
                    style={
                      isOpen
                        ? { background: cat.accentColor, borderColor: cat.accentColor, color: "#000" }
                        : {}
                    }
                    aria-hidden="true"
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </button>

              {/* Subcategory drawer */}
              <div className="cat-subcats-wrap" data-open={isOpen ? "true" : "false"} aria-hidden={!isOpen}>
                <div className="cat-subcats-inner">
                  {cat.subCategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={subCatHref(cat.key, sub.slug)}
                      className="cat-sub-chip"
                      tabIndex={isOpen ? 0 : -1}
                      style={{
                        borderColor: `${cat.accentColor}50`,
                        color: cat.accentColor,
                        background: `${cat.accentColor}0d`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${cat.accentColor}22`;
                        (e.currentTarget as HTMLElement).style.borderColor = cat.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${cat.accentColor}0d`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${cat.accentColor}50`;
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={mainCatHref(cat.key)}
                  className="cat-view-all"
                  tabIndex={isOpen ? 0 : -1}
                  style={{ color: cat.accentColor }}
                >
                  View all {cat.name} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
