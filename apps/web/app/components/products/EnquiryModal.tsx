"use client";

import { useState } from "react";
import { createEnquiry } from "@jwell/api-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  productId,
  productName,
}: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in: ${productName}`,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Please enter a valid 10-digit phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createEnquiry(API_URL, {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        message: form.message || undefined,
        productId,
        productName,
      });
      setSubmitted(true);
    } catch {
      setErrors({ phone: "Failed to submit. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "var(--color-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2
            className="font-display text-xl"
            style={{ color: "var(--color-text)" }}
          >
            Enquire About Product
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="font-display text-4xl mb-4"
                style={{ color: "var(--color-gold)" }}
              >
                Thank You
              </div>
              <p style={{ color: "var(--color-text-muted)" }}>
                We&apos;ve received your enquiry and will be in touch within 24
                hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 text-xs tracking-widest uppercase transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "#000000",
                  border: "1px solid var(--color-gold)",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Info */}
              <div
                className="p-3 text-sm"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                  color: "var(--color-text)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
              >
                <span style={{ color: "var(--color-gold)" }}>Product:</span>{" "}
                {productName}
              </div>

              {/* Name */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none border transition-colors"
                  style={{
                    borderColor: errors.name
                      ? "#e05252"
                      : "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs" style={{ color: "#e05252" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none border transition-colors"
                  style={{
                    borderColor: errors.phone
                      ? "#e05252"
                      : "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                  placeholder="98765 43210"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs" style={{ color: "#e05252" }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none border transition-colors"
                  style={{
                    borderColor: errors.email
                      ? "#e05252"
                      : "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                  placeholder="your@email.com (optional)"
                />
                {errors.email && (
                  <p className="mt-1 text-xs" style={{ color: "#e05252" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 text-sm outline-none border transition-colors resize-none"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                  placeholder="Any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full text-xs tracking-widest uppercase py-4 transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "#000000",
                  border: "1px solid var(--color-gold)",
                }}
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
