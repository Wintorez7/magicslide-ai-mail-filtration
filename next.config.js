/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // ✅ Google profile photos
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // (optional for GitHub)
      },
    ],
   },
  
};

module.exports = nextConfig;
