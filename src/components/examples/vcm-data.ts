// Data and type definitions for the AI Value Creation Matrix.
// Extracted from ValueCreationMatrix.astro so the component file holds only
// markup, CSS, and the filter script.

export const serviceLabels: Record<string, string> = {
  strategy: 'Strategy & Advisory',
  platform: 'Platform Build',
  impl: 'Implementation',
  managed: 'Managed Service',
  vc: 'Portfolio VC',
};

export const phaseMeta: Record<string, { label: string; cls: string }> = {
  '100-Day': { label: '100-Day', cls: 'phase-100' },
  'Mid-Hold': { label: 'Mid-Hold', cls: 'phase-mid' },
  'Exit Prep': { label: 'Exit Prep', cls: 'phase-exit' },
  'All Phases': { label: 'Continuous', cls: 'phase-all' },
};
export const tierMeta: Record<string, string> = {
  'Mid-Market': 'tier-mm',
  'Large-Cap': 'tier-lc',
  Both: 'tier-both',
};
export const fitMeta: Record<string, string> = { High: 'pp-high', Medium: 'pp-med', Low: 'pp-low' };
export const cxMeta: Record<string, string> = { Low: 'cx-low', Medium: 'cx-med', High: 'cx-high' };
export const entryMeta: Record<string, string> = { build: 'entry-build', buy: 'entry-buy', partner: 'entry-partner' };

export interface Row {
  sublever: string;
  usecase: string;
  phase: string;
  tier: string;
  filterServices: string;
  services: string[];
  airole: string;
  anchor: string;
  fit: string;
  complexity: string;
  ttv: string;
  duration: string;
  deps: string;
  entry: { type: string; label: string };
}
export interface Lever {
  key: string;
  title: string;
  rows: Row[];
}

