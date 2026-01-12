// Pillars data for methodology section
export const pillars = [
  {
    id: 1,
    number: '01',
    title: 'Research-First',
    description: 'Eight or more distinct sources per report. SEC filings, academic research, BLS projections, industry analyses—synthesized and validated before any speculation begins.',
    icon: 'cube'
  },
  {
    id: 2,
    number: '02',
    title: 'Task-Level Analysis',
    description: 'Not "this job will automate" but "these five tasks within this role will automate while these three will appreciate in value." Granular insight that survives contact with reality.',
    icon: 'grid'
  },
  {
    id: 3,
    number: '03',
    title: 'Narrative Immersion',
    description: 'Every report opens with a literary prologue. Meet the person of 2064 before you see the data. Make the future feel inevitable yet surprising. Strategy through story.',
    icon: 'chart'
  },
  {
    id: 4,
    number: '04',
    title: 'Actionable Now',
    description: 'Specific recommendations for policymakers, industry leaders, and individuals. Strategy you can implement today for futures you can\'t yet see. Long-range thinking, near-term action.',
    icon: 'clock'
  }
];

// Reports data for the reports grid
export const reports = [
  {
    id: 1,
    label: 'December 2024 · Inaugural Report',
    title: 'Goa Hospitality 2064',
    meta: 'Tourism & Leisure · India (Goa) · 40-Year Horizon',
    icon: '🏝️',
    stats: [
      { value: '10', label: 'Future Roles' },
      { value: '0.47', label: 'Sector RPI' },
      { value: '+23%', label: 'Net Jobs' }
    ],
    isComingSoon: false,
    link: '/reports'
  },
  {
    id: 2,
    label: 'Coming Soon',
    title: 'UK Healthcare 2065',
    meta: 'NHS & Private Healthcare · United Kingdom · 40-Year Horizon',
    icon: '🏥',
    stats: [
      { value: '—', label: 'In Research' }
    ],
    isComingSoon: true,
    comingBadge: 'Q1 2025'
  },
  {
    id: 3,
    label: 'Coming Soon',
    title: 'German Manufacturing 2074',
    meta: 'Automotive & Industrial · Germany · 50-Year Horizon',
    icon: '🏭',
    stats: [
      { value: '—', label: 'Scoping' }
    ],
    isComingSoon: true,
    comingBadge: 'Q2 2025'
  }
];

// Enterprise packages
export const packages = [
  {
    id: 1,
    name: 'Horizon Report',
    tagline: 'The foundational analysis',
    features: [
      '25-100 year custom workforce projection',
      '10+ future role analyses with RPI™ scores',
      'Company-specific succession mapping',
      'Three scenario frameworks (acceleration/baseline/disruption)',
      'Executive-ready PDF report (40-60 pages)',
      'Full methodology appendix with sources'
    ],
    isFeatured: false
  },
  {
    id: 2,
    name: 'Strategic Workshop',
    tagline: 'Report + leadership activation',
    features: [
      'Everything in Horizon Report',
      'Half-day executive workshop (virtual/in-person)',
      'Interactive scenario planning facilitation',
      'Board-ready presentation deck (50+ slides)',
      { text: 'Custom infographic suite', highlight: '5 visuals' },
      '90-day implementation consultation'
    ],
    isFeatured: true,
    badge: 'Most Selected'
  },
  {
    id: 3,
    name: 'Full Immersion',
    tagline: 'Complete transformation package',
    features: [
      'Everything in Strategic Workshop',
      'Full-day leadership immersion program',
      { text: 'Private podcast episode', highlight: '30-45 min' },
      { text: 'Animated explainer video', highlight: '2-3 min' },
      { text: 'Complete infographic library', highlight: '12+ visuals' },
      'Quarterly check-ins for 12 months',
      'Internal distribution license'
    ],
    isFeatured: false
  }
];

// Deliverables for enterprise section
export const deliverables = [
  {
    id: 1,
    title: 'Strategic Report',
    description: 'Comprehensive analysis with full RPI methodology, scenario planning, and implementation roadmap. Print-ready, brand-aligned.',
    icon: 'document'
  },
  {
    id: 2,
    title: 'Private Podcast',
    description: '30-45 minute audio deep-dive featuring our analysts discussing your specific findings. Executive commute content.',
    icon: 'play'
  },
  {
    id: 3,
    title: 'Presentation Deck',
    description: '50+ slides engineered for board presentations and town halls. Key findings, visualizations, and talking points.',
    icon: 'presentation'
  },
  {
    id: 4,
    title: 'Infographic Suite',
    description: 'Visual summaries of RPI scores, succession maps, and scenarios. Optimized for internal communications and print.',
    icon: 'image'
  }
];

// Methodology layers
export const methodologyLayers = [
  {
    id: 1,
    number: '01',
    title: 'Foundation Research',
    description: '8-12 distinct source categories per report. Academic literature, government statistics, industry analyses, patent databases, regulatory filings—synthesized and validated.'
  },
  {
    id: 2,
    number: '02',
    title: 'Task Decomposition',
    description: 'Every role analyzed at task level. Time allocation, skill requirements, automation exposure, and human resilience factors scored independently then aggregated.'
  },
  {
    id: 3,
    number: '03',
    title: 'Scenario Modeling',
    description: 'Three scenario tracks per projection: acceleration, baseline, disruption. Each with explicit trigger conditions, leading indicators, and confidence bounds.'
  },
  {
    id: 4,
    number: '04',
    title: 'Narrative Integration',
    description: 'Data becomes story. Future roles given names, contexts, career paths. Abstract projections translated into human experience that leaders can feel, not just analyze.'
  }
];

// Industry options for booking form
export const industries = [
  'Healthcare & Life Sciences',
  'Financial Services',
  'Manufacturing & Industrial',
  'Technology & Software',
  'Retail & Consumer',
  'Energy & Utilities',
  'Hospitality & Tourism',
  'Professional Services',
  'Public Sector',
  'Other'
];
