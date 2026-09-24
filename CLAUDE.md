# wiki_claude_PE

> **Read `/Users/dorianguzman/Work/repo/CLAUDE.md` and `/Users/dorianguzman/Work/repo/rules.md` first.** They bind here. This
> file adds only what is true of *this* project. Where the two collide, the more specific one wins — this file.

A static teaching wiki: **KPMG × Claude for Private Equity**. It teaches two tracks, the Claude.ai web app
(primary) and Claude Code (secondary). The API is out of scope.

**The audience is non-technical private equity professionals.** That single fact drives most of the rules
below. They have no AI experience, and several of the hard rules exist because a wrong visual cue makes them
think they have broken something.

## Stack

| | |
|---|---|
| Framework | Astro 6 static output, MDX content collections |
| Search | Pagefind via `astro-pagefind` |
| Motion | GSAP |
| Images | `astro:assets` — diagrams are imported, never referenced by URL |
| Fonts | Inter variable + JetBrains Mono, self-hosted via Fontsource |
| Build | `npm run build` · `npm run dev` · `npm run preview` |
| Node | **>= 22.12**. Astro 6 refuses to build on Node 20. CI pins `node-version: 22`. |

Dependencies are pinned on purpose: `astro-pagefind@2` supports Astro **≤ 6**. Do not upgrade to Astro 7 or
`@astrojs/mdx@7` — npm install fails on a peer-dep conflict.

## Hosting — the rule that breaks the most builds

The site is served from a **GitHub Pages project subpath**, `nxtpartners.github.io/wiki_claude_PE/`. The base
is env-driven in `astro.config.mjs` (`process.env.SITE_BASE ?? '/wiki_claude_PE/'`).

**Every internal link and asset must go through `src/utils/withBase.ts` or `import.meta.env.BASE_URL`.** A
root-absolute `href="/foo"`, `/favicon.svg`, or `/pagefind/...` 404s in production while working perfectly in
`dev`. That asymmetry is why this keeps recurring. Building with `SITE_BASE=/` targets a root host.

Prose links inside markdown are rewritten at build time by the rehype plugin in `src/plugins/`, so authors
write plain `[text](/foo)`. **JSX inside MDX is deliberately not rewritten** — those must call `withBase()`
themselves.

The repo is public and the content is confidential, so pages carry `<meta name="robots" content="noindex,
nofollow">` from `BaseLayout.astro`. A `public/robots.txt` would land at `/wiki_claude_PE/robots.txt`, which
no crawler reads.

## Authoring content

- Content lives in `src/content/docs/`. A page that uses components **must** be `.mdx`, not `.md`.
- **Import depth is two different numbers.** `src/content/docs/<section>/*.mdx` reaches components with
  `../../../components/`; the two root-level docs (`welcome.mdx`, `first-15-minutes.mdx`) use
  `../../components/`. Copying an import line between those two levels silently breaks the build.
- A `description:` in frontmatter containing a colon **must** be double-quoted, or Astro fails with "bad
  indentation of a mapping entry".
- Adding a page means adding it to `src/config/nav.ts`. The nav registry is the single source of truth for
  track names, section labels, and order — see `tasks/standards.md`.

### Locked content
`welcome.mdx` and `first-15-minutes.mdx` are **client-approved**. Additive, content-preserving changes only
(adding a mockup is fine; rewriting a paragraph is not).

`Header.astro` — the nav wordmark and KPMG logo lockup — is also approved as-is. Note that on the homepage
"the header" almost always means the **hero H1 in `index.astro`**, not the nav. Disambiguate before editing.

### Canonical figures — Project Atlas
The worked example's numbers are locked by `first-15-minutes.mdx` and every other page aligns to it: revenue
about **$60m**, US field-service software for HVAC/plumbing contractors, growth mid-20s percent, gross margin
**high 70s** percent, per-seat subscriptions, NRR above 110 percent.

## House style — non-negotiable

- **Never use em dashes or en dashes.** Anywhere: content, UI text, code comments. Use commas, colons,
  parentheses, or two sentences.
- **US English and US dollars.** Never reintroduce £, UK geography, or British spellings (organise, summarise,
  behaviour, judgement, rigour, analyse, adviser, sceptical).
- **Never call the audience "deal teams".** It is KPMG **Private Equity**, which is broader. Write "private
  equity teams" or "private equity professionals".
- **Education first, never salesy.** This is a guide, not an ad. No "fastest analyst on your deal team".
- **VS Code is required at KPMG, recommended everywhere else** (user, 2026-09-24): KPMG works only in VS Code,
  so Before you Start lists it as "Required at KPMG". In general Claude Code runs in any terminal, so saying
  that is correct; just never imply a KPMG reader can use a different setup.
- **A page must teach the concept in its own title.** A page called "Thinking & Effort" that never explains
  what thinking is has failed, regardless of how good the prose is.

## Two palettes, and never mixing them

KPMG deep blue `#00338D` is the site's brand. **Claude.ai mockups must look like the real product** — warm
cream (`#FAF9F5` / `#F0EEE6`), clay accent (`#BE5D3A`), neutral message bubbles.

**Never use KPMG blue inside a Claude UI mockup.** The audience reads an unfamiliar color as "I am on the
wrong page" or "I did something wrong". The rule is stated at `src/styles/global.css:341`, and
`tasks/standards.md` tracks a live violation of it.

## Working agreement

- **I push, the user deploys.** Push code only. Never run `gh workflow run`, never touch `gh api ... /pages`,
  never change Pages settings. Reading run status for diagnosis (`gh run list/view/watch`) is fine.
- **"Add X to the handover" means edit the document, not do the work.** Confirm before dispatching roles,
  builds, or passes.

## Project files

`tasks/standards.md` is the enforceable checklist and the map of where each Seam lives. `tasks/context.md` is
dated incident history. `tasks/handover.md` is state between sessions. `tasks/plan.md` is the work queue.
**Those four are the whole set** — `tasks/agents.md` and `tasks/skills.md` were abolished on 2026-08-11 and
must not be created.
