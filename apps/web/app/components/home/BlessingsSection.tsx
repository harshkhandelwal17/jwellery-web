"use client";

import { useState } from "react";
import Image from "next/image";
import { BLESSING_PATHS } from "../../lib/blessings";
import { imageSrcNeedsUnoptimized } from "../../lib/cloudinary";

function Portrait({
  primarySrc,
  fallbackSrc,
  alt,
  title,
  subtitle,
}: {
  primarySrc: string;
  fallbackSrc: string;
  alt: string;
  title: string;
  subtitle: string;
}) {
  const [src, setSrc] = useState(primarySrc);
  const unoptimized = imageSrcNeedsUnoptimized(src);

  return (
    <figure className="blessing-portrait scroll-reveal">
      <div className="blessing-portrait-frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 18vw, 100px"
          className="blessing-portrait-img object-cover"
          unoptimized={unoptimized}
          onError={() => {
            if (src !== fallbackSrc) setSrc(fallbackSrc);
          }}
        />
      </div>
      <figcaption className="blessing-portrait-caption">
        <span className="blessing-portrait-title">{title}</span>
        <span className="blessing-portrait-sub">{subtitle}</span>
      </figcaption>
    </figure>
  );
}

export default function BlessingsSection() {
  return (
    <section
      className="blessings-section section-shell"
      aria-labelledby="blessings-heading"
      style={{
        padding: "clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)",
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, rgba(12,12,40,0.97) 45%, var(--color-bg-warm) 100%)",
      }}
    >
      <style>{`
        .blessings-inner {
          width: min(920px, 100%);
          margin: 0 auto;
          text-align: center;
        }
        .blessings-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          opacity: 0.85;
        }
        .blessings-ornament::before,
        .blessings-ornament::after {
          content: "";
          height: 1px;
          width: min(4rem, 12vw);
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent);
        }
        .blessings-ornament span {
          font-size: 1.1rem;
          line-height: 1;
          color: var(--color-gold);
          opacity: 0.9;
        }
        .blessings-sub {
          font-size: clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem);
          color: var(--color-text-mid);
          font-weight: 300;
          line-height: 1.65;
          max-width: 32rem;
          margin: 0 auto 2.25rem;
        }
        .blessings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 3vw, 2rem);
          align-items: start;
          max-width: 720px;
          margin: 0 auto;
        }
        .blessing-portrait {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .blessing-portrait-frame {
          position: relative;
          width: 100%;
          max-width: 100px;
          aspect-ratio: 3 / 4;
          border-radius: 1.15rem;
          overflow: hidden;
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(212, 175, 55, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          background: var(--color-bg-card);
        }
        .blessing-portrait-img {
          transition: transform 0.45s ease;
        }
        .blessing-portrait-frame:hover .blessing-portrait-img {
          transform: scale(1.04);
        }
        .blessing-portrait-caption {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-align: center;
          max-width: 11rem;
        }
        .blessing-portrait-title {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
        }
        .blessing-portrait-sub {
          font-size: 0.68rem;
          color: var(--color-text-muted);
          font-weight: 400;
          line-height: 1.45;
        }
        @media (max-width: 640px) {
          .blessings-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.65rem;
            max-width: 100%;
          }
          .blessing-portrait-frame {
            max-width: 70px;
            border-radius: 0.85rem;
          }
          .blessing-portrait-title {
            font-size: 0.58rem;
            letter-spacing: 0.1em;
          }
          .blessing-portrait-sub {
            font-size: 0.58rem;
            display: none;
          }
        }
      `}</style>

      <div className="blessings-inner">
        <div className="blessings-ornament" aria-hidden="true">
          <span>॥</span>
        </div>
        <p className="section-kicker" style={{ marginBottom: "0.45rem" }}>
          Our foundation
        </p>
        <h2 id="blessings-heading" className="section-heading" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.75rem)", marginBottom: "0.75rem" }}>
          Blessings that guide us
        </h2>
        <p className="blessings-sub">
          We honour family and faith at the heart of Shreeva — their grace inspires integrity in every design and every promise to you.
        </p>

        <div className="blessings-grid">
         
         
          <Portrait
            primarySrc={BLESSING_PATHS.divine.primary}
            fallbackSrc={BLESSING_PATHS.divine.fallback}
            alt="Divine blessings"
            title=""
            subtitle=""
          />
           <Portrait
            primarySrc={BLESSING_PATHS.mother.primary}
            fallbackSrc={BLESSING_PATHS.mother.fallback}
            alt="Mother — family blessing"
            title=""
            subtitle=""
          />
           <Portrait
            primarySrc={BLESSING_PATHS.grandfather.primary}
            fallbackSrc={BLESSING_PATHS.grandfather.fallback}
            alt="Grandfather — family blessing"
            title=""
            subtitle=""
          />
        </div>
      </div>
    </section>
  );
}
