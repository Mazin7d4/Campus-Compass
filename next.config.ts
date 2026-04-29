import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep these to avoid build blockers while you package (you can tighten later)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Needed for Capacitor static packaging
  output: "export",

  // For next export, Next Image optimization must be disabled
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
