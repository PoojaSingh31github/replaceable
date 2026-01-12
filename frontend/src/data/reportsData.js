// Cover statistics
export const coverStats = [
  { value: '10', label: 'Future Roles Analyzed' },
  { value: '0.47', label: 'Sector RPI Score' },
  { value: '+23%', label: 'Net Employment Change' },
  { value: '2064', label: 'Target Year' }
];

// Executive summary cards
export const execCards = [
  {
    id: 1,
    title: 'Total Workforce Impact',
    value: '+23%',
    change: '▲ Net Job Creation',
    changeType: 'positive',
    description: 'From ~180,000 direct hospitality workers today to ~221,000 by 2064.'
  },
  {
    id: 2,
    title: 'Sector RPI Score',
    value: '0.47',
    change: 'Significant Transformation',
    changeType: 'negative',
    description: 'Substantial role restructuring while preserving employment through value elevation.'
  },
  {
    id: 3,
    title: 'Peak Transformation',
    value: '2048',
    change: '◆ Critical Inflection',
    changeType: 'neutral',
    description: 'The year when new role creation will overtake traditional role displacement.'
  }
];

// Future roles with full RPI analysis
export const roles = [
  {
    number: 1,
    title: 'Cultural Authenticity Director',
    timeline: '2035-2045',
    origin: 'Guest Relations + Cultural Guide',
    confidence: 'High',
    narrative: 'Certifies that guest interactions, culinary offerings, and cultural programs connect authentically to Goan heritage. They\'re the human guarantee that what guests experience is real—not algorithmically optimized entertainment.',
    tasks: [
      { name: 'Heritage program design', aps: 0.35, w: 0.25, hrf: 0.85, hraT: 0.013 },
      { name: 'Authenticity verification', aps: 0.20, w: 0.20, hrf: 0.90, hraT: 0.004 },
      { name: 'Community artisan relationships', aps: 0.15, w: 0.20, hrf: 0.95, hraT: 0.002 },
      { name: 'Guest cultural exchange', aps: 0.10, w: 0.25, hrf: 0.95, hraT: 0.001 },
      { name: 'Staff cultural training', aps: 0.40, w: 0.10, hrf: 0.70, hraT: 0.012 }
    ],
    rpiScore: '0.032'
  },
  {
    number: 2,
    title: 'Coastal Resilience Engineer',
    timeline: '2030-2040',
    origin: 'Facilities + Marine Engineer',
    confidence: 'High',
    narrative: 'Manages adaptive systems—floating platforms, dynamic seawalls, desalination networks—bridging engineering with generational knowledge of local fishing communities.',
    tasks: [
      { name: 'Infrastructure monitoring', aps: 0.75, w: 0.25, hrf: 0.40, hraT: 0.113 },
      { name: 'Emergency response', aps: 0.30, w: 0.15, hrf: 0.80, hraT: 0.009 },
      { name: 'Traditional knowledge integration', aps: 0.10, w: 0.20, hrf: 0.95, hraT: 0.001 },
      { name: 'Climate adaptation planning', aps: 0.45, w: 0.25, hrf: 0.60, hraT: 0.045 },
      { name: 'Guest safety communication', aps: 0.50, w: 0.15, hrf: 0.55, hraT: 0.034 }
    ],
    rpiScore: '0.202'
  },
  {
    number: 3,
    title: 'AI-Human Experience Orchestrator',
    timeline: '2040-2050',
    origin: 'Operations Manager',
    confidence: 'Moderate',
    narrative: 'When AI handles 70% of routine tasks, someone must choreograph the 30% where human presence creates value. Part conductor, part therapist, ensuring human touchpoints feel organic.',
    tasks: [
      { name: 'Human deployment decisions', aps: 0.55, w: 0.30, hrf: 0.65, hraT: 0.058 },
      { name: 'AI quality oversight', aps: 0.60, w: 0.20, hrf: 0.50, hraT: 0.060 },
      { name: 'Staff emotional coaching', aps: 0.25, w: 0.20, hrf: 0.85, hraT: 0.008 },
      { name: 'Guest journey design', aps: 0.40, w: 0.15, hrf: 0.75, hraT: 0.015 },
      { name: 'Human-AI friction resolution', aps: 0.30, w: 0.15, hrf: 0.80, hraT: 0.009 }
    ],
    rpiScore: '0.150'
  },
  {
    number: 4,
    title: 'Wellness Integration Therapist',
    timeline: '2030-2040',
    origin: null,
    confidence: 'High',
    narrative: 'Integrates Ayurvedic protocols with AI-driven biometric monitoring. The irreplaceable human elements—touch, presence, sacred space—anchor this role despite automation in diagnostics.',
    tasks: [],
    rpiScore: '0.125'
  },
  {
    number: 5,
    title: 'Regenerative Tourism Architect',
    timeline: '2035-2045',
    origin: null,
    confidence: 'Moderate',
    narrative: 'Designs hospitality that restores ecosystems and revitalizes communities. In Goa, reversing coastal degradation while creating premium experiences from the restoration process itself.',
    tasks: [],
    rpiScore: '0.142'
  },
  {
    number: 6,
    title: 'Culinary Heritage Curator',
    timeline: '2030-2040',
    origin: null,
    confidence: 'High',
    narrative: 'When molecular printers can replicate any flavor, what remains? The story, the technique, the human hand. Transforms meals into cultural transmission events.',
    tasks: [],
    rpiScore: '0.065'
  },
  {
    number: 7,
    title: 'Biometric Experience Analyst',
    timeline: '2040-2055',
    origin: null,
    confidence: 'Moderate',
    narrative: 'Interprets real-time guest emotional and physiological data to anticipate needs before guests articulate them. Bridges data science with hospitality intuition.',
    tasks: [],
    rpiScore: '0.385'
  },
  {
    number: 8,
    title: 'Historical Reconciliation Specialist',
    timeline: '2040-2055',
    origin: null,
    confidence: 'Speculative',
    narrative: 'Heritage tourism in post-colonial destinations requires handling wounds, not just wonders. Facilitates emotionally complex encounters with layered histories.',
    tasks: [],
    rpiScore: '0.088'
  },
  {
    number: 9,
    title: 'Autonomous Fleet Coordinator',
    timeline: '2045-2055',
    origin: null,
    confidence: 'Moderate',
    narrative: 'Manages robotic housekeeping, delivery, and service fleets. Handles exceptions, guest preferences for human intervention, and system optimization.',
    tasks: [],
    rpiScore: '0.520'
  },
  {
    number: 10,
    title: 'Longevity Concierge',
    timeline: '2050-2060',
    origin: null,
    confidence: 'Speculative',
    narrative: 'As extended healthy lifespan becomes a tourism category, coordinates medical, wellness, and lifestyle services for guests on multi-month rejuvenation stays.',
    tasks: [],
    rpiScore: '0.175'
  }
];

