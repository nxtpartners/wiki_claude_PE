# Claude for Private Equity (NXT Partners AI) — Project Plan

## Goal
A polished, professional teaching wiki that takes private equity professionals from Claude.ai basics to confident mid-level use. Covers how to create context, how to structure Projects, practical PE playbooks, and the connectors/power features relevant to PE work. Built by NXT Partners AI, in collaboration with a Big 4 firm (rebranded from KPMG on 2026-10-05).

## Audience
- Private equity professionals — sophisticated, busy, not necessarily AI-fluent.
- Assume **Claude Enterprise/Team** accounts (data not used for training; admin controls).
- Work primarily with **xls, pdf, docs**; connectors taught as an optional accelerator.

## Brand & Design Direction
- **Palette (2026-10-05):** NXT Partners AI. Navy chrome (#0e0a20) for header and footer; white hero; light reading pages; purple accent (#7B61FF, text uses #6248E5 for contrast); cyan secondary. Source: `nxt-pe/src/theme/tokens.ts`. No gradients, no glow.
- **Typography (2026-10-05):** Space Grotesk headings, Inter body, JetBrains Mono for small mono accents (eyebrows, labels). No serif.
- **Motion (GSAP):** restrained and premium — hero animation, scroll reveals, smooth transitions, copy-button micro-interactions, reading-progress indicator.
- **Logo:** NXT's own logo, embedded from pe.nxtpartners.ai (`NxtLogo.astro`). Header logo links out to pe.nxtpartners.ai; a Home button and the wordmark go home.

## Tech Stack
- **Astro** (content-first, static, minimal JS) with a fully custom design (no docs-template look — explicitly NOT Docusaurus).
- **GSAP** for motion; React islands only where genuinely interactive (e.g. prompt library copy, decision tree).
- **Pagefind** for static search.
- **Markdown/MDX** for content (easy for non-devs to edit).
- **Deploy:** GitHub Pages, portable to a client host. Repo: nxtpartners/wiki_claude_PE.

## Curriculum / Site Architecture
1. **Start Here**
   - Welcome — who this is for, how to use the wiki
   - First 15 Minutes (quickstart to a real PE win)
2. **Foundations**
   - What Claude Is (and Isn't)
   - Interface Tour
   - Your Account & Confidential Data (Enterprise/Team; what you can/can't upload)
   - Anatomy of a Good Prompt
3. **Context — the Core Skill**
   - Why Context Is Everything
   - Giving Claude Context (files: xls/pdf/docs · pasting · connectors with pros/cons)
   - Writing Effective Instructions
   - Custom Styles & Tone
   - Common Mistakes
4. **Projects**
   - What Projects Are (knowledge base + custom instructions)
   - The Two-Layer System: **reusable function projects** vs **one-time deal projects**
   - Setting Up a Reusable Project (screening, market research)
   - Setting Up a Deal Project (one project per live deal; siloed data room)
   - Instruction Templates (paste-ready, downloadable)
5. **PE Playbooks** (scenario · setup · example prompts · tips)
   - CIM & Teaser Analysis
   - Due Diligence Document Review
   - Investment Memo / IC Paper Drafting
   - Market & Competitor Research
   - Financial Statement & Model Review (analysis tool)
   - Portfolio Company Monitoring
6. **Worked Example: Project Atlas** (one anonymized target threaded end-to-end: context → project → playbooks)
7. **Power Features ("plugins")**
   - Connectors (Google Drive, etc. — assume full set; "ask IT if you don't see it")
   - The Analysis Tool (data / Excel)
   - Artifacts (deliverables)
   - Web Search
8. **Best Practices & Governance**
   - Verify Everything (avoiding hallucination — investment-grade rigor)
   - Confidentiality Decision Tree ("Can I put this in Claude?")
   - Prompt Patterns
   - What Not to Do
   - One-Page Cheat Sheet
9. **Resources**
   - Prompt Library (copy-paste, per task)
   - Glossary (AI terms in plain English / PE analogies)

### Six adoption-drivers (folded into the structure above, all approved)
1. First 15 Minutes quickstart · 2. End-to-end worked example (Project Atlas) · 3. Copy-paste prompt library · 4. Confidentiality decision tree · 5. Downloadable instruction templates · 6. Plain-English glossary.

## Build Phases
- **Phase 0 — Scaffold:** repo skeleton + task files (this step); then Astro project, dependencies (GSAP, Pagefind, MDX).
- **Phase 1 — Design system + layout shell:** theme tokens (palette, fonts), global styles; base layout (header, sidebar nav, on-this-page TOC, footer, prev/next); core components (callout/admonition, prompt card with copy, comparison table, step cards, decision tree, hero); GSAP motion baseline.
- **Phase 2 — Content:** author modules in value order — Start Here + Foundations → Context → Projects → Playbooks → Worked Example → Power Features → Best Practices → Resources.
- **Phase 3 — Polish + deploy:** search (Pagefind), responsive, accessibility, final motion pass, GitHub Pages build config.

## Visual System (mockups, screenshots, diagrams)
Visuals are a core teaching tool for a non-AI-fluent audience. Three formats, in priority order:

**1. Recreated Claude.ai UI mockups (primary).** Reusable Astro components that look like the real product, styled to the warm Claude palette (see below), NOT raster screenshots. Chosen because they are confidential-safe (no real data in an image), on-brand, consistent, annotatable, crisp, and accessible (real text + alt). They also never go stale when Claude tweaks its UI.
  - **ClaudeUI component kit to build:** composer (with attach/paperclip), message exchange (user + Claude bubbles), file chip, left sidebar, Projects panel, project knowledge + custom-instructions panel.
  - **Annotation layer:** numbered hotspots / highlight ring / arrow callouts so steps can point at exact UI.
  - **Claude palette (match real product):** bg cream `#FAF9F5`, panel `#F0EEE6`, borders `#EAE7DC` / `#E0DCCD`, text `#3D3B36` / heading `#2A2722`, clay accent `#BE5D3A`. (The wiki brand colors are for the chrome only, never inside a Claude mockup.)
  - **Usage:** each First 15 Minutes step gets one; reused across Interface Tour, Projects setup, and playbooks.

**2. Real screenshots (secondary, curated).** Only where exact recognizability matters (finding the attach icon, the Projects button). Rules: dummy/throwaway document only, never real deal data; add a "your screen may differ slightly" note; provide alt text. Requires Chrome access (see workflow).

**3. Diagrams.** Split by type:
  - **Hand-built by Claude (SVG/CSS):** core loop (context → ask → refine → verify), two-layer project system (reusable function vs one-time deal), Confidentiality Decision Tree flowchart, context-layering. Stay editable, on-brand, accessible.
  - **Generated by user (ChatGPT / Gemini / nano-banana-pro):** illustrative/conceptual images that add warmth, or diagrams we would rather not hand-code. Claude supplies a spec for each: exact prompt, palette hex, aspect ratio, target filename, and placement.

### Asset production workflow
- **Chrome access:** when granted, Claude studies the current claude.ai UI to make mockups accurate. Throwaway dummy doc only; no confidential content captured.
- **Image request format (Claude → user):** for every generated asset, Claude provides `filename`, `aspect ratio`, `palette hex`, `prompt`, and where it slots into the page. User drops the result into `src/assets/` (or `public/`) and Claude wires it in with alt text.
- **No em/en dashes** in any caption, alt text, or diagram label.

## Skill Pipeline
UI UX Pro Max (style direction) → taste-skill / frontend-design (build quality, anti-slop) → GSAP motion. Claude hand-builds UI mockups + structural diagrams as Astro/SVG components; nano-banana-pro (or user's ChatGPT/Gemini) for illustrative imagery and any non-hand-coded diagrams.

## Open Decisions
- Whether to grant Chrome access for screenshot/mockup accuracy (recommended).


## Open code-quality work (opened 2026-08-10)

Moved out of `tasks/standards.md` `## Exceptions`, which is for accepted deviations, not a backlog. Each item
below is a real violation of `rules.md` that is scheduled rather than accepted.

1. **54 hardcoded hex colors** across `src/components/` and `src/pages/`. Some literally duplicate existing
   tokens (`index.astro:396` `#f0eee6` is `--c-panel`; `:434` `#be5d3a` is `--c-clay`). `#001f57` appears in
   three places with no token at all. Breaks Seam 1's "restyle from one directory" test. Fix: add the missing
   tokens to `global.css`, then replace call sites.
2. **`src/components/PromptCard.astro:19` makes the build non-deterministic** —
   `const uid = 'pc-' + Math.random().toString(36).slice(2, 9)` emits different HTML on every build across 29
   pages. Fix: derive the id from a stable input (the prompt title, or an incrementing per-page counter).
3. **Astro 6 deprecates `markdown.remarkPlugins` / `rehypePlugins` / `remarkRehype`** in `astro.config.mjs`.
   That is the exact config path the base-path prose-link rewriter in `src/plugins/` depends on, so this
   becomes a build break, not a warning, on the next major. Fix before any Astro upgrade.
5. **Regenerate the homepage hero diagram.** `home-two-paths.png` still has "Core Track" and "Advanced Track"
   in its pixels. The prompt in `diagrams_home/diagrams_prompts/01-two-paths.md` is already updated; the user
   generates the image, then copy it to `src/assets/diagrams/home-two-paths.png`.
7. **The four `Pp*View.astro` components repeat about 330 lines of CSS and one markup block** (see the
   `standards.md` exception). Fix: move the shared header, panel and view-state rules into one stylesheet
   imported by all four, the way `vcm-shared.css` serves the matrix components.
8. **The section enum in `src/content.config.ts` is a hand-kept copy of the nav labels in `src/config/nav.ts`.**
   Every section rename needs both edits, and a half-done rename makes the dev server drop that section's
   pages (2026-10-02, see `context.md`). Fix: build the `z.enum` from the labels exported by `nav.ts`.
9. **The NXT logo's cursor blinks forever**, ignoring reduced motion (rules.md: honour reduced-motion). The
   wiki cannot reach inside the iframe. Fix at the source, with the user's OK: add
   `@media (prefers-reduced-motion: reduce) { .chevron-mark::after { animation: none; } }` to
   `nxt-pe/public/logo/logo-dark.html` (and `logo-light.html`), then deploy nxt-pe.
10. **Verify the header at phone width** with DevTools device emulation: logo, wordmark, Home and Search
   in one row at 390px. Never checked (see `context.md` 2026-10-05).
11. **Optional: trim the gap after the header logo.** NXT's logo frame (308 wide) is wider than its
   artwork, leaving extra space before "· Claude". Crop the wrapper width in `NxtLogo.astro`, not the asset.
12. **`VcmControls.astro` hand-copies the service labels** that `serviceLabels` in `vcm-data.ts` already
   holds. Derive the filter buttons from `vcm-data.ts`.
13. **Submit the sitemap to Google Search Console** (user): `https://wiki.nxtpartners.ai/sitemap-index.xml`,
   and the same in Bing Webmaster Tools. Indexing then takes days instead of weeks.
14. **Baseline AI-search visibility**: run `/geo audit https://wiki.nxtpartners.ai` once the site is indexed,
   and keep the report under `seo/baseline/` (copy `others/seo-template.md` to `seo/plan.md` first).
15. **Decide the GitHub Pages copy's future.** It still deploys on every push and its canonical tags point at
   wiki.nxtpartners.ai. Retire `.github/workflows/deploy.yml` if the user agrees.
16. **Share image.** Pages share as a text-only card (`twitter:card` summary). A 1200x630 `og:image` would
   make links pasted in LinkedIn, Slack or email stand out. Needs an image from the user or a design pass.
