/** @type {import('next').NextConfig} */
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  serverExternalPackages: [], // Updated as per Next.js requirements
  images: {
    domains: ['lh3.googleusercontent.com'], // Allowlisted image domain
  },
  webpack(config) {
    // Enable case-sensitive path checking
    config.plugins.push(new CaseSensitivePathsPlugin());

    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};