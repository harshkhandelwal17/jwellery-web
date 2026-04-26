"use client";

import { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface Props {
  defaultProduct?: string;
}

export default function ContactForm({ defaultProduct }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: defaultProduct ? `I'm interested in: ${defaultProduct}` : "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!/^\+?[\d\s-]{10,}$/.test(form.phone))
      e.phone = "Please enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="p-10 text-center border"
        style={{ borderColor: "var(--color-ivory-200)" }}
      >
        <div
          className="font-display text-5xl mb-4"
          style={{ color: "var(--color-blush-400)" }}
        >
          Thank You
        </div>
        <p className="text-base" style={{ color: "var(--color-text-500)" }}>
          We&apos;ve received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          className="block text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--color-text-700)" }}
        >
          Full Name *
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 text-sm outline-none border transition-colors focus:border-current"
          style={{
            borderColor: errors.name ? "#e05252" : "var(--color-ivory-200)",
            backgroundColor: "var(--color-ivory-50)",
            color: "var(--color-text-900)",
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
          style={{ color: "var(--color-text-700)" }}
        >
          Phone Number *
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 text-sm outline-none border transition-colors"
          style={{
            borderColor: errors.phone ? "#e05252" : "var(--color-ivory-200)",
            backgroundColor: "var(--color-ivory-50)",
            color: "var(--color-text-900)",
          }}
          placeholder="+91 98765 43210"
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
          style={{ color: "var(--color-text-700)" }}
        >
          Email Address
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 text-sm outline-none border transition-colors"
          style={{
            borderColor: errors.email ? "#e05252" : "var(--color-ivory-200)",
            backgroundColor: "var(--color-ivory-50)",
            color: "var(--color-text-900)",
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
          style={{ color: "var(--color-text-700)" }}
        >
          Message *
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 text-sm outline-none border transition-colors resize-none"
          style={{
            borderColor: errors.message ? "#e05252" : "var(--color-ivory-200)",
            backgroundColor: "var(--color-ivory-50)",
            color: "var(--color-text-900)",
          }}
          placeholder="Tell us what you're looking for…"
        />
        {errors.message && (
          <p className="mt-1 text-xs" style={{ color: "#e05252" }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-xs tracking-widest uppercase py-4 transition-all hover:opacity-90"
        style={{
          backgroundColor: "var(--color-text-900)",
          color: "var(--color-ivory-50)",
        }}
      >
        Send Message
      </button>
    </form>
  );
}
