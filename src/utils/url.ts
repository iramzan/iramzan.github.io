/**
 * Prefix an internal path with the configured base path.
 * With the default `base: '/'` this is a no-op; if the site is deployed
 * under a sub-path (e.g. a GitHub Pages project site), links keep working.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
