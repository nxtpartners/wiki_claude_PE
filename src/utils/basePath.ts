/**
 * The one rule for turning an internal path into a URL under the site's base.
 *
 * The wiki is served from a subpath on GitHub Pages and from the root on a
 * custom domain, so every internal link has to be built rather than written
 * literally. Two callers need that rule: `withBase()` at render time for
 * components, and the rehype plugin at build time for links written in prose.
 * Writing it in both is what made them able to disagree, so it lives here once
 * and they both bind it to the same base.
 *
 * Applying the base is **idempotent**: a path that already carries it is
 * returned unchanged. That is what makes it safe for a link to pass through
 * both callers, and it is why neither of them has to know what the other did.
 */

/** Schemes and fragments that address something other than a page of this site. */
const EXTERNAL = /^(https?:|mailto:|tel:|#)/;

/**
 * @param prefix The base with no trailing slash, so `''` when served from root.
 * @param path   An internal path, with or without a leading slash.
 */
export function applyBase(prefix: string, path = ''): string {
  if (EXTERNAL.test(path)) return path;

  // Protocol-relative URLs address another host, so they are left alone.
  if (path.startsWith('//')) return path;

  const rooted = '/' + path.replace(/^\//, '');
  if (prefix && (rooted === prefix || rooted.startsWith(prefix + '/'))) return rooted;
  return prefix + rooted;
}

/** Normalizes a configured base (`'/wiki_claude_PE/'`, `'/'`) into a prefix. */
export function basePrefix(base: string): string {
  return base.replace(/\/$/, '');
}
