"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/products?category=rings", label: "Rings" },
  { href: "/products?category=necklaces", label: "Necklaces" },
  { href: "/products?category=earrings", label: "Earrings" },
  { href: "/products?category=bracelets", label: "Bracelets" },
  { href: "/contact", label: "Contact" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        className="relative ml-auto w-72 h-full flex flex-col py-8 px-8"
        style={{ backgroundColor: "var(--color-ivory-50)" }}
      >
        <button
          className="self-end mb-8 text-xl"
          onClick={onClose}
          aria-label="Close menu"
          style={{ color: "var(--color-text-700)" }}
        >
          ✕
        </button>

        <Link
          href="/"
          className="font-display text-4xl mb-8 leading-none"
          style={{ color: "var(--color-text-900)" }}
          onClick={onClose}
        >
          Jwell
        </Link>

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="py-3 text-xs tracking-widest uppercase border-b transition-colors hover:opacity-60"
            style={{
              color: "var(--color-text-700)",
              borderColor: "var(--color-ivory-200)",
            }}
            onClick={onClose}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/contact"
          className="mt-8 text-center text-xs tracking-widest uppercase px-4 py-3 border"
          style={{
            borderColor: "var(--color-text-900)",
            color: "var(--color-text-900)",
          }}
          onClick={onClose}
        >
          Book Appointment
        </Link>
      </nav>
    </div>
  );
}
