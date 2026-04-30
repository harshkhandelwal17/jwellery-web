import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-root" style={{ background: "var(--color-dark-footer)", color: "var(--color-text-muted)" }}>
      <style>{`
        .footer-root { padding: 5rem 5rem 3rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; padding-bottom: 3.5rem; border-bottom: 1px solid var(--color-border); }
        .footer-bottom { padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .footer-root { padding: 3rem 1.5rem 2rem; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; gap: 0.75rem; text-align: center; }
        }
        .footer-link:hover { color: var(--color-gold) !important; transition: color 0.3s ease-in-out; }
      `}</style>

      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <Image
              src="/logo.jpeg"
              alt="Shreeva Jewellers"
              width={64}
              height={64}
              style={{ borderRadius: "0.5rem", objectFit: "cover" }}
            />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 600, color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.3 }}>
              Shreeva<br />Jewellers
            </span>
          </Link>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.9, fontWeight: 300, color: "var(--color-text-mid)" }}>
            Feel with Luxury — Handcrafted gold jewellery crafted with passion and presented with pride.
          </p>
          <p style={{ fontSize: "0.75rem", lineHeight: 1.8, fontWeight: 300, marginTop: "1rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
            Rooted in tradition, crafted with integrity, trusted by generations, made for you.
          </p>
        </div>

        {[
          { heading: "Collections", links: [{ label: "Rings", href: "/products?category=rings" }, { label: "Necklaces", href: "/products?category=necklaces" }, { label: "Earrings", href: "/products?category=earrings" }, { label: "Bracelets", href: "/products?category=bracelets" }] },
          { heading: "Company", links: [{ label: "About Us", href: "/" }, { label: "Our Artisans", href: "/" }, { label: "Blog", href: "/" }, { label: "Careers", href: "/" }] },
          { heading: "Visit Us", links: [{ label: "Address Coming Soon", href: "/" }, { label: "+91 91114 52626", href: "tel:+919111452626" }, { label: "support@shreevajewellers.com", href: "mailto:support@shreevajewellers.com" }, { label: "WhatsApp Us", href: "https://wa.me/919111452626" }, { label: "Mon–Sat, 10am–7pm", href: "/" }] },
        ].map((col) => (
          <div key={col.heading}>
            <h4 style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)", fontWeight: 600, marginBottom: "1.5rem" }}>
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((l) => (
                <li key={l.label} style={{ marginBottom: "0.7rem" }}>
                  <Link href={l.href} className="footer-link" style={{ fontSize: "0.82rem", color: "var(--color-text-mid)", textDecoration: "none", fontWeight: 300 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shreeva Jewellers. All rights reserved.</span>
        <Link href="/" className="footer-link" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</Link>
      </div>
    </footer>
  );
}
