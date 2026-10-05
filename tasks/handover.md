# Handover — Claude for Private Equity (NXT Partners AI)   ·   2026-10-05

## Where to take over from
Next:        Ask the user for the next piece of feedback; open work is in `tasks/plan.md` (items 9 and 10 first).
In progress: Nothing half-applied. Everything is committed and pushed to `main`.
State:       `npm run build` green at 52 pages. Pushing `main` deploys to Pages.
Waiting on:  User OK to fix the logo's blinking cursor at its source in `nxt-pe` (plan item 9); the
             homepage hero diagram regeneration (plan item 5).

## What to avoid
- The site names no client. KPMG is gone everywhere except the diagrams' blue palette (accepted). "Big 4"
  appears only in the hero line. Rules in `CLAUDE.md` and `tasks/standards.md`.
- The NXT logo is embedded from pe.nxtpartners.ai, never redrawn ("We have the object for the logo
  completed, why you did not take that one?"). Its styles are inline on purpose (`context.md`).
- The hero stays white ("keep the hero in white"); only header and footer are navy.
- The header's Confidential chip, "Built by" text and the footer confidentiality line were removed by
  the user. Do not bring them back.
- Prompt cards open at 10 lines by user decision; no per-card opt-in.
- `welcome.mdx`, `first-15-minutes.mdx` and `Header.astro` stay locked apart from changes the user asks for.
- `gh` is logged in as `dorian014`; Pages settings and deploy triggers belong to the user.

## What we did
Rebranded the wiki from KPMG to NXT Partners AI (colors, Space Grotesk, logo, copy, matrix made
advisor-neutral), linked out to pe.nxtpartners.ai from the logo, hero line and footer, added a Home
button, and made every prompt card collapse to 10 lines. The user relabeled `confidentiality.png`.
Pre-rebrand state is tag `before-kpmg-changes` (pushed); `public/kpmg-logo.png` was deleted, recoverable there.
