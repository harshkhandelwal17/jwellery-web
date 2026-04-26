import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategoriesSection from "./components/home/CategoriesSection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import AboutSection from "./components/home/AboutSection";
import WhyChooseUs from "./components/home/WhyChooseUs";
import CTASection from "./components/home/CTASection";
import { MOCK_PRODUCTS } from "./lib/mock-data";

export default function HomePage() {
  const featured = MOCK_PRODUCTS.slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts products={featured} />
        <AboutSection />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
