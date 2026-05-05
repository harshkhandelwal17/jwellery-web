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
          .footer-social-row {
            flex-wrap: wrap;
            gap: 0.55rem;
          }
          .footer-social-btn {
            width: 100%;
            justify-content: center;
            padding: 0.5rem 0.85rem !important;
          }
        }
        .footer-link:hover { color: var(--color-gold) !important; transition: color 0.3s ease-in-out; }
        .footer-social-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .nexisparkx-credit { background: linear-gradient(90deg, var(--color-gold), #f5d97a, var(--color-gold)); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shine 3s linear infinite; font-weight: 500; letter-spacing: 0.03em; }
        @keyframes shine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
      `}</style>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <Image
              src="/logo.jpeg"
              alt="Shreeva Jewellers"
              width={84}
              height={84}
              style={{ borderRadius: "0.55rem", objectFit: "cover" }}
            />
            <span className="brand-wordmark-text" style={{ fontSize: "1.2rem", color: "var(--color-gold)", lineHeight: 1.35 }}>
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
          {/* Social connect buttons */}
          <div className="footer-social-row" style={{ display: "flex", gap: "0.75rem", marginTop: "1.4rem" }}>
            <a
              href="https://wa.me/919111452626"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Chat on WhatsApp"
              style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                padding: "0.45rem 1rem", borderRadius: "999px",
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.35)",
                color: "#25D366", fontSize: "0.72rem", fontWeight: 500,
                textDecoration: "none", letterSpacing: "0.04em",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.facebook.com/share/1P42epTqN2/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Follow on Facebook"
              style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                padding: "0.45rem 1rem", borderRadius: "999px",
                background: "rgba(24,119,242,0.12)",
                border: "1px solid rgba(24,119,242,0.35)",
                color: "#4f9ef7", fontSize: "0.72rem", fontWeight: 500,
                textDecoration: "none", letterSpacing: "0.04em",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/shreeva.11111113?igsh=ZmppNzA4YndtN3Nj"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Follow on Instagram"
              style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                padding: "0.45rem 1rem", borderRadius: "999px",
                background: "rgba(225,48,108,0.12)",
                border: "1px solid rgba(225,48,108,0.38)",
                color: "#f59ac2", fontSize: "0.72rem", fontWeight: 500,
                textDecoration: "none", letterSpacing: "0.04em",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zm8.95 1.4a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8A3.2 3.2 0 1015.2 12 3.2 3.2 0 0012 8.8z" />
              </svg>
              Instagram
            </a>
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
        <a
          href="https://nexisparkx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nexisparkx-credit"
          style={{ textDecoration: "none" }}
        >
          ✦ Crafted by NexiSparkX Technologies
        </a>
      </div>
    </footer>
  );
}
