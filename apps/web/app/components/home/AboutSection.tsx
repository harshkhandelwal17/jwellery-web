import Image from "next/image";

const stats = [
  { value: "20+", label: "Years of Craft" },
  { value: "5,000+", label: "Happy Families" },
  { value: "500+", label: "Unique Designs" },
  { value: "100%", label: "BIS Hallmarked" },
];

export default function AboutSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-ivory-50)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Images — overlapping layout */}
          <div className="relative h-[480px] md:h-[560px]">
            {/* Back image */}
            <div
              className="absolute top-0 right-0 w-3/4 h-4/5 overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Image
                src="https://picsum.photos/seed/about1/600/700"
                alt="Our craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 75vw, 37vw"
              />
            </div>
            {/* Front image */}
            <div
              className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden border-4"
              style={{
                borderColor: "var(--color-ivory-50)",
                boxShadow: "var(--shadow-card-hover)",
              }}
            >
              <Image
                src="https://picsum.photos/seed/about2/400/450"
                alt="Artisan at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 30vw"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--color-blush-400)" }}
            >
              Our Story
            </p>
            <h2
              className="font-display leading-none mb-8"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                color: "var(--color-text-900)",
              }}
            >
              Two Decades of Timeless Craft
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-500)" }}
            >
              Founded in 2003, JWELL was born from a passion for creating
              jewellery that transcends trends. Every piece we craft carries
              the weight of tradition and the lightness of modern artistry.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--color-text-500)" }}
            >
              Our master craftsmen use time-honoured techniques passed down
              through generations, combined with ethically sourced gold and
              precious stones, to create pieces that become family heirlooms.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display text-4xl leading-none mb-1"
                    style={{ color: "var(--color-text-900)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--color-text-500)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
