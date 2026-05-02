import Link from "next/link";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="flex-1 flex flex-col items-center justify-center py-32 text-center"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <p
          className="font-display text-8xl leading-none mb-4"
          style={{ color: "rgba(212, 175, 55, 0.15)" }}
        >
          404
        </p>
        <h1
          className="font-display text-5xl leading-none mb-6"
          style={{ color: "var(--color-text)" }}
        >
          Page Not Found
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--color-text-muted)" }}>
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-xs tracking-widest uppercase px-8 py-4 transition-all hover:opacity-90"
          style={{
            backgroundColor: "var(--color-gold)",
            color: "#000000",
          }}
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
