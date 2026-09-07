import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // String form so Turbopack can serialize plugin options.
    remarkPlugins: [["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
