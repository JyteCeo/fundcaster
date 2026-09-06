/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };
    return config
  },
  transpilePackages: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', '@tanstack/react-query'],
};

export default nextConfig;
