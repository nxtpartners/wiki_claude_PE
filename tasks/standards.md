# Standards — wiki_claude_PE

Written 2026-08-10 from an `architect` survey of the actual code, not from an ideal. Where the code breaks a
rule below, the real state is recorded under `## Exceptions` rather than hidden. The `review` role returns
PASS/FAIL against `## Checklist` only.

## Seams

**1 · Constants.** Split across three files, each owning a different kind:

| File | Owns |
|---|---|
| `src/styles/global.css` | Every presentation token — color, spacing, type, radius, motion. Two palettes in one file: the NXT wiki brand (`--brand-*`, `--chrome-*`, `--on-dark*`, `--font-display`) in the first `:root`, the Claude.ai mockup palette (`--c-*`, `--vs-*`) in the second. |
| `src/config/nav.ts` | Every route, slug, section label, track name, and their order. |
| `src/content.config.ts` | The frontmatter schema every content page is validated against. |

There is **no single constants file and that is correct** — a CSS custom property cannot live in a `.ts`
module and still cascade. The test that matters holds: you can restyle the product by editing `global.css`
alone.

**Spacing steps that exist are 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24.** There is no `--space-7`, `-9`, or `-11`. An undefined custom property is dropped silently by the browser and collapses to zero, so this fails as
invisible layout damage rather than as an error. See Exceptions.

**2 · Enums.** Closed sets are TypeScript string-literal unions on the component's `Props`, not free strings:
`Track` (`nav.ts`), `Callout` variant (`Callout.astro:2`), `PromptCard` collapse (`:15`),
`ClaudeSidebar` active (`:12`), `FileChip` kind (`:12`), `ClaudeMessage` role (`:9`), `CardGrid` columns
(`:3`). A new closed set follows that pattern.

**3 · Shared primitives.** `src/utils/` holds `basePath.ts`, `withBase.ts`, `existingDocs.ts`.
`src/config/nav.ts` is itself a shared primitive, exporting `walkSections()`, `navForTrack()` and friends.

- `applyBase()` in `basePath.ts` is the **only** place the base-path rule is expressed, and it is idempotent —
  applying it twice is safe.
  It also gives page links their trailing slash (`/welcome` → `/welcome/`) because both hosts redirect the bare
  form; files with an extension are left alone. The rehype plugin runs even at the root base for this reason.
- `existingDocSlugs()` answers "does this nav slug have real content". Every component that needs that answer
  imports it. It exists because that two-line `getCollection` + `Set` lookup had once been copy-pasted into
  four components.
- **Nav-derived chrome reads the registry and never re-states it.** Footer derives via `walkSections()` +
  `navForTrack()`. A parallel array of section labels is the specific bug this rule exists to prevent: a
  rename in `nav.ts` silently dropped a footer link with no build failure.

**4 · Single I/O gateway.** **Not applicable.** This is a static site with no network, database, or runtime
filesystem access. The only data read is the content collection, via `getCollection('docs')`, which appears in
exactly two places: `src/pages/[...slug].astro:6` and `src/utils/existingDocs.ts:16`. Everything else goes
through `existingDocSlugs()`. If a runtime data source is ever added, this seam becomes real and needs a
gateway.

**5 · Cross-boundary sync.** Three boundaries:

- **Base path.** Declared once at `astro.config.mjs:10` and crosses into two consumers that cannot share a
  module: the rehype plugin receives it as a parameter at `:25`; browser-side code reads
  `import.meta.env.BASE_URL` via `withBase()`. Both ultimately derive from the one declaration.
- **Diagrams.** `diagrams_Claude_code/`, `diagrams_Claude_web/`, and `diagrams_home/` at the repo root are the
  **source archive** — each holds the PNG plus the `diagrams_prompts/` markdown that generated it.
  `src/assets/diagrams/` holds the copies the site actually imports through `astro:assets`, under different
  filenames (`approval-loop.png` → `cc-approval-loop.png`). Nothing generates one from the other. See
  Exceptions.
