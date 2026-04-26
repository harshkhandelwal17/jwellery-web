import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactForm from "../components/contact/ContactForm";

interface Props {
  searchParams: Promise<{ product?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const { product } = await searchParams;

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var(--color-ivory-50)" }}>
        {/* Page header */}
        <div
          className="py-16 text-center border-b"
          style={{ borderColor: "var(--color-ivory-200)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--color-blush-400)" }}
          >
            We&apos;d Love to Hear From You
          </p>
          <h1
            className="font-display leading-none"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              color: "var(--color-text-900)",
            }}
          >
            Get In Touch
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact form */}
            <div>
              <h2
                className="font-display text-4xl leading-none mb-8"
                style={{ color: "var(--color-text-900)" }}
              >
                Send Us a Message
              </h2>
              <ContactForm defaultProduct={product} />
            </div>

            {/* Business details */}
            <div>
              <h2
                className="font-display text-4xl leading-none mb-8"
                style={{ color: "var(--color-text-900)" }}
              >
                Visit Our Store
              </h2>

              <div className="space-y-8">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-blush-400)" }}
                  >
                    Address
                  </p>
                  <p className="text-base" style={{ color: "var(--color-text-700)" }}>
                    12, Jewellers Street, Zaveri Bazaar<br />
                    Mumbai, Maharashtra 400002
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-blush-400)" }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:+912222001234"
                    className="text-base transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-700)" }}
                  >
                    +91 22 2200 1234
                  </a>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-blush-400)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:hello@jwell.in"
                    className="text-base transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-700)" }}
                  >
                    hello@jwell.in
                  </a>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-blush-400)" }}
                  >
                    Store Hours
                  </p>
                  <div className="text-base space-y-1" style={{ color: "var(--color-text-700)" }}>
                    <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
                    <p>Sunday: 11:00 AM – 6:00 PM</p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px"
                  style={{ backgroundColor: "var(--color-ivory-200)" }}
                />

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ color: "var(--color-text-500)" }}
                  >
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["BIS Hallmarked", "ISO Certified", "GIA Partner"].map(
                      (cert) => (
                        <span
                          key={cert}
                          className="text-xs tracking-widest uppercase px-3 py-2 border"
                          style={{
                            borderColor: "var(--color-ivory-200)",
                            color: "var(--color-text-500)",
                          }}
                        >
                          {cert}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
