"use client";

import { useState } from "react";
import Image from "next/image";
import { imageSrcNeedsUnoptimized, PRODUCT_IMAGE_FALLBACK } from "../../lib/cloudinary";

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

export default function SafeImage({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized={imageSrcNeedsUnoptimized(imgSrc)}
      onError={() => {
        if (imgSrc !== PRODUCT_IMAGE_FALLBACK) setImgSrc(PRODUCT_IMAGE_FALLBACK);
      }}
    />
  );
}
