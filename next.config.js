const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['mongodb'],
  turbopack: {},
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    // Get allowed origins from environment variable
    // Format: "https://example.com,https://app.example.com"
    // For localhost during development, use "http://localhost:3000"
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
      : [];
    
    // Add Vercel production domains if available
    const vercelProduction = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
    const vercelPreview = process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : null;
    
    // Collect all allowed origins
    const allOrigins = [...allowedOrigins, vercelProduction, vercelPreview].filter(Boolean);
    
    // Use the first origin as default, or fallback to localhost for development
    const defaultOrigin = allOrigins[0] || 'http://localhost:3000';

    // Log CORS configuration for debugging
    if (process.env.NODE_ENV === 'production') {
      console.log('[CORS] Production mode - Allowed origins:', allOrigins);
    } else {
      console.log('[CORS] Development mode - Allowed origins:', [...allOrigins, 'http://localhost:3000']);
    }

    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With, Accept, Origin" },
          { key: "Access-Control-Max-Age", value: "86400" },
          // Dynamically set the origin based on request - this is the key fix!
          { key: "Access-Control-Allow-Origin", value: defaultOrigin },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          // Security Headers
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { 
            key: "Content-Security-Policy", 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.mixkit.co https://images.unsplash.com https://images.pexels.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://assets.mixkit.co https://images.unsplash.com https://images.pexels.com;" 
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
