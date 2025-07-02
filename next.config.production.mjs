/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable linting during builds for production
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'supabase.io', 'uploadthing.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NODE_ENV === 'production' ? 'https://insideout.vercel.app' : '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/rust/:path*',
        destination: `${process.env.RUST_SERVICE_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
