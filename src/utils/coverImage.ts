import type { ImageMetadata } from 'astro';

// Eagerly imports any `<slug>-cover.{png,jpg,jpeg,webp}` file placed next to a
// post's Markdown file in src/content/blog/. Posts without a matching file
// simply have no cover — this is optional, not required, per post.
const covers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/*-cover.{png,jpg,jpeg,webp}',
  { eager: true },
);

export function getCoverImage(slug: string): ImageMetadata | undefined {
  const entry = Object.entries(covers).find(([path]) =>
    new RegExp(`/${slug}-cover\\.(png|jpe?g|webp)$`).test(path),
  );
  return entry?.[1].default;
}
