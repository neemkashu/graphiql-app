/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    additionalData: `@import "src/styles/index.scss";`,
  },
};

module.exports = nextConfig;
