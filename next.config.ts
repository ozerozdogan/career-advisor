import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
    });
    
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '*.json': '*.json',
      },
    },
  },
};

export default nextConfig;
