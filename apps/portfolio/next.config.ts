import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@workspace/ui"],
  images: {
    qualities: [100, 75],
  },
  experimental: {
    agentFeedback: true,
  },
}

export default nextConfig
