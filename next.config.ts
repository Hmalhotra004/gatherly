import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   swcPlugins: [["next-superjson-plugin", {}]],
  // },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "utfs.io",
    ],
  },
};

export default nextConfig;
