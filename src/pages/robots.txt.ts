// /robots.txt: lets search engines and AI crawlers in, and points them at the
// sitemap. The crawler list matches nxt-pe/public/robots.txt. Generated rather
// than static so the sitemap URL follows `site` in astro.config.mjs.
import type { APIRoute } from 'astro';

const CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Googlebot',
  'Bingbot',
  'Meta-ExternalAgent',
  'cohere-ai',
  'Bytespider',
];

export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', '', '# Search engines and AI crawlers: explicitly allowed'];
  for (const bot of CRAWLERS) lines.push('', `User-agent: ${bot}`, 'Allow: /');
  lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
