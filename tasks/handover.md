# Handover — KPMG × Claude for PE Wiki

## [2026-07-01] LIVE on GitHub Pages (this session)
- **The wiki is deployed and live at https://nxtpartners.github.io/wiki_claude_PE/** (served from a project subpath). Build + deploy workflow is green.
- **Hosting decision RESOLVED:** GitHub Pages, project subpath (not a custom domain). Public repo, so a `noindex, nofollow` meta was added as a confidentiality precaution.
- **Base path is env-driven for portability.** `astro.config.mjs`: `base: process.env.SITE_BASE ?? '/wiki_claude_PE/'`. Defaults to the subpath for GitHub Pages; set `SITE_BASE=/` at build time to serve from root on Cloudflare / a custom domain later. No code changes needed to move hosts.
- **New helper `src/utils/withBase.ts`** is the single source of truth for base-aware internal URLs (external/mailto/tel/anchor URLs pass through untouched). Every internal link now routes through it: `Card.astro`, `Sidebar.astro`, `Footer.astro`, `PrevNext.astro`, `Header.astro` (home/logo), `index.astro` (hero + closing links, and the six curriculum links via a base-aware `resolve()`).
- **Assets made base-aware:** favicon (`import.meta.env.BASE_URL + 'favicon.svg'`), Pagefind CSS/JS, and `PagefindUI({ bundlePath: import.meta.env.BASE_URL + 'pagefind/' })` so search finds its index under the subpath. Diagram images via `astro:assets` need no change (Astro auto-prefixes the base).
- **CI: `.github/workflows/deploy.yml`** (official `withastro/action@v3` + `actions/deploy-pages@v4`) runs on push to `main` and via `workflow_dispatch`. `astro-pagefind` indexes during `astro build`, so no extra Pagefind step.
- **GOTCHA fixed:** the first CI run failed because `withastro/action@v3` defaults to Node 20, but Astro 6 requires Node >=22.12.0 (EBADENGINE). Fix: pin the action to Node 22 with `with: { node-version: 22 }`. Second run went green.
- **Commits this session (pushed to origin/main):** `0e08144` feat: deployable to GitHub Pages at project subpath; `bcae8f4` fix(ci): build on Node 22.
- **Workflow division of labor (user preference):** I push code only. The USER configures Pages (Settings > Pages > Source = "GitHub Actions") and triggers deploys. Do NOT run `gh workflow run`, `gh api ... pages`, or change Pages settings. Reading run logs (`gh run view/list/watch`) is fine.
- **Verified:** local `npm run build` green (37 routes, Pagefind indexed 37); grep guard shows zero root-absolute internal `href="/`; preview under `/wiki_claude_PE/` returns 200 on home/deep/favicon/pagefind, root paths correctly 404; headless screenshots of home + a deep page render correctly; live `deploy` job green.

## [2026-06-30] Diagrams shipped as generated PNGs + dev fixes + dead-code cleanup (this session)
- **The three structural diagrams are now real, generated PNG images (no longer placeholders/SVG stubs).** Replaced the inline-SVG `CoreLoopDiagram` / `TwoLayerDiagram` / `ConfidentialityTree` (an earlier attempt the user disliked as too "card-like" and "AI-looking") with polished generated PNGs.
  - **New reusable component `src/components/diagrams/DiagramFigure.astro`**: takes `image` (ImageMetadata), `alt`, optional `caption`, optional `maxWidth` (default 720); renders a framed `<figure>` (subtle `--line` border + `--shadow-md`, `--radius-lg`) with the caption below. Runs the PNG through `astro:assets` `<Image>` — each ~1MB source PNG is optimized to ~50 to 60KB WebP at build.
  - **Images live in `src/assets/diagrams/`** (`core_loop.png` maxWidth 640, `two-layer-system.png` maxWidth 860, `confidentiality.png` maxWidth 560). Wired into `context/why-context.mdx`, `projects/two-layer-system.mdx`, `best-practices/confidentiality.mdx` (imports 3 levels up: `../../../assets/diagrams/...` and `../../../components/diagrams/DiagramFigure.astro`). Captions preserved verbatim from the old components.
  - **Deleted:** `DiagramPlaceholder.astro` and all three per-diagram SVG components. Zero dangling refs.
  - **Source PNGs + image-generation prompts committed under `diagrams/`** (source of truth / for regeneration): `diagrams/*.png` and `diagrams/diagrams_prompts/` (README + one prompt per diagram).
