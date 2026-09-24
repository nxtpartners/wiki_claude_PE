# Standards — wiki_claude_PE

Written 2026-08-10 from an `architect` survey of the actual code, not from an ideal. Where the code breaks a
rule below, the real state is recorded under `## Exceptions` rather than hidden. The `review` role returns
PASS/FAIL against `## Checklist` only.

## Seams

**1 · Constants.** Split across three files, each owning a different kind:

| File | Owns |
|---|---|
| `src/styles/global.css` | Every presentation token — color, spacing, type, radius, motion. Two palettes in one file: wiki chrome in the first `:root` (12-71), the Claude.ai mockup palette in the second (342-366). |
| `src/config/nav.ts` | Every route, slug, section label, track name, and their order. |
| `src/content.config.ts` | The frontmatter schema every content page is validated against. |

There is **no single constants file and that is correct** — a CSS custom property cannot live in a `.ts`
module and still cascade. The test that matters holds: you can restyle the product by editing `global.css`
alone.

**Spacing steps that exist are 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24.** There is no `--space-7`, `-9`, or `-11`. An undefined custom property is dropped silently by the browser and collapses to zero, so this fails as
invisible layout damage rather than as an error. See Exceptions.

**2 · Enums.** Closed sets are TypeScript string-literal unions on the component's `Props`, not free strings:
`Track` (`nav.ts:223`), `Callout` variant (`Callout.astro:2`), `PromptCard` collapse (`:15`),
`ClaudeSidebar` active (`:12`), `FileChip` kind (`:12`), `ClaudeMessage` role (`:9`), `CardGrid` columns
(`:3`). A new closed set follows that pattern.

**3 · Shared primitives.** `src/utils/` holds `basePath.ts`, `withBase.ts`, `existingDocs.ts`.
`src/config/nav.ts` is itself a shared primitive, exporting `walkSections()`, `navForTrack()` and friends.

- `applyBase()` in `basePath.ts` is the **only** place the base-path rule is expressed, and it is idempotent —
  applying it twice is safe.
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

**5 · Cross-boundary sync.** Two boundaries:

- **Base path.** Declared once at `astro.config.mjs:10` and crosses into two consumers that cannot share a
  module: the rehype plugin receives it as a parameter at `:25`; browser-side code reads
  `import.meta.env.BASE_URL` via `withBase()`. Both ultimately derive from the one declaration.
- **Diagrams.** `diagrams_Claude_code/`, `diagrams_Claude_web/`, and `diagrams_home/` at the repo root are the
  **source archive** — each holds the PNG plus the `diagrams_prompts/` markdown that generated it.
  `src/assets/diagrams/` holds the copies the site actually imports through `astro:assets`, under different
  filenames (`approval-loop.png` → `cc-approval-loop.png`). Nothing generates one from the other. See
  Exceptions.

## Layout

    src/
      pages/          routes; [...slug].astro renders the collection
      layouts/        BaseLayout (head, noindex, fonts) → DocLayout (doc grid, sidebar, TOC)
      components/     chrome; claude-ui/ = product mockups; examples/ = preview widgets
      content/docs/   the 50 MDX pages
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
- [ ] No KPMG blue (`--kpmg-blue`, `#00338D`) inside anything under `src/components/claude-ui/`.
- [ ] No em dash or en dash in any added line, including code comments.
- [ ] No British spelling and no `£`.
- [ ] No root-absolute internal `href="/..."`, `src="/..."`, or `/pagefind/...`; base applied via `withBase()`
      or `import.meta.env.BASE_URL`.
- [ ] `withBase()`/`applyBase()` called once per URL, never composed by hand.
- [ ] No `getCollection('docs')` outside `[...slug].astro` and `existingDocs.ts`; use `existingDocSlugs()`.
- [ ] No hand-maintained array of nav labels, slugs, or section names anywhere; derive from `nav.ts`.
- [ ] Every new closed set of values is a string-literal union on `Props`, not `string`.
- [ ] New content page is `.mdx` if it uses components, and its import depth matches its folder level.
- [ ] Any `description:` frontmatter containing a colon is double-quoted.
- [ ] Every new page is registered in `src/config/nav.ts`.
- [ ] `welcome.mdx`, `first-15-minutes.mdx`, and `Header.astro` unchanged unless the change is additive and
      content-preserving.
- [ ] Project Atlas figures match `first-15-minutes.mdx` ($60m, high 70s margin, NRR above 110 percent).
- [ ] VS Code is described as required at KPMG and recommended in general. Never tell a KPMG reader another
      terminal is an option for them.
- [ ] Diagrams rendered through `astro:assets` from `src/assets/diagrams/`, never by URL.
- [ ] Every template meant to be saved and reused (prompt template, Project instructions, CLAUDE.md, SKILL.md, Prompt Library prompt) added or changed carries a `# Version:` and `# Tested on: Claude [model name], [month and year], by [your name]` header, with placeholders, never an invented model or date. In a `SKILL.md` the lines go inside the frontmatter as YAML comments.

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
