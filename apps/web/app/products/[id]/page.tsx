import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import PriceDisplay from "../../components/products/PriceDisplay";
import { fetchProduct, fetchProducts } from "../../lib/api";
import { cloudinaryUrl } from "../../lib/cloudinary";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProduct(id);
  } catch {
    notFound();
  }

  const allProducts = await fetchProducts();
  const related = allProducts
    .filter((p) => p.category === product!.category && p.id !== product!.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var(--color-ivory-50)" }}>
        {/* Breadcrumb */}
        <div
          className="border-b"
          style={{ borderColor: "var(--color-ivory-200)" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs tracking-widest uppercase" style={{ color: "var(--color-text-500)" }}>
            <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:opacity-60 transition-opacity">Collections</Link>
            <span>/</span>
            <span style={{ color: "var(--color-text-900)" }}>{product.name}</span>
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
              <Image
                src={cloudinaryUrl(product.image, { width: 1200, quality: 90 })}
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
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--color-blush-400)" }}
              >
                {product.category}
              </p>

              {/* Name */}
              <h1
                className="font-display leading-none mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--color-text-900)",
                }}
              >
                {product.name}
              </h1>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--color-text-500)" }}
              >
                {product.description}
              </p>

              {/* Specs */}
              <div
                className="grid grid-cols-2 gap-4 mb-8 p-5 border"
                style={{
                  borderColor: "var(--color-ivory-200)",
                  backgroundColor: "var(--color-ivory-100)",
                }}
              >
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-500)" }}>Metal</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-900)" }}>22kt Gold</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-500)" }}>Weight</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-900)" }}>{product.weight}g</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-500)" }}>Category</p>
                  <p className="text-sm font-medium capitalize" style={{ color: "var(--color-text-900)" }}>{product.category}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-text-500)" }}>Hallmark</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-900)" }}>BIS 916</p>
                </div>
              </div>

              {/* Price */}
              <PriceDisplay product={product} />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 text-center text-xs tracking-widest uppercase px-6 py-4 transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-text-900)",
                    color: "var(--color-ivory-50)",
                  }}
                >
                  Enquire Now
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 text-center text-xs tracking-widest uppercase px-6 py-4 border transition-all hover:opacity-80"
                  style={{
                    borderColor: "var(--color-text-900)",
                    color: "var(--color-text-900)",
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
            className="py-16 border-t"
            style={{ borderColor: "var(--color-ivory-200)" }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="font-display leading-none mb-10"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--color-text-900)",
                }}
              >
                You May Also Like
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 200px))", gap: "1rem" }}>
                {related.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="group block">
                    <div className="relative overflow-hidden mb-2" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={cloudinaryUrl(p.image, { width: 600, quality: 85 })}
                        alt={p.name}
                        fill
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0.15rem", color: "var(--color-text-900)" }}>{p.name}</p>
                    <p style={{ fontFamily: "'Corinthia', cursive", fontSize: "1.2rem", color: "var(--color-gold)" }}>
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
