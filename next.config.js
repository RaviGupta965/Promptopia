/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname), // Resolve @ to the project root
    };
    return config
  }
}

module.exports = nextConfig