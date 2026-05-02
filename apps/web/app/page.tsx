import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategoriesSection from "./components/home/CategoriesSection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import BridalSection from "./components/home/BridalSection";
import AboutSection from "./components/home/AboutSection";
import CuratedSection from "./components/home/CuratedSection";
import WhyChooseUs from "./components/home/WhyChooseUs";
import CTASection from "./components/home/CTASection";
import CraftsmanshipSection from "./components/home/CraftsmanshipSection";
import WhatsAppCTASection from "./components/home/WhatsAppCTASection";
import SignatureShowcaseSection from "./components/home/SignatureShowcaseSection";
import { fetchProducts } from "./lib/api";
import { cloudinaryUrl } from "./lib/cloudinary";
import { pickHomeSpotlight } from "./lib/product-display";

export const revalidate = 300;

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = pickHomeSpotlight(products, 4);

  const rings = products.filter((p) => p.category === "rings");
  const necklaces = products.filter((p) => p.category === "necklaces");
  const earrings = products.filter((p) => p.category === "earrings");
  const bracelets = products.filter((p) => p.category === "bracelets");
  const watches = products.filter((p) => p.category === "watches");

  const categoryImages: Record<string, string | undefined> = {
    rings:     rings[0]     ? cloudinaryUrl(rings[0].image,     { width: 600, quality: 85 }) : undefined,
    necklaces: necklaces[0] ? cloudinaryUrl(necklaces[0].image, { width: 600, quality: 85 }) : undefined,
    earrings:  earrings[0]  ? cloudinaryUrl(earrings[0].image,  { width: 600, quality: 85 }) : undefined,
    bracelets: bracelets[0] ? cloudinaryUrl(bracelets[0].image, { width: 600, quality: 85 }) : undefined,
    bridal:    necklaces[1] ? cloudinaryUrl(necklaces[1].image, { width: 600, quality: 85 }) : undefined,
    watches:   watches[0]   ? cloudinaryUrl(watches[0].image,   { width: 600, quality: 85 }) : undefined,
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
        <BridalSection />
        <AboutSection mainImage={aboutMainImage} accentImage={aboutAccentImage} />
        <CraftsmanshipSection />
        <SignatureShowcaseSection />
        <CuratedSection />
        <WhyChooseUs />
        <WhatsAppCTASection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