// Three scenarios
export const scenarios = [
  {
    id: 1,
    type: 'acceleration',
    title: 'Acceleration',
    description: 'AI adoption exceeds projections. Hospitality robotics penetration reaches 60% by 2045. Climate infrastructure investment accelerates globally.',
    outcome: 'Peak transformation occurs by 2042. Net employment +31% as Goa captures premium experience market share from degrading competitors.',
    indicator: {
      title: 'Early Indicators',
      text: 'Major hotel chains announce robot-first properties by 2028; India climate adaptation funding doubles by 2030.'
    }
  },
  {
    id: 2,
    type: 'baseline',
    title: 'Baseline',
    description: 'Current trajectory continues. Robotics CAGR 17-25%. Climate adaptation proceeds as planned. Authenticity regulations emerge mid-2030s.',
    outcome: 'Peak transformation in 2048. Net employment +23%. Goa establishes itself as the definitive cultural hospitality destination.',
    indicator: {
      title: 'Tracking Metrics',
      text: 'Monitor hospitality tech CapEx, tourism minister policy statements, WTTC employment reports.'
    }
  },
  {
    id: 3,
    type: 'disruption',
    title: 'Disruption',
    description: 'Economic downturn slows technology investment. Climate events exceed projections, forcing reactive rather than proactive adaptation.',
    outcome: 'Transformation delayed to 2055+. Temporary employment decline of -8% before recovery. Higher displacement friction.',
    indicator: {
      title: 'Warning Signs',
      text: 'Hotel tech investment flat for 3+ years; major coastal property closures; skill gap widening.'
    }
  }
];

