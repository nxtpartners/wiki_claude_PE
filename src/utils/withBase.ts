const BASE = import.meta.env.BASE_URL; // e.g. '/wiki_claude_PE/' or '/'

/**
 * Returns a base-aware internal URL. External URLs, mailto/tel, and anchors
 * are passed through untouched. withBase('/') and withBase('') both yield the
 * site root under the current base.
 */
export function withBase(path = ''): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return BASE.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
