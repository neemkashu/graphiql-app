/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/index.scss";`,
  },
  experimental: { appDir: true },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js/,
      use: [
        {
          loader: 'umd-compat-loader',
          options: {
            imports(module, context) {
              const result = path.relative(basePath, path.join(context, module));
              return `promise-loader?global,${result}!${module}`;
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
