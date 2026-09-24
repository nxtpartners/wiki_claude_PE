// Data and type definitions for the PortCo Pulse Dashboard.
// Extracted from PortcoPulseShowcase.astro so the component file holds only
// the shell (rail, topbar, content area) and the view-switch script.

export const period = 'August 2026';
export const fiscalYear = 'FY2026';
export const firmName = 'Meridian Capital Partners';

// The one company the Data view breaks down and the Submit view's chat reports
// for. Both views read it from here so their figures cannot drift apart.
export const kpiCompany = 'Veridian Software';

// View motion, driven by the one helper in PortcoPulseShowcase.astro's script.
// The helper tells each view which phase it is in via PP_VIEW_PHASE:
//   arm  = start state, held until the showcase is on screen
//   play = run the entrance
//   stop = final state (also the no-JS and reduced-motion state)
// A scripted view (data-pp-scripted, the chat) reports its own end with
// PP_VIEW_DONE; for CSS-only views the helper waits for their animations.
// The two class names are what each view's CSS keys its entrance off.
export const PP_VIEW_PHASE = 'pp:phase';
export const PP_VIEW_DONE = 'pp:done';
export type PpViewPhase = 'arm' | 'play' | 'stop';
export interface PpViewPhaseDetail {
  phase: PpViewPhase;
}
export const PP_ENTER_CLASS = 'pp-enter';
export const PP_ARMED_CLASS = 'pp-armed';

export interface Company {
  name: string;
  sector: string;
  fund: string;
  revenue: string;
  bar: number; // percent of the portfolio max (Brighton $7.35M = 100%)
  status: 'ontrack' | 'atrisk' | 'offtrack';
}

// Portfolio companies, latest-period revenue. Bars are proportional to the
// max revenue in the set (Brighton Healthcare, $7.35M).
export const companies: Company[] = [
  { name: 'Apex Industrial', sector: 'Industrial', fund: 'Fund I', revenue: '$2.87M', bar: 39, status: 'ontrack' },
  { name: 'Brighton Healthcare', sector: 'Healthcare', fund: 'Fund I', revenue: '$7.35M', bar: 100, status: 'ontrack' },
  { name: 'Keystone Logistics', sector: 'Logistics', fund: 'Fund II', revenue: '$4.05M', bar: 55, status: 'atrisk' },
  { name: 'Veridian Software', sector: 'SaaS', fund: 'Fund II', revenue: '$1.21M', bar: 16, status: 'ontrack' },
  { name: 'Evergreen Fitness', sector: 'Fitness', fund: 'Fund III', revenue: '$548K', bar: 7, status: 'offtrack' },
  { name: 'OptiFi Solutions', sector: 'FinTech', fund: 'Fund III', revenue: '$1.61M', bar: 22, status: 'ontrack' },
  { name: 'StreamVibe Media', sector: 'Media', fund: 'Fund III', revenue: '$962K', bar: 13, status: 'ontrack' },
  { name: 'Culinary Concepts', sector: 'Restaurant', fund: 'Fund III', revenue: '$528K', bar: 7, status: 'ontrack' },
];

export const stats = [
  { key: 'companies', label: 'Total Companies', value: '8' },
  { key: 'pending', label: 'Pending Submissions', value: '2' },
  { key: 'alerts', label: 'Alerts', value: '2' },
];

// Grouping used by the chat's confirmation card, mirroring the original app.
export type KpiSection = 'Finance' | 'Operations';
export const kpiSections: KpiSection[] = ['Finance', 'Operations'];

// Where this period's figure came from in the Submit view's chat: read from
// the operator's management pack, read from the pack and then confirmed by the
// operator in chat, or given by the operator in chat.
export type KpiSource = 'pack' | 'confirmed' | 'chat';
export const kpiSourceLabels: Record<KpiSource, string> = {
  pack: 'From pack',
  confirmed: 'From pack, confirmed in chat',
  chat: 'From chat',
};

export interface KpiRow {
  kpi: string;
  section: KpiSection;
  source: KpiSource;
  actual: string;
  plan: string;
  variance: string;
  status: 'ontrack' | 'atrisk' | 'offtrack';
  statusLabel: string;
}

