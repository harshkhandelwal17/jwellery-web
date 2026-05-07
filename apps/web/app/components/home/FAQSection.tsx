"use client";

import { useState } from "react";
import { HOMEPAGE_FAQS } from "../../lib/seo-data";

const FAQS = [
  {
    q: "Is all your jewellery BIS Hallmarked?",
    a: "Yes — every gold piece carries a BIS Hallmark certifying 22KT purity, and all our silver jewellery is certified 925 Sterling Silver. Authenticity and transparency are non-negotiable for us.",
  },
  {
    q: "What is the difference between your Gold and Silver jewellery?",
    a: "Our Gold jewellery is crafted in BIS Hallmarked 22KT gold with live market-rate pricing. Our Silver collection features Certified 925 Sterling Silver — same expert craftsmanship, lighter on the pocket. Both collections are stamped and verified for purity.",
  },
  {
    q: "How is the gold price calculated on my jewellery?",
    a: "We follow live daily gold rates (per gram) + making charges. You will always see the breakup clearly before purchase — weight, rate, making, and final price. No hidden fees, ever.",
  },
  {
    q: "Do you offer custom or bridal jewellery orders?",
    a: "Absolutely. Our artisans take custom orders for bridal sets, trousseau jewellery, and bespoke pieces. Book an in-store appointment or contact us on WhatsApp and our team will guide you through the design and delivery process.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We offer easy exchange on all pieces within 30 days of purchase. For custom/bridal orders, adjustments can be discussed at the time of booking. Gold is accepted for exchange at the prevailing market rate.",
  },
  ...HOMEPAGE_FAQS.filter(
    (faq) =>
      faq.q === "Do you have lab-grown diamonds?" ||
      faq.q === "Do you offer free home delivery?"
  ),
  {
    q: "What does Lifetime Servicing include?",
    a: "We provide complimentary cleaning, polishing, and minor repair services for any piece purchased from us — for life. Simply bring or ship your jewellery to us and we'll restore it to its original shine.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section section-shell">
      <style>{`
        .faq-section {
          padding: 6rem 5rem;
          background: var(--color-bg, #050514);
          position: relative;
          overflow: hidden;
        }

        /* faint diagonal rule in bg */
        .faq-section::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(212,175,55,1) 0px,
            rgba(212,175,55,1) 1px,
            transparent 1px,
            transparent 60px
          );
          z-index: 0;
        }

        .faq-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .faq-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .faq-eyebrow-line {
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.6));
        }
        .faq-eyebrow-line-r {
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, rgba(212,175,55,0.6), transparent);
        }
        .faq-eyebrow-text {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.8);
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }

        .faq-title {
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 400;
          letter-spacing: 0.06em;
          color: var(--color-text, #fff);
          margin: 0 0 0.75rem;
        }

        .faq-subtitle {
          font-family: "Cormorant Garamond", "Cormorant", Georgia, serif;
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(200,190,180,0.65);
          margin: 0;
        }

        /* list */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-item {
          border-bottom: 1px solid rgba(212,175,55,0.1);
          transition: background 0.25s ease;
        }
        .faq-item:first-child {
          border-top: 1px solid rgba(212,175,55,0.1);
        }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.45rem 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s ease;
        }
        .faq-trigger:hover .faq-q {
          color: #d4af37;
        }

        .faq-q {
          font-family: "Cinzel", Georgia, serif;
          font-size: clamp(0.82rem, 1.4vw, 1rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--color-text, #fff);
          transition: color 0.25s ease;
          line-height: 1.45;
          flex: 1;
        }
        .faq-q-open {
          color: #d4af37 !important;
        }

        /* animated plus/minus icon */
        .faq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: transparent;
          position: relative;
        }
        .faq-icon-open {
          background: rgba(212,175,55,0.12);
          border-color: rgba(212,175,55,0.6);
        }
        .faq-icon::before,
        .faq-icon::after {
          content: "";
          position: absolute;
          background: rgba(212,175,55,0.85);
          border-radius: 1px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .faq-icon::before { width: 11px; height: 1px; }
        .faq-icon::after  { width: 1px; height: 11px; }
        .faq-icon-open::after { transform: scaleY(0); opacity: 0; }

        /* answer panel */
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.35s ease,
                      padding 0.35s ease;
        }
        .faq-answer-text {
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
          font-size: clamp(0.84rem, 1.2vw, 0.97rem);
          font-weight: 350;
          line-height: 1.8;
          color: rgba(180,174,200,0.82);
          padding-bottom: 1.4rem;
          max-width: 92%;
        }

        /* contact nudge at bottom */
        .faq-footer {
          margin-top: 3rem;
          text-align: center;
          padding: 2rem;
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 2px;
          background: linear-gradient(135deg, rgba(212,175,55,0.04), rgba(212,175,55,0.01));
        }
        .faq-footer-text {
          font-family: "Cormorant Garamond", "Cormorant", Georgia, serif;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(200,190,175,0.75);
          margin: 0 0 1rem;
        }
        .faq-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #d4af37;
          text-decoration: none;
          border-bottom: 1px solid rgba(212,175,55,0.35);
          padding-bottom: 2px;
          transition: border-color 0.2s, color 0.2s;
          font-family: var(--font-sans, 'DM Sans', system-ui, sans-serif);
        }
        .faq-footer-link:hover {
          color: #f4e5b3;
          border-color: rgba(212,175,55,0.7);
        }

        @media (max-width: 768px) {
          .faq-section { padding: 3.5rem 1.25rem; }
          .faq-title { font-size: 1.25rem !important; }
          .faq-subtitle { font-size: 0.95rem !important; }
          .faq-q { font-size: 0.8rem !important; }
          .faq-answer-text { font-size: 0.84rem !important; max-width: 100%; }
          .faq-trigger { padding: 1.2rem 0; }
          .faq-footer { padding: 1.5rem 1rem; }
        }
      `}</style>

      <div className="faq-inner">
        {/* header */}
        <div className="faq-header">
          <div className="faq-eyebrow">
            <span className="faq-eyebrow-line" aria-hidden />
            <span className="faq-eyebrow-text">Got Questions?</span>
            <span className="faq-eyebrow-line-r" aria-hidden />
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Everything you need to know before you shop</p>
        </div>

        {/* accordion */}
        <div className="faq-list" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq-item scroll-reveal" role="listitem">
                <button
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`faq-q ${isOpen ? "faq-q-open" : ""}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`faq-icon ${isOpen ? "faq-icon-open" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom CTA nudge */}
        <div className="faq-footer scroll-reveal">
          <p className="faq-footer-text">
            Still have a question? Our team is happy to help.
          </p>
          <a href="/contact" className="faq-footer-link">
            Contact Us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
