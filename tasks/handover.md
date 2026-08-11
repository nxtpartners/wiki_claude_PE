# Handover — KPMG × Claude for PE Wiki

## [2026-08-09] Nav restructure + three single-source refactors
Seven commits (`0014b72`..`9db5be6`), written up 2026-08-10 from git. `git log` has the reasoning per commit; only what outlives it is below. No build was run while writing this, so nothing here is a verification claim.

- **The nav has one walk.** `NavSection` gained `children`, and `walkSections()` in `nav.ts` now backs numbering, prev/next, sidebar and footer, so those four cannot drift. The sidebar renders sections recursively.
- **The footer derives from the registry.** It used to name its sections by hand and match those strings against the nav, so a rename in `nav.ts` silently dropped a footer link with no error and no failing build.
- **`existingDocSlugs()` lives in `src/utils/existingDocs.ts`** — the "which slugs have real content" lookup, previously copy-pasted into four components.
- **The base-path rule lives in `src/utils/basePath.ts` only.** `applyBase()` is idempotent; `withBase.ts` binds it for components, `plugins/rehype-base-urls.ts` for prose. Change the rule there and nowhere else.
- **Prose links are now base-aware at build time.** 173 markdown `[text](/foo)` links were 404ing on the subpath. **JSX in MDX is deliberately untouched** — `Card` and friends call `withBase()` themselves, so rewriting their attributes would double-prefix.
- **Structure:** Core track opens on Anatomy of a Good Prompt; the three orientation pages moved into an optional nested "New to Claude?" zone with PE Playbooks and Best Practices, dropping the numbered spine from 31 to 20. Prompt Patterns merged into Anatomy; `claude-code/what-it-is` deleted (Getting Started opens on the vs-claude.ai comparison); new Resources page From Prompt to Template. Nothing else was deleted.
- **Now 50 content pages** in `src/content/docs/`.


- **Reworked `src/pages/index.astro` into a two-track homepage** (claude.ai = Core/beginner, Claude Code = Advanced/hands-on), iterated live with the user.
- **Hero:** H1 is now "Claude for Private Equity"; subcopy shortened to "One Claude, two ways to work: claude.ai for everyday questions, and Claude Code for advanced, hands-on work in your files." Two track-mapped CTAs ("Start with claude.ai" -> /welcome, "Explore Claude Code" -> /claude-code/welcome). Hero fills the viewport (`min-height: calc(100svh - var(--header-h))` + flex centering; reset to block on mobile).
- **Hero diagram (`home-two-paths.png`):** the top header band of the source art (blue "ONE CLAUDE" eyebrow + big headline + subtitle) was cropped off. The USER did the crop themselves (`diagrams_home/two-paths-cropped.png`, 1637x745); I adopted that file as the site asset. Do not re-crop. Then ENLARGED the diagram by shifting `.hero-grid` from `1.02fr 0.98fr` to `0.85fr 1.15fr` and gap `--space-16` -> `--space-12` (diagram is `width:100%`, scales with its column; no horizontal overflow).
- **Tracks section:** removed the "Two tracks" eyebrow and the long intro paragraph entirely; heading is just "Two ways to work. Pick your track." Each track's label now sits ABOVE its card via a new `.track-col` wrapper (`.track-label` / `.track-label-adv`), keeping the 2-column grid and equal card heights.
- **Confidential band:** reordered to sit right AFTER the hero (before the tracks). Made it track-agnostic (single-column: eyebrow / statement / one-line sub "In claude.ai or Claude Code, your deal data stays private and NDAs are handled the right way.") and REMOVED its links/buttons; deleted all orphaned `.confidential-link*` CSS.
- **Removed the "Begin" closing CTA section** entirely and its orphaned `.closing*` CSS.
- **Nav/site Header (`Header.astro`) was NOT simplified** — reverted to its original KPMG logo lockup via `git checkout -- src/components/Header.astro` after a mix-up (see context.md). The word "header" from the user meant the HERO H1, not the nav wordmark.
- **Commits this session:** `2e63d9c` feat(home): rework hero for both tracks with two-paths diagram; `820c321` refactor(home): clean up the two-tracks section; then a third commit for the confidential-band reorder + Begin removal + diagram enlarge (this handover).
- **Verified:** `npm run build` green at 54 pages after each change; dev server serves `/` with 200s.

