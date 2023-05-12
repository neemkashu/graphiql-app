/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/index.scss";`,
  },
  experimental: { appDir: true },
};

module.exports = nextConfig;
