declare module "*.mdx" {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: unknown; // supported by remarkMdxFrontmatter
}

declare module "virtual:remix/server-build" {
  import type { ServerBuild } from "@react-router/node";
  export const routes: ServerBuild["routes"];
}
