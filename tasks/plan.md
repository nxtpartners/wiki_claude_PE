# KPMG × Claude for Private Equity — Project Plan

## Goal
A polished, professional teaching wiki that takes KPMG Private Equity professionals from Claude.ai basics to confident mid-level use. Covers how to create context, how to structure Projects, practical PE playbooks, and the connectors/power features relevant to PE work. Built by NXT Partners AI for KPMG.

## Audience
- PE professionals at KPMG — sophisticated, busy, not necessarily AI-fluent.
- Assume **Claude Enterprise/Team** accounts (data not used for training; admin controls).
- Work primarily with **xls, pdf, docs**; connectors taught as an optional accelerator.

## Brand & Design Direction
- **Palette:** KPMG deep blue (#00338D) primary; cobalt / light-blue accents; lots of whitespace; clean institutional feel. No NXT Partners colors or fonts.
- **Typography:** Inter (sans-only) throughout, with JetBrains Mono for small mono accents (eyebrows, labels). Clean KPMG-aligned look, no serif. (Decided.)
- **Motion (GSAP):** restrained and premium — hero animation, scroll reveals, smooth transitions, copy-button micro-interactions, reading-progress indicator.
- **Logo:** none yet — clean header lockup placeholder to drop KPMG logo into later.

## Tech Stack
- **Astro** (content-first, static, minimal JS) with a fully custom design (no docs-template look — explicitly NOT Docusaurus).
- **GSAP** for motion; React islands only where genuinely interactive (e.g. prompt library copy, decision tree).
- **Pagefind** for static search.
- **Markdown/MDX** for content (easy for non-devs to edit).
- **Deploy:** GitHub Pages, portable to KPMG internal. Repo: nxtpartners/wiki_claude_PE.

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
- **Phase 1 — Design system + layout shell:** theme tokens (KPMG palette, fonts), global styles; base layout (header, sidebar nav, on-this-page TOC, footer, prev/next); core components (callout/admonition, prompt card with copy, comparison table, step cards, decision tree, hero); GSAP motion baseline.
- **Phase 2 — Content:** author modules in value order — Start Here + Foundations → Context → Projects → Playbooks → Worked Example → Power Features → Best Practices → Resources.
- **Phase 3 — Polish + deploy:** search (Pagefind), responsive, accessibility, final motion pass, GitHub Pages build config.

## Visual System (mockups, screenshots, diagrams)
Visuals are a core teaching tool for a non-AI-fluent audience. Three formats, in priority order:

**1. Recreated Claude.ai UI mockups (primary).** Reusable Astro components that look like the real product, styled to the warm Claude palette (see below), NOT raster screenshots. Chosen because they are confidential-safe (no real data in an image), on-brand, consistent, annotatable, crisp, and accessible (real text + alt). They also never go stale when Claude tweaks its UI.
  - **ClaudeUI component kit to build:** composer (with attach/paperclip), message exchange (user + Claude bubbles), file chip, left sidebar, Projects panel, project knowledge + custom-instructions panel.
  - **Annotation layer:** numbered hotspots / highlight ring / arrow callouts so steps can point at exact UI.
  - **Claude palette (match real product):** bg cream `#FAF9F5`, panel `#F0EEE6`, borders `#EAE7DC` / `#E0DCCD`, text `#3D3B36` / heading `#2A2722`, clay accent `#BE5D3A`. (KPMG blue is for the wiki chrome only, never inside a Claude mockup.)
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
- Hosting target: default GitHub Pages; confirm if KPMG internal is required.
- Whether to grant Chrome access for screenshot/mockup accuracy (recommended).
