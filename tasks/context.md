# Context — Corrections & Project Rules

Format: `[YYYY-MM-DD] | what went wrong | rule to prevent it`

- [2026-06-30] | Project kickoff | Audience is non-technical PE professionals at KPMG — never let the site feel like developer docs (no Docusaurus look). Polished, editorial, institutional.
- [2026-06-30] | Branding | Use KPMG palette (deep blue #00338D); do NOT use NXT Partners colors or fonts. No logo yet.
- [2026-06-30] | Scope | Teach Claude.ai web app only — not the API, not Claude Code. Assume Enterprise/Team accounts.
- [2026-06-30] | Typography decision | Use Inter (sans-only) throughout — clean KPMG-aligned look, NOT serif. KPMG deep blue #00338D primary.
- [2026-06-30] | Dependency pinning | astro-pagefind@2 only supports astro ≤6 — pin astro@6 + @astrojs/mdx@6 (NOT astro 7 / mdx 7) or npm install fails with peer-dep conflict.
- [2026-06-30] | Pagefind asset loading | Never ESM-`import()` `/pagefind/pagefind-ui.js` — Rollup tries to resolve it and the build fails (asset only exists post-build). Inject it as a runtime `<script>` tag instead.
- [2026-06-30] | MDX components in content | Plain `.md` cannot use components like `<Callout>`. Any content page using components MUST be `.mdx` with explicit relative imports.
[2026-06-30] | Style rule | NEVER use em dashes or en dashes anywhere (content, UI text, or code comments). Use commas, colons, parentheses, or split sentences instead.
- [2026-06-30] | Audience wording | NEVER call the audience "deal team(s)". It is KPMG **Private Equity** (broader than deal teams). Use "private equity teams" / "private equity professionals".
- [2026-06-30] | Claude.ai mockups | Any illustration of the Claude.ai interface MUST look like the real product: warm cream background (#FAF9F5 / #F0EEE6), Claude clay/coral accent (#BE5D3A), neutral message bubbles. NEVER use KPMG blue for the chat UI — it makes users think they are on the wrong page or doing something wrong (audience has no AI experience).
- [2026-06-30] | Hero copy tone | Keep landing copy professional and education-first. NO salesy/marketing lines (e.g. "fastest analyst on your deal team"). This is a guide, not an ad.
