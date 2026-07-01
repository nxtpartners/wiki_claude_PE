# Handover — KPMG × Claude for PE Wiki

## Current state
- **[2026-06-30] CONTENT-COMPLETE: all 36 content pages authored + ClaudeUI mockup kit built. `npm run build` passes (37 routes: 36 content + landing, Pagefind indexed, zero errors).**
- Infrastructure (Phase 0 + 1, unchanged): Astro 6 scaffolded manually (astro@6, @astrojs/mdx@6, astro-pagefind@2, pagefind, gsap, Inter Variable + JetBrains Mono — Astro 7 rejected, astro-pagefind@2 only supports astro ≤6). Design system in `src/styles/global.css` (KPMG tokens + warm Claude mockup tokens). Layout shell: `BaseLayout`, `DocLayout`. GSAP motion in `src/scripts/motion.ts`. Content collection in `src/content.config.ts`; dynamic route `src/pages/[...slug].astro`. `src/config/nav.ts` = single source of truth for the 9-section, 36-item nav.
- **ClaudeUI mockup kit built** (`src/components/claude-ui/`): ClaudeWindow, ClaudeSidebar, ClaudeComposer, ClaudeMessage, FileChip, ClaudeProject, Hotspot — warm cream/clay palette, never KPMG blue. Plus `src/components/DiagramPlaceholder.astro` (on-brand stub, kinds loop/layers/tree/flow). Showcased in `foundations/interface-tour.mdx`.
- **All 36 content pages authored** (Start Here 2, Foundations 4, Context 6, Projects 5, PE Playbooks 6, Worked Example 1, Power Features 5, Best Practices 5, Resources 2). Authored largely via parallel general-purpose agents with a strict shared brief. (Context grew from 5 to 6 with the new `context/instructions-for-claude` page.)
- **Sidebar numbering added** (`Sidebar.astro`): each nav item shows its global position (01–35, mono, tabular-nums) matching the "X of N" eyebrow in `DocLayout.astro`. Uses `positionOf` map built from `flatNav`.
- **Thinking & Effort page added** to Power Features (new nav entry `power-features/thinking-effort`, placed first in that section).
- **First 15 Minutes mockups added** (this session, content-preserving): 3 ClaudeUI screens inserted into `first-15-minutes.mdx` without altering the approved copy — (1) blank home composer, (2) composer with attached `Project Atlas Teaser.pdf` + typed prompt, (3) full user→Claude conversation showing the structured summary output. Imports use `../../components/claude-ui/` (root-level docs = two levels up).

## [2026-06-30] Review pass, fixes, and new Instructions page (this session)
- **Nav grew from 35 to 36 content pages**: added `context/instructions-for-claude` (placed in Context, after `writing-instructions`). `npm run build` now reports 37 routes (36 content + landing). All "35 pages / 36 pages" counts in Current state updated to 36 content pages / 37 routes.
- **New ClaudeUI component `src/components/claude-ui/ClaudeSettings.astro`**: renders a claude.ai Settings panel mockup for the "Instructions for Claude" field (warm cream + clay, never KPMG blue).
- **Fixes:**
  - First 15 Minutes third mockup wrapped in a padding div (the Claude reply was rendering flush-left because role="claude" ClaudeMessage has no bubble/padding). The First 15 top mockup was already swapped to the numbered "message box, up close" style earlier.
  - Sticky sidebar + TOC fixed via `align-self: stretch` on `.doc-sidebar` and `.doc-toc` in `DocLayout.astro` (they were scrolling away on long pages because `.doc-grid` uses `align-items: flex-start`, so side columns were only as tall as their content).
  - Project Atlas continuity: `interface-tour.mdx` aligned to the locked values (£60m revenue, gross margin high 70s), matching `first-15-minutes.mdx`.
  - Thinking & Effort page rewritten to actually cover thinking and the ability to turn it off (off / default / up dial), grounded in Anthropic help docs.
- **Hard-rule audit (Task #10) status:** hard rules verified clean across pages (zero em/en dashes, no "deal team", British spelling, no code/API refs). The broader visual + editorial elevate pass across all sections remains partially pending.
- **Note:** `welcome.mdx` and `first-15-minutes.mdx` prose remains locked/untouched; only additive mockup/padding changes were made to first-15.

## ★ Next session — START HERE
- **TASK #10 — Critique & elevate pass (PARTIALLY done — hard-rule audit clean, visual + editorial elevate still pending).** Do a senior-editor quality pass across all 36 pages: consistency of voice, strong open/close on each page, cross-linking with REAL slugs only, sensible component usage, Project Atlas continuity (mid-market UK field-service software, ~£60m revenue, mid-20s% growth, gross margin high 70s, HVAC/plumbing, per-seat subs). Hard rules already audited clean (zero em/en dashes, no "deal team", British spelling, no code/API refs, fictional data only); the visual + editorial elevate pass across all sections is what remains. **DO NOT edit `welcome.mdx` or `first-15-minutes.mdx` content — client approved them as-is** (read only, for consistency reference). Finish with `npm run build` (must show 37 routes) + a grep proving zero em/en dashes. Recommended: dispatch ONE general-purpose agent with this brief, but ONLY after the user explicitly approves running it.
- **Diagrams still placeholders.** `DiagramPlaceholder` stubs are in place (notably the confidentiality decision tree in `best-practices/confidentiality.mdx`, kind="tree"). Real diagrams to come: Claude hand-builds structural SVG/CSS (core loop, two-layer projects, confidentiality tree, context layering); user generates illustrative images via ChatGPT/Gemini/nano-banana from Claude-supplied specs.
- Open: hosting decision (GitHub Pages vs KPMG internal); KPMG logo drop-in.

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
- **[2026-06-30] Do NOT run agents, builds, or other actions without explicit approval.** When the user says "add X to the handover," that means edit the doc, not execute the work. Ask/confirm before dispatching any agent or running a pass.

## Gotchas & pitfalls
- **YAML frontmatter colons:** any `description:` containing a colon MUST be double-quoted, or the Astro build fails with "bad indentation of a mapping entry". Agents repeatedly produced unquoted descriptions with colons. Always grep `^description: [^"'].*: ` after authoring and quote offenders.
- **MDX import depth:** pages in `src/content/docs/<section>/` import components THREE levels up (`../../../components/`); root-level docs (`welcome.mdx`, `first-15-minutes.mdx`) use TWO levels (`../../components/`). Easy to get wrong.
- **Sidebar:** numbering comes from `flatNav` order in `nav.ts`. Adding/reordering nav items renumbers everything automatically (and shifts every page's "X of N"). That is intended.

## Open questions
- Hosting: GitHub Pages vs KPMG internal.
- Grant Chrome access for mockup/screenshot accuracy (planned for next session).

## Files that matter
- tasks/plan.md — full curriculum + architecture + phases.
- (site files to come in Phase 0/1.)
