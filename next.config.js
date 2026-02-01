/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  pageExtensions: ['page.jsx', 'page.js', 'page.tsx', 'page.ts']
};

module.exports = nextConfig;
