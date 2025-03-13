// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-testid$'] },
  },
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true',
  },
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'image.hm.com',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.CI !== 'true',
  },
};

module.exports = nextConfig;
