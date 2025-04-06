import { reactRouter } from "@react-router/dev/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync } from "node:fs";
import { join } from "node:path";

export default defineConfig({
  // base: "/my-site/",
  plugins: [
    mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
    reactRouter() as PluginOption,
    // remix({
    //   // https://remix.run/docs/en/main/guides/spa-mode
    //   ssr: false,

    //   // https://zenn.dev/cybozu_frontend/articles/remix-spa-mode-gh-page
    //   // basename: "/my-site/",
    //   buildEnd(args) {
    //     if (!args.viteConfig.isProduction) return;
    //     const buildPath = args.viteConfig.build.outDir;
    //     copyFileSync(
    //       join(buildPath, "index.html"),
    //       join(buildPath, "404.html")
    //     );
    //   },
    // }),
    tsconfigPaths(),
  ],
});

