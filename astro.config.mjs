// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nxtpartners.github.io',
  // Base path is env-driven for host portability.
  // GitHub Pages (project subpath) uses the default; set SITE_BASE=/ for root-served hosts (Cloudflare, custom domain).
  base: process.env.SITE_BASE ?? '/wiki_claude_PE/',
  devToolbar: { enabled: false },
  integrations: [mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
