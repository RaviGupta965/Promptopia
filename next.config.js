const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // If you still need to use the app directory feature.
  },
  serverExternalPackages: ["mongoose"], // Keeping this as is for mongoose.
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    // Top-level await experiment
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Set up the alias resolution for @components
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'), // Make sure to map @components correctly
    };

    return config;
  },
};

module.exports = nextConfig;
