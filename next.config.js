const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  serverExternalPackages: ["mongoose"], // Corrected package name for server-side packages.
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    // Add top-level await experiment support
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Ensure alias resolution works
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'), // Ensure @components resolves correctly
    };

    return config;
  },
};

module.exports = nextConfig;
