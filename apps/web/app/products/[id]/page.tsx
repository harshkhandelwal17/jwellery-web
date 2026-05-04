import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquireButton from "../../components/products/EnquireButton";
import PriceDisplay from "../../components/products/PriceDisplay";
import SafeImage from "../../components/products/SafeImage";
import { fetchProduct, fetchProducts } from "../../lib/api";
import { PRODUCT_PROMO_BADGE_LABELS } from "@jwell/types";
import { formatCurrency } from "@jwell/utils";
import { productImageUrl } from "../../lib/cloudinary";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = await fetchProduct(id);
  if (!product) notFound();

  const allProducts = await fetchProducts();
  const related = allProducts
    .filter((p) => p.category === product!.category && p.id !== product!.id)
    .slice(0, 4);

  const imgSrc = productImageUrl(product.image, { width: 720, quality: 88 });

  return (
    <>
      <Header />
      <main className="product-detail-main" style={{ backgroundColor: "var(--color-bg)" }}>
        <style>{`
          .product-detail-main {
            --pd-max: min(1080px, 100% - 2rem);
          }
          .product-detail-hero {
            max-width: var(--pd-max);
            margin: 0 auto;
            padding: 1rem 1rem 0;
          }
          @media (min-width: 768px) {
            .product-detail-hero { padding: 1.5rem 1.5rem 0; }
          }
          .product-detail-grid {
            display: grid;
            gap: clamp(2rem, 5vw, 3.5rem);
            align-items: start;
            padding-bottom: clamp(2.5rem, 6vw, 4rem);
          }
          @media (min-width: 1024px) {
            .product-detail-grid {
              grid-template-columns: minmax(260px, 380px) minmax(0, 1fr);
              gap: 3rem;
            }
          }
          .product-detail-visual {
            width: 100%;
            max-width: 380px;
            margin: 0 auto;
          }
          @media (min-width: 1024px) {
            .product-detail-visual { margin: 0; max-width: 100%; }
          }
          .product-detail-frame {
            position: relative;
            aspect-ratio: 4 / 5;
            max-height: min(480px, 62vh);
            border-radius: 1.25rem;
            overflow: hidden;
            background: var(--color-bg-card);
            box-shadow:
              0 24px 48px rgba(0, 0, 0, 0.35),
              0 0 0 1px rgba(212, 175, 55, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.04);
          }
          .product-detail-info {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          @media (min-width: 1024px) {
            .product-detail-info {
              position: sticky;
              top: 6.5rem;
              padding-bottom: 2rem;
            }
          }
          .product-detail-specs {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem 1rem;
            padding: 1.1rem 1.15rem;
            border-radius: 1rem;
            border: 1px solid var(--color-border);
            background: linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          }
          .product-detail-spec-label {
            font-size: 0.62rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--color-text-muted);
            margin-bottom: 0.2rem;
          }
          .product-detail-spec-value {
            font-size: 0.88rem;
            font-weight: 500;
            color: var(--color-text);
          }
          .product-detail-trust {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1rem;
            font-size: 0.68rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--color-text-muted);
          }
          .product-detail-trust span {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }
          .product-detail-trust span::before {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 999px;
            background: var(--color-gold);
            opacity: 0.85;
          }
          .product-detail-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          @media (min-width: 520px) {
            .product-detail-actions { flex-direction: row; flex-wrap: wrap; }
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="border-b" style={{ borderColor: "var(--color-border)" }}>
          <nav
            className="product-detail-hero flex flex-wrap items-center gap-x-2 gap-y-1 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-[var(--color-gold)] transition-colors">
              Collections
            </Link>
            <span aria-hidden="true">/</span>
            <span className="line-clamp-1" style={{ color: "var(--color-text)" }}>
              {product.name}
            </span>
          </nav>
        </div>

        <div className="product-detail-hero product-detail-grid">
          {/* Image — capped size, not full-bleed giant */}
          <div className="product-detail-visual scroll-reveal">
            <div className="product-detail-frame">
              <SafeImage
                src={imgSrc}
                alt={product.name}
                fill
                priority
                quality={88}
                className="object-cover"
                sizes="(max-width: 1024px) 85vw, 380px"
              />
            </div>
          </div>

          {/* Copy + commerce */}
          <div className="product-detail-info">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[0.65rem] tracking-[0.22em] uppercase font-medium"
                style={{ color: "var(--color-gold)" }}
              >
                {product.category}
              </span>
              {product.promoBadge ? (
                <span
                  className="text-[0.6rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-semibold"
                  style={{
                    color: "var(--color-gold)",
                    border: "1px solid rgba(212,175,55,0.4)",
                    background: "rgba(212,175,55,0.1)",
                  }}
                >
                  {PRODUCT_PROMO_BADGE_LABELS[product.promoBadge]}
                </span>
              ) : null}
            </div>

            <h1
              className="font-display font-semibold leading-[1.08] tracking-[0.03em]"
              style={{
                fontSize: "clamp(1.65rem, 4vw, 2.35rem)",
                color: "var(--color-text)",
              }}
            >
              {product.name}
            </h1>

            <div className="product-detail-trust" aria-hidden="true">
              {product.mainCategory === "Silver Jewellery" ? (
                <>
                  <span>Certified 925 Silver</span>
                  <span>BIS hallmarked</span>
                  <span>Hand-finished</span>
                </>
              ) : (
                <>
                  <span>BIS hallmarked</span>
                  <span>Live gold rate</span>
                  <span>Hand-finished</span>
                </>
              )}
            </div>

            {product.description?.trim() ? (
              <p
                className="text-sm md:text-[0.9375rem] leading-[1.75] max-w-xl"
                style={{ color: "var(--color-text-mid)", fontWeight: 300 }}
              >
                {product.description}
              </p>
            ) : null}

            <div className="product-detail-specs">
              <div>
                <p className="product-detail-spec-label">Metal</p>
                <p className="product-detail-spec-value">
                  {product.mainCategory === "Silver Jewellery" ? "925 Sterling Silver" : "22KT gold"}
                </p>
              </div>
              <div>
                <p className="product-detail-spec-label">Weight</p>
                <p className="product-detail-spec-value">{product.weight}g</p>
              </div>
              <div>
                <p className="product-detail-spec-label">Category</p>
                <p className="product-detail-spec-value capitalize">{product.category}</p>
              </div>
              <div>
                <p className="product-detail-spec-label">Hallmark</p>
                <p className="product-detail-spec-value">
                  {product.mainCategory === "Silver Jewellery" ? "Certified 925" : "BIS 916"}
                </p>
              </div>
              {product.mainCategory ? (
                <div style={{ gridColumn: "1 / -1" }}>
                  <p className="product-detail-spec-label">Collection</p>
                  <p className="product-detail-spec-value">{product.mainCategory}</p>
                </div>
              ) : null}
              {product.sku ? (
                <div style={{ gridColumn: "1 / -1" }}>
                  <p className="product-detail-spec-label">SKU</p>
                  <p className="product-detail-spec-value font-mono text-[0.82rem]">{product.sku}</p>
                </div>
              ) : null}
            </div>

            <PriceDisplay product={product} />

            <div className="product-detail-actions">
              <div className="flex-1 min-w-[200px]">
                <EnquireButton productId={product.id} productName={product.name} />
              </div>
              <Link
                href="/contact"
                className="flex-1 min-w-[200px] text-center text-[0.65rem] tracking-[0.2em] uppercase px-5 py-3.5 rounded-full border transition-all hover:bg-[rgba(212,175,55,0.08)]"
                style={{
                  borderColor: "var(--color-gold)",
                  color: "var(--color-gold)",
                }}
              >
                Book appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <section
            className="border-t scroll-reveal"
            style={{ borderColor: "var(--color-border)", background: "var(--color-bg-warm)" }}
          >
            <div className="mx-auto px-4 py-12 md:py-16" style={{ maxWidth: "min(1080px, 100% - 2rem)" }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 md:mb-10">
                <div>
                  <p className="section-kicker mb-1">Same category</p>
                  <h2
                    className="font-display font-semibold tracking-[0.06em]"
                    style={{
                      fontSize: "clamp(1.15rem, 2.5vw, 1.65rem)",
                      color: "var(--color-text)",
                    }}
                  >
                    You may also like
                  </h2>
                </div>
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-[0.7rem] tracking-[0.18em] uppercase shrink-0 hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-gold)" }}
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group block rounded-xl overflow-hidden border transition-all duration-300 hover:border-[rgba(212,175,55,0.45)] hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.03), transparent)",
                    }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "4/5", maxHeight: "220px" }}
                    >
                      <SafeImage
                        src={productImageUrl(p.image, { width: 400, quality: 82 })}
                        alt={p.name}
                        fill
                        quality={82}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 46vw, 200px"
                      />
                    </div>
                    <div className="p-3 md:p-3.5">
                      <p
                        className="text-xs md:text-[0.8125rem] font-medium line-clamp-2 leading-snug mb-1"
                        style={{ color: "var(--color-text)" }}
                      >
                        {p.name}
                      </p>
                      <p
                        className="text-xs md:text-sm font-semibold font-display"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {formatCurrency(p.calculatedPrice)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
