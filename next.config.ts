import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow larger image uploads (media library + featured images)
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-325b34a5b42e4939831793306b2f5d29.r2.dev",
      },
    ],
  },
};

export default nextConfig;
