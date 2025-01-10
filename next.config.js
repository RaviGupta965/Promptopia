/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  serverExternalPackages: [],
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}