// Company analytics for kpiCompany (Veridian Software), August 2026.
export const kpiRows: KpiRow[] = [
  { kpi: 'Revenue', source: 'pack', section: 'Finance', actual: '$1.21M', plan: '$1.19M', variance: '+1.3%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'EBITDA', source: 'pack', section: 'Finance', actual: '$285K', plan: '$310K', variance: '-8.1%', status: 'atrisk', statusLabel: 'At Risk' },
  { kpi: 'Gross Margin', source: 'pack', section: 'Finance', actual: '72.1%', plan: '71.5%', variance: '+0.8%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'Headcount', source: 'confirmed', section: 'Operations', actual: '52', plan: '50', variance: '+4%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'NPS', source: 'chat', section: 'Operations', actual: '61', plan: '58', variance: '+5.2%', status: 'ontrack', statusLabel: 'On Track' },
];

export type DocState = 'in' | 'out' | 'na';
export interface TrackingRow {
  name: string;
  docs: DocState[]; // KPI, BS, IS, CF
}

// Submission tracking: doc status per company. in = submitted, out = missing,
// na = not required.
export const trackingRows: TrackingRow[] = [
  { name: 'Apex Industrial', docs: ['in', 'in', 'in', 'in'] },
  { name: 'Brighton Healthcare', docs: ['in', 'in', 'in', 'in'] },
  { name: 'Keystone Logistics', docs: ['in', 'in', 'in', 'out'] },
  { name: 'Veridian Software', docs: ['in', 'in', 'in', 'na'] },
  { name: 'Evergreen Fitness', docs: ['in', 'out', 'out', 'out'] },
  { name: 'OptiFi Solutions', docs: ['in', 'in', 'in', 'in'] },
];
export const docLabels = ['KPI', 'BS', 'IS', 'CF'];
export const docStateLabels: Record<DocState, string> = {
  in: 'submitted',
  out: 'missing',
  na: 'not required',
};


// ---- Submit view: the scripted operator chat ----
// A monthly KPI submission played back as a chat between an operator at
// kpiCompany and the app's assistant. Every figure the operator types, and
// every row on the confirmation card, must agree with kpiRows above; the card
// renders kpiRows directly so only the typed prose can drift.

export const assistantName = 'Pulse AI';

export type ChatRole = 'assistant' | 'operator';

export interface ChatMessage {
  role: ChatRole;
  text: string[]; // one entry per paragraph; an operator message is typed as one line
  list?: string[]; // assistant: a bulleted list after the text
  after?: string[]; // assistant: paragraphs after the list
  attachment?: string; // operator: file name shown as an attachment chip
  detection?: string; // assistant: the small "detected documents" line above the text
  showsSummary?: boolean; // assistant: the confirmation card follows the text
  filesSubmission?: boolean; // assistant: revealing this message marks the card Submitted
}

const attachedFile = 'Veridian_Mgmt_Pack_Aug2026.xlsx';

// The flow follows the original app's extractor: the operator attaches the
// monthly pack and types no figures; the assistant reads the KPIs out of it,
// says where each came from, and asks in chat only for what a financial pack
// does not hold (NPS). It then asks for the reason behind EBITDA, checks one
// figure the pack disagrees with itself on (headcount: Summary tab 50, Payroll
// tab 52) and updates it on the operator's answer. The final values are
// exactly kpiRows, so the Data view and the card agree.
export const chatScript: ChatMessage[] = [
  {
    role: 'assistant',
    text: [
      `Hi, this is ${assistantName} for ${firmName}. You are reporting ${period} KPIs for ${kpiCompany}.`,
      `Attach this month's management pack. I will pull the KPIs from it and check them against your ${fiscalYear} plan before anything is filed.`,
    ],
  },
  {
    role: 'operator',
    attachment: attachedFile,
    text: ["Here's the August pack."],
  },
  {
    role: 'assistant',
    detection: `Detected in ${attachedFile}: Income Statement, Balance Sheet.`,
    text: [`I read the pack. Here is what I pulled for ${period}, against your ${fiscalYear} plan:`],
    list: [
      'Revenue $1.21M (Income Statement tab, total revenue). Plan $1.19M, 1.3% above.',
      'Gross margin 72.1% (Income Statement tab, gross profit over revenue). Plan 71.5%, 0.8% above.',
      'EBITDA $285K (Income Statement tab, EBITDA line). Plan $310K, 8.1% below.',
    ],
    after: ['The pack has no NPS figure. What was NPS for August?'],
  },
  {
    role: 'operator',
    text: ['61'],
  },
  {
    role: 'assistant',
    text: [
      'Thanks, NPS 61 against a plan of 58.',
      'EBITDA is $285K against a plan of $310K, 8.1% below, which puts it At Risk. What drove it?',
    ],
  },
  {
    role: 'operator',
    text: ['We brought two engineering hires forward from Q4, so their salaries started a quarter early.'],
  },
  {
    role: 'assistant',
    text: [
      'Thanks, noted.',
      'One figure in the pack needs checking. The Summary tab shows headcount 50, but the Payroll tab lists 52 people at month end. Is 52 right? I will update it.',
    ],
  },
  {
    role: 'operator',
    text: ['52 is right. The summary tab was built before the two new hires started.'],
  },
  {
    role: 'assistant',
    showsSummary: true,
    text: [
      'Updated headcount to 52. That is 2 above plan and comes from the same two hires behind EBITDA, so it is in the note too. NPS is 5.2% above plan, which stays On Track.',
      `Here is your ${period} submission. EBITDA is At Risk and everything else is On Track. Review it, then submit.`,
    ],
  },
  {
    role: 'operator',
    text: ['Looks right. Submit it.'],
  },
  {
    role: 'assistant',
    filesSubmission: true,
    text: [
      `Submitted. ${kpiCompany}'s ${period} KPIs are filed with ${firmName}, along with the income statement and balance sheet from the pack. A cash flow statement is not required for ${kpiCompany}, so nothing else is outstanding for this period.`,
      'The note travels with the submission, so the investment team sees each reason next to its number.',
    ],
  },
];

// The confirmation card: rows are kpiRows, documents are kpiCompany's
// tracking row (minus the KPI column, which is this submission itself).
const companyDocs: DocState[] = trackingRows.find((r) => r.name === kpiCompany)?.docs ?? [];

export interface ChatSummaryDoc {
  label: string;
  state: DocState;
}

export const chatSummary = {
  company: kpiCompany,
  title: `${period} Submission`,
  rows: kpiRows,
  note: 'EBITDA 8.1% below plan: two engineering hires brought forward from Q4. Headcount 2 above plan from the same hires (Payroll tab; the Summary tab predates them). NPS 5.2% above plan, reported in chat.',
  docs: docLabels.slice(1).map((label, i): ChatSummaryDoc => ({ label, state: companyDocs[i + 1] ?? 'na' })),
};
