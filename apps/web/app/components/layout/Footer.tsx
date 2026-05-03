import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

type FooterItem =
  | { kind: "link"; label: string; href: string; external?: boolean }
  | { kind: "text"; label: string };

const FOOTER_COLUMNS: { heading: string; items: FooterItem[] }[] = [
  {
    heading: "Collections",
    items: [
      { kind: "link", label: "Bridal", href: "/products?category=bridal" },
      { kind: "link", label: "Rings", href: "/products?category=rings" },
      { kind: "link", label: "Necklaces", href: "/products?category=necklaces" },
      { kind: "link", label: "Earrings", href: "/products?category=earrings" },
      { kind: "link", label: "Bracelets", href: "/products?category=bracelets" },
      { kind: "link", label: "Watches", href: "/products?category=watches" },
      { kind: "link", label: "Lab grown diamond", href: "/products?category=lab-grown-diamond" },
      { kind: "link", label: "Silver & gold", href: "/products?category=silver-gold" },
    ],
  },
  {
    heading: "Explore",
    items: [
      { kind: "link", label: "Home", href: "/" },
      { kind: "link", label: "All collections", href: "/products" },
      { kind: "link", label: "Contact & visit", href: "/contact" },
    ],
  },
  {
    heading: "Get in touch",
    items: [
      { kind: "link", label: "Book a visit", href: "/contact" },
      { kind: "link", label: "+91 91114 52626", href: "tel:+919111452626" },
      { kind: "link", label: "support@shreevajewellers.com", href: "mailto:support@shreevajewellers.com" },
      { kind: "link", label: "WhatsApp", href: "https://wa.me/919111452626", external: true },
      { kind: "text", label: "Mon–Sat · 10am–7pm (by appointment)" },
    ],
  },
];

function FooterRow({ item }: { item: FooterItem }) {
  const baseStyle: CSSProperties = {
    fontSize: "0.82rem",
    color: "var(--color-text-mid)",
    fontWeight: 300,
    lineHeight: 1.45,
  };

  if (item.kind === "text") {
    return <span style={{ ...baseStyle, color: "var(--color-text-muted)", cursor: "default" }}>{item.label}</span>;
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        style={{ ...baseStyle, textDecoration: "none" }}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className="footer-link" style={{ ...baseStyle, textDecoration: "none" }}>
      {item.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footer-root section-shell" style={{ background: "var(--color-dark-footer)", color: "var(--color-text-muted)" }}>
      <style>{`
        .footer-root { padding: 5rem 5rem 3rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; padding-bottom: 3.5rem; border-bottom: 1px solid var(--color-border); position: relative; }
        .footer-grid::before {
          content: "";
          position: absolute;
          left: 0;
          top: -1px;
          width: 180px;
          height: 1px;
          background: linear-gradient(90deg, var(--color-gold), transparent);
        }
        .footer-bottom { padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; font-size: 0.72rem; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .footer-root { padding: 3rem 1.5rem 2rem; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; text-align: center; justify-content: center; }
        }
        .footer-link:hover { color: var(--color-gold) !important; transition: color 0.3s ease-in-out; }
      `}</style>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <Image
              src="/logo.jpeg"
              alt="Shreeva Jewellers"
              width={64}
              height={64}
              style={{ borderRadius: "0.5rem", objectFit: "cover" }}
            />
            <span className="brand-wordmark-text" style={{ fontSize: "1rem", color: "var(--color-gold)", lineHeight: 1.35 }}>
              Shreeva
              <br />
              Jewellers
            </span>
          </Link>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.9, fontWeight: 300, color: "var(--color-text-mid)" }}>
            BIS-hallmarked gold and fine diamonds — honest pricing, heirloom finish, and service you can count on.
          </p>
          <div style={{ display: "flex", gap: "0.65rem", marginTop: "1.1rem", flexWrap: "wrap" }}>
            {["BIS hallmarked", "Hand finished", "Secure shipping"].map((point) => (
              <span
                key={point}
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-mid)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "999px",
                  padding: "0.3rem 0.6rem",
                }}
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.items.map((item) => (
                <li key={item.label} style={{ marginBottom: "0.7rem" }}>
                  <FooterRow item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shreeva Jewellers. All rights reserved.</span>
        <Link href="/contact" className="footer-link" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
          Contact us
        </Link>
      </div>
    </footer>
  );
}
