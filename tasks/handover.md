# Handover — KPMG × Claude for PE Wiki   ·   2026-09-24

## Where to take over from
Next:        Ask the user for the next piece of client feedback; open work is items 1 to 6 in `tasks/plan.md`.
In progress: Nothing half-applied. Everything is committed and pushed to `main`.
State:       `npm run build` green at 54 pages. Pushing `main` triggers the Pages deploy workflow.
Waiting on:  The user to regenerate the homepage hero diagram (plan item 5).

## What to avoid
- `welcome.mdx`, `first-15-minutes.mdx` and `Header.astro` stay locked. The user approved one exception on
  2026-09-24: trimming confidentiality text only.
- Confidentiality has one home per track: "Your Account & Confidential Data" (claude.ai, which now holds the
  upload checks) and "Keeping Deal Data Safe" (Claude Code). Other pages get at most one short mention, only
  where data moves. Do not re-add reminders or recreate the deleted Decision Tree page.
- Tracks are called "claude.ai" and "Claude Code", never "Core" or "Advanced". Internal ids stay `core`/`advanced`.
- VS Code is Required (user decision; see `CLAUDE.md`). Do not revert it to "recommended".
- PortCo Pulse animations loop with no Replay or pause control, by user decision (see `tasks/context.md`).
- Every reusable template carries a `# Version` / `# Tested on` header with placeholders, never an invented
  model or date. `tasks/standards.md` enforces it; this was missed twice in one session.
- The user wants short, PE-focused pages ("short and sweet! focus on PE") and quick visible iteration.
- `gh` is logged in as `dorian014`; Pages settings and deploy triggers belong to the user.

## What we did
Worked through client feedback: the landing page is now just the hero; confidentiality mentions cut from 27
callouts to 9; the Prompt Library merged to one optimized prompt per section with previews; the Claude Code
install and sign-in pages merged into Before you Start; the AI Value Creation Matrix got its own section;
PortCo Pulse gained an animated chat Submit view and view animations; a new Skills page. Nothing was deleted
outside git: the Decision Tree and sign-in pages are recoverable from history.
