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
      <main style={{ backgroundColor: "var(--color-bg)" }}>
        {/* Page header */}
        <div
          className="py-10 md:py-16 text-center border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="hero-enter hero-enter-1 text-[0.65rem] md:text-xs tracking-widest uppercase mb-2 md:mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            We&apos;d Love to Hear From You
          </p>
          <h1
            className="hero-enter hero-enter-2 font-display leading-none text-3xl md:text-6xl"
            style={{ color: "var(--color-text)" }}
          >
            Get In Touch
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact form */}
            <div className="scroll-reveal">
              <h2
                className="font-display text-2xl md:text-4xl leading-none mb-6 md:mb-8"
                style={{ color: "var(--color-text)" }}
              >
                Send Us a Message
              </h2>
              <ContactForm defaultProduct={product} />
            </div>

            {/* Business details */}
            <div className="scroll-reveal">
              <h2
                className="font-display text-2xl md:text-4xl leading-none mb-6 md:mb-8"
                style={{ color: "var(--color-text)" }}
              >
                Visit Our Store
              </h2>

              <div className="space-y-8">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Address
                  </p>
                  <p className="text-base" style={{ color: "var(--color-text-mid)" }}>
                    Address to be updated
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:+919111452626"
                    className="text-base transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    +91 91114 52626
                  </a>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:support@shreevajewellers.com"
                    className="text-base transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-mid)" }}
                  >
                    support@shreevajewellers.com
                  </a>
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Store Hours
                  </p>
                  <div className="text-base space-y-1" style={{ color: "var(--color-text-mid)" }}>
                    <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
                    <p>Sunday: 11:00 AM – 6:00 PM</p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px"
                  style={{ backgroundColor: "var(--color-border)" }}
                />

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ color: "var(--color-text-muted)" }}
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
                            borderColor: "var(--color-border)",
                            color: "var(--color-text-muted)",
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
