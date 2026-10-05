// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { rehypeBaseUrls } from './src/plugins/rehype-base-urls';

// Base path is env-driven for host portability.
// GitHub Pages (project subpath) uses the default; set SITE_BASE=/ for root-served hosts (Cloudflare, custom domain).
// Declared once here so the rehype plugin and Astro itself cannot disagree about it.
const base = process.env.SITE_BASE ?? '/wiki_claude_PE/';

// https://astro.build/config
export default defineConfig({
  // The canonical home. Absolute URLs (llms.txt) always point here, even from the GitHub Pages copy.
  site: 'https://wiki.nxtpartners.ai',
  base,
  devToolbar: { enabled: false },
  // sitemap-index.xml lists every built page (404 excluded) under `site`. Only the root-served build
  // (wiki.nxtpartners.ai) publishes one; the GitHub subpath copy would list addresses that do not exist.
  integrations: [mdx(), pagefind(), ...(base === '/' ? [sitemap()] : [])],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    // Applies the base to root-absolute links written in prose. MDX inherits
    // this config, so .md and .mdx are both covered.
    rehypePlugins: [[rehypeBaseUrls, { base }]],
  },
});
