/** @type {import('next').NextConfig} */
const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_c3RlcmxpbmctbmV3dC0yNy5jbGVyay5hY2NvdW50cy5kZXYk';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublishableKey
  }
};

module.exports = nextConfig;