## [2026-07-02] Mobile/responsive adaptive refactor (this session)
- **Ran a mobile audit (phones 375 to 430px), applied 5 initial CSS breakpoint fixes, then did a full adaptive refactor (Option A)** after the user pushed back on fixed pixel values: the goal is to let the layout adapt on its own rather than lean on magic numbers.
- **ROOT-CAUSE BUG 1 (empty content column / stray right-side divider on tablet and phone):** the on-this-page TOC wrapper `.doc-toc` was a flex column `flex: 0 0 var(--toc-w)` (232px) that reserved its width at ALL widths, even though the inner `.toc` content hid at `@media (max-width: 1240px)` inside `TableOfContents.astro`. The empty 232px column plus its left border squeezed the main content into a narrow column. **FIX:** converted `src/layouts/DocLayout.astro` `.doc-grid` from flexbox to CSS Grid, with `grid-template-columns` redefined per breakpoint so hidden tracks are removed entirely (no reserved empty column, no stray gap).
- **ROOT-CAUSE BUG 2 (hamburger did not show the menu on mobile):** the inner Sidebar component (`src/components/Sidebar.astro`) sets its own `.sidebar { display: none; }` at `@media (max-width: 1080px)`. DocLayout's open-state rule `.doc-sidebar.open :global(.sidebar)` only reset width/flex-basis, never `display`, so tapping the burger opened the wrapper but its only child (the nav) stayed hidden. **FIX:** added `display: block;` to `.doc-sidebar.open :global(.sidebar)` in `DocLayout.astro` (the fix lives in the layout's open-state override; the Sidebar component keeps hiding itself by default).
- **DocLayout grid breakpoints now:** >1240px = 3 columns (sidebar, main, toc); 1080 to 1240px = 2 columns (sidebar, main), toc hidden; <=1080px = 1 column (main), sidebar becomes an openable drawer. No `align-items` is set on the grid, so the default `stretch` keeps the sticky sidebar and sticky TOC working (this replaces the old flex `align-self: stretch` hack that context.md previously documented).
- **Claude UI mockups moved from viewport media queries to CSS CONTAINER QUERIES:** `ClaudeWindow.astro` (`container-name: cw`, collapses the two-pane app layout to one column at `@container cw (max-width: 560px)`) and `ClaudeComposer.astro` (`container-name: cc`, shrinks controls and the attach menu at `@container cc (max-width: 420px)`). Reason: these mockups are embedded in a variable-width article column, so a viewport media query is the wrong tool (they could render cramped even on desktop when the column is narrow). Distinct container names (cw, cc) prevent a nested composer from querying the window ancestor.
- **Other small responsive fixes:** landing hero `.answer-row` stacks to one column at `@media (max-width: 480px)` in `src/pages/index.astro`; `.container` inline padding reduces from 32px (`--space-8`) to 16px (`--space-4`) at `@media (max-width: 420px)` in `src/styles/global.css`.
- **Verified:** `npm run build` stayed green (37 routes, Pagefind indexed 37) after each stage; grep confirms zero em/en dashes in `src/`.

## [2026-07-02] Task 10 (critique & elevate pass) marked complete
- **Task 10 (critique & elevate pass) is now fully done and closed out.** The senior-editor visual + editorial elevate pass across all 36 pages is complete.
- **No code changes or build were run this session** (the user chose to just mark it done).
- **Only remaining open items:** the KPMG logo drop-in, and the optional context-layering diagram.

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
- **Outstanding open items:** the optional context-layering diagram. That is the only one left from this list.
- **KPMG logo: DONE [2026-07-09] in `6b7a84e`.** `public/kpmg-logo.png` replaced the placeholder in `Header.astro`. Older sections below still call it outstanding; they are stale.
- **TASK #10 — Critique & elevate pass: DONE [2026-07-02].** The senior-editor visual + editorial elevate pass across all 36 pages is complete (hard-rule audit was already clean: zero em/en dashes, no "deal team", US English, no code/API refs; Project Atlas continuity preserved). welcome.mdx and first-15-minutes.mdx content remained locked/untouched.
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
- **[2026-07-02] Prefer ADAPTIVE CSS over brittle fixed-pixel magic numbers.** Use CSS Grid with per-breakpoint templates, container queries, and `min()`/`clamp()` so the layout adapts on its own wherever it can. Genuine breakpoints are fine only for real UX decisions (for example, when the sidebar becomes a drawer), not to patch symptoms with fixed values.

