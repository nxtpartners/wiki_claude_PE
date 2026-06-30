# Handover — KPMG × Claude for PE Wiki

## Current state
- Project kicked off. Skeleton created (repo, git, task files).
- **[2026-06-30] Phase 0 + Phase 1 foundation built (awaiting design sign-off before content authoring).**
  - Astro 6 scaffolded **manually** (no `npm create astro`) — astro@6, @astrojs/mdx@6, astro-pagefind@2, pagefind, gsap, Inter Variable + JetBrains Mono. (Astro 7 + mdx 7 were rejected because astro-pagefind@2 only supports astro ≤6.)
  - Design system in `src/styles/global.css` — KPMG tokens, Inter sans-only, spacing/radii/shadow scales, prose + table styling, reveal base, Pagefind theming.
  - Layout shell: `BaseLayout`, `DocLayout` (header + sticky sidebar + content + right TOC + prev/next + reading-progress bar + footer + mobile sidebar toggle).
  - Core components: Header (wordmark + Pagefind search modal + logo placeholder), Sidebar (reads nav.ts; existing slugs are links, unwritten ones render muted "soon"), TableOfContents (IntersectionObserver active-heading), PrevNext, Callout (tip/note/warning/confidential), PromptCard (dark surface + working Copy island — signature component), ComparisonTable, Steps/Step, Card/CardGrid, Hero.
  - GSAP motion in `src/scripts/motion.ts` — hero stagger, scroll reveals, reading progress; respects prefers-reduced-motion.
  - Content collection (Astro 5 content layer / glob loader) in `src/content.config.ts`; dynamic route `src/pages/[...slug].astro`.
  - Pages: HOME (`index.astro`, marketing-grade hero + feature grid + confidentiality strip + footer) + 2 sample docs: `welcome.mdx` and `foundations/what-claude-is.mdx` (demonstrates Callout + PromptCard + ComparisonTable in MDX).
  - **`npm run build` passes** — 3 pages built, Pagefind indexed 3 pages. Preview smoke test: all routes + pagefind-ui.js return 200.
  - `src/config/nav.ts` is the single source of truth for the full 9-section nav.
- Next: get design sign-off, then author remaining content pages (most nav items still "soon").

## ★ Next session — START HERE
- **User will grant Chrome access next session.** Use it to study the *current* claude.ai UI and recreate accurate UI mockups (per the Visual System in plan.md). Rules: throwaway/dummy document only, never real deal data, do not capture confidential content.
- First build target after Chrome access: the **ClaudeUI mockup component kit** (composer with attach, message exchange, file chip, sidebar, Projects panel), then add annotated Claude screens to **First 15 Minutes**.
- For diagrams: Claude hand-builds structural ones (core loop, two-layer projects, confidentiality decision tree, context layering) in SVG/CSS; user generates illustrative images via ChatGPT/Gemini/nano-banana from Claude-supplied specs.

## [2026-06-30] Landing page + chrome refinements (this session)
- Rebuilt landing (`src/pages/index.astro`): asymmetric hero with a **Claude.ai conversation mockup** (restyled to the real warm Claude palette: cream `#FAF9F5`, clay accent `#BE5D3A`, neutral bubbles — NOT KPMG blue).
- Hero title set to "Use Claude with confidence on private equity work." (removed salesy "fastest analyst" line + the eyebrow).
- **Path/curriculum section is now 2 columns** (bordered cards, hover lift; 1 column on mobile).
- Removed the "In the deal room" bento section (duplicated PE Playbooks module).
- Closing CTA taken out of the wide card → clean centered closing.
- **Confidential classification marking added**: muted-red "Confidential" pill in the Header (top-right, with tooltip) + "Confidential · For internal KPMG use only, not for distribution" notice in the Footer bar. (This is a classification marking, NOT the Confidentiality Decision Tree content page.)
- Favicon fixed: was an "A" letterform → replaced with a "C" mark in KPMG blue (`public/favicon.svg`).
- Removed all "deal team" wording (audience is KPMG Private Equity broadly).

## Key decisions made
- **Audience/tier:** assume Claude Enterprise/Team; primary inputs are xls/pdf/docs; connectors taught as optional accelerator with pros/cons.
- **Project structure (approved):** two-layer system — reusable function projects (screening, market research) vs one-time deal projects (one per live deal, siloed data room for confidentiality).
- **Stack (approved):** Astro + custom design + GSAP; not Docusaurus. Pagefind search, MDX content.
- **Six adoption-drivers (approved):** First 15 Minutes, Project Atlas worked example, prompt library, confidentiality decision tree, downloadable instruction templates, glossary.
- **Branding:** KPMG palette (deep blue #00338D); no NXT colors/fonts; no logo yet.

## User preferences & corrections
- Keep it super polished and professional; PE audience, not technical. Avoid anything that feels "techy" or like developer docs.
- Take maximum creative freedom on design quality.
- **Never call the audience "deal team(s)".** It is KPMG **Private Equity** (broader). Use "private equity teams / professionals".
- **Claude.ai mockups must look like the real product** (warm cream + clay accent), never KPMG blue. Audience has no AI experience; a wrong-looking UI makes them think they are on the wrong page or doing something wrong.
- **No salesy/marketing copy.** This is an education-first guide, not an ad.
- **Never use em or en dashes** anywhere (content, UI, comments).

## Open questions
- Hosting: GitHub Pages vs KPMG internal.
- Grant Chrome access for mockup/screenshot accuracy (planned for next session).

## Files that matter
- tasks/plan.md — full curriculum + architecture + phases.
- (site files to come in Phase 0/1.)
