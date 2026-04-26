import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jwell/types", "@jwell/utils", "@jwell/ui", "@jwell/api-client"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