## Gotchas & pitfalls
- **YAML frontmatter colons:** any `description:` containing a colon MUST be double-quoted, or the Astro build fails with "bad indentation of a mapping entry". Agents repeatedly produced unquoted descriptions with colons. Always grep `^description: [^"'].*: ` after authoring and quote offenders.
- **MDX import depth:** pages in `src/content/docs/<section>/` import components THREE levels up (`../../../components/`); root-level docs (`welcome.mdx`, `first-15-minutes.mdx`) use TWO levels (`../../components/`). Easy to get wrong.
- **Sidebar:** numbering comes from `flatNav` order in `nav.ts`. Adding/reordering nav items renumbers everything automatically (and shifts every page's "X of N"). That is intended.
- **Reserved empty TOC column:** `.doc-toc` used to be a flex column `flex: 0 0 var(--toc-w)` (232px) that reserved its width at ALL widths even though the inner `.toc` content hid at `@media (max-width: 1240px)`. That empty column plus its left border squeezed the main content and left a stray divider strip. Do NOT reintroduce a fixed-width flex side column that is only content-hidden; use the CSS Grid `.doc-grid` with `grid-template-columns` per breakpoint so hidden tracks are removed entirely.
- **Inner Sidebar hides itself:** `src/components/Sidebar.astro` sets `.sidebar { display: none; }` at `@media (max-width: 1080px)`. The mobile drawer only works because DocLayout's `.doc-sidebar.open :global(.sidebar)` override sets `display: block;`. If that override only touches width/flex-basis, tapping the burger opens an empty wrapper. Keep the un-hide fix in the layout open-state override, not in the Sidebar component.

## Open questions
- Hosting: RESOLVED [2026-07-01] — live on GitHub Pages at a project subpath. Base is env-driven, so moving to Cloudflare / a custom domain later is a one-line `SITE_BASE=/` build change.
- Grant Chrome access for mockup/screenshot accuracy (planned for next session).

## Files that matter
- tasks/plan.md — full curriculum + architecture + phases.
- (site files to come in Phase 0/1.)

## 2026-08-10 — Code-quality refactor

**Committed in three commits: `9c6d1e4` refactor, `5c0dc1b` fix, `5245f78` docs.** Net 265 insertions,
2,226 deletions. Build was green at 53 pages at that point. See the section below for the current count.

Done:
- New `src/layouts/DeliverableLayout.astro` + `src/components/examples/PreviewFrame.astro` deduplicate the two
  deliverable pages and the two previews.
- `ValueCreationMatrix.astro` and `PortcoPulseShowcase.astro` split into `vcm-data.ts` / `pp-data.ts` plus
  per-view components. Both were over 1,100 lines, together 30 percent of the codebase.
- `index.astro` derives its curriculum from `nav.ts`. Two homepage links are pinned by `coreEntryTitles`,
  which throws at build time if a nav title stops matching — the first refactor pass silently relinked
  "Prompting" to Welcome, so the guard exists for a reason.
- `--space-5` / `--space-10` added; KPMG blue removed from `ClaudeSidebar.astro`; `content.config.ts`
  `section` is a `z.enum`.
- New `CLAUDE.md` and `tasks/standards.md` for this project.

Not done, written up in `tasks/plan.md`: 54 hardcoded hex colors, the non-deterministic `PromptCard` uid, and
the Astro 6 markdown-plugin deprecation that the base-path link rewriter sits on.

Process note: roughly half this session went into a build-comparison harness that was wrong on its first
version and caused a refactor pass to accomplish almost nothing. The harness is deleted. Do not rebuild it —
diff the built HTML directly if a check is needed.

## 2026-08-10 (later): Two new Claude Code pages

**Pushed as `44b2500`. Build green at 55 pages, tree clean.**

- `claude-code/organizing-deals.mdx`: group folders by kind of job first, client second. Method CLAUDE.md
  plus a reusable `template.md` in `projects/due-diligence/`, client facts one level down.
- `claude-code/requirements-brief.mdx`: the other road, for when the output is a tool not a document.
  Carries its own full template producing a `brief.md`. Hands off to `deploy.mdx`.
- Both registered in `nav.ts` between `claude-md` and `good-habits`.
- `install-vs-code.mdx` gained a 3-row prerequisites table. Three of the user's six rows were dropped; the
  Anthropic account row contradicted the KPMG single sign-on instruction at `sign-in.mdx:78`.

Gate: all three PASS. One warn left in place, the Node.js row at `install-vs-code.mdx:28` repeats the
`npm not found` diagnostic at `sign-in.mdx:66`.

Two things to carry forward. **`order:` frontmatter is decorative**, only `nav.ts` decides order. And a
python heredoc destroyed `tasks/standards.md` this session because `s.index('## Exceptions')` matched that
string in the file's own prose, not the heading; it was untracked and had to be recovered from the session
transcript. Anchor heading matches with `re.search(r'^## X\s*$', s, re.M)`.