- **NXT brand.** The logo is not copied: `NxtLogo.astro` embeds NXT's finished asset from
  `NXT_SITE.logoDark` (pe.nxtpartners.ai, source `nxt-pe/public/logo/logo-dark.html`) as a scaled iframe,
  the way `nxt-pe`'s `NXTLogo.tsx` does. Every NXT URL lives in `NXT_SITE` in `nav.ts`, and every link
  out of the wiki goes through `ExternalLink.astro`. Brand colors are hand-copied from
  `nxt-pe/src/theme/tokens.ts` into `global.css`; a brand change goes into `tokens.ts` first.

## Layout

    src/
      pages/          routes; [...slug].astro renders the collection
      layouts/        BaseLayout (head, noindex, fonts) → DocLayout (doc grid, sidebar, TOC)
      components/     chrome; claude-ui/ = product mockups; examples/ = the matrix and PortCo Pulse
                      deliverables plus their previews (examples/*-shared.css = styles shared across
                      one deliverable's components, since Astro scopes <style> per file)
      content/docs/   the MDX pages, one per nav slug
      config/nav.ts   the route + label registry
      utils/          basePath, withBase, existingDocs
      plugins/        rehype: rewrites prose links at build time
      styles/         global.css — all tokens, both palettes
      assets/diagrams the imported PNGs

**Dependency direction, one way:** `pages → layouts → components → config + utils`. No cycles. Nothing
depends upward.

## Naming

- Components `PascalCase.astro`; utils and config `camelCase.ts`; content files `kebab-case.mdx`.
- A content file's path under `src/content/docs/` **is** its slug, and must match the entry in `nav.ts`.
- Claude Code diagram assets are prefixed `cc-`; web-track assets are not prefixed.

## How to add a new content page

1. Create `src/content/docs/<section>/<slug>.mdx`.
2. Frontmatter needs `title` and `section`. **Quote any `description` containing a colon**, or the build fails
   on "bad indentation of a mapping entry".
3. Imports are `../../../components/` from a section folder, `../../components/` from the two root-level docs.
4. Register it in `src/config/nav.ts` under the right track and section. Nesting uses `NavSection.children`.
5. Prose links are written plain (`[text](/foo)`) — the rehype plugin adds the base. **JSX inside MDX is not
   rewritten**; call `withBase()` there yourself.
6. `npm run build`. A page absent from `nav.ts` will not appear anywhere.

## How to add a new diagram

1. Generate it into the right root archive dir, keeping its prompt in that dir's `diagrams_prompts/`.
2. Copy it into `src/assets/diagrams/` under the site-side name (prefix `cc-` for the Claude Code track).
3. Import it in the `.mdx` and render through `astro:assets`. Never reference a diagram by URL string.

## Checklist

- [ ] No `var(--space-N)` where N is not one of 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24.
- [ ] No new hardcoded hex color in a component or page; use a token from `global.css`.
- [ ] No brand token (`--brand-*`, `--chrome-*`, `--on-dark*`, `--font-display`) inside anything under
      `src/components/claude-ui/`.
- [ ] `--brand-purple` and `--brand-cyan` never set `color:` on a light background; text uses `--brand-ink`
      (light) or `--brand-on-dark` (navy). `grep -rn "color: var(--brand-purple)\|color: var(--brand-cyan)" src`.
- [ ] No client name. `grep -rni kpmg src public README.md` is empty, and "Big 4" appears only in the
      `index.astro` hero eyebrow.
- [ ] No gradient or radial glow on text or section backgrounds (NXT style).
- [ ] No em dash or en dash in any added line, including code comments.
- [ ] No British spelling and no `£`.
- [ ] No root-absolute internal `href="/..."`, `src="/..."`, or `/pagefind/...`; base applied via `withBase()`
      or `import.meta.env.BASE_URL`.
- [ ] `withBase()`/`applyBase()` called once per URL, never composed by hand.
- [ ] Internal page links in built HTML end in `/`: after `npm run build`,
      `grep -rhoE 'href="/[^"#?]*[^/"]"' dist --include='*.html' | grep -vE '\.[a-z0-9]+"$'` is empty.
- [ ] No `getCollection('docs')` outside `[...slug].astro` and `existingDocs.ts`; use `existingDocSlugs()`.
- [ ] No hand-maintained array of nav labels, slugs, or section names anywhere; derive from `nav.ts`.
- [ ] Every new closed set of values is a string-literal union on `Props`, not `string`.
- [ ] New content page is `.mdx` if it uses components, and its import depth matches its folder level.
- [ ] Any `description:` frontmatter containing a colon is double-quoted.
- [ ] Every new page is registered in `src/config/nav.ts`.
- [ ] `welcome.mdx`, `first-15-minutes.mdx`, and `Header.astro` unchanged unless the change is additive and
      content-preserving.
- [ ] Project Atlas figures match `first-15-minutes.mdx` ($60m, high 70s margin, NRR above 110 percent).
- [ ] VS Code is described as required. Never tell a reader another terminal is an option for them.
- [ ] Diagrams rendered through `astro:assets` from `src/assets/diagrams/`, never by URL.
- [ ] No redrawn or copied NXT logo or icon; use `NxtLogo.astro` and the `NXT_SITE.icons` links. No external URL outside `NXT_SITE`, and every
      link that leaves the wiki uses `ExternalLink.astro`.
- [ ] Every template meant to be saved and reused (prompt template, Project instructions, CLAUDE.md, SKILL.md, Prompt Library prompt) added or changed carries a `# Version:` and `# Tested on: Claude [model name], [month and year], by [your name]` header, with placeholders, never an invented model or date. In a `SKILL.md` the lines go inside the frontmatter as YAML comments.
- [ ] Nothing on a page restates what the page already shows: no legend, key, footnote, card set, or
      decorative marker (dot, stripe, icon) that repeats information the main view carries. When a view
      changes, re-check every supporting block around it. (Corrected three times on 2026-10-02.)
- [ ] No colored left-border accent stripe on cards, chips, or callouts. Signal a category with a soft
      tint or with position. (User, 2026-10-02: "that is super AI".)
- [ ] A control that is filtered out or dimmed but still operable keeps text contrast of 4.5:1 and its focus
      ring: mute it with color tokens, never with `opacity`. (Caught by review, 2026-10-02.)

## Exceptions

Real, dated, sitting next to the rule each one breaks. Each is a finding, not a licence, and none may be
copied as precedent for new code. **Work that is scheduled lives in `tasks/plan.md`, not here.**

- **[2026-08-10] Diagram sources are hand-copied and renamed** from the root archive
  (`diagrams_Claude_code/`, `diagrams_Claude_web/`, `diagrams_home/`) into `src/assets/diagrams/`. Seam 5
  requires generation or a documented pair; this is the documentation. Fixes go into the root archive **and**
  the copy, and each archive's `diagrams_prompts/` is the source of truth for how the image was made.
- **[2026-08-10] Constants are split across three files, not one.** `src/config/nav.ts` owns the page
  registry, `src/styles/global.css` owns design tokens, `src/utils/withBase.ts` owns URL construction. Seam 1
  asks for one source of truth per concern rather than one file, and each of these three is unambiguous, so
  the split is accepted rather than merged.
- **[2026-08-10] `--space-*` skips steps 7, 9, 11.** The scale is every multiple of 4 up to 24, then 32, 40,
  48, 64, 96. Steps 5 and 10 were added on 2026-08-10 because twelve live references collapsed to zero
  without them. The remaining gaps are deliberate, not omissions. Recorded so the next audit does not
  re-raise it.
- **[2026-08-10] The four `Pp*View.astro` components repeat about 330 lines of CSS and one markup block.**
  Astro scopes `<style>` per file, so carving four views out of one component forced the shared header,
  panel and view-state rules to be copied. `review` rates this a blocker and it is logged as work in
  `tasks/plan.md`, not accepted here. Listed only so the next audit knows it is already on the list.
- **[2026-10-05] The diagrams still use the KPMG palette** (blue, not NXT purple). The user chose to keep
  them during the NXT rebrand. No image carries the KPMG name: `confidentiality.png` was edited by the user
  the same day. Some `diagrams_prompts/*.md` still specify the KPMG palette. Do not re-raise it;
  regenerating them is the user's call.
- **[2026-10-05] `<meta name="theme-color">` in `BaseLayout.astro` is a raw hex.** A meta tag cannot read a
  CSS variable, so it is hand-paired with `--chrome-bg`. Change both together.
