# Handover — Claude for Private Equity (NXT Partners AI)   ·   2026-10-05

## Where to take over from
Next:        Confirm the user submitted the sitemap to Search Console (plan item 13), then items 9 and 10.
In progress: Nothing half-applied. Everything is committed and pushed to `main`.
State:       `npm run build` green. Live at https://wiki.nxtpartners.ai (Cloudflare Pages, `SITE_BASE=/`);
             pushing `main` also still deploys the GitHub Pages copy under `/wiki_claude_PE/`.
Waiting on:  Whether to retire the GitHub Pages workflow (item 15); whether to add visible calls to
             action (declined for now: machine-facing only); OK to fix the logo's blinking cursor in
             `nxt-pe` (item 9); the hero diagram regeneration (item 5).

## What to avoid
- The site names no client. KPMG is gone everywhere except the diagrams' blue palette (accepted). "Big 4"
  appears only in the hero line. Rules in `CLAUDE.md` and `tasks/standards.md`.
- The NXT logo is embedded from pe.nxtpartners.ai and the tab icons are copied from `nxt-pe/public/`; never redrawn ("We have the object for the
  logo completed, why you did not take that one?"; then the same for the tab icon). Its styles are inline on purpose (`context.md`).
- The hero stays white ("keep the hero in white"); only header and footer are navy.
- The header's Confidential chip, "Built by" text and the footer confidentiality line were removed by
  the user. Do not bring them back.
- Prompt cards open at 10 lines by user decision; no per-card opt-in.
- `welcome.mdx`, `first-15-minutes.mdx` and `Header.astro` stay locked apart from changes the user asks for.
- `gh` is logged in as `dorian014`; Pages settings and deploy triggers belong to the user.

## What we did
Rebranded the wiki from KPMG to NXT Partners AI (colors, Space Grotesk, logo, copy, matrix made
advisor-neutral), linked out to pe.nxtpartners.ai from the logo, hero line and footer, added a Home
button, made every prompt card collapse to 10 lines, moved the site to wiki.nxtpartners.ai on Cloudflare,
used NXT's own tab icons, added a 404 page, gave internal links trailing slashes, and opened the site
to search and AI agents (llms.txt, robots.txt, sitemap, canonical, JSON-LD) to bring PE firms to NXT. The user relabeled `confidentiality.png`.
Pre-rebrand state is tag `before-kpmg-changes` (pushed); `public/kpmg-logo.png` was deleted, recoverable there.
