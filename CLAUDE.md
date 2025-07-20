# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (uses React Router v7 dev server)
- **Build for production**: `pnpm build` (React Router build)
- **Preview production build**: `pnpm preview` (after build)
- **Run linter**: `pnpm lint` (uses Biome)
- **Type checking**: `pnpm typecheck` (TypeScript compiler)

## Architecture Overview

This is a personal website built with React Router v7 in SPA mode (SSR disabled). The project uses modern web development tools and follows a file-based routing structure.

### Key Technologies
- **React Router v7**: For routing and SPA framework
- **MDX**: For content authoring with frontmatter support
- **Tailwind CSS v3**: For styling with typography plugin
- **Biome**: For code formatting and linting
- **Vite**: For build tooling
- **TypeScript**: For type safety

### Project Structure
- `app/routes/`: File-based routing with `.tsx` and `.mdx` files
  - `_index.tsx`: Homepage with post listing
  - `post.tsx`: Post layout component 
  - `post.*.mdx`: Individual blog posts with frontmatter
  - `*.mdx`: Static pages (about, 404, etc.)
- `app/components/`: Reusable components (currently just `profile.mdx`)
- `app/root.tsx`: Root layout component
- `app/routes.ts`: Routes configuration using flatRoutes

### Content Management
- Blog posts are MDX files with naming pattern `post.{slug}.mdx`
- Posts require frontmatter with: `title`, `published` (YYYY-MM-DD), optional `description` and `draft`
- Posts are automatically discovered via `import.meta.glob()` in `_index.tsx:30`
- Static pages can be created as standalone MDX files in routes directory

### Styling
- Tailwind CSS with prose typography classes for content
- Custom styles in `app/index.scss` and `app/tailwind.css`
- Responsive design with mobile-first approach

### Configuration Notes
- React Router config in `react-router.config.ts` with SSR disabled
- Vite config includes MDX plugin with frontmatter support
- TypeScript paths configured with `~/*` alias pointing to `app/*`
- Biome configuration includes build directory ignore

### Deployment
- Configured for static deployment (SPA mode)
- Terraform configuration present in `main.tf` for infrastructure