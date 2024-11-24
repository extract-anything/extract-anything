import type { NextConfig } from "next"

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  serverExternalPackages: ["canvas"],
  transpilePackages: ["@extract-anything/ui", "@extract-anything/shared"],
} satisfies NextConfig

export default nextConfig
