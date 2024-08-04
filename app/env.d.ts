/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "*.mdx" {
  // biome-ignore lint:suspicious/noEplicitAny
  let MDXComponent: (props: any) => JSX.Element;
  // biome-ignore lint:suspicious/noEplicitAny
  export const frontmatter: any;
  export default MDXComponent;
}

declare module "virtual:remix/server-build" {
  import type { ServerBuild } from "@remix-run/node";
  export const routes: ServerBuild["routes"];
}
