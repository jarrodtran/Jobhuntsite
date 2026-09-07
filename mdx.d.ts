declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export const meta: {
    title: string;
    date: string;
    summary: string;
    /** Only `true` hides the post from lists, RSS, sitemap, and the public slug. */
    draft?: boolean;
  };

  export default function MDXContent(props: MDXProps): React.ReactNode;
}
