import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import siteContentService from "../services/siteContentService";
import "./LandingPage.css";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const crystalContainerRef = useRef(null);
  const heroRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentTagFilter, setCurrentTagFilter] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // State for dynamic content
  const [siteContent, setSiteContent] = useState(null);
  const [cards, setCards] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default ERAS (fallback)
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

  // Fetch dynamic content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [contentData, cardsData, tagsData] = await Promise.all([
          siteContentService.getPublicSiteContent(),
          siteContentService.getPublicCards(),
          siteContentService.getPublicTags(),
        ]);
        setSiteContent(contentData);
        setCards(cardsData);
        setTags(tagsData);
      } catch (err) {
        console.error("Failed to fetch site content:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Get filters from site content or use defaults
  const filters = siteContent?.filters || [
    { name: "All Reports", key: "all" },
    { name: "Awakening", key: "awakening", start_year: 2026, end_year: 2040 },
    {
      name: "Transformation",
      key: "transformation",
      start_year: 2041,
      end_year: 2070,
    },
    {
      name: "Transcendence",
      key: "transcendence",
      start_year: 2071,
      end_year: 2100,
    },
    { name: "Horizon", key: "horizon", start_year: 2101, end_year: 2126 },
  ];

  // Cards are now fetched dynamically from API

  const getEraKey = (year) => {
    // First try dynamic filters
    for (const filter of filters) {
      if (filter.start_year && filter.end_year) {
        if (year >= filter.start_year && year <= filter.end_year)
          return filter.key;
      }
    }
    // Fallback to static ERAS
    for (const [key, era] of Object.entries(ERAS)) {
      if (year >= era.start && year <= era.end) return key;
    }
    return "awakening";
  };

  const getEraName = (year) => {
    // First try dynamic filters
    const filter = filters.find((f) => {
      if (f.start_year && f.end_year) {
        return year >= f.start_year && year <= f.end_year;
      }
      return false;
    });
    if (filter) return filter.name;
    // Fallback to static ERAS
    return ERAS[getEraKey(year)]?.name || "Awakening";
  };

  const getImage = (category, imageUrl) => {
    if (imageUrl) return imageUrl;
    return IMAGES[category?.toLowerCase()] || IMAGES.technology;
  };

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

  // Filter handling - by era and tag
  const filteredCards = cards.filter((card) => {
    // Era filter
    if (currentFilter !== "all") {
      const filter = filters.find((f) => f.key === currentFilter);
      if (filter && filter.start_year && filter.end_year) {
        if (card.year < filter.start_year || card.year > filter.end_year) {
          return false;
        }
      }
    }

    // Tag filter
    if (currentTagFilter) {
      if (!card.tags || !card.tags.includes(currentTagFilter)) {
        return false;
      }
    }

    return true;
  });

  const featuredCard =
    filteredCards.find((c) => c.featured) ||
    filteredCards[filteredCards.length - 1];
  const regularCards = filteredCards.filter((c) => c !== featuredCard);

  // Get dynamic content from API with fallbacks
  const hero = siteContent?.hero || {
    badge: "Strategic Foresight Series",
    title: "The Horizon <em>Scanning</em> Series",
    subtitle:
      "Strategic foresight reports mapping the transformation of human work across the next century.",
    stats: [],
  };

  const navLinks = siteContent?.nav_links || [
    { label: "Intelligence", url: "/horizon" },
    { label: "Industries", url: "/reports/goa-hospitality-2064" },
    { label: "Research", url: "/horizon" },
  ];

  const cta = siteContent?.cta || {
    title: "Ready to map <em>your</em> future?",
    description: "Commission a custom Horizon Scan for your organization.",
    button_text: "Commission a Report →",
    button_link: "/horizon",
  };

  const footer = siteContent?.footer || {
    logo_text: "Replace<span class='accent'>able</span>.ai",
    copyright: "© 2026 Replaceable.ai · All rights reserved",
  };

  const execution = siteContent?.execution || {
    title: "",
    subtitle: "",
    items: [],
  };
  const analytics = siteContent?.analytics || {
    title: "",
    subtitle: "",
    metrics: [],
    charts_enabled: true,
  };

  return (
    <div className="landing-page">
      {/* Masthead - now dynamic */}
      <header className={`masthead ${isScrolled ? "scrolled" : ""}`}>
        <div className="masthead-inner">
          <Link to="/" className="logo">
            Replace<span className="accent">able</span>.ai
          </Link>
          <nav className="nav">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.url}>
                {link.label}
              </Link>
            ))}
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
          <div className="hero-badge">{hero.badge}</div>
          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: hero.title }}
          ></h1>
          <p className="hero-subtitle">{hero.subtitle}</p>

          {/* Hero Stats - Dynamic */}
          {hero.stats && hero.stats.length > 0 && (
            <div className="hero-stats">
              {hero.stats.map((stat, index) => (
                <div key={index} className="hero-stat">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

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
        {/* Execution Section - Dynamic */}
        {execution.title && (
          <section className="execution-section">
            <div className="execution-inner">
              <h2 className="section-title">{execution.title}</h2>
              {execution.subtitle && (
                <p className="section-subtitle">{execution.subtitle}</p>
              )}
              {execution.items && execution.items.length > 0 && (
                <div className="execution-grid">
                  {execution.items.map((item, index) => (
                    <div key={index} className="execution-item">
                      {item.icon && (
                        <div className="execution-icon">{item.icon}</div>
                      )}
                      {item.value && (
                        <div className="execution-value">{item.value}</div>
                      )}
                      <h3 className="execution-item-title">{item.title}</h3>
                      <p className="execution-item-desc">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Analytics Section - Dynamic */}
        {analytics.title &&
          analytics.metrics &&
          analytics.metrics.length > 0 && (
            <section className="analytics-section">
              <div className="analytics-inner">
                <h2 className="section-title">{analytics.title}</h2>
                {analytics.subtitle && (
                  <p className="section-subtitle">{analytics.subtitle}</p>
                )}
                <div className="analytics-grid">
                  {analytics.metrics.map((metric, index) => (
                    <div key={index} className="analytics-card">
                      <div className="analytics-value">{metric.value}</div>
                      <div className="analytics-label">{metric.label}</div>
                      {metric.change && (
                        <div
                          className={`analytics-change ${
                            metric.changeType || "neutral"
                          }`}
                        >
                          {metric.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        <section className="filters-section">
          <div className="filters-inner">
            {/* Era Filters - Dynamic */}
            <div className="filter-tabs">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  className={`filter-tab ${
                    currentFilter === filter.key ? "active" : ""
                  }`}
                  onClick={() => setCurrentFilter(filter.key)}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Tag Filters - Dynamic */}
            {tags.length > 0 && (
              <div className="tag-filters">
                <button
                  className={`tag-filter ${!currentTagFilter ? "active" : ""}`}
                  onClick={() => setCurrentTagFilter(null)}
                >
                  All Tags
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`tag-filter ${
                      currentTagFilter === tag.slug ? "active" : ""
                    }`}
                    onClick={() => setCurrentTagFilter(tag.slug)}
                    style={{
                      "--tag-color": tag.color,
                      backgroundColor:
                        currentTagFilter === tag.slug
                          ? tag.color
                          : "transparent",
                      color:
                        currentTagFilter === tag.slug ? "white" : tag.color,
                      borderColor: tag.color,
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            )}

            <div className="results-count">
              Showing <strong>{filteredCards.length}</strong> reports
            </div>
          </div>
        </section>

        <section className="reports-section">
          {/* Featured Card */}
          {featuredCard && (
            <div className="featured-card visible">
              <div className="featured-image">
                <img
                  src={getImage(featuredCard.category, featuredCard.image_url)}
                  alt={featuredCard.title}
                />
                <div className="featured-image-overlay"></div>
                <div className="featured-badge">Latest Report</div>
              </div>
              <div className="featured-content">
                <div className="featured-meta">
                  <div className="featured-year">{featuredCard.year}</div>
                  <div className="featured-era">
                    {getEraName(featuredCard.year)}
                  </div>
                </div>
                <div className="featured-category">{featuredCard.category}</div>
                <h2 className="featured-title">{featuredCard.title}</h2>
                <p className="featured-summary">{featuredCard.summary}</p>

                {/* Tags */}
                {featuredCard.tags && featuredCard.tags.length > 0 && (
                  <div className="featured-tags">
                    {featuredCard.tags.map((tagSlug) => {
                      const tag = tags.find((t) => t.slug === tagSlug);
                      return tag ? (
                        <span
                          key={tagSlug}
                          className="card-tag"
                          style={{
                            backgroundColor: tag.color + "20",
                            color: tag.color,
                          }}
                        >
                          {tag.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                <div className="featured-stats">
                  <div>
                    <div className="featured-stat-value">
                      {featuredCard.rpi}
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
                      {featuredCard.augment}
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
                      {featuredCard.roles?.toLocaleString()}
                    </div>
                    <div className="featured-stat-label">Roles Analyzed</div>
                  </div>
                </div>
                {featuredCard.linked_report_slug ? (
                  <Link
                    to={`/reports/${featuredCard.linked_report_slug}`}
                    className="featured-cta"
                  >
                    Read Full Report →
                  </Link>
                ) : (
                  <span className="featured-cta disabled">Coming Soon</span>
                )}
              </div>
            </div>
          )}

          {/* Regular Reports Grid */}
          <div className="reports-grid">
            {regularCards.map((card, i) => {
              const rpiClass =
                card.rpi >= 70 ? "high" : card.rpi >= 40 ? "medium" : "low";
              return (
                <article
                  key={card.id || i}
                  className="paper-card visible"
                  data-era={getEraKey(card.year)}
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
                        src={getImage(card.category, card.image_url)}
                        alt={card.title}
                        loading="lazy"
                      />
                      <div className="paper-image-overlay"></div>
                      <div className="paper-year">{card.year}</div>
                    </div>
                    <div className="paper-content">
                      <span className="paper-era">{getEraName(card.year)}</span>
                      <div className="paper-category">{card.category}</div>
                      <h3 className="paper-title">{card.title}</h3>
                      <p className="paper-summary">{card.summary}</p>

                      {/* Tags */}
                      {card.tags && card.tags.length > 0 && (
                        <div className="paper-tags">
                          {card.tags.slice(0, 2).map((tagSlug) => {
                            const tag = tags.find((t) => t.slug === tagSlug);
                            return tag ? (
                              <span
                                key={tagSlug}
                                className="card-tag small"
                                style={{
                                  backgroundColor: tag.color + "20",
                                  color: tag.color,
                                }}
                              >
                                {tag.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    <div className="paper-footer">
                      <div className="paper-metrics">
                        <div className="metric">
                          <span className="metric-label">RPI™</span>
                          <div className="metric-bar">
                            <div className="metric-bar-track">
                              <div
                                className={`metric-bar-fill ${rpiClass}`}
                                style={{ width: `${card.rpi}%` }}
                              ></div>
                            </div>
                            <span className="metric-value">{card.rpi}</span>
                          </div>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Augment</span>
                          <span className="metric-value">{card.augment}%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Roles</span>
                          <span className="metric-value">
                            {card.roles?.toLocaleString()}
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
          <h2
            className="cta-title"
            dangerouslySetInnerHTML={{ __html: cta.title }}
          ></h2>
          <p className="cta-desc">{cta.description}</p>
          <Link to={cta.button_link} className="cta-btn">
            {cta.button_text}
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div
            className="footer-logo"
            dangerouslySetInnerHTML={{ __html: footer.logo_text }}
          ></div>
          <div className="footer-copy">{footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
