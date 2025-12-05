const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

// Detect available CPUs, use all but leave 1 for system
const os = require("os");
const availableCPUs = Math.max(1, os.cpus().length - 1);

module.exports = {
  experimental: {
    // Use available CPUs for parallel builds (leave 1 for system)
    cpus: availableCPUs,
  },
  // Configure Turbopack for better performance
  turbopack: {
    memoryLimit: 4096,
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Optimize compiler settings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  output: 'export',
  // Disable image optimization for static export (Image Optimization API requires a server)
  // The Next.js Image component will still provide lazy loading and responsive images
  images: {
    unoptimized: true,
  },
  // Optimize bundle splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for large libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Separate chunk for react-image-gallery
            imageGallery: {
              name: 'image-gallery',
              test: /[\\/]node_modules[\\/]react-image-gallery[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  // async redirects() {
  //   return redirect;
  // },
  trailingSlash: true,
  env: {
    md_content,
  },
};
