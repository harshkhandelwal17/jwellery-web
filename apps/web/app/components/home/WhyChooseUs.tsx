const reasons = [
  {
    icon: "✦",
    title: "BIS Hallmarked Gold",
    body: "Every piece carries the Bureau of Indian Standards hallmark, guaranteeing purity and authenticity.",
  },
  {
    icon: "◎",
    title: "Lifetime Warranty",
    body: "We stand behind every piece with a lifetime warranty on craftsmanship and a free polishing service.",
  },
  {
    icon: "⬡",
    title: "Custom Creations",
    body: "Bring your vision to life. Our designers work with you to create a one-of-a-kind piece just for you.",
  },
  {
    icon: "◈",
    title: "Transparent Pricing",
    body: "Our prices are calculated live — gold rate × weight + making charges. No hidden costs, ever.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--color-ivory-100)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--color-blush-400)" }}
          >
            The JWELL Promise
          </p>
          <h2
            className="font-display leading-none"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              color: "var(--color-text-900)",
            }}
          >
            Why Choose Us
          </h2>
        </div>

        {/* Cards — hover handled via CSS class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="why-card p-8">
              <div
                className="text-2xl mb-5"
                style={{ color: "var(--color-blush-400)" }}
              >
                {r.icon}
              </div>
              <h3
                className="text-sm tracking-wide font-medium mb-3"
                style={{ color: "var(--color-text-900)" }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-500)" }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-card {
          background-color: var(--color-ivory-50);
          border-top: 2px solid var(--color-ivory-200);
          box-shadow: var(--shadow-card);
          transition: border-color 0.2s, transform 0.2s;
        }
        .why-card:hover {
          border-top-color: var(--color-blush-400);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
