# Handover — KPMG × Claude for PE Wiki   ·   2026-10-02

## Where to take over from
Next:        Ask the user for the next piece of client feedback; open work is items 1 to 8 in `tasks/plan.md`.
In progress: Nothing half-applied. Everything is committed and pushed to `main`.
State:       `npm run build` green at 52 pages. Pushing `main` triggers the Pages deploy workflow.
Waiting on:  - The user: should the Claude Code welcome list's "Saving and Shipping" bullet (no such section
               exists; Git and Going Live sit in Executing at Scale) fold into the Executing at Scale bullet?
             - The user to regenerate the homepage hero diagram (plan item 5).

## What to avoid
- `welcome.mdx`, `first-15-minutes.mdx` and `Header.astro` stay locked (see `CLAUDE.md`).
- The AI Value Creation Matrix is the PE use case library. It lives only on the full page
  (`/claude-code/value-creation-matrix`, `VcmGrid`); PE Use Cases links to it through `MatrixPreview`. Do not
  embed the grid on PE Use Cases again, do not bring back the old table, and keep the Strategic Summary off
  the PE Use Cases page (user decisions).
- No per-use-case content was added to the matrix by user choice; do not invent "what you build" lines.
- PortCo Pulse is the library's one "Built" use case (the row with PortCo Pulse fit High).
- "The section" means the nav section and its page, not the matrix tool. Never remove a component, link or
  preview the user did not name. Never repeat on a page what the page already shows (now a checklist rule).
- Claude Code track sections are now: Claude Code Welcome, Getting Started (4 pages), Executing at Scale,
  PE Use Cases, Worked Example, Resources. PE Recipes was deleted (recoverable from git).
- After renaming a section, restart `npm run dev`: a stale content store shows the pages as "soon".
- `gh` is logged in as `dorian014`; Pages settings and deploy triggers belong to the user.

## What we did
Worked through client feedback on the Claude Code track: the matrix section became "PE Use Cases" and the
matrix itself an interactive lever x phase use case library with detail sheets; PE Recipes was removed; First
Sessions folded into Getting Started; Good Habits renamed Executing at Scale; Skills renamed Leveraging Skills.
Deleted, recoverable from git only: `recipes-data.mdx`, `recipes-docs.mdx`, `ValueCreationMatrix.astro`.
