import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
import consultationsService from "../services/consultationsService";
import reportsService from "../services/reportsService";
import "./HorizonPage.css";

const HorizonPage = () => {
  const canvasRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
    phone: "",
    industry: "",
    month: "",
    day: "",
    year: "",
    interests: [],
    message: "",
  });

  // Background canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const connections = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 30, 58, 0.3)";
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196, 30, 58, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setReportsLoading(true);
        const data = await reportsService.getPublishedReports();
        // Transform API data to match our card format
        const transformedReports = data.map((report) => ({
          id: report.slug,
          label: report.industry || "Industry Analysis",
          title: report.title,
          meta: `${
            report.target_year
              ? report.target_year -
                new Date().getFullYear() +
                "-year projection"
              : "Analysis"
          } · ${report.region || "Global"}`,
          stats: [
            { value: "37%", label: "Role Change" },
            { value: "0.47", label: "Avg RPI" },
            { value: "10", label: "Roles Mapped" },
          ],
          year: report.target_year?.toString() || "2064",
          available: true,
        }));

        // Add placeholder reports for upcoming ones
        const placeholderReports = [
          {
            id: "dubai-finance-2074",
            label: "Financial Services",
            title: "Dubai Finance 2074",
            meta: "50-year projection · UAE",
            stats: [
              { value: "52%", label: "Role Change" },
              { value: "4.6", label: "Avg RPI" },
              { value: "31", label: "Roles Mapped" },
            ],
            year: "2074",
            available: false,
          },
          {
            id: "singapore-healthcare-2054",
            label: "Healthcare Systems",
            title: "Singapore Healthcare 2054",
            meta: "30-year projection · Southeast Asia",
            stats: [
              { value: "41%", label: "Role Change" },
              { value: "3.9", label: "Avg RPI" },
              { value: "28", label: "Roles Mapped" },
            ],
            year: "2054",
            available: false,
          },
        ];

        setReports([...transformedReports, ...placeholderReports]);
      } catch (error) {
        console.error("Error fetching reports:", error);
        // Fallback to hardcoded reports if API fails
        setReports([
          {
            id: "goa-hospitality-2064",
            label: "Hospitality Futures",
            title: "Goa Hospitality 2064",
            meta: "40-year projection · Coastal India",
            stats: [
              { value: "37%", label: "Role Change" },
              { value: "4.2", label: "Avg RPI" },
              { value: "24", label: "Roles Mapped" },
            ],
            year: "2064",
            available: true,
          },
          {
            id: "dubai-finance-2074",
            label: "Financial Services",
            title: "Dubai Finance 2074",
            meta: "50-year projection · UAE",
            stats: [
              { value: "52%", label: "Role Change" },
              { value: "4.6", label: "Avg RPI" },
              { value: "31", label: "Roles Mapped" },
            ],
            year: "2074",
            available: false,
          },
          {
            id: "singapore-healthcare-2054",
            label: "Healthcare Systems",
            title: "Singapore Healthcare 2054",
            meta: "30-year projection · Southeast Asia",
            stats: [
              { value: "41%", label: "Role Change" },
              { value: "3.9", label: "Avg RPI" },
              { value: "28", label: "Roles Mapped" },
            ],
            year: "2054",
            available: false,
          },
        ]);
      } finally {
        setReportsLoading(false);
      }
    };
    fetchReports();
  }, []);

<<<<<<< HEAD
  const [formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for API
      const consultationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
        industry_sector: formData.industry,
        preferred_month: formData.month || null,
        preferred_week: formData.day || null,
        preferred_time: formData.year || null,
        packages: formData.interests,
        message: formData.message || null,
      };

      await consultationsService.submitConsultation(consultationData);
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        organization: "",
        email: "",
        phone: "",
        industry: "",
        month: "",
        day: "",
        year: "",
        interests: [],
        message: "",
      });
