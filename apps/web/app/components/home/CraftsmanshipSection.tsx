"use client";

export default function CraftsmanshipSection() {
  return (
    <section className="py-20 md:py-28 lg:py-36 px-4 md:px-8 lg:px-16" style={{ backgroundColor: "var(--color-bg-warm)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-[0.65rem] md:text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Our Heritage
          </p>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Timeless Craftsmanship
          </h2>
          <div
            className="w-20 h-[1px] mx-auto mb-8"
            style={{ backgroundColor: "var(--color-gold)" }}
          />
          <p
            className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-mid)" }}
          >
            Crafted with precision, designed for timeless beauty. Each piece tells a story of dedication and artistry passed down through generations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1 */}
          <div className="text-center p-8 rounded-lg" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div 
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
            >
              <span className="text-2xl" style={{ color: "var(--color-gold)" }}>◈</span>
            </div>
            <h3 className="font-display text-lg md:text-xl mb-3" style={{ color: "var(--color-text)" }}>
              BIS Hallmarked
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Every piece carries the BIS hallmark certifying 22KT purity. Authenticity you can see and trust.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center p-8 rounded-lg" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div 
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
            >
              <span className="text-2xl" style={{ color: "var(--color-gold)" }}>✦</span>
            </div>
            <h3 className="font-display text-lg md:text-xl mb-3" style={{ color: "var(--color-text)" }}>
              22KT Gold
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Pure gold crafted to perfection. Prices reflect the daily market rate for honest value.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center p-8 rounded-lg" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div 
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(212, 175, 55, 0.1)", border: "1px solid rgba(212, 175, 55, 0.2)" }}
            >
              <span className="text-2xl" style={{ color: "var(--color-gold)" }}>◇</span>
            </div>
            <h3 className="font-display text-lg md:text-xl mb-3" style={{ color: "var(--color-text)" }}>
              Handcrafted
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              No mass production, ever. Each piece is shaped by skilled karigars with 15+ years of expertise.
            </p>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 md:mt-20 text-center">
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mx-auto" style={{ color: "var(--color-text)" }}>
            "Crafted with precision, designed for timeless beauty."
          </blockquote>
          <p className="mt-6 text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>
            Every piece is meticulously handcrafted by skilled artisans using the finest materials.
          </p>
        </div>
      </div>
    </section>
  );
}
