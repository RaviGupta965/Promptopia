const path = require('path'); // Add this line

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"], // Corrected location for external packages
  images: {
    domains: ['lh3.googleusercontent.com'], // Correct image domain
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Enable top-level await
    };
    return config;
  },
};

module.exports = nextConfig;