<<<<<<< HEAD
      setFormErrors({});
    } catch (error) {
      console.error("Failed to submit consultation:", error);
      
      // Handle validation errors from backend
      if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
        const validationErrors = error.response.data.detail;
        const newErrors = {};
        let firstErrorMsg = "";
        
        validationErrors.forEach((err, index) => {
          if (err.loc && err.loc.length > 1) {
            const fieldName = err.loc[1]; // Get field name from loc array
            const fieldMap = {
              'first_name': 'firstName',
              'last_name': 'lastName',
              'email': 'email',
              'phone': 'phone',
              'company': 'organization',
              'industry_sector': 'industry'
            };
            const mappedField = fieldMap[fieldName] || fieldName;
            // Clean up message - remove "Value error, " prefix if present
            let cleanMessage = err.msg;
            if (cleanMessage.startsWith('Value error, ')) {
              cleanMessage = cleanMessage.replace('Value error, ', '');
            }
            newErrors[mappedField] = cleanMessage;
            
            // Store first error for toast
            if (index === 0) {
              firstErrorMsg = cleanMessage;
            }
          }
        });
        
        if (Object.keys(newErrors).length > 0) {
          setFormErrors(newErrors);
          // Show toast with first error message
          const toastMsg = firstErrorMsg || Object.values(newErrors)[0];
          toast.error(toastMsg);
        } else {
          toast.error("Please correct the errors and try again.");
        }
      } else {
        // Handle generic error message
        const errorMessage = error.response?.data?.detail || "Failed to submit your request. Please try again.";
        toast.error(errorMessage);
      }