- **Diagram prompt philosophy (locked):** the prompts in `diagrams/diagrams_prompts/` were rewritten twice per user direction: (1) stop writing them like SVG/CSS specs (no pixel sizes, no "flat, no shadows, no cards, hairlines only") — these brief an IMAGE MODEL, so allow real depth, tasteful shadow, in-palette gradients, designed panels; (2) give the model the CONCEPT + LOGIC + required text labels, then hand it creative freedom over form (do NOT prescribe layout: no clock-orbit, no stacked registers, no fixed decision-spine). Quality bar = world-class information design (FT/Bloomberg, Pentagram, Stripe Press), on the light KPMG palette, never AI-slop. Brand guardrails kept: light canvas, blue-led palette, Inter, US English, no em/en dashes.
- **Known/accepted:** the `two-layer-system.png` has em dashes baked into its pixels (in the two subtitles). **User explicitly approved it as-is** ("the two layer png is ok as it is"). Do not flag again. All code/captions/alt text remain dash-free.
- **Dev-server 504 fix (permanent):** the recurring `GET .../dev-toolbar/entrypoint.js 504 (Outdated Optimize Dep)` was resolved by disabling the Astro dev toolbar in `astro.config.mjs` (`devToolbar: { enabled: false }`). Clearing `node_modules/.vite` + `.astro` alone did not stop it recurring.
- **Dead code removed:** deleted unused `Hero.astro`, `.mark-kpmg`/`.mark-x` dead CSS in `Header.astro`, and the unused `--kpmg-purple` var. Kept the intentional KPMG logo placeholder comment in `Header.astro`.
- **Commits this session (all pushed to origin/main):** `c827186` US English + dollars conversion, `130281d` dead code + dev toolbar, `4337c4d` diagrams as PNGs + README update. README updated (removed deleted `Hero`, added `DiagramFigure` + diagram source-to-assets note).

## [2026-06-30] US locale conversion
- **Converted the entire wiki from British English + pounds to US English + US dollars.** Project Atlas was relocated from the UK to the US: it is now a US field-service software company, $60m revenue, operating across the US (previously ~£60m, UK).
- **Fixed two low-70s gross-margin drifts to high 70s** so all pages align to the locked canonical (gross margin high 70s percent).
- **Verified: zero £ signs, zero UK/British references, zero em/en dashes, `npm run build` passes (37 pages).**
- **The two approved pages (`welcome.mdx`, `first-15-minutes.mdx`) received token-only changes** (currency, geography, spelling) — NO prose rewrites. Their approved copy is otherwise untouched.

## Current state
- **[2026-06-30] CONTENT-COMPLETE + DIAGRAMS SHIPPED: all 36 content pages authored, ClaudeUI mockup kit built, and the 3 structural diagrams are now real generated PNGs (via `DiagramFigure.astro` + `astro:assets`). `npm run build` passes (37 routes: 36 content + landing, Pagefind indexed, zero errors).**
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
  - Project Atlas continuity: `interface-tour.mdx` aligned to the locked values ($60m revenue, gross margin high 70s), matching `first-15-minutes.mdx`.
  - Thinking & Effort page rewritten to actually cover thinking and the ability to turn it off (off / default / up dial), grounded in Anthropic help docs.
- **Hard-rule audit (Task #10) status:** hard rules verified clean across pages (zero em/en dashes, no "deal team", US English spelling, no code/API refs). The broader visual + editorial elevate pass across all sections remains partially pending.
- **Note:** `welcome.mdx` and `first-15-minutes.mdx` prose remains locked/untouched; only additive mockup/padding changes were made to first-15.

## ★ Next session — START HERE
- **TASK #10 — Critique & elevate pass (PARTIALLY done — hard-rule audit clean, visual + editorial elevate still pending).** Do a senior-editor quality pass across all 36 pages: consistency of voice, strong open/close on each page, cross-linking with REAL slugs only, sensible component usage, Project Atlas continuity (mid-market US field-service software, ~$60m revenue, mid-20s% growth, gross margin high 70s, HVAC/plumbing, per-seat subs, across the US). Hard rules already audited clean (zero em/en dashes, no "deal team", US English spelling, no code/API refs, fictional data only); the visual + editorial elevate pass across all sections is what remains. **DO NOT edit `welcome.mdx` or `first-15-minutes.mdx` content — client approved them as-is** (read only, for consistency reference). Finish with `npm run build` (must show 37 routes) + a grep proving zero em/en dashes. Recommended: dispatch ONE general-purpose agent with this brief, but ONLY after the user explicitly approves running it.
- **Diagrams DONE (this session).** The three structural diagrams are now generated PNGs rendered via `DiagramFigure.astro` (see the top section). Prompts live in `diagrams/diagrams_prompts/` if any need regenerating. To swap an image: drop the new PNG at `diagrams/<name>.png`, copy it to `src/assets/diagrams/<name>.png`, rebuild (no code change). Remaining optional diagram: context-layering, if wanted later.
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
- Hosting: RESOLVED [2026-07-01] — live on GitHub Pages at a project subpath. Base is env-driven, so moving to Cloudflare / a custom domain later is a one-line `SITE_BASE=/` build change.
- Grant Chrome access for mockup/screenshot accuracy (planned for next session).

## Files that matter
- tasks/plan.md — full curriculum + architecture + phases.
- (site files to come in Phase 0/1.)
