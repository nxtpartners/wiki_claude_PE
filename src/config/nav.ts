// Single source of truth for navigation order.
// Every section + page in the wiki is listed here. The sidebar reads from this.
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

export const nav: NavSection[] = [
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
      { title: 'Giving Claude Context', slug: 'context/giving-context' },
      { title: 'Writing Effective Instructions', slug: 'context/writing-instructions' },
      { title: 'Custom Styles & Tone', slug: 'context/custom-styles' },
      { title: 'Common Mistakes', slug: 'context/common-mistakes' },
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

/** Flattened, ordered list of all nav items, used for prev/next. */
export const flatNav: NavItem[] = nav.flatMap((s) => s.items);
