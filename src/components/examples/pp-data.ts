// Data and type definitions for the PortCo Pulse Dashboard.
// Extracted from PortcoPulseShowcase.astro so the component file holds only
// the shell (rail, topbar, content area) and the view-switch script.

export const period = 'August 2026';
export const fiscalYear = 'FY2026';

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

export interface KpiRow {
  kpi: string;
  actual: string;
  plan: string;
  variance: string;
  status: 'ontrack' | 'atrisk' | 'offtrack';
  statusLabel: string;
}

// Company analytics for Veridian Software.
export const kpiRows: KpiRow[] = [
  { kpi: 'Revenue', actual: '$1.21M', plan: '$1.19M', variance: '+1.3%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'EBITDA', actual: '$285K', plan: '$310K', variance: '-8.1%', status: 'atrisk', statusLabel: 'At Risk' },
  { kpi: 'Gross Margin', actual: '72.1%', plan: '71.5%', variance: '+0.8%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'Headcount', actual: '52', plan: '50', variance: '+4%', status: 'ontrack', statusLabel: 'On Track' },
  { kpi: 'NPS', actual: '61', plan: '58', variance: '+5.2%', status: 'ontrack', statusLabel: 'On Track' },
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
