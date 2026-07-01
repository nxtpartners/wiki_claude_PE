<div align="center">

# Claude for Private Equity

**An enablement program that takes investment professionals from first prompt to confident daily use.**

Designed and built by [**NXT Partners AI**](https://pe.nxtpartners.ai) for **KPMG**.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%206-0B1B33?style=flat-square)](https://astro.build)
[![Search by Pagefind](https://img.shields.io/badge/Search-Pagefind-00338D?style=flat-square)](https://pagefind.app)
[![Motion by GSAP](https://img.shields.io/badge/Motion-GSAP-1E49E2?style=flat-square)](https://gsap.com)
![Status](https://img.shields.io/badge/Status-In%20development-1E49E2?style=flat-square)
![Confidential](https://img.shields.io/badge/Confidential-Internal%20KPMG%20use-9A3030?style=flat-square)

</div>

---

> **Confidential.** For internal KPMG use only. Not for distribution.

## Overview

Claude for Private Equity is a self-paced learning experience for KPMG investment professionals using the **Claude.ai web app** on **Enterprise and Team** accounts. It assumes no prior AI experience and moves deliberately from the fundamentals to copy-paste playbooks for real deal work: screening a CIM, reviewing a data room, drafting an investment memo, and pressure-testing a model.

The program is delivered as a fast, static, fully custom site. The priority throughout is clarity, trust, and rigor appropriate to investment work, with confidentiality treated as a first principle rather than an afterthought.

## Highlights

- **Purpose-built design system.** KPMG palette, Inter typography, generous whitespace, and a calm institutional tone. No template look.
- **Learn by recognition.** Claude.ai interface mockups are recreated faithfully so the guidance always matches what the reader sees on screen.
- **Built for the work.** Practical playbooks mapped to the PE deal lifecycle, each with setup, example prompts, and guardrails.
- **Confidential by design.** Clear data rules, an internal classification marking, and a confidentiality decision tree.
- **Fast and searchable.** Static delivery, full-text search, and restrained motion that respects reduced-motion preferences.

## Technology

| Layer | Choice |
|-------|--------|
| Framework | Astro 6, content-first and static with minimal client JavaScript |
| Content | Markdown and MDX via the Astro content layer (glob loader) |
| Search | Pagefind (`astro-pagefind`), indexed at build time |
| Motion | GSAP 3 with ScrollTrigger |
| Typography | Inter Variable and JetBrains Mono, self-hosted via Fontsource |
| Hosting | GitHub Pages, portable to KPMG internal infrastructure |

Astro 6 and `@astrojs/mdx` 6 are pinned deliberately. `astro-pagefind` 2 supports Astro 6 or lower, so moving to Astro 7 breaks installation.

## Getting started

Prerequisites: Node 18.20.8 or newer (Node 20 or higher recommended) and npm.

```bash
npm install
npm run dev      # local development at http://localhost:4321
```

Search is unavailable in development. The Pagefind index is generated only during a production build, so the search panel shows a brief fallback message until the site is built.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the static site to `dist/` and generate the search index |
| `npm run preview` | Serve the built site locally, the correct way to test search |

## Project structure

```
src/
  assets/diagrams/   Diagram images, optimized by astro:assets at build
  components/        UI components (Callout, PromptCard, Steps,
                     Header, Footer, Sidebar, TableOfContents, PrevNext,
                     Card, CardGrid, ComparisonTable, DiagramFigure)
  config/nav.ts      Single source of truth for navigation and page order
  content/docs/      MDX content pages (the wiki itself)
  content.config.ts  Content collection schema (frontmatter rules)
  layouts/           BaseLayout and DocLayout (header, sidebar, TOC, footer)
  pages/             index.astro (landing) and [...slug].astro (doc router)
  scripts/motion.ts  GSAP motion system
  styles/global.css  Design tokens and global styles
public/              Static assets
tasks/               plan.md, handover.md, context.md (project knowledge)
```

## Authoring content

Adding a page is two steps.

1. **Register it in `src/config/nav.ts`** under the correct section, with a `slug` (no leading slash) that matches the file path under `src/content/docs/`. Any nav entry without a matching file renders as a muted "soon" label, so the build never links to a missing page.

2. **Create the matching `.mdx` file** in `src/content/docs/`. For example, the nav slug `foundations/interface-tour` maps to `src/content/docs/foundations/interface-tour.mdx`.

Frontmatter schema, defined in `content.config.ts`:

```yaml
---
title: Interface Tour              # required
description: A quick orientation.  # optional, used for meta and listings
section: Foundations               # required, the nav section label
order: 2                           # optional, sort order within the section
draft: false                       # optional, true hides the page from build
---
```

Use `.mdx` (not `.md`) for any page that uses components, and import them with relative paths:

```mdx
import Callout from '../../components/Callout.astro';
import PromptCard from '../../components/PromptCard.astro';
import Steps from '../../components/Steps.astro';
import Step from '../../components/Step.astro';
```

Components available to content: `Callout` (tip, note, warning, confidential), `PromptCard` (copy-to-clipboard prompt block), `Steps` with `Step`, `ComparisonTable`, `Card` with `CardGrid`, and `DiagramFigure` (an optimized diagram image with caption). Structural diagrams are generated from the image prompts in `diagrams/diagrams_prompts/`, exported to `diagrams/`, and imported from `src/assets/diagrams/`.

## Editorial and design standards

These standards keep the program consistent and on brand.

- **No em dashes or en dashes** anywhere, including content, interface text, and code comments. Use commas, colons, parentheses, or shorter sentences.
- **The audience is KPMG Private Equity**, broadly. Do not narrow it to "deal teams".
- **Education first, never marketing.** Copy stays clear, precise, and free of hype.
- **Claude.ai mockups reflect the real product** (warm background, clay accent), never KPMG blue. KPMG blue is reserved for the wiki chrome.
- **Brand values live in `src/styles/global.css`.** Color and font values are not scattered through components.

## Deployment

The site is fully static, so `npm run build` produces a deployable `dist/`. The default target is GitHub Pages. A continuous deployment workflow and base-path configuration are added once the hosting destination is confirmed (GitHub Pages or KPMG internal infrastructure).

---

<div align="center">

Designed and built by [**NXT Partners AI**](https://pe.nxtpartners.ai)

<sub>Confidential material prepared for KPMG. Not for external distribution.</sub>

</div>
