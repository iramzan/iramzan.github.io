import type { ImageMetadata } from 'astro';

// Eagerly imports `cover.{png,jpg,jpeg,webp}` from a post's `<slug>-images/`
// folder in src/content/blog/. Posts without a matching folder/file simply
// have no cover — this is optional, not required, per post.
const covers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/*-images/cover.{png,jpg,jpeg,webp}',
  { eager: true },
);

export function getCoverImage(slug: string): ImageMetadata | undefined {
  const entry = Object.entries(covers).find(([path]) =>
    new RegExp(`/${slug}-images/cover\\.(png|jpe?g|webp)$`).test(path),
  );
  return entry?.[1].default;
}
