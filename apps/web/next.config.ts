import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jwell/types", "@jwell/utils", "@jwell/ui", "@jwell/api-client"],
  images: {
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
