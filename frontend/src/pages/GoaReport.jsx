import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import "./GoaReport.css";

const GoaReport = ({ reportData }) => {
  const [activeNav, setActiveNav] = useState("executive");
  const rpiRadarRef = useRef(null);
  const compositionRef = useRef(null);
  const timelineRef = useRef(null);
  const gauge1Ref = useRef(null);
  const gauge2Ref = useRef(null);
  const chartsInitialized = useRef(false);

  // Default data structure matching the HTML exactly
  const defaultData = {
    cover: {
      reportMeta: "Strategic Foresight Report · December 2024",
      title: "The <em>Goa</em> Hospitality Workforce of <em>2064</em>",
      subtitle:
        "A forty-year projection of workforce transformation in India's premier coastal tourism destination—where climate adaptation meets AI-augmented service excellence.",
      stats: [
        { value: "10", label: "Future Roles Analyzed" },
        { value: "0.47", label: "Sector RPI Score" },
        { value: "+23%", label: "Net Employment Change" },
        { value: "2064", label: "Target Year" },
      ],
    },
    navLinks: [
      { id: "executive", label: "Executive Summary" },
      { id: "prologue", label: "2064 Prologue" },
      { id: "methodology", label: "Methodology" },
      { id: "roles", label: "Future Roles" },
      { id: "charts", label: "Analytics" },
      { id: "scenarios", label: "Scenarios" },
      { id: "implications", label: "Implications" },
    ],
    executiveSummary: {
      paragraphs: [
        "<strong>The most striking finding:</strong> By 2064, Goa's hospitality workforce will have fundamentally inverted its skill pyramid. Today's dominant roles—room attendants, front desk agents, and food service workers—will represent less than 15% of total employment, while entirely new categories of work centered on climate resilience, cultural authentication, and human-AI orchestration will account for over 60% of positions.",
        "Our analysis projects a <strong>net positive employment trajectory of +23%</strong> despite an aggregate sector RPI (Replaceability Potential Index) of 0.47—indicating significant transformation. This counterintuitive finding emerges from Goa's unique positioning: as global beach destinations contract under climate pressure, Goa's early investment in adaptive infrastructure and its irreplaceable cultural heritage create employment categories that cannot be automated or relocated.",
        "The transformation will unfold across three distinct phases: <em>Augmentation</em> (2025-2040), where AI tools enhance existing roles; <em>Restructuring</em> (2040-2055), where new role categories emerge while traditional positions contract; and <em>Equilibrium</em> (2055-2064), where the human-AI service model stabilizes around premium, high-touch experiences that command global premiums.",
      ],
      cards: [
        {
          title: "Total Workforce Impact",
          value: "+23%",
          change: "▲ Net Job Creation",
          changeClass: "positive",
          desc: "From ~180,000 direct hospitality workers today to ~221,000 by 2064.",
        },
        {
          title: "Sector RPI Score",
          value: "0.47",
          change: "Significant Transformation",
          changeClass: "negative",
          desc: "Substantial role restructuring while preserving employment through value elevation.",
        },
        {
          title: "Peak Transformation",
          value: "2048",
          change: "◆ Critical Inflection",
          changeClass: "",
          desc: "The year when new role creation will overtake traditional role displacement.",
        },
      ],
    },
    prologue: `<p>Priya Naik wakes at 5:47 AM to the soft amber glow of her heritage cottage in Candolim. The AI-managed climate system has already adjusted to the pre-monsoon humidity—a season that now arrives in late March rather than June, one of the many adaptations Goa has made since the great thermal shift of the 2040s. Through her window, she can see the rehabilitated coastline: the floating barrier reefs that replaced the eroded beaches of her grandmother's stories, now home to bioluminescent coral gardens that draw visitors from across the planet.</p>
    <p>She holds the title of <em>Cultural Authenticity Director</em> at the Mandovi Heritage Collective—a consortium of twelve properties that merged their operations during the consolidation of 2051. Her role didn't exist when she completed her hospitality degree in 2038. Today, she's the custodian of something far more valuable: the verification that experiences are genuinely Goan.</p>
    <p>By 6:30, Priya is reviewing the day's <em>authenticity queue</em>—flagged interactions where the property's ambient AI detected guests seeking deeper cultural connection. A retired professor from São Paulo wants to understand the <em>kalamel</em> fishing technique his great-grandmother described. A young couple from Seoul has asked about the significance of the <em>mando</em> songs. Each of these moments represents the economic engine of 2064 hospitality: the premium that guests pay for verified human connection to place, history, and craft.</p>
    <p>At midday, she conducts what her job description calls a <em>heritage immersion session</em>—though her grandmother would have called it lunch with strangers. She sits with six guests in the property's restored Portuguese-era kitchen, where actual fire heats actual clay pots, and she teaches them to make <em>sorpotel</em> the way her family has for generations. The robots could prepare the dish more efficiently. But the experience economy of 2064 has proven that guests will pay 300% premiums for inefficiency—because that imperfection is the signature of human craft.</p>
    <p>As evening falls over the rebuilt waterfront, Priya reviews her impact metrics. Not efficiency scores—those are handled entirely by systems now—but the measures that matter in 2064: emotional resonance ratings, cultural transmission depth, guest transformation indices. Walking home along the elevated coastal pathway—the old beach road now lies three meters underwater at high tide—she passes junior staff learning the evening <em>aarti</em> ceremony from an elder. This is the Goa of 2064: where the displacement of routine labor has created space for the elevation of meaning.</p>`,
    methodology: {
      sources: [
        "World Travel & Tourism Council Employment Projections 2024-2035",
        "India Tourism Statistics 2023, Ministry of Tourism",
        "Goa State Action Plan on Climate Change (SAPCC)",
        "National Centre for Coastal Research Erosion Studies",
        "American Hotel & Lodging Association Workforce Reports 2024",
        "Hospitality Robots Market Analysis (Mordor Intelligence)",
        "BLS Occupational Outlook Handbook—Lodging Managers",
        "ScienceDirect: AI Adoption in Hospitality Research",
      ],
      assumptions: [
        {
          label: "Climate:",
          text: "40% of Goa's low-lying areas impacted by 2050; adaptive infrastructure by 2030",
        },
        {
          label: "Technology:",
          text: "Hospitality robotics CAGR 17-25% through 2040; AI-human models mature by 2045",
        },
        {
          label: "Regulation:",
          text: "Cultural authenticity frameworks by 2035; human-interaction minimums by 2040",
        },
        {
          label: "Economics:",
          text: "India remains top-5 tourism destination; Goa's premium positioning strengthens",
        },
        {
          label: "Demographics:",
          text: "Hospitality training capacity doubles by 2040",
        },
      ],
      rpiFramework:
        "The Replaceability Potential Index decomposes roles into tasks, scored across: <strong>APS</strong> (Automation Probability Score, 0-1), <strong>W</strong> (Weight/time proportion), <strong>HRF</strong> (Human Resilience Factor, 0-1). Task score: HRA_t = APS × W × (1-HRF). Role RPI = Σ HRA_t",
    },
    roles: [
      {
        number: "01",
        title: "Cultural Authenticity Director",
        emergencePeriod: "2035-2045",
        origin: "From: Guest Relations + Cultural Guide",
        confidence: "High Confidence",
        confidenceClass: "confidence-high",
        narrative:
          "Certifies that guest interactions, culinary offerings, and cultural programs connect authentically to Goan heritage. They're the human guarantee that what guests experience is real—not algorithmically optimized entertainment.",
        rpiScore: 0.032,
        tasks: [
          {
            task: "Heritage program design",
            aps: 0.35,
            w: 0.25,
            hrf: 0.85,
            hrat: 0.013,
          },
          {
            task: "Authenticity verification",
            aps: 0.2,
            w: 0.2,
            hrf: 0.9,
            hrat: 0.004,
          },
          {
            task: "Community artisan relationships",
            aps: 0.15,
            w: 0.2,
            hrf: 0.95,
            hrat: 0.002,
          },
          {
            task: "Guest cultural exchange",
            aps: 0.1,
            w: 0.25,
            hrf: 0.95,
            hrat: 0.001,
          },
          {
            task: "Staff cultural training",
            aps: 0.4,
            w: 0.1,
            hrf: 0.7,
            hrat: 0.012,
          },
        ],
        gaugeInfo: {
          title: "Human-Resilient (0.03)",
          desc: "Pinnacle of automation-proof work. Authenticating human connection to culture is precisely what AI cannot replicate.",
        },
        causalChain: [
          "AI Content Saturation",
          "Authenticity Premium",
          "Cultural Authenticity Director",
        ],
        showGauge: true,
        showCausalChain: true,
      },
      {
        number: "02",
        title: "Coastal Resilience Engineer",
        emergencePeriod: "2030-2040",
        origin: "From: Facilities + Marine Engineer",
        confidence: "High Confidence",
        confidenceClass: "confidence-high",
        narrative:
          "Manages adaptive systems—floating platforms, dynamic seawalls, desalination networks—bridging engineering with generational knowledge of local fishing communities.",
        rpiScore: 0.202,
        tasks: [
          {
            task: "Infrastructure monitoring",
            aps: 0.75,
            w: 0.25,
            hrf: 0.4,
            hrat: 0.113,
          },
          {
            task: "Emergency response",
            aps: 0.3,
            w: 0.15,
            hrf: 0.8,
            hrat: 0.009,
          },
          {
            task: "Traditional knowledge integration",
            aps: 0.1,
            w: 0.2,
            hrf: 0.95,
            hrat: 0.001,
          },
          {
            task: "Climate adaptation planning",
            aps: 0.45,
            w: 0.25,
            hrf: 0.6,
            hrat: 0.045,
          },
          {
            task: "Guest safety communication",
            aps: 0.5,
            w: 0.15,
            hrf: 0.55,
            hrat: 0.034,
          },
        ],
        gaugeInfo: {
          title: "Human-Resilient (0.20)",
          desc: "Traditional knowledge and emergency judgment keep this role firmly in human territory.",
        },
        showGauge: true,
        showCausalChain: false,
      },
      {
        number: "03",
        title: "AI-Human Experience Orchestrator",
        emergencePeriod: "2040-2050",
        origin: "From: Operations Manager",
        confidence: "Moderate",
        confidenceClass: "confidence-moderate",
        narrative:
          "When AI handles 70% of routine tasks, someone must choreograph the 30% where human presence creates value. Part conductor, part therapist, ensuring human touchpoints feel organic.",
        rpiScore: 0.15,
        tasks: [
          {
            task: "Human deployment decisions",
            aps: 0.55,
            w: 0.3,
            hrf: 0.65,
            hrat: 0.058,
          },
          {
            task: "AI quality oversight",
            aps: 0.6,
            w: 0.2,
            hrf: 0.5,
            hrat: 0.06,
          },
          {
            task: "Staff emotional coaching",
            aps: 0.25,
            w: 0.2,
            hrf: 0.85,
            hrat: 0.008,
          },
          {
            task: "Guest journey design",
            aps: 0.4,
            w: 0.15,
            hrf: 0.75,
            hrat: 0.015,
          },
          {
            task: "Human-AI friction resolution",
            aps: 0.3,
            w: 0.15,
            hrf: 0.8,
            hrat: 0.009,
          },
        ],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "04",
        title: "Wellness Integration Therapist",
        emergencePeriod: "2030-2040",
        origin: "RPI: 0.125",
        confidence: "High",
        confidenceClass: "confidence-high",
        narrative:
          "Integrates Ayurvedic protocols with AI-driven biometric monitoring. The irreplaceable human elements—touch, presence, sacred space—anchor this role despite automation in diagnostics.",
        rpiScore: 0.125,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "05",
        title: "Regenerative Tourism Architect",
        emergencePeriod: "2035-2045",
        origin: "RPI: 0.142",
        confidence: "Moderate",
        confidenceClass: "confidence-moderate",
        narrative:
          "Designs hospitality that restores ecosystems and revitalizes communities. In Goa, reversing coastal degradation while creating premium experiences from the restoration process itself.",
        rpiScore: 0.142,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "06",
        title: "Culinary Heritage Curator",
        emergencePeriod: "2030-2040",
        origin: "RPI: 0.065",
        confidence: "High",
        confidenceClass: "confidence-high",
        narrative:
          "When molecular printers can replicate any flavor, what remains? The story, the technique, the human hand. Transforms meals into cultural transmission events.",
        rpiScore: 0.065,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "07",
        title: "Biometric Experience Analyst",
        emergencePeriod: "2040-2055",
        origin: "RPI: 0.385",
        confidence: "Moderate",
        confidenceClass: "confidence-moderate",
        narrative:
          "Interprets real-time guest emotional and physiological data to anticipate needs before guests articulate them. Bridges data science with hospitality intuition.",
        rpiScore: 0.385,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "08",
        title: "Historical Reconciliation Specialist",
        emergencePeriod: "2040-2055",
        origin: "RPI: 0.088",
        confidence: "Speculative",
        confidenceClass: "confidence-speculative",
        narrative:
          "Heritage tourism in post-colonial destinations requires handling wounds, not just wonders. Facilitates emotionally complex encounters with layered histories.",
        rpiScore: 0.088,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "09",
        title: "Autonomous Fleet Coordinator",
        emergencePeriod: "2045-2055",
        origin: "RPI: 0.520",
        confidence: "Moderate",
        confidenceClass: "confidence-moderate",
        narrative:
          "Manages robotic housekeeping, delivery, and service fleets. Handles exceptions, guest preferences for human intervention, and system optimization.",
        rpiScore: 0.52,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
      {
        number: "10",
        title: "Longevity Concierge",
        emergencePeriod: "2050-2060",
        origin: "RPI: 0.175",
        confidence: "Speculative",
        confidenceClass: "confidence-speculative",
        narrative:
          "As extended healthy lifespan becomes a tourism category, coordinates medical, wellness, and lifestyle services for guests on multi-month rejuvenation stays.",
        rpiScore: 0.175,
        tasks: [],
        showGauge: false,
        showCausalChain: false,
      },
    ],
    scenarios: [
      {
        type: "acceleration",
        title: "Acceleration",
        description:
          "AI adoption exceeds projections. Hospitality robotics penetration reaches 60% by 2045. Climate infrastructure investment accelerates globally.",
        outcome:
          "Peak transformation occurs by 2042. Net employment +31% as Goa captures premium experience market share from degrading competitors.",
        indicatorLabel: "Early Indicators",
        indicatorText:
          "Major hotel chains announce robot-first properties by 2028; India climate adaptation funding doubles by 2030.",
      },
      {
        type: "baseline",
        title: "Baseline",
        description:
          "Current trajectory continues. Robotics CAGR 17-25%. Climate adaptation proceeds as planned. Authenticity regulations emerge mid-2030s.",
        outcome:
          "Peak transformation in 2048. Net employment +23%. Goa establishes itself as the definitive cultural hospitality destination.",
        indicatorLabel: "Tracking Metrics",
        indicatorText:
          "Monitor hospitality tech CapEx, tourism minister policy statements, WTTC employment reports.",
      },
      {
        type: "disruption",
        title: "Disruption",
        description:
          "Economic downturn slows technology investment. Climate events exceed projections, forcing reactive rather than proactive adaptation.",
        outcome:
          "Transformation delayed to 2055+. Temporary employment decline of -8% before recovery. Higher displacement friction.",
        indicatorLabel: "Warning Signs",
        indicatorText:
          "Hotel tech investment flat for 3+ years; major coastal property closures; skill gap widening.",
      },
    ],
    implications: {
      policymakers: [
        {
          title: "Establish Cultural Authenticity Certification Framework",
          desc: "Create regulatory standards for heritage experience verification, preventing AI-generated cultural misrepresentation while enabling premium pricing for certified human-delivered experiences.",
        },
        {
          title: "Invest in Climate-Adaptive Hospitality Infrastructure",
          desc: "Allocate ₹5,000 crore over 15 years for floating platforms, dynamic coastal defenses, and resilient utility systems that enable continued tourism operations.",
        },
        {
          title: "Transform Hospitality Education Curriculum",
          desc: "Partner with hospitality institutes to introduce AI orchestration, climate resilience, and cultural curation tracks by 2028.",
        },
      ],
      industryLeaders: [
        {
          title: "Begin Human-AI Orchestration Pilots Now",
          desc: "Deploy controlled experiments combining robotic service delivery with human touchpoint optimization. Build institutional knowledge before competitors.",
        },
        {
          title: "Secure Cultural Heritage Partnerships",
          desc: "Establish long-term relationships with local artisan communities, traditional practitioners, and cultural institutions before authenticity becomes a competitive bottleneck.",
        },
        {
          title: "Develop Climate Resilience as a Guest Experience",
          desc: "Position adaptive infrastructure not as a defensive necessity but as a premium attraction—guests participating in regenerative tourism.",
        },
      ],
      individuals: [
        {
          title: "Cultivate Irreplaceable Human Skills",
          desc: "Invest in cultural fluency, emotional intelligence, and traditional craft knowledge. These appreciate in value as routine tasks automate.",
        },
        {
          title: "Build AI-Collaboration Competencies",
          desc: "Learn to work alongside AI systems—monitoring, directing, and enhancing their outputs rather than competing with them.",
        },
        {
          title: "Document and Preserve Heritage Knowledge",
          desc: "Become a bridge between generations. Those who can transmit authentic cultural knowledge will command premium positions.",
        },
      ],
    },
    cta: {
      title: "Unlock the Full Report",
      subtitle:
        "This executive briefing represents 20% of our complete analysis. Access detailed methodology, extended role profiles, and bespoke scenario modeling.",
      primaryButton: "Purchase Full Report",
      secondaryButton: "Request Bespoke Analysis",
    },
  };

  const data = reportData || defaultData;

  // Draw gauge helper function
  const drawGauge = (canvas, value, max = 1) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 0.25 * Math.PI);
    ctx.strokeStyle = "#e8e8e8";
    ctx.lineWidth = 12;
    ctx.stroke();

    // Value arc
    const endAngle = 0.75 * Math.PI + (value / max) * 1.5 * Math.PI;
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      0.75 * Math.PI,
      Math.min(endAngle, 0.25 * Math.PI + 2 * Math.PI)
    );
    ctx.strokeStyle =
      value < 0.2
        ? "#0d7377"
        : value < 0.4
        ? "#4a5568"
        : value < 0.6
        ? "#b8860b"
        : "#c41e3a";
    ctx.lineWidth = 12;
    ctx.stroke();
  };

  useEffect(() => {
    if (chartsInitialized.current) return;

    // Initialize Charts
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#2d2d2d";

    // RPI Radar Chart
    if (rpiRadarRef.current) {
      new Chart(rpiRadarRef.current, {
        type: "radar",
        data: {
          labels: [
            "Cultural Authenticity",
            "Coastal Resilience",
            "AI-Human Orchestrator",
            "Wellness Integration",
            "Regenerative Tourism",
            "Culinary Heritage",
            "Biometric Analyst",
            "Historical Reconciliation",
            "Fleet Coordinator",
            "Longevity Concierge",
          ],
          datasets: [
            {
              label: "RPI Score",
              data: [
                0.032, 0.202, 0.15, 0.125, 0.142, 0.065, 0.385, 0.088, 0.52,
                0.175,
              ],
              backgroundColor: "rgba(196, 30, 58, 0.2)",
              borderColor: "#c41e3a",
              borderWidth: 2,
              pointBackgroundColor: "#c41e3a",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 0.6,
              ticks: { stepSize: 0.1 },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    // Composition Chart
    if (compositionRef.current) {
      new Chart(compositionRef.current, {
        type: "bar",
        data: {
          labels: [
            "Operations",
            "F&B Service",
            "Experience Design",
            "Climate/Infrastructure",
            "Cultural/Heritage",
            "Technology",
            "Wellness",
            "Management",
          ],
          datasets: [
            {
              label: "2024",
              data: [45, 30, 3, 2, 5, 3, 5, 7],
              backgroundColor: "#4a5568",
            },
            {
              label: "2064",
              data: [15, 10, 20, 18, 15, 8, 7, 7],
              backgroundColor: "#c41e3a",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "% of Workforce" },
            },
          },
          plugins: {
            title: { display: false },
          },
        },
      });
    }

    // Timeline Chart
    if (timelineRef.current) {
      new Chart(timelineRef.current, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "High Confidence",
              data: [
                { x: 2035, y: 0.032 },
                { x: 2032, y: 0.202 },
                { x: 2033, y: 0.125 },
                { x: 2035, y: 0.065 },
              ],
              backgroundColor: "#0d7377",
              pointRadius: 8,
            },
            {
              label: "Moderate Confidence",
              data: [
                { x: 2045, y: 0.15 },
                { x: 2040, y: 0.142 },
                { x: 2047, y: 0.385 },
                { x: 2050, y: 0.52 },
              ],
              backgroundColor: "#b8860b",
              pointRadius: 8,
            },
            {
              label: "Speculative",
              data: [
                { x: 2048, y: 0.088 },
                { x: 2055, y: 0.175 },
              ],
              backgroundColor: "#c41e3a",
              pointRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              min: 2025,
              max: 2065,
              title: { display: true, text: "Emergence Year" },
            },
            y: {
              min: 0,
              max: 0.6,
              title: { display: true, text: "RPI Score" },
            },
          },
        },
      });
    }

    // Draw gauges
    if (gauge1Ref.current) {
      drawGauge(gauge1Ref.current, 0.032);
    }
    if (gauge2Ref.current) {
      drawGauge(gauge2Ref.current, 0.202);
    }

    chartsInitialized.current = true;
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="goa-report">
      {/* Masthead */}
      <header className="masthead">
        <div className="masthead-inner">
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <Link to="/" className="logo">
              Replace<span>able</span>.ai
            </Link>
            <span className="logo-tagline">
              Professional Augmentation · Industry Intelligence
            </span>
          </div>
          <span className="series-badge">Horizon Scan Series</span>
        </div>
      </header>

      {/* Cover Section */}
      <section className="cover">
        <div className="cover-content">
          <div className="report-meta">{data.cover.reportMeta}</div>
          <h1 dangerouslySetInnerHTML={{ __html: data.cover.title }} />
          <p className="cover-subtitle">{data.cover.subtitle}</p>
          <div className="cover-stats">
            {data.cover.stats.map((stat, index) => (
              <div className="cover-stat" key={index}>
                <div className="cover-stat-value">{stat.value}</div>
                <div className="cover-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-inner">
          {data.navLinks.map((link) => (
            <span
              key={link.id}
              className={`nav-link ${activeNav === link.id ? "active" : ""}`}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </span>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="content">
        {/* Executive Summary */}
        <section id="executive" className="section">
          <div className="section-header">
            <div className="section-number">Section I</div>
            <h2>Executive Synthesis</h2>
          </div>
          {data.executiveSummary.paragraphs.map((para, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
          <div className="exec-grid">
            {data.executiveSummary.cards.map((card, index) => (
              <div className="exec-card" key={index}>
                <div className="exec-card-title">{card.title}</div>
                <div className="exec-card-value">{card.value}</div>
                <div
                  className={`exec-card-change ${card.changeClass}`}
                  style={
                    card.changeClass === "" ? { color: "var(--grey)" } : {}
                  }
                >
                  {card.change}
                </div>
                <div className="exec-card-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Prologue */}
        <section id="prologue" className="section">
          <div className="section-header">
            <div className="section-number">Section II</div>
            <h2>The World of 2064: Narrative Prologue</h2>
          </div>
          <div className="prologue">
            <div
              className="prologue-content"
              dangerouslySetInnerHTML={{ __html: data.prologue }}
            />
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="section">
          <div className="section-header">
            <div className="section-number">Section III</div>
            <h2>Methodology & Assumptions</h2>
          </div>
          <div className="two-col">
            <div>
              <h3>Research Sources</h3>
              <ul className="sources-list">
                {data.methodology.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Key Assumptions</h3>
              <ul className="sources-list">
                {data.methodology.assumptions.map((assumption, index) => (
                  <li key={index}>
                    <strong>{assumption.label}</strong> {assumption.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="methodology-box">
            <h4>RPI Framework</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: data.methodology.rpiFramework,
              }}
            />
            <div className="rpi-scale">
              <div className="rpi-segment">
                <div className="rpi-segment-value">0.00-0.20</div>Human
                Resilient
              </div>
              <div className="rpi-segment">
                <div className="rpi-segment-value">0.21-0.40</div>Augmentation
              </div>
              <div className="rpi-segment">
                <div className="rpi-segment-value">0.41-0.60</div>Transformation
              </div>
              <div className="rpi-segment">
                <div className="rpi-segment-value">0.61-0.80</div>High
                Displacement
              </div>
              <div className="rpi-segment">
                <div className="rpi-segment-value">0.81-1.00</div>Near-Complete
              </div>
            </div>
          </div>
        </section>

        {/* Future Roles */}
        <section id="roles" className="section">
          <div className="section-header">
            <div className="section-number">Section IV</div>
            <h2>Future Roles Analysis</h2>
          </div>

          {data.roles.map((role, index) => (
            <div className="role-card" key={index}>
              <div className="role-header">
                <span className="role-number">{role.number}</span>
                <div className="role-title-block">
                  <div className="role-title">{role.title}</div>
                  <div className="role-meta">
                    <span>📅 {role.emergencePeriod}</span>
                    <span>🎯 {role.origin}</span>
                  </div>
                </div>
                <span className={`confidence-badge ${role.confidenceClass}`}>
                  {role.confidence}
                </span>
              </div>
              <div className="role-body">
                <div className="role-narrative">{role.narrative}</div>

                {role.tasks.length > 0 && (
                  <table className="rpi-table">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>APS</th>
                        <th>W</th>
                        <th>HRF</th>
                        <th>HRA_t</th>
                      </tr>
                    </thead>
                    <tbody>
                      {role.tasks.map((task, taskIndex) => (
                        <tr key={taskIndex}>
                          <td>{task.task}</td>
                          <td>{task.aps}</td>
                          <td>{task.w}</td>
                          <td>{task.hrf}</td>
                          <td className="rpi-score-cell">{task.hrat}</td>
                        </tr>
                      ))}
                      <tr className="rpi-total-row">
                        <td colSpan="4">
                          <strong>ROLE RPI</strong>
                        </td>
                        <td className="rpi-score-cell">
                          <strong>{role.rpiScore}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {role.showGauge && role.gaugeInfo && (
                  <div className="gauge-container">
                    <canvas
                      ref={
                        index === 0 ? gauge1Ref : index === 1 ? gauge2Ref : null
                      }
                      width="100"
                      height="100"
                    />
                    <div className="gauge-info">
                      <h5>{role.gaugeInfo.title}</h5>
                      <p>{role.gaugeInfo.desc}</p>
                    </div>
                  </div>
                )}

                {role.showCausalChain && role.causalChain && (
                  <div className="causal-chain">
                    {role.causalChain.map((node, nodeIndex) => (
                      <span key={nodeIndex}>
                        <span
                          className={`causal-node ${
                            nodeIndex === 0
                              ? "current"
                              : nodeIndex === role.causalChain.length - 1
                              ? "outcome"
                              : ""
                          }`}
                        >
                          {node}
                        </span>
                        {nodeIndex < role.causalChain.length - 1 && (
                          <span className="causal-arrow">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section id="charts" className="section">
          <div className="section-header">
            <div className="section-number">Section V</div>
            <h2>Analytics Dashboard</h2>
          </div>

          <div className="charts-grid">
            <div className="chart-container">
              <div className="chart-title">
                RPI Distribution Across Future Roles
              </div>
              <canvas ref={rpiRadarRef} height="300"></canvas>
            </div>

            <div className="chart-container">
              <div className="chart-title">
                Workforce Composition Shift: 2024 → 2064
              </div>
              <canvas ref={compositionRef} height="250"></canvas>
            </div>

            <div className="chart-container">
              <div className="chart-title">Role Emergence Timeline</div>
              <canvas ref={timelineRef} height="200"></canvas>
            </div>
          </div>
        </section>

        {/* Scenarios */}
        <section id="scenarios" className="section">
          <div className="section-header">
            <div className="section-number">Section VI</div>
            <h2>Three Scenarios</h2>
          </div>
          <div className="scenario-grid">
            {data.scenarios.map((scenario, index) => (
              <div className={`scenario-card ${scenario.type}`} key={index}>
                <div className="scenario-title">{scenario.title}</div>
                <div className="scenario-desc">{scenario.description}</div>
                <p>
                  <strong>Outcome:</strong> {scenario.outcome}
                </p>
                <div className="scenario-indicator">
                  <strong>{scenario.indicatorLabel}</strong>
                  {scenario.indicatorText}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implications */}
        <section id="implications" className="section">
          <div className="section-header">
            <div className="section-number">Section VII</div>
            <h2>Strategic Implications</h2>
          </div>

          <div className="rec-category">
            <div className="rec-category-title">For Policymakers</div>
            <ol className="rec-list">
              {data.implications.policymakers.map((rec, index) => (
                <li className="rec-item" key={index}>
                  <h5>{rec.title}</h5>
                  <p>{rec.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rec-category">
            <div className="rec-category-title">For Industry Leaders</div>
            <ol className="rec-list">
              {data.implications.industryLeaders.map((rec, index) => (
                <li className="rec-item" key={index}>
                  <h5>{rec.title}</h5>
                  <p>{rec.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rec-category">
            <div className="rec-category-title">For Individuals</div>
            <ol className="rec-list">
              {data.implications.individuals.map((rec, index) => (
                <li className="rec-item" key={index}>
                  <h5>{rec.title}</h5>
                  <p>{rec.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-title">{data.cta.title}</div>
          <p className="cta-subtitle">{data.cta.subtitle}</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">
              {data.cta.primaryButton}
            </a>
            <a href="#" className="btn btn-secondary">
              {data.cta.secondaryButton}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          Replace<span>able</span>.ai
        </div>
        <p className="footer-text">
          Professional Augmentation · Industry Intelligence
          <br />© 2024 Replaceable.ai · Horizon Scan Series
        </p>
      </footer>
    </div>
  );
};

export default GoaReport;
