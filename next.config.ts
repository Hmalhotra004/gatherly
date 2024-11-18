import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   swcPlugins: [["next-superjson-plugin", {}]],
  // },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
