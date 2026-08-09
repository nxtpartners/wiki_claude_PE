import { applyBase, basePrefix } from '../utils/basePath';

/**
 * Applies the site's base path to links written in prose.
 *
 * Astro rewrites the links its own components render, because those go through
 * `withBase()`. A link written as `[text](/foo)` in a content file is different:
 * it is passed straight through to the HTML, so on a host that serves the wiki
 * from a subpath every one of them 404s. Handling it here means authors keep
 * writing plain root-absolute links and every new one is covered automatically.
 *
 * The joining rule is `applyBase()`, the same one `withBase()` uses, and it is
 * idempotent. So a link that somehow reaches both is still correct, and nothing
 * here depends on knowing which links a component already handled.
 */
export function rehypeBaseUrls({ base = '/' }: { base?: string } = {}) {
  const prefix = basePrefix(base);

  // Served from the root, so there is nothing to apply.
  if (!prefix) return () => {};

  const walk = (node: any): void => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties) {
      const href = node.properties.href;
      if (typeof href === 'string') node.properties.href = applyBase(prefix, href);
    }
    for (const child of node.children ?? []) walk(child);
  };

  return (tree: any) => walk(tree);
}
