// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: set this to your production URL before deploying.
  // - GitHub Pages user site:  https://iramzan.github.io
  // - Custom domain / Vercel:  https://your-domain.tld
  // site: 'https://iramzan.github.io',

  // If you deploy to a GitHub Pages *project* site (e.g. iramzan.github.io/portfolio),
  // uncomment and set the base. All internal links respect it automatically.
  // base: '/portfolio',
  site: 'https://imranramzan.io', // Your new custom domain
  base: '/',                      // Root base path
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
