// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import { rehypeBaseUrls } from './src/plugins/rehype-base-urls';

// Base path is env-driven for host portability.
// GitHub Pages (project subpath) uses the default; set SITE_BASE=/ for root-served hosts (Cloudflare, custom domain).
// Declared once here so the rehype plugin and Astro itself cannot disagree about it.
const base = process.env.SITE_BASE ?? '/wiki_claude_PE/';

// https://astro.build/config
export default defineConfig({
  site: 'https://nxtpartners.github.io',
  base,
  devToolbar: { enabled: false },
  integrations: [mdx(), pagefind()],
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
