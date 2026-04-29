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

const FALLBACK = "/fallback.jpg";

export default function SafeImage({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== FALLBACK) setImgSrc(FALLBACK);
      }}
    />
  );
}
