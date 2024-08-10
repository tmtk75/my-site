import mdx from "@mdx-js/rollup";
import { vitePlugin as remix } from "@remix-run/dev";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync } from "node:fs";
import { join } from "node:path";

const isPreview = !!process.env.PREVIEW;
const repositoryName = "my-site";
const basename = isPreview ? undefined : `/${repositoryName}/`;

export default defineConfig({
  base: basename,
  plugins: [
    mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
    remix({
      // https://remix.run/docs/en/main/guides/spa-mode
      ssr: false,

      // https://zenn.dev/cybozu_frontend/articles/remix-spa-mode-gh-page
      basename,
      buildEnd(args) {
        if (!args.viteConfig.isProduction) return;
        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(
          join(buildPath, "index.html"),
          join(buildPath, "404.html")
        );
      },
    }),
    tsconfigPaths(),
  ],
});
