import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jwell/types", "@jwell/utils", "@jwell/ui", "@jwell/api-client"],
  images: {
    qualities: [75, 85, 88, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      { 
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
