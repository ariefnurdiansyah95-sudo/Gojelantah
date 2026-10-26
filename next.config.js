/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
