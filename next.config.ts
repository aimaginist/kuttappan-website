import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year — images are immutable
  },
  compress: true,
  poweredByHeader: false,
  // Preload critical fonts via headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-XSS-Protection",       value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
