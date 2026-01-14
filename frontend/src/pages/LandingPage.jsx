import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import "./LandingPage.css";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const crystalContainerRef = useRef(null);
  const heroRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Data matches horizon-landing.html exactly
  const ERAS = {
    awakening: { start: 2026, end: 2040, name: "Awakening" },
    transformation: { start: 2041, end: 2070, name: "Transformation" },
    transcendence: { start: 2071, end: 2100, name: "Transcendence" },
    horizon: { start: 2101, end: 2126, name: "Horizon" },
  };

  const IMAGES = {
    workforce:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    technology:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    policy:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    healthcare:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    creative:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    legal:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    science:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    economy:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    politics:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    governance:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    society:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    industry:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    culture:
      "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&q=80",
    evolution:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    philosophy:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80",
    future:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  };

  // All 24 articles from horizon-landing.html
  const ARTICLES = [
    {
      year: 2026,
      title: "The Great Reassessment",
      category: "Workforce",
      summary:
        "Fortune 500 companies initiate comprehensive AI workforce audits across all divisions.",
      rpi: 42,
      augment: 68,
      roles: 1240,
    },
    {
      year: 2028,
      title: "The Cognitive Threshold",
      category: "Technology",
      summary:
        "AI achieves expert-level performance across twelve professional domains.",
      rpi: 56,
      augment: 72,
      roles: 890,
    },
    {
      year: 2030,
      title: "The Reckoning",
      category: "Policy",
      summary:
        "EU unveils the Human Work Guarantee framework for comprehensive worker protections.",
      rpi: 38,
      augment: 81,
      roles: 2100,
    },
    {
      year: 2032,
      title: "Diagnostic Singularity",
      category: "Healthcare",
      summary:
        "AI diagnostics achieve 99.7% accuracy across 500 medical conditions.",
      rpi: 67,
      augment: 89,
      roles: 340,
    },
    {
      year: 2035,
      title: "Synthetic Renaissance",
      category: "Creative",
      summary:
        "AI-generated content comprises 80% of all digital media production.",
      rpi: 73,
      augment: 54,
      roles: 560,
    },
    {
      year: 2038,
      title: "Justice Automated",
      category: "Legal",
      summary:
        "AI adjudication handles 70% of civil disputes in participating nations.",
      rpi: 61,
      augment: 77,
      roles: 420,
    },
    {
      year: 2042,
      title: "The Discovery Engine",
      category: "Science",
      summary:
        "AI-driven research output surpasses the entire previous century combined.",
      rpi: 52,
      augment: 91,
      roles: 780,
    },
    {
      year: 2045,
      title: "Post-Scarcity Threshold",
      category: "Economy",
      summary:
        "Automation reaches 85% coverage of traditional labor categories.",
      rpi: 84,
      augment: 62,
      roles: 3400,
    },
    {
      year: 2048,
      title: "The Memory Wars",
      category: "Politics",
      summary:
        "Nations compete for control of collective AI knowledge repositories.",
      rpi: 29,
      augment: 85,
      roles: 190,
    },
    {
      year: 2050,
      title: "Hybrid Leadership",
      category: "Governance",
      summary:
        "Human-AI executive partnerships become the organizational standard.",
      rpi: 44,
      augment: 94,
      roles: 520,
    },
    {
      year: 2055,
      title: "Cognitive Partnership",
      category: "Technology",
      summary:
        "Neural interfaces enable seamless human-AI collaborative thinking.",
      rpi: 58,
      augment: 96,
      roles: 1100,
    },
    {
      year: 2060,
      title: "The Empathy Engines",
      category: "Society",
      summary: "AI emotional intelligence surpasses average human capability.",
      rpi: 71,
      augment: 88,
      roles: 640,
    },
    {
      year: 2064,
      title: "Goa Hospitality 2064",
      category: "Industry",
      summary: "Strategic roles defining hospitality's radical transformation.",
      rpi: 63,
      augment: 79,
      roles: 280,
    },
    {
      year: 2068,
      title: "Universal Creativity",
      category: "Culture",
      summary: "Every human gains access to world-class creative tools.",
      rpi: 81,
      augment: 67,
      roles: 920,
    },
    {
      year: 2075,
      title: "Neural Privacy",
      category: "Legal",
      summary:
        "Legal frameworks emerge for the Inner Monologue protection era.",
      rpi: 35,
      augment: 92,
      roles: 310,
    },
    {
      year: 2080,
      title: "The Synthesis Age",
      category: "Evolution",
      summary: "Human-AI cognitive integration reaches mainstream adoption.",
      rpi: 76,
      augment: 98,
      roles: 1800,
    },
    {
      year: 2085,
      title: "Memory Markets",
      category: "Economy",
      summary: "The commodification of human experience begins in earnest.",
      rpi: 69,
      augment: 74,
      roles: 450,
    },
    {
      year: 2090,
      title: "Digital Immortality",
      category: "Philosophy",
      summary: "Consciousness preservation becomes technically feasible.",
      rpi: 47,
      augment: 99,
      roles: 120,
    },
    {
      year: 2095,
      title: "The Great Unbundling",
      category: "Society",
      summary: "Traditional institutions dissolve into networked alternatives.",
      rpi: 88,
      augment: 83,
      roles: 2600,
    },
    {
      year: 2100,
      title: "The New Meaning",
      category: "Philosophy",
      summary:
        "Work transforms entirely into creative and spiritual expression.",
      rpi: 94,
      augment: 71,
      roles: 4200,
    },
    {
      year: 2105,
      title: "Planetary Consciousness",
      category: "Evolution",
      summary: "Earth develops rudimentary collective awareness systems.",
      rpi: 82,
      augment: 97,
      roles: 1500,
    },
    {
      year: 2110,
      title: "The Collective Mind",
      category: "Technology",
      summary: "Networked consciousness experiments reach global scale.",
      rpi: 91,
      augment: 99,
      roles: 890,
    },
    {
      year: 2118,
      title: "Beyond Biology",
      category: "Science",
      summary: "The distinction between organic and synthetic life dissolves.",
      rpi: 96,
      augment: 95,
      roles: 2100,
    },
    {
      year: 2126,
      title: "The Horizon",
      category: "Future",
      summary: "The question becomes who we choose to become.",
      rpi: 99,
      augment: 100,
      roles: 5000,
    },
  ];

  const getEraKey = (year) => {
    for (const [key, era] of Object.entries(ERAS)) {
      if (year >= era.start && year <= era.end) return key;
    }
    return "awakening";
  };

  const getEraName = (year) => ERAS[getEraKey(year)].name;

  const getImage = (category) =>
    IMAGES[category.toLowerCase()] || IMAGES.technology;

  // Hero particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 30, 58, ${p.o})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(196, 30, 58, ${0.1 * (1 - d / 100)})`;
            ctx.stroke();
          }
        });
      });

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

  // Three.js Crystal Ball - exact match to horizon-landing.html
  useEffect(() => {
    const crystalContainer = crystalContainerRef.current;
    if (!crystalContainer) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(320, 320);
    crystalContainer.appendChild(renderer.domElement);

    // Materials - exact same as HTML
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xc41e3a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xc41e3a,
      transparent: true,
      opacity: 0.5,
    });

    // Meshes - icosahedron geometry for crystal ball effect
    const outerMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 2),
      outerMat
    );
    const innerMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.75, 1),
      innerMat
    );
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      coreMat
    );

    const group = new THREE.Group();
    group.add(outerMesh);
    group.add(innerMesh);
    group.add(coreMesh);
    scene.add(group);

    // Interaction state
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let autoRotate = true;
    let velocity = { x: 0, y: 0 };

    const crystalWrapper = crystalContainerRef.current?.parentElement;

    // Mouse events
    const handleMouseDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      velocity.x = (e.clientY - prevMouse.y) * 0.008;
      velocity.y = (e.clientX - prevMouse.x) * 0.008;
      group.rotation.x += velocity.x;
      group.rotation.y += velocity.y;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 2000);
    };

    // Touch events
    const handleTouchStart = (e) => {
      isDragging = true;
      autoRotate = false;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      group.rotation.x += (e.touches[0].clientY - prevMouse.y) * 0.008;
      group.rotation.y += (e.touches[0].clientX - prevMouse.x) * 0.008;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 2000);
    };

    if (crystalWrapper) {
      crystalWrapper.addEventListener("mousedown", handleMouseDown);
      crystalWrapper.addEventListener("touchstart", handleTouchStart);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Animation loop
    function animateCrystal() {
      requestAnimationFrame(animateCrystal);

      if (autoRotate) {
        group.rotation.y += 0.003;
        group.rotation.x += 0.001;
      }

      velocity.x *= 0.95;
      velocity.y *= 0.95;

      if (!isDragging && !autoRotate) {
        group.rotation.x += velocity.x;
        group.rotation.y += velocity.y;
      }

      innerMesh.rotation.x -= 0.005;
      innerMesh.rotation.z += 0.003;

      // Core pulsing effect
      coreMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.15);
      coreMat.opacity = 0.4 + Math.sin(Date.now() * 0.003) * 0.2;

      renderer.render(scene, camera);
    }

    animateCrystal();

    // Cleanup
    return () => {
      if (crystalWrapper) {
        crystalWrapper.removeEventListener("mousedown", handleMouseDown);
        crystalWrapper.removeEventListener("touchstart", handleTouchStart);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      renderer.dispose();
      if (crystalContainer.contains(renderer.domElement)) {
        crystalContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Masthead scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll trigger handler
  const handleScrollTriggerClick = () => {
    if (heroRef.current) {
      heroRef.current.classList.add("rolled-up");
      setTimeout(() => {
        document
          .getElementById("contentArea")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  // Restore hero when scrolling back to top
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY < 100 &&
        heroRef.current?.classList.contains("rolled-up")
      ) {
        heroRef.current.classList.remove("rolled-up");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter handling
  const filteredArticles =
    currentFilter === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => {
          const era = ERAS[currentFilter];
          return era && a.year >= era.start && a.year <= era.end;
        });

  const featuredArticle = filteredArticles[filteredArticles.length - 1];
  const regularArticles = filteredArticles.slice(0, -1);

  return (
    <div className="landing-page">
      {/* Masthead - matches HTML exactly */}
      <header className={`masthead ${isScrolled ? "scrolled" : ""}`}>
        <div className="masthead-inner">
          <Link to="/" className="logo">
            Replace<span className="accent">able</span>.ai
          </Link>
          <nav className="nav">
            <Link to="/horizon">Intelligence</Link>
            <Link to="/reports/goa-hospitality-2064">Industries</Link>
            <Link to="/horizon">Research</Link>
            <Link to="/horizon" className="nav-cta">
              Commission Report
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero" id="hero" ref={heroRef}>
        <div className="hero-gradient"></div>
        <canvas
          id="hero-particles"
          className="hero-particles"
          ref={canvasRef}
        ></canvas>
        <div className="hero-content">
          <div className="hero-badge">Strategic Foresight Series</div>
          <h1 className="hero-title">
            The Horizon <em>Scanning</em> Series
          </h1>
          <p className="hero-subtitle">
            Strategic foresight reports mapping the transformation of human work
            across the next century.
          </p>
          <div className="crystal-wrapper" id="crystalWrapper">
            <div className="crystal-glow"></div>
            <div id="crystal-container" ref={crystalContainerRef}></div>
            <div className="crystal-hint">Drag to explore</div>
          </div>
        </div>
        <div className="hero-scroll-trigger" onClick={handleScrollTriggerClick}>
          <span className="scroll-text">Explore Reports</span>
          <div className="scroll-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M7 10l5 5 5-5" stroke="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      <div className="content-area" id="contentArea">
        <section className="filters-section">
          <div className="filters-inner">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${
                  currentFilter === "all" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("all")}
              >
                All Reports
              </button>
              <button
                className={`filter-tab ${
                  currentFilter === "awakening" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("awakening")}
              >
                Awakening
              </button>
              <button
                className={`filter-tab ${
                  currentFilter === "transformation" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("transformation")}
              >
                Transformation
              </button>
              <button
                className={`filter-tab ${
                  currentFilter === "transcendence" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("transcendence")}
              >
                Transcendence
              </button>
              <button
                className={`filter-tab ${
                  currentFilter === "horizon" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("horizon")}
              >
                Horizon
              </button>
            </div>
            <div className="results-count">
              Showing <strong>{filteredArticles.length}</strong> reports
            </div>
          </div>
        </section>

        <section className="reports-section">
          {/* Featured Card */}
          {featuredArticle && (
            <div className="featured-card visible">
              <div className="featured-image">
                <img
                  src={getImage(featuredArticle.category)}
                  alt={featuredArticle.title}
                />
                <div className="featured-image-overlay"></div>
                <div className="featured-badge">Latest Report</div>
              </div>
              <div className="featured-content">
                <div className="featured-meta">
                  <div className="featured-year">{featuredArticle.year}</div>
                  <div className="featured-era">
                    {getEraName(featuredArticle.year)}
                  </div>
                </div>
                <div className="featured-category">
                  {featuredArticle.category}
                </div>
                <h2 className="featured-title">{featuredArticle.title}</h2>
                <p className="featured-summary">{featuredArticle.summary}</p>
                <div className="featured-stats">
                  <div>
                    <div className="featured-stat-value">
                      {featuredArticle.rpi}
                      <span
                        style={{ fontSize: "14px", color: "var(--text-muted)" }}
                      >
                        %
                      </span>
                    </div>
                    <div className="featured-stat-label">RPI™ Score</div>
                  </div>
                  <div>
                    <div className="featured-stat-value">
                      {featuredArticle.augment}
                      <span
                        style={{ fontSize: "14px", color: "var(--text-muted)" }}
                      >
                        %
                      </span>
                    </div>
                    <div className="featured-stat-label">Augmentation</div>
                  </div>
                  <div>
                    <div className="featured-stat-value">
                      {featuredArticle.roles.toLocaleString()}
                    </div>
                    <div className="featured-stat-label">Roles Analyzed</div>
                  </div>
                </div>
                <Link
                  to={`/reports/goa-hospitality-2064`}
                  className="featured-cta"
                >
                  Read Full Report →
                </Link>
              </div>
            </div>
          )}

          {/* Regular Reports Grid */}
          <div className="reports-grid">
            {regularArticles.map((article, i) => {
              const rpiClass =
                article.rpi >= 70
                  ? "high"
                  : article.rpi >= 40
                  ? "medium"
                  : "low";
              return (
                <article
                  key={i}
                  className="paper-card visible"
                  data-era={getEraKey(article.year)}
                >
                  <div className="paper-stack"></div>
                  <div className="paper-stack-2"></div>
                  <div className="paper-main">
                    <div className="page-curl"></div>
                    <div className="paper-header">
                      <div className="paper-brand">
                        <div className="paper-logo">
                          Replace<span className="accent">able</span>.ai
                        </div>
                        <div className="paper-series">Horizon Scan Series</div>
                      </div>
                    </div>
                    <div className="paper-image">
                      <img
                        src={getImage(article.category)}
                        alt={article.title}
                        loading="lazy"
                      />
                      <div className="paper-image-overlay"></div>
                      <div className="paper-year">{article.year}</div>
                    </div>
                    <div className="paper-content">
                      <span className="paper-era">
                        {getEraName(article.year)}
                      </span>
                      <div className="paper-category">{article.category}</div>
                      <h3 className="paper-title">{article.title}</h3>
                      <p className="paper-summary">{article.summary}</p>
                    </div>
                    <div className="paper-footer">
                      <div className="paper-metrics">
                        <div className="metric">
                          <span className="metric-label">RPI™</span>
                          <div className="metric-bar">
                            <div className="metric-bar-track">
                              <div
                                className={`metric-bar-fill ${rpiClass}`}
                                style={{ width: `${article.rpi}%` }}
                              ></div>
                            </div>
                            <span className="metric-value">{article.rpi}</span>
                          </div>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Augment</span>
                          <span className="metric-value">
                            {article.augment}%
                          </span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Roles</span>
                          <span className="metric-value">
                            {article.roles.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <section className="cta-section">
        <div className="cta-gradient"></div>
        <div className="cta-inner">
          <h2 className="cta-title">
            Ready to map <em>your</em> future?
          </h2>
          <p className="cta-desc">
            Commission a custom Horizon Scan for your organization. We'll
            analyze the transformation of your industry across the timescales
            that matter.
          </p>
          <Link to="/horizon" className="cta-btn">
            Commission a Report →
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            Replace<span className="accent">able</span>.ai
          </div>
          <div className="footer-copy">
            © 2026 Replaceable.ai · All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
