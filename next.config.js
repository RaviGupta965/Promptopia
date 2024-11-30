/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // This is fine for enabling the app directory.
  },
  serverExternalPackages: ["mongoose"], // Corrected from `serverComponentsExternalPackages`.
  images: {
    domains: ['lh3.googleusercontent.com'], // No change needed here.
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
