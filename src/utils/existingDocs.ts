import { getCollection } from 'astro:content';

/**
 * The slugs that have a real, non-draft content file behind them.
 *
 * The nav registry lists pages that are planned as well as pages that are
 * written, so every consumer of it has to ask this same question before
 * rendering a link: does this page actually exist yet? Sidebar, Footer,
 * PrevNext and the home page all need it, which is why the answer is defined
 * here once rather than re-derived in each of them.
 *
 * A slug that is absent should render as a muted "coming soon" label, never as
 * a link, so the build can never point at a page that is not there.
 */
export async function existingDocSlugs(): Promise<Set<string>> {
  const docs = await getCollection('docs', ({ data }) => data.draft !== true);
  return new Set(docs.map((d) => d.id));
}
