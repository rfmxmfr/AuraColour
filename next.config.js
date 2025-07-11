/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle handlebars warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Ignore handlebars warnings
    config.ignoreWarnings = [
      /require.extensions is not supported by webpack/,
    ];
    
    return config;
  },
  serverExternalPackages: ['@genkit-ai/core', '@genkit-ai/googleai'],
  allowedDevOrigins: [
    '192.168.0.79',
    'localhost',
    '127.0.0.1'
  ],
  // Performance optimizations
  images: {
    domains: ['pgguceafqdxtjzisfofk.supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
  // PWA support
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;
