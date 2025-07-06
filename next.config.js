/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'i0.wp.com',
      'i.pinimg.com',
      'charlotteloves.co.uk',
      'as2.ftcdn.net'
    ],
  },
  serverExternalPackages: ['sharp', 'canvas'],
  allowedDevOrigins: ['192.168.0.79']
}

module.exports = nextConfig