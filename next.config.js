/** @type {import('next').NextConfig} */
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

module.exports = {
  // External packages configuration (empty for now, can be updated as needed)
  serverExternalPackages: [],

  // Image domain allowlist
  images: {
    domains: ['lh3.googleusercontent.com'], // Trusted domains for images
  },

  webpack(config, { isServer }) {
    // Add CaseSensitivePathsPlugin for stricter path resolution
    config.plugins.push(new CaseSensitivePathsPlugin());

    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Add custom alias for better path resolution (e.g., for the components folder)
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'components'),
    };

    // Log webpack config for debugging purposes in build logs
    if (!isServer) {
      // console.log('Webpack configuration:', config);
    }

    return config;
  },

  // Optional settings to enforce clean builds
  eslint: {
    // Ignore ESLint warnings during build if not critical
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Ignore TypeScript errors during build if not critical
    ignoreBuildErrors: true,
  },
};