=======
    } catch (error) {
      console.error("Failed to submit consultation:", error);
      alert("Failed to submit your request. Please try again.");
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
    }
  };

  const interests = [
    "Full Industry Analysis",
    "Custom Role Mapping",
    "Strategic Workshop",
    "Executive Briefing",
  ];

  return (
    <div className="horizon-page">
      <canvas ref={canvasRef} id="bg-canvas"></canvas>

              </span>
            </div>
            <div className="time-range">
                <div className="time-range-value">25</div>
                <div className="time-range-label">Year Minimum</div>
              </div>
              <div className="time-range-divider">→</div>
              <div className="time-range-item">
                <div className="time-range-value">100</div>
                <div className="time-range-label">Year Maximum</div>
              </div>
              <div className="time-range-context">
                <p>
<<<<<<< HEAD
                  Long enough to capture fundamental transformation. Far enough
                  to escape quarterly thinking. This is generational
                  strategy—the decisions that shape your organization's
                  workforce for your successors' successors.
=======
                  Our projections operate where traditional forecasting
                  fails—beyond the predictable horizon into structured
                  possibility space.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </p>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#reports" className="btn btn-primary">
<<<<<<< HEAD
                Explore Published Reports
              </a>
              <a href="#book" className="btn btn-secondary">
                Commission Private Research →
=======
                Explore Reports
              </a>
              <a href="#book" className="btn btn-secondary">
                Request Consultation
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="time-machine">
              <div className="data-streams">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="data-stream"
                    style={{
                      left: `${10 + i * 12}%`,
                      height: `${150 + Math.random() * 100}px`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>
              <div className="time-machine-core">
                <div className="time-ring"></div>
                <div className="time-ring"></div>
                <div className="time-ring"></div>
                <div className="time-core-center">
                  <span className="time-core-text">
                    Role
                    <br />
                    Futures
                  </span>
                </div>
                <div className="time-years y-2024">
                  Present<span>2024</span>
                </div>
                <div className="time-years y-2049">
                  +25<span>2049</span>
                </div>
                <div className="time-years y-2074">
                  +50<span>2074</span>
                </div>
                <div className="time-years y-2124">
                  +100<span>2124</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Section */}
      <section className="section what-is">
        <div className="content">
<<<<<<< HEAD
          <span className="section-label">About the Series</span>
          <h2 className="w-137.5">
            Strategic Foresight, <em>Not Science Fiction</em>
=======
          <span className="section-label">Understanding Horizon</span>
          <h2>
            What <em>Is</em> Horizon?
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
          </h2>
          <div className="what-is-grid">
            <div className="what-is-text">
              <p>
<<<<<<< HEAD
                The Horizon Scan series represents a new category of workforce
                intelligence: long-range projections grounded in rigorous
                methodology rather than speculative futurism. Each report
                examines a specific industry-region combination across a 25-100
                year horizon—far enough to capture fundamental transformation,
                structured enough to inform decisions made today.
              </p>
              <p>
                Where most automation research asks "which jobs will
                disappear?", we ask the more useful question: "what will humans
                do that matters?" Every Horizon Scan identifies ten or more
                future roles that don't exist today but will emerge from the
                collision of technological capability, climate adaptation,
                demographic shift, and evolving human needs.
              </p>
              <p>
                The value proposition is strategic patience. While competitors
                obsess over next quarter's headcount, you'll understand
                workforce architecture that spans generations. The organizations
                that thrive across decades are those that see the long arc
                before it bends.
              </p>
              <p>
                Each report combines the analytical rigor of premier management
                consulting with the narrative accessibility of long-form
                journalism. We don't just show you data. We show you the person
                who wakes up in 2064—or 2124—and goes to work in a role that
                doesn't yet have a name.
=======
                Horizon represents a new discipline in strategic intelligence:
                the systematic study of how human roles evolve, transform, and
                emerge across extended time horizons. We call this practice Role
                Futures.
              </p>
              <p>
                Where traditional workforce planning looks 3-5 years ahead, and
                most future-of-work analyses stretch to a decade, Horizon
                operates in the 25-100 year range—the territory where genuine
                transformation becomes visible, and where decisions made today
                cast their longest shadows.
              </p>
              <p>
                Our work is not prediction. Prediction implies certainty; we
                traffic in structured uncertainty. Through rigorous scenario
                analysis, historical pattern recognition, and our proprietary
                Role Persistence Index (RPI), we illuminate the landscape of
                possibility that awaits industries, organizations, and the
                individuals who comprise them.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
              </p>
            </div>
            <div className="rpi-sidebar">
              <div className="rpi-card">
                <div className="rpi-header">
                  <span className="rpi-title">RPI</span>
                  <span className="rpi-tm">™</span>
                </div>
                <p>
                  The Replaceability Potential Index. Our proprietary
                  methodology that decomposes every role into constituent tasks,
                  scoring each across three dimensions: technical automation
                  feasibility, time allocation, and irreplaceable human value.
                </p>
                <div className="rpi-scale-visual">
                  <div className="rpi-scale-bar">
                    <div className="rpi-scale-segment"></div>
                    <div className="rpi-scale-segment"></div>
                    <div className="rpi-scale-segment"></div>
                    <div className="rpi-scale-segment"></div>
                    <div className="rpi-scale-segment"></div>
                  </div>
                  <div className="rpi-scale-labels">
                    <span>Human Resilient</span>
                    <span>Near-Complete Automation</span>
                  </div>
                </div>
                <div className="rpi-formula">
                  <code>HRA_t = APS × W × (1-HRF)</code>
                  <br />
                  <code>Role RPI = Σ HRA_t</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="section pillars-section">
        <div className="content">
          <span className="section-label">Our Foundation</span>
          <h2>
            The Four Pillars of <em>Role Intelligence</em>
          </h2>
          <p className="section-intro">
            Every Horizon analysis rests on four interconnected dimensions, each
            contributing to a comprehensive view of role evolution.
          </p>
        </div>
        <div className="pillars-grid">
          <div className="pillar">
            <div className="pillar-content">
              <div className="pillar-number">01</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" />
                  <path d="M24 4v40M4 24h40" />
                  <circle cx="24" cy="24" r="8" />
                </svg>
              </div>
              <h3 className="pillar-title">Human Essence Factor</h3>
              <p className="pillar-desc">
                The irreducible human elements that define a role's core value
                proposition—creativity, empathy, judgment, and cultural
                navigation.
              </p>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-content">
              <div className="pillar-number">02</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" rx="2" />
                  <path d="M8 20h32M20 8v32" />
                </svg>
              </div>
              <h3 className="pillar-title">Regulatory Framework</h3>
              <p className="pillar-desc">
                The legal, ethical, and compliance structures that shape how
                roles operate and evolve within institutional boundaries.
              </p>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-content">
              <div className="pillar-number">03</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 48 48">
                  <path d="M4 44V20l20-16 20 16v24" />
                  <rect x="16" y="28" width="16" height="16" />
                </svg>
              </div>
              <h3 className="pillar-title">Historical Analog</h3>
              <p className="pillar-desc">
                Pattern recognition from past technological transitions,
                providing probabilistic frameworks for understanding change
                trajectories.
              </p>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-content">
              <div className="pillar-number">04</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="14" r="10" />
                  <path d="M8 44c0-8.8 7.2-16 16-16s16 7.2 16 16" />
                </svg>
              </div>
              <h3 className="pillar-title">Automation Potential</h3>
              <p className="pillar-desc">
                Technical feasibility assessment of task automation, weighted
                against economic viability and social acceptance factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="section methodology-section">
        <div className="content">
<<<<<<< HEAD
          <span className="section-label">The Science of Foresight</span>
          <h2>
            How We See <em>What's Coming</em>
          </h2>
          <p className="section-intro">
            Our projections aren't guesswork dressed in confidence. They emerge from a rigorous, multi-layered methodology that synthesizes the best available evidence into defensible scenarios.
=======
          <span className="section-label">How We Work</span>
          <h2>
            Methodology of <em>Foresight</em>
          </h2>
          <p className="section-intro">
            Our process synthesizes quantitative modeling with qualitative
            expertise, producing insights that are both rigorous and actionable.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
          </p>
          <div className="methodology-grid">
            <div className="methodology-narrative">
              <p>
<<<<<<< HEAD
               We begin where others end. Most automation forecasts start with technology capabilities and extrapolate forward. We start with economic fundamentals: What tasks create value? What does the labor market actually reward? Where do wages signal scarcity versus abundance? Technology is one variable among many—regulation, demographics, climate adaptation, and cultural preference all shape workforce evolution.
              </p>
              <p>
                We decompose before we predict. "This job will be automated" is a category error. Jobs are bundles of tasks with wildly different automation profiles. A hotel concierge performs fifteen distinct task types; three face near-certain automation, five face enhancement, and seven will become more valuable precisely because their context is human. Our RPI™ methodology scores each task, then reconstructs the role.
              </p>
              <p>
               We triangulate across disciplines. No single research stream captures workforce futures. We synthesize labor economics, technology forecasting, organizational behavior, climate science, demographic projections, and regulatory analysis. Each provides a different lens; convergence across lenses increases confidence.
              </p>
              <p>
                We calibrate against history. Past technological transitions—steam, electricity, computing, internet—offer patterns that rhyme with present disruptions. We study what previous forecasters got wrong (usually: underestimating job creation, overestimating displacement speed) and adjust our models accordingly.
              </p>
              <p>
                We name what we don't know. Every Horizon Scan includes explicit confidence ratings and assumption registries. We distinguish between high-confidence projections (demographic trends, regulatory momentum) and speculative scenarios (breakthrough technologies, black swan events). Intellectual honesty about uncertainty is itself a form of rigor.
=======
                Each Horizon engagement begins with{" "}
                <strong>deep industry immersion</strong>—not desk research, but
                embedded understanding of how work actually happens. We
                interview practitioners across seniority levels, observe
                operational rhythms, and map the informal knowledge networks
                that define professional communities.
              </p>
              <p>
                This qualitative foundation feeds our{" "}
                <strong>scenario modeling engine</strong>, where multiple
                plausible futures are constructed across technological,
                regulatory, cultural, and economic dimensions. These aren't
                optimistic and pessimistic cases—they're genuinely different
                worlds, each internally consistent.
              </p>
              <p>
                Within each scenario, we apply our{" "}
                <strong>Role Persistence Index</strong> methodology to every
                identified role, producing a quantified map of workforce
                evolution. The resulting analysis shows not just which roles
                persist, but how they transform.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
              </p>
            </div>
            <div className="methodology-layers">
              <div className="method-layer">
                <div className="method-layer-number">01</div>
                <div className="method-layer-title">Industry Immersion</div>
                <div className="method-layer-desc">
                  6-8 weeks of embedded research, stakeholder interviews, and
                  operational mapping.
                </div>
              </div>
              <div className="method-layer">
                <div className="method-layer-number">02</div>
                <div className="method-layer-title">Scenario Construction</div>
                <div className="method-layer-desc">
                  Development of 4-6 internally consistent future states across
                  key uncertainty dimensions.
                </div>
              </div>
              <div className="method-layer">
                <div className="method-layer-number">03</div>
                <div className="method-layer-title">
                  Role Intelligence Mapping
                </div>
                <div className="method-layer-desc">
                  Application of RPI methodology to all identified roles across
                  all scenarios.
                </div>
              </div>
              <div className="method-layer">
                <div className="method-layer-number">04</div>
                <div className="method-layer-title">Strategic Synthesis</div>
                <div className="method-layer-desc">
                  Integration of findings into actionable strategic frameworks
                  and decision tools.
                </div>
              </div>
<<<<<<< HEAD
=======
            </div>
          </div>
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
          <div className="rpi-formula-box">
            <div className="rpi-formula-header">
              <span className="rpi-formula-title">The RPI Formula</span>
            </div>
            <p style={{ color: "var(--titanium)", marginBottom: "16px" }}>
<<<<<<< HEAD
              The Replaceability Potential Index. Our proprietary scoring methodology.
=======
              Our proprietary index synthesizes four weighted factors into a
              single persistence score, calibrated against historical role
              evolution data.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
            </p>
            <div className="rpi-formula-code">
              <code>
                RPI = (HE × 0.35) + (RF × 0.25) + (HA × 0.25) + (AP × 0.15)
              </code>
              <code style={{ color: "var(--mist)", marginTop: "8px" }}>
                HE = Human Essence | RF = Regulatory Framework | HA = Historical
                Analog | AP = Automation Potential
              </code>
            </div>
          </div>
<<<<<<< HEAD
            </div>
          </div>
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="section reports-section">
        <div className="content">
          <span className="section-label">Intelligence Products</span>
          <h2>
            Published <em>Reports</em>
          </h2>
          <p className="section-intro">
            Our flagship analyses represent the most comprehensive role-futures
            intelligence available for specific industry-geography combinations.
          </p>
          <div className="reports-grid">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`report-card ${
                  !report.available ? "coming-soon" : ""
                }`}
              >
                <div className="report-card-image">
                  <div className="report-visual">
                    <div className="report-visual-grid"></div>
                    <span className="report-visual-year">{report.year}</span>
                  </div>
                </div>
                <div className="report-card-content">
                  {!report.available && (
                    <span className="coming-badge">Coming Q2 2025</span>
                  )}
                  <span className="report-card-label">{report.label}</span>
                  <h3 className="report-card-title">{report.title}</h3>
                  <p className="report-card-meta">{report.meta}</p>
                  <div className="report-card-stats">
                    {report.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="report-stat-value">{stat.value}</div>
                        <div className="report-stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  {report.available && (
                    <Link
                      to={`/reports/${report.id}`}
                      className="btn btn-primary"
                      style={{
                        marginTop: "24px",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      View Report
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="section enterprise-section">
        <div className="content">
          <div className="enterprise-header">
            <span className="section-label">Private Intelligence</span>
            <h2>
              Enterprise <em>Engagements</em>
            </h2>
            <p className="enterprise-intro">
              For organizations requiring proprietary analysis, we offer bespoke
              research programs delivering exclusive insights tailored to your
              specific strategic context.
            </p>
          </div>

          <div className="discretion-banner">
            <div className="discretion-icon">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="discretion-content">
<<<<<<< HEAD
              <h4>Trusted by S&P 500 Organizations</h4>
              <p>
                We work with a number of S&P 500 companies on sensitive workforce transformation initiatives. We understand that organization design, restructuring plans, and future workforce architecture are among the most confidential elements of corporate strategy. Discretion isn't a feature—it's foundational to how we operate.
=======
              <h4>Absolute Discretion Guaranteed</h4>
              <p>
                All enterprise engagements operate under strict confidentiality
                protocols. Your strategic interests remain entirely private—we
                never publish, reference, or acknowledge private client work
                without explicit written permission.
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
              </p>
              <div className="discretion-badges">
                <span className="discretion-badge">NDA Standard</span>
                <span className="discretion-badge">Data Sovereignty</span>
                <span className="discretion-badge">Secure Delivery</span>
              </div>
            </div>
          </div>

          <div className="packages-wrapper">
            <div className="package">
              <h3 className="package-name">Sector Scan</h3>
              <p className="package-tagline">Industry-wide role intelligence</p>
              <ul className="package-list">
                <li>Complete industry role taxonomy</li>
                <li>RPI analysis for 20-30 key roles</li>
                <li>Single scenario deep-dive</li>
                <li>Executive summary presentation</li>
                <li>12-week delivery timeline</li>
              </ul>
              <div className="package-cta">
                <a href="#book" className="btn btn-secondary">
                  Request Details
                </a>
              </div>
            </div>
            <div className="package featured">
              <span className="package-badge">Most Selected</span>
              <h3 className="package-name">Strategic Horizon</h3>
              <p className="package-tagline">
                Comprehensive role futures analysis
              </p>
              <ul className="package-list">
                <li>
                  Full RPI analysis{" "}
                  <span className="package-highlight">50+ Roles</span>
                </li>
                <li>
                  Multi-scenario modeling{" "}
                  <span className="package-highlight">4-6 Futures</span>
                </li>
                <li>Competitive landscape mapping</li>
                <li>Strategic workshop facilitation</li>
                <li>Quarterly update briefings</li>
                <li>16-week delivery timeline</li>
              </ul>
              <div className="package-cta">
                <a href="#book" className="btn btn-primary">
                  Request Consultation
                </a>
              </div>
            </div>
            <div className="package">
              <h3 className="package-name">Transformation Partner</h3>
              <p className="package-tagline">Ongoing strategic intelligence</p>
              <ul className="package-list">
                <li>Everything in Strategic Horizon</li>
                <li>Continuous monitoring & updates</li>
                <li>Dedicated analyst relationship</li>
                <li>Board-level presentation support</li>
                <li>Priority access to new research</li>
              </ul>
              <div className="package-cta">
                <a href="#book" className="btn btn-secondary">
                  Request Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="booking-section">
        <div className="content">
          <div className="booking-container">
            <div className="booking-header">
              <h3>Request a Consultation</h3>
              <p>
                Begin the conversation about your organization's role futures
              </p>
            </div>
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
<<<<<<< HEAD
                    className={`form-input ${formErrors.firstName ? 'error' : ''}`}
=======
                    className="form-input"
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
<<<<<<< HEAD
                  {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
<<<<<<< HEAD
                    className={`form-input ${formErrors.lastName ? 'error' : ''}`}
=======
                    className="form-input"
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
<<<<<<< HEAD
                  {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Organization</label>
                  <input
                    type="text"
<<<<<<< HEAD
                    className={`form-input ${formErrors.organization ? 'error' : ''}`}
=======
                    className="form-input"
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                  />
<<<<<<< HEAD
                  {formErrors.organization && <span className="error-message">{formErrors.organization}</span>}
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
<<<<<<< HEAD
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
=======
                    className="form-input"
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
<<<<<<< HEAD
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
<<<<<<< HEAD
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className={`form-input ${formErrors.phone ? 'error' : ''}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit phone number"
                    required
                  />
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
=======
                  <label className="form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    className="form-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
                <div className="form-group">
                  <label className="form-label">Industry</label>
                  <select
<<<<<<< HEAD
                    className={`form-select ${formErrors.industry ? 'error' : ''}`}
=======
                    className="form-select"
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="finance">Financial Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="technology">Technology</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail & Consumer</option>
                    <option value="energy">Energy & Utilities</option>
                    <option value="other">Other</option>
                  </select>
<<<<<<< HEAD
                  {formErrors.industry && <span className="error-message">{formErrors.industry}</span>}
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Contact Date</label>
                <div className="date-picker-wrapper">
                  <select
                    className="form-select"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                  >
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  >
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Areas of Interest</label>
                <div className="form-checkbox-group">
                  {interests.map((interest) => (
                    <label
                      key={interest}
                      className={`form-checkbox ${
                        formData.interests.includes(interest) ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      <span className="checkbox-indicator"></span>
                      <span className="checkbox-label">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message (Optional)</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your organization's strategic context and what prompted your interest in role futures analysis..."
                />
              </div>
              <div className="nda-note">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p>
                  All inquiries are treated with complete confidentiality. An
                  NDA can be executed prior to any detailed discussions if
                  required.
                </p>
              </div>
              <div className="form-submit">
<<<<<<< HEAD
                <button type="submit" className="btn-primary">
                  Submit Enquiry
=======
                <button type="submit" className="btn btn-primary">
                  Submit Inquiry
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </button>
                <p className="form-note">
                  We typically respond within 48 business hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              Replace<span className="text-crimson">able</span>.ai
            </Link>
            <p>
              The Bureau of Role Futures. Mapping tomorrow's workforce through
              rigorous scenario analysis and proprietary role intelligence.
            </p>
            <div className="footer-social">
              <a href="#">Li</a>
              <a href="#">Tw</a>
              <a href="#">Em</a>
            </div>
          </div>
          <div className="footer-column">
            <h5>Intelligence</h5>
            <ul>
              <li>
                <a href="#methodology">Methodology</a>
              </li>
              <li>
                <a href="#reports">Published Reports</a>
              </li>
              <li>
                <a href="#enterprise">Enterprise Services</a>
              </li>
              <li>
                <a href="#">Research Papers</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Connect</h5>
            <ul>
              <li>
                <a href="#book">Book Consultation</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Replaceable.ai · All rights reserved.</p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </footer>
    </div>
  );
};

export default HorizonPage;
