# Imran Ramzan — Portfolio

Personal portfolio site: **Astro + Tailwind CSS**, fully static, no backend. Dark/light mode (system default with a toggle), content collections for case studies and blog posts, sitemap + OpenGraph + semantic HTML out of the box.

## Stack

- [Astro 5](https://astro.build) — static site generation, content collections
- [Tailwind CSS 4](https://tailwindcss.com) — via the Vite plugin, with `@tailwindcss/typography` for long-form content
- MDX for case studies (so they can embed the diagram-placeholder component); plain Markdown for blog posts
- Zero client-side JavaScript except the theme toggle

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Requires Node 18.17+ (Node 20+ recommended).

## Editing content

### Fill the [EXPAND] slots

The four case studies and the starter blog post contain `<mark>[EXPAND: ...]</mark>` slots — they render highlighted on the page so unfinished sections are impossible to miss. Replace each with your specifics, or delete the slot. Files:

- `src/content/case-studies/case-studies-xxx.mdx`
- `src/content/blog/blog-xx.md`

### Replace the diagram placeholders

Case studies embed `<DiagramPlaceholder description="..." />`. When you have a real diagram, drop the image into `public/` (e.g. `public/diagrams/eks-topology.svg`) and replace the component with a normal Markdown image:

```md
![EKS platform topology](/diagrams/eks-topology.svg)
```

### Add a blog post

Drop a Markdown file into `src/content/blog/` — no code changes needed:

```md
---
title: 'Post title'
description: 'One-sentence summary shown on the blog index and in meta tags.'
pubDate: 2026-08-01
---

Post body in Markdown.
```

Set `draft: true` in the frontmatter to keep a post out of the build.

### Site-wide details

- Name, role, email, LinkedIn, GitHub: `src/consts.ts`
- Colours and typography tokens: `src/styles/global.css`
- OpenGraph image: `public/og-image.png` (a generated placeholder — replace with your own 1200×630 image when ready)

## Deployment

### GitHub Pages (workflow included)

1. Create a repository and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

**URL configuration** in `astro.config.mjs`:

- **User site** (repo named `iramzan.github.io`): `site: 'https://iramzan.github.io'` — already set; nothing else to do.
- **Project site** (repo named e.g. `portfolio`, served at `iramzan.github.io/portfolio`): keep `site` as-is and set `base: '/portfolio'`. All nav and page links respect the base automatically. Note: a handful of cross-links inside the case-study Markdown (e.g. `/case-studies/...`) assume a root deploy — prefix them with the base if you use a project site.

### Vercel

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo. Astro is auto-detected; the defaults (build command `astro build`, output `dist`) are correct.
3. After the first deploy, set `site` in `astro.config.mjs` to your Vercel URL (or custom domain) and update the `Sitemap:` line in `public/robots.txt` so the sitemap and OpenGraph URLs are correct, then push.

### Custom domain

Point the domain at GitHub Pages or Vercel per their docs, then update `site` in `astro.config.mjs` and `public/robots.txt`.

## Housekeeping before going live

- [ ] Fill or delete every `[EXPAND: ...]` slot
- [ ] Replace `[DIAGRAM: ...]` placeholders with real diagrams
- [ ] Replace `public/og-image.png` with a final image (1200×630)
- [ ] Confirm `site` in `astro.config.mjs` matches the deployed URL
- [ ] Run `npm run build` locally — the build fails loudly on broken content
