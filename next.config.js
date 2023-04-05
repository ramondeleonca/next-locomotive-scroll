const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  i18n: {
    defaultLocale: "en-us",
    locales: ["en", "en-us"],
    localeDetection: true
  }
};

module.exports = nextConfig
