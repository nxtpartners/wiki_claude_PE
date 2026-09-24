// Single source of truth for navigation order.
//
// The wiki ships two self-contained tracks: the Core track (claude.ai) and the
// Advanced track (Claude Code). Each track owns its own sidebar, prev/next, and
// numbering; a reader in one track never sees the other track's sections.
//
// The Core track is ordered advanced-first: readers arrive already familiar with
// AI assistants, so prompting opens the sequence rather than orientation material.
// An optional group at the bottom ("New to Claude?") exists for anyone who has
// never used Claude before.
//
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
  /** Renders muted and set apart: a detour for newcomers, not a prerequisite. */
  optional?: boolean;
  /** Renders as a disclosure the reader can fold away. Keeps long lists from
   *  swamping the spine without hiding them from anyone who wants them. */
  collapsible?: boolean;
  /** Only meaningful with `collapsible`. Starts folded, unless the page being
   *  read lives inside the section, in which case it always opens. */
  startClosed?: boolean;
  items: NavItem[];
  /** Sub-sections nested inside this one. They render inside the parent's
   *  disclosure, so opening the parent is what reveals them. */
  children?: NavSection[];
}

/** Depth-first walk, a parent before its children, so ordering matches reading
 *  order in the sidebar. Every consumer of the tree goes through this, which is
 *  what keeps numbering, prev/next and the rendered nav in step. */
export function* walkSections(sections: NavSection[]): Generator<NavSection> {
  for (const section of sections) {
    yield section;
    if (section.children) yield* walkSections(section.children);
  }
}

/** True when the slug sits in this section or any section nested under it. */
export function sectionHoldsSlug(section: NavSection, slug: string): boolean {
  for (const s of walkSections([section])) {
    if (s.items.some((i) => i.slug === slug)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Core track: claude.ai (the web app most people use every day).
// ---------------------------------------------------------------------------
export const navCore: NavSection[] = [
  {
    label: 'Start Here',
    items: [
      { title: 'Welcome', slug: 'welcome' },
      { title: 'Anatomy of a Good Prompt', slug: 'foundations/anatomy-of-a-prompt' },
      { title: 'From Prompt to Template', slug: 'resources/from-prompt-to-template' },
      { title: 'Your Account & Confidential Data', slug: 'foundations/account-and-data' },
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
    label: 'Resources',
    items: [
      { title: 'Prompt Library', slug: 'resources/prompt-library' },
      { title: 'Glossary', slug: 'resources/glossary' },
    ],
  },
  // ---------------------------------------------------------------------------
  // Folded zone. Everything below sits outside the numbered spine and starts
  // closed, so the sidebar shows the path through the course rather than every
  // page at once. Nothing here is deleted or hidden, just one click away.
  // ---------------------------------------------------------------------------
  {
    label: 'New to Claude?',
    optional: true,
    collapsible: true,
    startClosed: true,
    // Ordered so the existing forward pointers inside these pages stay true:
    // First 15 Minutes ends by sending the reader to What Claude Is, which in
    // turn ends by sending them to the Interface Tour.
    items: [
      { title: 'First 15 Minutes', slug: 'first-15-minutes' },
      { title: "What Claude Is (and Isn't)", slug: 'foundations/what-claude-is' },
      { title: 'Interface Tour', slug: 'foundations/interface-tour' },
    ],
    children: [
      {
        label: 'PE Playbooks',
        optional: true,
        collapsible: true,
        startClosed: true,
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
        label: 'Best Practices',
        optional: true,
        collapsible: true,
        startClosed: true,
        items: [
          { title: 'Verify Everything', slug: 'best-practices/verify-everything' },
          { title: 'What Not to Do', slug: 'best-practices/what-not-to-do' },
          { title: 'Cheat Sheet', slug: 'best-practices/cheat-sheet' },
        ],
      },
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
      { title: 'Organizing Many Deals', slug: 'claude-code/organizing-deals' },
      { title: 'Starting Something Bigger', slug: 'claude-code/requirements-brief' },
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
export const flatNavCore: NavItem[] = [...walkSections(navCore)].flatMap((s) => s.items);
export const flatNavAdvanced: NavItem[] = [...walkSections(navAdvanced)].flatMap((s) => s.items);

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
// Track position labels. Numbered sections form one continuous spine
// (01, 02, ...). Items inside an `optional: true` section sit outside that
// count and are lettered (A, B, C) so an optional detour never reads as
// step 33 of a 35-step course.
// ---------------------------------------------------------------------------

export interface TrackPosition {
  /** What to render: '07' or 'B'. */
  label: string;
  /** True when the item lives in an optional section. */
  optional: boolean;
  /** 1-based place in the numbered spine, or null for optional items. */
  step: number | null;
}

export function trackPositions(t: Track): Map<string, TrackPosition> {
  const result = new Map<string, TrackPosition>();
  let step = 0;
  let letter = 0; // 0 = 'A', 1 = 'B', etc.

  for (const section of walkSections(navForTrack(t))) {
    for (const item of section.items) {
      if (section.optional) {
        result.set(item.slug, {
          label: String.fromCharCode(65 + letter),
          optional: true,
          step: null,
        });
        letter++;
      } else {
        step++;
        result.set(item.slug, {
          label: String(step).padStart(2, '0'),
          optional: false,
          step,
        });
      }
    }
  }

  return result;
}

/** The N in "7 of N". Counts the numbered spine only. */
export function trackStepCount(t: Track): number {
  let count = 0;
  for (const section of walkSections(navForTrack(t))) {
    if (!section.optional) {
      count += section.items.length;
    }
  }
  return count;
}

/**
 * Find the section label from nav.ts for a given slug. Returns the section
 * label string if the slug is found, or null if not present in the nav.
 */
export function sectionLabelForSlug(t: Track, slug: string): string | null {
  for (const section of walkSections(navForTrack(t))) {
    for (const item of section.items) {
      if (item.slug === slug) {
        return section.label;
      }
    }
  }
  return null;
}

