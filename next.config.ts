import type { NextConfig } from "next";

/**
 * Static export: the site is served by nginx with no Node runtime (see Dockerfile).
 * `trailingSlash` preserves the URL shape of the previous deployment so existing
 * inbound links and search-engine records keep resolving.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  // next/image has no optimizer available under `output: "export"`.
  images: { unoptimized: true },
  // Next 16 dropped the `eslint` config key; linting runs via `npm run lint`.
  typescript: { ignoreBuildErrors: false },
  /**
   * The archived site is a tree of index.html files in public/. nginx resolves
   * those with try_files. The dev server does not, so these rewrites exist for
   * local preview only — static export ignores them, which is fine.
   */
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/archive/near-me-web-designs",
          destination: "/archive/near-me-web-designs/index.html",
        },
        {
          source: "/archive/near-me-web-designs/",
          destination: "/archive/near-me-web-designs/index.html",
        },
        {
          source: "/archive/near-me-web-designs/:path*/",
          destination: "/archive/near-me-web-designs/:path*/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
