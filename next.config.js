const {withPlaiceholder} = require('@plaiceholder/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {externalDir: true,images: {allowFutureImage: true}},
  images: {
    domains: ['images.unsplash.com'],
  },
  swcMinify: true,
}

module.exports = withPlaiceholder(nextConfig)