export const levers: Lever[] = [
  {
    key: 'efficiency',
    title: 'Operational Efficiency',
    rows: [
      {
        sublever: 'SG&A & COGS (Labor)',
        usecase: 'Automated SG&A Benchmarking & Anomaly Detection',
        phase: '100-Day',
        tier: 'Mid-Market',
        filterServices: 'strategy vc impl',
        services: ['strategy', 'vc', 'platform'],
        airole:
          `KPMG's Value Navigator already contains the benchmark database and methodology. The current workflow requires significant manual reconciliation against trial balances to produce clean output, a process that is time-intensive and introduces error risk. AI automates the GL ingestion and reconciliation layer: classifying spend lines, resolving miscodings, and mapping actuals to benchmark categories without manual intervention. Because Value Navigator ingests census data covering fully loaded labor cost and headcount, the output spans both SG&A and direct labor on the COGS side, surfacing cost reduction opportunities across back-office and operational functions alike. The methodology stays intact; the bottleneck is removed.`,
        anchor:
          `KPMG Value Navigator (existing internal tool). AI augmentation of the reconciliation layer is the specific gap, not a net-new build.`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '4-6 wks',
        duration: '8-12 wks',
        deps: 'ERP GL export; 12+ months of actuals; vendor master list.',
        entry: { type: 'build', label: 'Build on KPMG Value Navigator' },
      },
      {
        sublever: 'SG&A & COGS (Labor)',
        usecase: 'AI-Driven Headcount & Org Layer Analysis',
        phase: 'All Phases',
        tier: 'Both',
        filterServices: 'strategy vc impl',
        services: ['strategy', 'vc', 'platform'],
        airole:
          `Value Navigator already holds the benchmark data for headcount and fully loaded labor cost by function, industry, and company size. The gap is the manual effort required to map census data and trial balances to the benchmark structure before any comparison is possible. AI automates that mapping, cleaning and reconciling inputs from payroll and GL exports without manual intervention. Because the analysis covers fully loaded cost and headcount across all functions, the output applies equally to SG&A roles and direct labor on the COGS side. The ranked opportunity set covers headcount reduction, offshoring candidates by function, outsourcing opportunities, and span and band optimization, across back-office and operational workforce alike.`,
        anchor:
          `KPMG Value Navigator (existing internal tool). Same reconciliation bottleneck as SG&A benchmarking; AI closes the same gap across a different data input.`,
        fit: 'Low',
        complexity: 'Medium',
        ttv: '6-8 wks',
        duration: '10-14 wks',
        deps: 'HRIS/payroll export with reporting lines; compensation banding.',
        entry: { type: 'build', label: 'Build on KPMG Value Navigator' },
      },
      {
        sublever: 'Supply Chain & Operations',
        usecase: 'Demand Forecasting with ML-Augmented Inputs',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `Replaces static spreadsheet forecasting with ML models trained on historical shipment data, seasonality, promotional calendars, and external signals. Reduces forecast error and associated safety stock carrying cost. Most impactful for portcos with high SKU count and variable demand.`,
        anchor:
          `Kinaxis, o9 Solutions, Blue Yonder for large manufacturers. Streamline or Inventory Planner for mid-market. ML forecasting at defense-adjacent portcos (Veritas Capital, emerging).`,
        fit: 'Low',
        complexity: 'High',
        ttv: '12-16 wks',
        duration: '20-28 wks',
        deps: '3+ years clean SKU-level sales history; ERP with inventory module.',
        entry: { type: 'buy', label: 'Buy + Partner' },
      },
      {
        sublever: 'Supply Chain & Operations',
        usecase: 'Procurement Spend Analytics & Supplier Consolidation',
        phase: 'Mid-Hold',
        tier: 'Large-Cap',
        filterServices: 'vc impl',
        services: ['vc', 'platform'],
        airole:
          `Value Navigator benchmarks spend by category and industry. The current process requires manually mapping AP and PO data to the benchmark taxonomy, reconciling against trial balances to get clean category-level spend before any comparison is possible. AI automates that classification and reconciliation, then surfaces consolidation opportunities: categories where spend is above benchmark, vendors appearing across multiple functions, and tail spend above an actionable threshold. Where labor-related costs appear in procurement data (e.g., contract labor, staffing agencies), the analysis connects to the same fully loaded cost benchmarks that drive the headcount and SG&A workstreams. Output is a prioritized renegotiation and consolidation target list grounded in benchmark data.`,
        anchor:
          `KPMG Value Navigator (existing internal tool). Same census-to-trial-balance reconciliation bottleneck as SG&A and headcount; AI applies the same fix to procurement spend inputs.`,
        fit: 'Low',
        complexity: 'Medium',
        ttv: '8-10 wks',
        duration: '14-20 wks',
        deps: 'AP/PO export with vendor names and line descriptions; $50M+ in addressable indirect spend.',
        entry: { type: 'build', label: 'Build on KPMG Value Navigator' },
      },
    ],
  },
  {
    key: 'balance',
    title: 'Balance Sheet Strength',
    rows: [
      {
        sublever: 'Working Capital',
        usecase: 'Cash Conversion Cycle Monitoring & Alert Engine',
        phase: 'All Phases',
        tier: 'Mid-Market',
        filterServices: 'platform managed strategy',
        services: ['platform', 'managed', 'strategy'],
        airole:
          `Continuously pulls AR aging, AP aging, and inventory data to compute DSO, DPO, and DIO at the portco level. Detects deteriorating trends before month-end, e.g., DSO creeping 8 days over a 90-day rolling average. Generates automated alerts with drill-down by customer or vendor. At mid-market, this function does not otherwise exist between board meetings.`,
        anchor:
          `Tesorio for AI-powered AR forecasting; HighRadius for enterprise. Neither does fund-level portfolio aggregation, that is the PortCo Pulse layer.`,
        fit: 'High',
        complexity: 'Low',
        ttv: '2-4 wks',
        duration: '6-10 wks',
        deps: 'ERP with AR/AP/inventory modules; monthly WC data submission.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Working Capital',
        usecase: 'Customer Payment Behavior Prediction & Collections Prioritization',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `Classification model trained on invoice amount, customer segment, payment history, and days outstanding to predict which open invoices are high-risk for late payment. Outputs a prioritized collections queue, replacing the "oldest invoice first" default. Measurable via DSO improvement against control period.`,
        anchor:
          `Tesorio and Billtrust offer AI collections prioritization commercially. Deployed at PE-backed SaaS and B2B services portcos (analogous).`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '8-12 wks',
        duration: '14-20 wks',
        deps: '18+ months of invoice-level AR history; customer master with segment data.',
        entry: { type: 'buy', label: 'Buy + Partner' },
      },
      {
        sublever: 'CapEx Management',
        usecase: 'Predictive Maintenance to Defer Unplanned CapEx',
        phase: 'Mid-Hold',
        tier: 'Large-Cap',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `IoT sensor data combined with ML anomaly detection identifies equipment degradation before failure. Shifts maintenance from calendar-based to condition-based, reducing unplanned downtime and emergency CapEx. Skews large-cap because sensor infrastructure and maintenance data maturity are prerequisites most mid-market portcos do not meet.`,
        anchor:
          `Uptake, SparkCognition, C3.ai in industrial predictive maintenance. KKR has deployed at manufacturing portcos (emerging, not public).`,
        fit: 'Low',
        complexity: 'High',
        ttv: '16-24 wks',
        duration: '24-36 wks',
        deps: 'IoT sensors on key equipment; 2+ years of maintenance logs; OT/IT integration.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Capital Markets Readiness',
        usecase: 'AI-Assisted Data Room Construction & Narrative Packaging',
        phase: 'Exit Prep',
        tier: 'Both',
        filterServices: 'strategy impl platform',
        services: ['strategy', 'impl', 'platform'],
        airole:
          `LLM-assisted assembly of data room materials: structures financial data from ERP/BI exports, drafts management presentation narrative grounded in actual KPIs, identifies information gaps sophisticated buyers will flag, and generates Q&A preparation materials from prior deal patterns. Reduces a 6-8 week data room build by roughly 40%.`,
        anchor:
          `DealRoom and Ansarada offer AI-assisted VDR features. Goldman and JPMorgan have internal LLM deal tools (analogous). KPMG deal advisory practice is building comparable internal capability.`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '3-4 wks post-data assembly',
        duration: '8-12 wks',
        deps: 'Clean 3-5 year financials; KPI tracking history; management review capacity.',
        entry: { type: 'partner', label: 'Partner' },
      },
    ],
  },
  {
    key: 'revenue',
    title: 'Revenue Growth',
    rows: [
      {
        sublever: 'Improve Sales',
        usecase: 'Pipeline Health Scoring & Rep Productivity Analysis',
        phase: '100-Day',
        tier: 'Mid-Market',
        filterServices: 'strategy vc impl',
        services: ['strategy', 'vc', 'impl'],
        airole:
          `AI analyzes CRM data (deal stage, age, activity cadence, contact depth) to produce a probabilistic win/loss score for every open opportunity. Surfaces at-risk deals before they slip, identifies reps with structurally different pipeline patterns, and flags stale accounts. Forces CRM discipline as a prerequisite and delivers immediate commercial insight as the return.`,
        anchor:
          `Clari is the canonical tool and is widely used at PE-backed SaaS companies. Thoma Bravo portfolio companies have broad Clari deployment (widely referenced in PE tech circles).`,
        fit: 'Medium',
        complexity: 'Low',
        ttv: '3-5 wks',
        duration: '6-10 wks',
        deps: 'Salesforce or HubSpot with 6+ months of pipeline history; consistent rep activity logging.',
        entry: { type: 'buy', label: 'Buy + Partner (CRM hygiene first)' },
      },
      {
        sublever: 'Improve Sales',
        usecase: 'Customer Churn Prediction & Proactive Retention',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'vc impl strategy',
        services: ['vc', 'impl', 'strategy'],
        airole:
          `ML model trained on product usage, support ticket frequency, NPS trends, renewal dates, and billing behavior to score churn probability by customer. High-risk accounts surfaced to CSM team with recommended intervention playbook. Direct impact on NRR, a key exit multiple driver in recurring revenue businesses.`,
        anchor:
          `Gainsight is the market leader at SaaS portcos. Vista Equity Partners deploys Gainsight as a standard portfolio playbook across its software companies.`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '10-14 wks',
        duration: '16-24 wks',
        deps: 'Product usage telemetry (SaaS); 18+ months customer history; CSM team to act on outputs.',
        entry: { type: 'buy', label: 'Buy + Partner' },
      },
      {
        sublever: 'New Markets & Offerings',
        usecase: 'Adjacent Market Sizing via External Data Synthesis',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'strategy',
        services: ['strategy'],
        airole:
          `LLM-assisted synthesis of external data (job postings as demand proxies, patent filings, web traffic trends, competitor pricing pages) to quantify size and accessibility of adjacent markets. Produces a market entry scorecard for 3-5 adjacencies ranked by revenue potential and execution fit, evidence a lean management team could not assemble in the same timeframe without dedicated research resources.`,
        anchor:
          `Crayon, Klue, AlphaSense for competitive intelligence. Bain and McKinsey use proprietary LLM research pipelines for market sizing (analogous). PE hold-period adjacency screening with AI is emerging.`,
        fit: 'Low',
        complexity: 'Medium',
        ttv: '4-6 wks per sprint',
        duration: '4-6 wks per sprint',
        deps: 'Clear definition of core business perimeter; licensed external data access; analyst capacity to validate synthesis.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Improve Sales',
        usecase: 'AI Sales Coach for Rep Enablement at Scale',
        phase: 'All Phases',
        tier: 'Both',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `Conversation intelligence platform analyzes recorded sales calls to score against a defined winning-call framework: talk-to-listen ratios, competitor mentions, objection handling, qualification methodology adherence. Surfaces specific coaching moments to managers in near-real-time, compressing the feedback loop from monthly 1:1s to weekly or daily insight.`,
        anchor:
          `Gong is the dominant tool and widely deployed at PE-backed B2B companies. Insight Partners drives Gong adoption as a standard value creation playbook item across its SaaS portfolio.`,
        fit: 'Low',
        complexity: 'Low',
        ttv: '2-4 wks',
        duration: '4-6 wks',
        deps: 'Sales team recording calls; defined sales methodology to benchmark against.',
        entry: { type: 'buy', label: 'Buy' },
      },
    ],
  },
  {
    key: 'margin',
    title: 'Margin Expansion',
    rows: [
      {
        sublever: 'Pricing Strategy',
        usecase: 'Price Elasticity Modeling & Discount Governance',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'strategy vc impl',
        services: ['strategy', 'vc', 'impl'],
        airole:
          `Ingests transaction-level pricing data to estimate price sensitivity by segment. Identifies where discounting is not correlated with win rate, i.e., where reps are giving away margin unnecessarily. Outputs a recommended discount floor by customer tier with a governance workflow that flags exceptions for approval. One of the highest-certainty AI applications because the data is internal and the causal mechanism is direct.`,
        anchor:
          `PROS Holdings, Vendavo, and Zilliant are the enterprise pricing AI platforms. Francisco Partners and Thoma Bravo have embedded pricing analytics at software portcos (analogous).`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '8-12 wks',
        duration: '14-20 wks',
        deps: 'Transaction-level invoice data with discount fields; 12+ months of history; CRM win/loss linked to pricing; sales leadership committed to enforcement.',
        entry: { type: 'buy', label: 'Buy + Partner' },
      },
      {
        sublever: 'Pricing Strategy',
        usecase: 'Dynamic Pricing Engine for Transaction-Intensive Businesses',
        phase: 'Mid-Hold',
        tier: 'Large-Cap',
        filterServices: 'vc impl platform',
        services: ['vc', 'impl', 'platform'],
        airole:
          `For portcos with high transaction volume (usage-based SaaS, e-commerce, B2B marketplace), ML model adjusts pricing in near-real-time based on demand signals, inventory levels, competitor pricing, and customer segment. Active price optimization, not just analysis. Requires sophisticated data infrastructure, rules out most mid-market portcos on data maturity grounds alone.`,
        anchor:
          `Zilliant, PROS, and Revionics (Aptos) for retail/distribution. Several TPG and Warburg Pincus distribution portcos have deployed dynamic pricing (analogous, not public).`,
        fit: 'Low',
        complexity: 'High',
        ttv: '20-28 wks',
        duration: '28-40 wks',
        deps: 'High-volume transaction data; modern data warehouse; pricing authority with management; systems that can receive dynamic pricing outputs.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Minimize COGS',
        usecase: 'Yield & Quality Defect Root Cause Analysis',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `For manufacturing portcos, ML model trained on production parameters cross-referenced against quality inspection outcomes identifies specific factor combinations that predict defects. Replaces manual SPC review with an always-on model. Directly reduces scrap rate, rework cost, and warranty expense, all COGS line items.`,
        anchor:
          `DataRobot and Seeq used in process manufacturing quality analytics. Mid-market PE application is emerging, particularly in food/bev and specialty chemicals.`,
        fit: 'Low',
        complexity: 'High',
        ttv: '12-20 wks',
        duration: '20-32 wks',
        deps: 'Structured production parameter logs; quality inspection data linked to production run IDs; MES or SCADA system.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Minimize COGS',
        usecase: 'Contract Abstraction for Billing Leakage Identification',
        phase: 'All Phases',
        tier: 'Both',
        filterServices: 'strategy vc impl',
        services: ['strategy', 'vc', 'impl'],
        airole:
          `LLMs extract key commercial terms from supplier and customer contracts at scale: pricing tiers, volume rebates, escalation clauses, MFN provisions, audit rights. Cross-references against actual billing data to identify where the company is not receiving contractual rebates, is being overbilled, or has favorable provisions it is not exercising. PE portcos routinely have 20-40% of contracts with some billing discrepancy when first audited. AI makes this systematic rather than a one-time manual review.`,
        anchor:
          `Icertis, Ironclad, and Evisort (now Workday) for AI contract extraction. Kira Systems used in legal due diligence; billing discrepancy application during hold period is analogous and emerging.`,
        fit: 'Low',
        complexity: 'Medium',
        ttv: '6-8 wks (initial pass)',
        duration: '10-14 wks',
        deps: 'Contracts in digital format; AP billing data for cross-reference; legal or commercial team to act on flagged discrepancies.',
        entry: { type: 'buy', label: 'Buy or Partner' },
      },
    ],
  },
  {
    key: 'inorganic',
    title: 'Inorganic',
    rows: [
      {
        sublever: 'Integrate Culture & Ops',
        usecase: 'Post-Merger Integration PMO with AI-Assisted Workstream Tracking',
        phase: '100-Day',
        tier: 'Both',
        filterServices: 'strategy impl managed',
        services: ['strategy', 'impl', 'managed'],
        airole:
          `LLM-powered IMO tool synthesizes cross-functional integration status reports (IT, HR, finance, commercial) to generate executive PMO dashboards, flag interdependency conflicts, and surface stalled workstreams before they become schedule slippage. The AI is synthesizing 15+ concurrent workstreams at a speed no human PMO lead can match in real time.`,
        anchor:
          `Workiva and Smartsheet for integration tracking. Bain and Accenture are building AI synthesis layers on top using proprietary LLM tooling (analogous). Pure-play AI PMO for M&A integration is emerging.`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '4-6 wks',
        duration: '12-20 wks',
        deps: 'Defined workstream list with owners and milestones; consistent status reporting cadence; executive PMO sponsor.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Realize Synergies',
        usecase: 'Cross-Portfolio Vendor Spend Consolidation Identification',
        phase: 'Mid-Hold',
        tier: 'Both',
        filterServices: 'strategy vc impl managed',
        services: ['strategy', 'vc', 'impl', 'managed'],
        airole:
          `AI classifies and normalizes vendor spend data across multiple portcos in a fund's portfolio, identifying where the same vendor or category appears across companies and where aggregated volume creates negotiating leverage. Generates a ranked consolidation list with estimated spend at risk. Requires fund-level data aggregation, which is exactly what PortCo Pulse enables as the collection layer.`,
        anchor:
          `Coupa and Jaggaer for cross-entity spend at enterprise level. Bridgepoint, Advent International have run manual versions of this analysis (analogous). AI-automated fund-level version is emerging and a genuine KPMG differentiation opportunity.`,
        fit: 'Medium',
        complexity: 'Medium',
        ttv: '8-12 wks post-collection',
        duration: '16-24 wks',
        deps: 'AP/vendor data from 2+ portcos; fund-level data sharing consent; commercial team to lead supplier conversations.',
        entry: { type: 'partner', label: 'Partner' },
      },
      {
        sublever: 'Integrate Culture & Ops',
        usecase: 'Employee Sentiment Monitoring During Integration',
        phase: '100-Day',
        tier: 'Both',
        filterServices: 'vc impl',
        services: ['vc', 'impl'],
        airole:
          `NLP model running on pulse survey responses (weekly, 3-5 questions) tracks sentiment trajectory by department, manager, and site during integration. Identifies declining sentiment in high-retention-risk populations before it manifests as attrition, e.g., acquired engineering team or key account managers. Provides an early warning signal that directs management attention during a high-distraction period.`,
        anchor:
          `Glint (LinkedIn), Culture Amp, and Qualtrics EmployeeXM offer AI sentiment analysis commercially. Integration-specific application is standard at large-cap sponsors; emerging at mid-market.`,
        fit: 'Low',
        complexity: 'Low',
        ttv: '3-4 wks',
        duration: '4-6 wks',
        deps: 'Employee email list for survey deployment; HR leadership willing to act on results.',
        entry: { type: 'buy', label: 'Buy' },
      },
    ],
  },
];

export const columns = [
  'Sub-Lever',
  'Use Case',
  'Phase',
  'Tier',
  'AI Role',
  'Real-World Anchor',
  'PortCo Pulse Fit \u2460',
  'Complexity',
  'Time to Value \u2461',
  'Project Duration \u2461',
  'Key Dependencies',
  'Entry Point',
  'KPMG Services',
];
