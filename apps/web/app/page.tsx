import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategoriesSection from "./components/home/CategoriesSection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import AboutSection from "./components/home/AboutSection";
import WhyChooseUs from "./components/home/WhyChooseUs";
import CTASection from "./components/home/CTASection";
import { fetchProducts } from "./lib/api";
import { cloudinaryUrl } from "./lib/cloudinary";

export const revalidate = 300;

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.slice(0, 4);

  const rings = products.filter((p) => p.category === "rings");
  const necklaces = products.filter((p) => p.category === "necklaces");

  const categoryImages: Record<string, string | undefined> = {
    rings: rings[0] ? cloudinaryUrl(rings[0].image, { width: 600, quality: 85 }) : undefined,
    necklaces: necklaces[0] ? cloudinaryUrl(necklaces[0].image, { width: 600, quality: 85 }) : undefined,
  };

  const aboutMainImage = rings[3]
    ? cloudinaryUrl(rings[3].image, { width: 800, quality: 90 })
    : undefined;
  const aboutAccentImage = necklaces[3]
    ? cloudinaryUrl(necklaces[3].image, { width: 600, quality: 88 })
    : undefined;

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection categoryImages={categoryImages} />
        <FeaturedProducts products={featured} />
        <AboutSection mainImage={aboutMainImage} accentImage={aboutAccentImage} />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
