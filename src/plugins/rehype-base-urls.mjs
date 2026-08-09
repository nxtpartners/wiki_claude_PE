/**
 * Prefixes root-absolute links written in prose with the site's base path.
 *
 * Astro rewrites the links its own components render, because those go through
 * `withBase()`. A link written as `[text](/foo)` in a content file is different:
 * it is passed through to the HTML verbatim, so on a host that serves the wiki
 * from a subpath every one of them 404s. Rewriting them here lets authors keep
 * writing plain root-absolute links while the base is still applied exactly
 * once, from the single place that knows what it is.
 *
 * This is the build-time counterpart of `src/utils/withBase.ts`, and it takes
 * the base from the same `astro.config.mjs` value that feeds it.
 *
 * Only real markdown links are touched. JSX in MDX is left alone on purpose:
 * components such as `Card` call `withBase()` themselves, so rewriting their
 * attributes here would apply the base twice.
 */
export function rehypeBaseUrls({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');

  // Served from the root, so there is nothing to prefix.
  if (!prefix) return () => {};

  const rebase = (href) => {
    if (typeof href !== 'string') return href;
    // Protocol-relative, external, and already-based links are all left as-is.
    if (!href.startsWith('/') || href.startsWith('//')) return href;
    if (href === prefix || href.startsWith(prefix + '/')) return href;
    return prefix + href;
  };

  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties) {
      node.properties.href = rebase(node.properties.href);
    }
    for (const child of node.children ?? []) walk(child);
  };

  return (tree) => walk(tree);
}
