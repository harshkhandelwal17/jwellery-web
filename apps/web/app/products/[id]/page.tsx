import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/products/ProductCard";
import EnquireButton from "../../components/products/EnquireButton";
import PriceDisplay from "../../components/products/PriceDisplay";
import SafeImage from "../../components/products/SafeImage";
import { fetchProduct, fetchProducts } from "../../lib/api";
import { PRODUCT_PROMO_BADGE_LABELS, type ProductCategory } from "@jwell/types";
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

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var(--color-bg)" }}>
        {/* Breadcrumb */}
        <div
          className="border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
            <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:opacity-60 transition-opacity">Collections</Link>
            <span>/</span>
            <span style={{ color: "var(--color-text)" }}>{product.name}</span>
          </div>
        </div>

        {/* Product detail */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <SafeImage
                src={productImageUrl(product.image, { width: 1200, quality: 90 })}
                alt={product.name}
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="hero-enter hero-enter-1 flex flex-wrap items-center gap-2 mb-3">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--color-gold)" }}
                >
                  {product.category}
                </p>
                {product.promoBadge ? (
                  <span
                    className="text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      color: "var(--color-gold)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      background: "rgba(212,175,55,0.12)",
                    }}
                  >
                    {PRODUCT_PROMO_BADGE_LABELS[product.promoBadge]}
                  </span>
                ) : null}
              </div>

              {/* Name */}
              <h1
                className="hero-enter hero-enter-2 font-display leading-none mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--color-text)",
                }}
              >
                {product.name}
              </h1>

              {/* Description */}
              <p
                className="hero-enter hero-enter-3 text-base leading-relaxed mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                {product.description}
              </p>

              {/* Specs */}
              <div
                className="hero-enter hero-enter-4 grid grid-cols-2 gap-4 mb-8 p-5 border"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg-card)",
                }}
              >
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Metal</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>22kt Gold</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Weight</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{product.weight}g</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Category</p>
                  <p className="text-sm font-medium capitalize" style={{ color: "var(--color-text)" }}>{product.category}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>Hallmark</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>BIS 916</p>
                </div>
                {product.sku ? (
                  <div className="col-span-2">
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>SKU</p>
                    <p className="text-sm font-medium font-mono" style={{ color: "var(--color-text)" }}>{product.sku}</p>
                  </div>
                ) : null}
              </div>

              {/* Price */}
              <PriceDisplay product={product} />

              {/* Actions */}
              <div className="hero-enter hero-enter-5 flex flex-col sm:flex-row gap-4 mt-8">
                <EnquireButton productId={product.id} productName={product.name} />
                <Link
                  href="/contact"
                  className="flex-1 text-center text-xs tracking-widest uppercase px-6 py-4 border transition-all hover:opacity-80"
                  style={{
                    borderColor: "var(--color-gold)",
                    color: "var(--color-gold)",
                  }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div
            className="scroll-reveal py-16 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="font-display leading-none mb-6 md:mb-10 text-2xl md:text-4xl"
                style={{ color: "var(--color-text)" }}
              >
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="group block">
                    <div className="relative overflow-hidden mb-2 rounded-lg" style={{ aspectRatio: "3/4" }}>
                      <SafeImage
                        src={productImageUrl(p.image, { width: 600, quality: 85 })}
                        alt={p.name}
                        fill
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <p className="text-xs md:text-sm mb-0.5 truncate" style={{ color: "var(--color-text)" }}>{p.name}</p>
                    <p className="text-xs md:text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: "var(--color-gold)" }}>
                      ₹{p.calculatedPrice.toLocaleString("en-IN")}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
