import { applyBase, basePrefix } from './basePath';

const PREFIX = basePrefix(import.meta.env.BASE_URL); // '/wiki_claude_PE' or ''

/**
 * Returns a base-aware internal URL, for use in components. External URLs,
 * mailto/tel, and anchors are passed through untouched. `withBase('/')` and
 * `withBase('')` both yield the site root under the current base.
 *
 * The rule itself lives in `basePath.ts`, shared with the build-time rehype
 * plugin that does the same job for links written in prose.
 */
export function withBase(path = ''): string {
  return applyBase(PREFIX, path);
}