// Recommendations by category
export const recommendations = {
  policymakers: [
    {
      title: 'Establish Cultural Authenticity Certification Framework',
      description: 'Create regulatory standards for heritage experience verification, preventing AI-generated cultural misrepresentation while enabling premium pricing for certified human-delivered experiences.'
    },
    {
      title: 'Invest in Climate-Adaptive Hospitality Infrastructure',
      description: 'Allocate ₹5,000 crore over 15 years for floating platforms, dynamic coastal defenses, and resilient utility systems that enable continued tourism operations.'
    },
    {
      title: 'Transform Hospitality Education Curriculum',
      description: 'Partner with hospitality institutes to introduce AI orchestration, climate resilience, and cultural curation tracks by 2028.'
    }
  ],
  industry: [
    {
      title: 'Begin Human-AI Orchestration Pilots Now',
      description: 'Deploy controlled experiments combining robotic service delivery with human touchpoint optimization. Build institutional knowledge before competitors.'
    },
    {
      title: 'Secure Cultural Heritage Partnerships',
      description: 'Establish long-term relationships with local artisan communities, traditional practitioners, and cultural institutions before authenticity becomes a competitive bottleneck.'
    },
    {
      title: 'Develop Climate Resilience as a Guest Experience',
      description: 'Position adaptive infrastructure not as a defensive necessity but as a premium attraction—guests participating in regenerative tourism.'
    }
  ],
  individuals: [
    {
      title: 'Cultivate Irreplaceable Human Skills',
      description: 'Invest in cultural fluency, emotional intelligence, and traditional craft knowledge. These appreciate in value as routine tasks automate.'
    },
    {
      title: 'Build AI-Collaboration Competencies',
      description: 'Learn to work alongside AI systems—monitoring, directing, and enhancing their outputs rather than competing with them.'
    },
    {
      title: 'Document and Preserve Heritage Knowledge',
      description: 'Become a bridge between generations. Those who can transmit authentic cultural knowledge will command premium positions.'
    }
  ]
};

// Prologue text
export const prologueText = `Priya Naik wakes at 5:47 AM to the soft amber glow of her heritage cottage in Candolim. The AI-managed climate system has already adjusted to the pre-monsoon humidity—a season that now arrives in late March rather than June, one of the many adaptations Goa has made since the great thermal shift of the 2040s. Through her window, she can see the rehabilitated coastline: the floating barrier reefs that replaced the eroded beaches of her grandmother's stories, now home to bioluminescent coral gardens that draw visitors from across the planet.

She holds the title of Cultural Authenticity Director at the Mandovi Heritage Collective—a consortium of twelve properties that merged their operations during the consolidation of 2051. Her role didn't exist when she completed her hospitality degree in 2038. Today, she's the custodian of something far more valuable: the verification that experiences are genuinely Goan.

By 6:30, Priya is reviewing the day's authenticity queue—flagged interactions where the property's ambient AI detected guests seeking deeper cultural connection. A retired professor from São Paulo wants to understand the kalamel fishing technique his great-grandmother described. A young couple from Seoul has asked about the significance of the mando songs. Each of these moments represents the economic engine of 2064 hospitality: the premium that guests pay for verified human connection to place, history, and craft.

At midday, she conducts what her job description calls a heritage immersion session—though her grandmother would have called it lunch with strangers. She sits with six guests in the property's restored Portuguese-era kitchen, where actual fire heats actual clay pots, and she teaches them to make sorpotel the way her family has for generations. The robots could prepare the dish more efficiently. But the experience economy of 2064 has proven that guests will pay 300% premiums for inefficiency—because that imperfection is the signature of human craft.

As evening falls over the rebuilt waterfront, Priya reviews her impact metrics. Not efficiency scores—those are handled entirely by systems now—but the measures that matter in 2064: emotional resonance ratings, cultural transmission depth, guest transformation indices. Walking home along the elevated coastal pathway—the old beach road now lies three meters underwater at high tide—she passes junior staff learning the evening aarti ceremony from an elder. This is the Goa of 2064: where the displacement of routine labor has created space for the elevation of meaning.`;

// Navigation sections for the report
export const navSections = [
  { id: 'executive', label: 'Executive Summary' },
  { id: 'prologue', label: '2064 Prologue' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'roles', label: 'Future Roles' },
  { id: 'charts', label: 'Analytics' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'implications', label: 'Implications' }
];
