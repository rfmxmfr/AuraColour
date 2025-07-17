/** @type { import('next').NextConfig } */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'i0.wp.com',
      'i.pinimg.com',
      'charlotteloves.co.uk',
      'as2.ftcdn.net',
    ],
  },
  serverExternalPackages: ['sharp', 'canvas'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig