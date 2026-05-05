import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import InstagramShowcaseSection from "./components/home/InstagramShowcaseSection";
import CategoriesSection from "./components/home/CategoriesSection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import BridalSection from "./components/home/BridalSection";
import AboutSection from "./components/home/AboutSection";
import CuratedSection from "./components/home/CuratedSection";
import WhyChooseUs from "./components/home/WhyChooseUs";
import FAQSection from "./components/home/FAQSection";
import CTASection from "./components/home/CTASection";
import CraftsmanshipSection from "./components/home/CraftsmanshipSection";
import WhatsAppCTASection from "./components/home/WhatsAppCTASection";
import SignatureShowcaseSection from "./components/home/SignatureShowcaseSection";
import BlessingsSection from "./components/home/BlessingsSection";
import { fetchProducts } from "./lib/api";
import { cloudinaryUrl } from "./lib/cloudinary";
import { pickHomeSpotlight } from "./lib/product-display";

export const revalidate = 300;

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = pickHomeSpotlight(products, 4);
  const instagramShowcase = pickHomeSpotlight(products, 8);

  // Pick one representative image per main category for the homepage category cards
  const goldProducts    = products.filter((p) => p.mainCategory === "Gold Jewellery");
  const silverProducts  = products.filter((p) => p.mainCategory === "Silver Jewellery");
  const diamondProducts = products.filter((p) => p.mainCategory === "Diamond Jewellery");

  // Fallback to old-system category if mainCategory not set yet
  const goldFallback    = products.filter((p) => p.category === "necklaces");

  const categoryImages: Record<string, string | undefined> = {
    "Gold Jewellery":    (goldProducts[0] ?? goldFallback[0])
      ? cloudinaryUrl((goldProducts[0] ?? goldFallback[0]).image, { width: 700, quality: 85 })
      : undefined,
    "Silver Jewellery":  silverProducts[0]
      ? cloudinaryUrl(silverProducts[0].image, { width: 700, quality: 85 })
      : undefined,
    "Diamond Jewellery": diamondProducts[0]
      ? cloudinaryUrl(diamondProducts[0].image, { width: 700, quality: 85 })
      : undefined,
  };

  return (
    <>
      <Header />
      <main className="home-page-main">
        <HeroSection />
        <InstagramShowcaseSection products={instagramShowcase} />
        <CategoriesSection categoryImages={categoryImages} />
        <FeaturedProducts products={featured} />
        <BridalSection />
        <AboutSection mainImage="/about-main.jpg" accentImage="/about-accent.jpg" />
        <BlessingsSection />
        <CraftsmanshipSection />
        <SignatureShowcaseSection />
        <CuratedSection />
        <WhyChooseUs />
        <FAQSection />
        <WhatsAppCTASection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
