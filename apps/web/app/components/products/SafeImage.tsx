"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%232A2A2A' width='400' height='400'/%3E%3Ctext fill='%23888888' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage Not Available%3C/text%3E%3C/svg%3E";

export default function SafeImage({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        console.error("[SafeImage] Failed to load:", src, e);
        if (imgSrc !== FALLBACK) setImgSrc(FALLBACK);
      }}
      onLoad={() => {
        console.log("[SafeImage] Loaded successfully:", src);
      }}
    />
  );
}
