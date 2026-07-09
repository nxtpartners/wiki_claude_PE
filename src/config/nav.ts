// Single source of truth for navigation order.
// The wiki ships two self-contained tracks: the Core track (claude.ai) and the
// Advanced track (Claude Code). Each track owns its own sidebar, prev/next, and
// numbering; a reader in one track never sees the other track's sections.
// Pages that do not yet have a content file are rendered as muted "coming soon"
// labels (resolved at build time against the docs collection) so the build never
// links to a non-existent slug.

export interface NavItem {
  title: string;
  /** Slug WITHOUT leading slash, matching the content collection id. */
  slug: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

// ---------------------------------------------------------------------------
// Core track: claude.ai (the web app most people use every day).
// ---------------------------------------------------------------------------
export const navCore: NavSection[] = [
  {
    label: 'Start Here',
    items: [
      { title: 'Welcome', slug: 'welcome' },
      { title: 'First 15 Minutes', slug: 'first-15-minutes' },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { title: "What Claude Is (and Isn't)", slug: 'foundations/what-claude-is' },
      { title: 'Interface Tour', slug: 'foundations/interface-tour' },
      { title: 'Your Account & Confidential Data', slug: 'foundations/account-and-data' },
      { title: 'Anatomy of a Good Prompt', slug: 'foundations/anatomy-of-a-prompt' },
    ],
  },
  {
    label: 'Context',
    items: [
      { title: 'Why Context Is Everything', slug: 'context/why-context' },
      { title: 'Writing Effective Instructions', slug: 'context/writing-instructions' },
      { title: 'Instructions for Claude', slug: 'context/instructions-for-claude' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { title: 'What Projects Are', slug: 'projects/what-projects-are' },
      { title: 'Reusable vs Deal Projects', slug: 'projects/two-layer-system' },
      { title: 'Setting Up a Reusable Project', slug: 'projects/reusable-setup' },
      { title: 'Setting Up a Deal Project', slug: 'projects/deal-setup' },
      { title: 'Instruction Templates', slug: 'projects/templates' },
    ],
  },
  {
    label: 'PE Playbooks',
    items: [
      { title: 'CIM & Teaser Analysis', slug: 'playbooks/cim-analysis' },
      { title: 'Due Diligence Review', slug: 'playbooks/due-diligence' },
      { title: 'Investment Memo Drafting', slug: 'playbooks/investment-memo' },
      { title: 'Market & Competitor Research', slug: 'playbooks/market-research' },
      { title: 'Financial & Model Review', slug: 'playbooks/financial-review' },
      { title: 'Portfolio Monitoring', slug: 'playbooks/portfolio-monitoring' },
    ],
  },
  {
    label: 'Worked Example',
    items: [{ title: 'Project Atlas', slug: 'worked-example/project-atlas' }],
  },
  {
    label: 'Power Features',
    items: [
      { title: 'Thinking & Effort', slug: 'power-features/thinking-effort' },
      { title: 'Connectors', slug: 'power-features/connectors' },
      { title: 'Analysis Tool', slug: 'power-features/analysis-tool' },
      { title: 'Artifacts', slug: 'power-features/artifacts' },
      { title: 'Web Search', slug: 'power-features/web-search' },
    ],
  },
  {
    label: 'Best Practices',
    items: [
      { title: 'Verify Everything', slug: 'best-practices/verify-everything' },
      { title: 'Confidentiality Decision Tree', slug: 'best-practices/confidentiality' },
      { title: 'Prompt Patterns', slug: 'best-practices/prompt-patterns' },
      { title: 'What Not to Do', slug: 'best-practices/what-not-to-do' },
      { title: 'Cheat Sheet', slug: 'best-practices/cheat-sheet' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'Prompt Library', slug: 'resources/prompt-library' },
      { title: 'Glossary', slug: 'resources/glossary' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Advanced track: Claude Code (Claude in your own files, for hands-on work).
// ---------------------------------------------------------------------------
export const navAdvanced: NavSection[] = [
  {
    label: 'Claude Code Welcome',
    items: [
      { title: 'Welcome to Claude Code', slug: 'claude-code/welcome' },
    ],
  },
  {
    label: 'Getting Started',
    items: [
      { title: 'What Claude Code Is', slug: 'claude-code/what-it-is' },
      { title: 'Claude Code vs claude.ai', slug: 'claude-code/vs-claude-ai' },
      { title: 'Installing VS Code', slug: 'claude-code/install-vs-code' },
      { title: 'Installing & Signing In', slug: 'claude-code/sign-in' },
    ],
  },
  {
    label: 'First Sessions',
    items: [
      { title: 'Your First Session', slug: 'claude-code/first-session' },
      { title: 'Approving Changes', slug: 'claude-code/approving-changes' },
    ],
  },
  {
    label: 'Good Habits',
    items: [
      { title: 'CLAUDE.md Rulebook', slug: 'claude-code/claude-md' },
      { title: 'Habits That Keep You Safe', slug: 'claude-code/good-habits' },
      { title: 'Keeping Deal Data Safe', slug: 'claude-code/confidentiality' },
      { title: 'Saving Work with Git', slug: 'claude-code/git-basics' },
      { title: 'Going Live', slug: 'claude-code/deploy' },
      { title: 'Cheat Sheet', slug: 'claude-code/cheat-sheet' },
    ],
  },
  {
    label: 'PE Recipes',
    items: [
      { title: 'Data Packs & Model Checks', slug: 'claude-code/recipes-data' },
      { title: 'Memos into Summaries', slug: 'claude-code/recipes-docs' },
    ],
  },
  {
    label: 'Examples',
    items: [
      { title: 'AI Value Creation Matrix', slug: 'claude-code/example-value-creation' },
      { title: 'PortCo Pulse Dashboard', slug: 'claude-code/example-portco-pulse' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { title: 'Glossary', slug: 'claude-code/glossary' },
    ],
  },
];

/** Flattened, ordered list per track, used for numbering and prev/next. */
export const flatNavCore: NavItem[] = navCore.flatMap((s) => s.items);
export const flatNavAdvanced: NavItem[] = navAdvanced.flatMap((s) => s.items);

// ---------------------------------------------------------------------------
// Track model + helpers. Each doc page resolves to exactly one track, and all
// track-scoped chrome (sidebar, prev/next, numbering) reads from these.
// ---------------------------------------------------------------------------
export type Track = 'core' | 'advanced';

export const TRACKS = {
  core: { id: 'core', name: 'claude.ai', tagline: 'Core Track', homeSlug: 'welcome' },
  advanced: { id: 'advanced', name: 'Claude Code', tagline: 'Advanced Track', homeSlug: 'claude-code/welcome' },
} as const;

const advancedSlugs = new Set(flatNavAdvanced.map((i) => i.slug));

export function trackForSlug(slug: string): Track {
  return advancedSlugs.has(slug) ? 'advanced' : 'core';
}

export function navForTrack(t: Track): NavSection[] {
  return t === 'advanced' ? navAdvanced : navCore;
}

export function flatNavForTrack(t: Track): NavItem[] {
  return t === 'advanced' ? flatNavAdvanced : flatNavCore;
}

// ---------------------------------------------------------------------------
// Combined exports, kept for consumers that need a global site map (e.g. the
// footer, which lists both tracks side by side).
// ---------------------------------------------------------------------------
export const nav: NavSection[] = [...navCore, ...navAdvanced];
export const flatNav: NavItem[] = [...flatNavCore, ...flatNavAdvanced];
