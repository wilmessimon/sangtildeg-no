const withNextIntl = require('next-intl/plugin')(
  './i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
};

module.exports = withNextIntl(nextConfig);

