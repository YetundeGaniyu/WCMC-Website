import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
=======
  turbopack: {
    root: process.cwd(),
>>>>>>> e3b7d8c3cee3080d8d561a5060b9c17a3539901a
  },
};

export default nextConfig;
