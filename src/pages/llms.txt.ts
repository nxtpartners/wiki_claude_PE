// /llms.txt: the plain-text map of the wiki that AI assistants read to understand
// and cite it (llmstxt.org). Generated from the nav registry and each page's
// description on every build, so a page added to nav.ts appears here with no
// second edit. Links are absolute and always use the canonical domain.
import type { APIRoute } from 'astro';
import { NXT_SITE, TRACKS, navForTrack, walkSections, type Track } from '../config/nav';
import { docDescriptions } from '../utils/existingDocs';

const INTRO = `# Claude for Private Equity

> A practical, self-paced guide to using Claude in private equity work, written for investment professionals rather than engineers. It covers two tools: the Claude.ai web app for everyday questions, analysis and drafting, and Claude Code for hands-on work across files on your own computer.

Built by ${NXT_SITE.name} (${NXT_SITE.url}). The guide teaches how to give Claude context, how to structure Projects, how to keep confidential data safe, and how to apply Claude to private equity workflows such as CIM and teaser analysis, due diligence, investment memos, market research, financial review and portfolio monitoring. A worked example, Project Atlas, follows one anonymized target from first screen to IC memo. It assumes a Claude Enterprise or Team plan. US English, US dollars.`;

export const GET: APIRoute = async ({ site }) => {
  const described = await docDescriptions();
  const url = (slug: string) => new URL(`${slug}/`, site).href;

  const track = (t: Track): string => {
    const lines = [`## ${TRACKS[t].name}`];
    for (const section of walkSections(navForTrack(t))) {
      const items = section.items.filter((i) => described.has(i.slug));
      if (!items.length) continue;
      lines.push('', `### ${section.label}`, '');
      for (const i of items) {
        const about = described.get(i.slug);
        lines.push(`- [${i.title}](${url(i.slug)})${about ? `: ${about}` : ''}`);
      }
    }
    return lines.join('\n');
  };

  const body = [INTRO, track('core'), track('advanced')].join('\n\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
