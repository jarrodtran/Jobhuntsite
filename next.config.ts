import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Cursor / loopback previews often hit 127.0.0.1 while `next dev`
  // initializes as localhost — allow both so /_next/* is not blocked.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

const withMDX = createMDX({
  options: {
    // String form so Turbopack can serialize plugin options.
    remarkPlugins: [["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
