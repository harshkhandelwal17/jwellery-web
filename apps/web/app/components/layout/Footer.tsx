import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ padding: "5rem 5rem 3rem", background: "#1e1610", color: "#7a6a62" }}>
      <style>{`
        .footer-link:hover { color: var(--color-blush-mid) !important; }
      `}</style>

      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "4rem", paddingBottom: "3.5rem",
        borderBottom: "1px solid #2e2218",
      }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{ fontFamily: "'Corinthia', cursive", fontSize: "2.2rem", color: "#f0e8e0", textDecoration: "none", display: "block", marginBottom: "1rem" }}>
            Jwell
          </Link>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.9, fontWeight: 300 }}>
            Handcrafted gold jewellery from the heart of Jaipur. Bringing tradition and transparency together since 1992.
          </p>
        </div>

        {[
          { heading: "Collections", links: [{ label: "Rings", href: "/products?category=rings" }, { label: "Necklaces", href: "/products?category=necklaces" }, { label: "Earrings", href: "/products?category=earrings" }, { label: "Bracelets", href: "/products?category=bracelets" }] },
          { heading: "Company", links: [{ label: "About Us", href: "/" }, { label: "Our Artisans", href: "/" }, { label: "Blog", href: "/" }, { label: "Careers", href: "/" }] },
          { heading: "Visit Us", links: [{ label: "M.I. Road, Jaipur", href: "/" }, { label: "+91 98765 43210", href: "tel:+919876543210" }, { label: "hello@jwell.in", href: "mailto:hello@jwell.in" }, { label: "Mon–Sat, 10am–7pm", href: "/" }] },
        ].map((col) => (
          <div key={col.heading}>
            <h4 style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8b8b0", fontWeight: 600, marginBottom: "1.5rem" }}>
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((l) => (
                <li key={l.label} style={{ marginBottom: "0.7rem" }}>
                  <Link href={l.href} className="footer-link" style={{ fontSize: "0.82rem", color: "#5a4a42", textDecoration: "none", fontWeight: 300, transition: "color 0.2s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", color: "#3a2e28" }}>
        <span>© {new Date().getFullYear()} Jwell. All rights reserved.</span>
        <Link href="/" className="footer-link" style={{ color: "#3a2e28", textDecoration: "none" }}>Privacy Policy</Link>
      </div>
    </footer>
  );
}
