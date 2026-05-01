import Image from "next/image";

export default function BlessingsSection() {
  const blessings = [
    {
      name: "Khatushyam Ji",
      title: "Our Guiding Light",
    },
    {
      name: "Our Father",
      title: "The Pillar of our Journey",
    },
    {
      name: "Dada Ji",
      title: "The Root of Our Values",
    },
    {
      name: "Pr. Dada Ji",
      title: "Our Founding Legacy",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-16">
          <p
            className="text-[0.6rem] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Our Sacred Corner
          </p>
          <h2
            className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6"
            style={{ color: "var(--color-text-900)" }}
          >
            Blessings & Heritage
          </h2>
          <p
            className="text-sm md:text-base max-w-xl mx-auto italic px-4"
            style={{ color: "var(--color-text-500)" }}
          >
            We are new in this — but grounded by the blessings of those who came
            before us.
          </p>
        </div>

        {/* Blessings grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {blessings.map((blessing, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden border transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#f0eaff",
                borderColor: "var(--color-gold)",
                aspectRatio: "3/4",
              }}
            >
              {/* Father image */}
              {blessing.name === "Our Father" ? (
                <div className="absolute inset-0">
                  <Image
                    src="/father.jpg"
                    alt="Our Father"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: 0.3 }}
                  >
                    <path
                      d="M24 0L28 20L48 24L28 28L24 48L20 28L0 24L20 20L24 0Z"
                      fill="var(--color-gold)"
                    />
                  </svg>
                </div>
              )}

              {/* Bottom content */}
              <div
                className="absolute bottom-0 left-0 right-0 p-2 md:p-4 mx-2 md:mx-3 mb-2 md:mb-3 rounded-lg"
                style={{ backgroundColor: "var(--color-text-900)" }}
              >
                <p
                  className="text-[0.65rem] md:text-sm font-medium text-center tracking-wider uppercase mb-0.5 md:mb-1"
                  style={{ color: "var(--color-gold)" }}
                >
                  {blessing.name}
                </p>
                <p
                  className="text-[0.6rem] md:text-xs text-center"
                  style={{ color: "var(--color-ivory-100)" }}
                >
                  {blessing.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
