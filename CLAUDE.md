# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/ (fails loudly on broken content/frontmatter)
npm run preview    # serve the production build locally
```

No test suite, linter, or formatter is configured. Treat `npm run build` as the correctness check — it type-checks Astro/TS files and validates content collection frontmatter against the Zod schemas in `src/content.config.ts`.

Requires Node 18.17+ (Node 20+ recommended).

## Architecture

Static Astro site, zero client JS except the theme toggle. Astro 5 + Tailwind CSS 4 (via the Vite plugin, no `tailwind.config` — tokens live in `src/styles/global.css`).

**Content collections** (`src/content.config.ts`) define two glob-loaded collections, each with a Zod schema:
- `case-studies` (`src/content/case-studies/*.mdx`) — has `order` (controls display order), optional `metric`, and `independent` flag.
- `blog` (`src/content/blog/*.md`) — has `pubDate`, `draft` (excludes from build when true).

Dynamic routes `src/pages/case-studies/[slug].astro` and `src/pages/blog/[slug].astro` render entries via `getStaticPaths`; index pages sort/filter using the schema fields above.

**Layouts**: `BaseLayout.astro` is the shell (head/meta/OpenGraph/theme-flash-prevention script/Header/Footer) used by all pages. `ProseLayout.astro` wraps it for long-form MDX/Markdown content (case studies, blog posts).

**Base path handling**: the site can deploy as a GitHub Pages *user* site (root) or *project* site (sub-path). `astro.config.mjs`'s `site`/`base` config plus `src/utils/url.ts`'s `withBase()` helper make internal links base-path-aware — always use `withBase()` for internal hrefs rather than hardcoding `/`-rooted paths. Note: a few cross-links inside case-study Markdown bodies are NOT base-aware and assume a root deploy.

**Site metadata** (name, role, email, social links, description) is centralized in `src/consts.ts` — update there, not per-page.

**Theme**: dark/light via a `dark` class on `<html>`, set pre-paint by an inline script in `BaseLayout.astro` to avoid flash-of-wrong-theme; user override persisted to `localStorage('theme')`, otherwise follows `prefers-color-scheme`. `ThemeToggle.astro` is the only component shipping client JS.

**Deployment**: `.github/workflows/deploy.yml` builds with `withastro/action@v3` and deploys to GitHub Pages on every push to `main`. Changing between user-site/project-site/custom-domain deploys requires updating `site`/`base` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`.

## Content authoring conventions

- `<mark>[EXPAND: ...]</mark>` marks unfinished sections in case studies/blog posts — rendered highlighted so they're impossible to miss. Don't remove these markers without also filling in the real content.
- `<DiagramPlaceholder description="..." />` stands in for a real diagram; real diagrams go in `public/diagrams/` and replace the component with a standard Markdown image.
- Blog post images live in `src/content/blog/<slug>-images/`. The header/cover image must be named `cover.{png,jpg,jpeg,webp}` — `src/utils/coverImage.ts` globs for it by folder name and `[slug].astro` renders it automatically above the content (no frontmatter field needed). Other in-article images go in the same folder with any descriptive filename, referenced from the post body via relative paths, e.g. `![alt](./slug-images/diagram.png)`.
