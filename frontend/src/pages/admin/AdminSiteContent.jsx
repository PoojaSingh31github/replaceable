import React, { useState, useEffect } from "react";
import siteContentService from "../../services/siteContentService";
import "./AdminSiteContent.css";

const AdminSiteContent = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  const [siteContent, setSiteContent] = useState({
    hero: {
      badge: "Strategic Foresight Series",
      title: "The Horizon <em>Scanning</em> Series",
      subtitle:
        "Strategic foresight reports mapping the transformation of human work across the next century.",
      stats: [],
    },
    filters: [],
    execution: {
      title: "",
      subtitle: "",
      items: [],
    },
    analytics: {
      title: "Analytics & Insights",
      subtitle: "",
      metrics: [],
      charts_enabled: true,
    },
    cta: {
      title: "Ready to map <em>your</em> future?",
      description: "Commission a custom Horizon Scan for your organization.",
      button_text: "Commission a Report →",
      button_link: "/horizon",
    },
    footer: {
      logo_text: "Replace<span class='accent'>able</span>.ai",
      copyright: "© 2026 Replaceable.ai · All rights reserved",
      links: [],
    },
    nav_links: [],
  });

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    try {
      setLoading(true);
      const data = await siteContentService.getSiteContent();
      setSiteContent(data);
    } catch (err) {
      console.error("Failed to fetch site content:", err);
      // Initialize with defaults if not found
      try {
        const initialized = await siteContentService.initializeSiteContent();
        setSiteContent(initialized);
      } catch (initErr) {
        setError("Failed to load site content");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      await siteContentService.updateSiteContent(siteContent);
      setSuccess("Site content saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save site content");
    } finally {
      setSaving(false);
    }
  };

  // Hero Section handlers
  const updateHero = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const addHeroStat = () => {
    setSiteContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: [...(prev.hero.stats || []), { label: "", value: "" }],
      },
    }));
  };

  const updateHeroStat = (index, field, value) => {
    setSiteContent((prev) => {
      const newStats = [...(prev.hero.stats || [])];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, hero: { ...prev.hero, stats: newStats } };
    });
  };

  const removeHeroStat = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: prev.hero.stats.filter((_, i) => i !== index),
      },
    }));
  };

  // Execution Section handlers
  const updateExecution = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      execution: { ...prev.execution, [field]: value },
    }));
  };

  const addExecutionItem = () => {
    setSiteContent((prev) => ({
      ...prev,
      execution: {
        ...prev.execution,
        items: [
          ...(prev.execution.items || []),
          { title: "", description: "", icon: "", value: "" },
        ],
      },
    }));
  };

  const updateExecutionItem = (index, field, value) => {
    setSiteContent((prev) => {
      const newItems = [...(prev.execution.items || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, execution: { ...prev.execution, items: newItems } };
    });
  };

  const removeExecutionItem = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      execution: {
        ...prev.execution,
        items: prev.execution.items.filter((_, i) => i !== index),
      },
    }));
  };

  // Analytics Section handlers
  const updateAnalytics = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      analytics: { ...prev.analytics, [field]: value },
    }));
  };

  const addAnalyticsMetric = () => {
    setSiteContent((prev) => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        metrics: [
          ...(prev.analytics.metrics || []),
          { label: "", value: "", change: "", changeType: "positive" },
        ],
      },
    }));
  };

  const updateAnalyticsMetric = (index, field, value) => {
    setSiteContent((prev) => {
      const newMetrics = [...(prev.analytics.metrics || [])];
      newMetrics[index] = { ...newMetrics[index], [field]: value };
      return { ...prev, analytics: { ...prev.analytics, metrics: newMetrics } };
    });
  };

  const removeAnalyticsMetric = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        metrics: prev.analytics.metrics.filter((_, i) => i !== index),
      },
    }));
  };

  // CTA Section handlers
  const updateCTA = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      cta: { ...prev.cta, [field]: value },
    }));
  };

  // Footer Section handlers
  const updateFooter = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, [field]: value },
    }));
  };

  const addFooterLink = () => {
    setSiteContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: [...(prev.footer.links || []), { label: "", url: "" }],
      },
    }));
  };

  const updateFooterLink = (index, field, value) => {
    setSiteContent((prev) => {
      const newLinks = [...(prev.footer.links || [])];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, footer: { ...prev.footer, links: newLinks } };
    });
  };

  const removeFooterLink = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: prev.footer.links.filter((_, i) => i !== index),
      },
    }));
  };

  // Navigation handlers
  const addNavLink = () => {
    setSiteContent((prev) => ({
      ...prev,
      nav_links: [...(prev.nav_links || []), { label: "", url: "" }],
    }));
  };

  const updateNavLink = (index, field, value) => {
    setSiteContent((prev) => {
      const newLinks = [...(prev.nav_links || [])];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, nav_links: newLinks };
    });
  };

  const removeNavLink = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      nav_links: prev.nav_links.filter((_, i) => i !== index),
    }));
  };

  // Filter handlers
  const addFilter = () => {
    setSiteContent((prev) => ({
      ...prev,
      filters: [
        ...(prev.filters || []),
        { name: "", key: "", start_year: null, end_year: null },
      ],
    }));
  };

  const updateFilter = (index, field, value) => {
    setSiteContent((prev) => {
      const newFilters = [...(prev.filters || [])];
      newFilters[index] = { ...newFilters[index], [field]: value };
      return { ...prev, filters: newFilters };
    });
  };

  const removeFilter = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading site content...</p>
      </div>
    );
  }

  return (
    <div className="admin-site-content">
      <div className="page-header">
        <div className="header-left">
          <h1>Site Content</h1>
          <p>Manage all landing page content</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Tab Navigation */}
      <div className="edit-tabs">
        {[
          "hero",
          "execution",
          "analytics",
          "cta",
          "footer",
          "navigation",
          "filters",
        ].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content-form">
        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="form-section">
            <h2>Hero Section</h2>
            <p className="section-desc">
              Configure the main hero section on the landing page.
            </p>

            <div className="form-group">
              <label>Badge Text</label>
              <input
                type="text"
                value={siteContent.hero?.badge || ""}
                onChange={(e) => updateHero("badge", e.target.value)}
                placeholder="Strategic Foresight Series"
              />
            </div>

            <div className="form-group">
              <label>Title (HTML supported)</label>
              <input
                type="text"
                value={siteContent.hero?.title || ""}
                onChange={(e) => updateHero("title", e.target.value)}
                placeholder="The Horizon <em>Scanning</em> Series"
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <textarea
                value={siteContent.hero?.subtitle || ""}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                rows="3"
                placeholder="Strategic foresight reports..."
              />
            </div>

            <div className="form-group">
              <div className="section-header">
                <label>Hero Statistics</label>
                <button type="button" className="btn-add" onClick={addHeroStat}>
                  + Add Stat
                </button>
              </div>
              {(siteContent.hero?.stats || []).map((stat, index) => (
                <div key={index} className="inline-edit-row">
                  <input
                    type="text"
                    value={stat.value || ""}
                    onChange={(e) =>
                      updateHeroStat(index, "value", e.target.value)
                    }
                    placeholder="Value (e.g., 24)"
                  />
                  <input
                    type="text"
                    value={stat.label || ""}
                    onChange={(e) =>
                      updateHeroStat(index, "label", e.target.value)
                    }
                    placeholder="Label (e.g., Reports Published)"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeHeroStat(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Execution Section */}
        {activeTab === "execution" && (
          <div className="form-section">
            <h2>Execution Section</h2>
            <p className="section-desc">
              Configure the execution/methodology section.
            </p>

            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                value={siteContent.execution?.title || ""}
                onChange={(e) => updateExecution("title", e.target.value)}
                placeholder="How We Execute"
              />
            </div>

            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea
                value={siteContent.execution?.subtitle || ""}
                onChange={(e) => updateExecution("subtitle", e.target.value)}
                rows="2"
                placeholder="Our approach to strategic foresight..."
              />
            </div>

            <div className="form-group">
              <div className="section-header">
                <label>Execution Items</label>
                <button
                  type="button"
                  className="btn-add"
                  onClick={addExecutionItem}
                >
                  + Add Item
                </button>
              </div>
              {(siteContent.execution?.items || []).map((item, index) => (
                <div key={index} className="card-editor">
                  <div className="card-editor-header">
                    <h4>Item {index + 1}</h4>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeExecutionItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) =>
                          updateExecutionItem(index, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Value/Number</label>
                      <input
                        type="text"
                        value={item.value || ""}
                        onChange={(e) =>
                          updateExecutionItem(index, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description || ""}
                      onChange={(e) =>
                        updateExecutionItem(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows="2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Icon (SVG or emoji)</label>
                    <input
                      type="text"
                      value={item.icon || ""}
                      onChange={(e) =>
                        updateExecutionItem(index, "icon", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === "analytics" && (
          <div className="form-section">
            <h2>Analytics Section</h2>
            <p className="section-desc">
              Configure the analytics/metrics section.
            </p>

            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                value={siteContent.analytics?.title || ""}
                onChange={(e) => updateAnalytics("title", e.target.value)}
                placeholder="Analytics & Insights"
              />
            </div>

            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea
                value={siteContent.analytics?.subtitle || ""}
                onChange={(e) => updateAnalytics("subtitle", e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={siteContent.analytics?.charts_enabled || false}
                  onChange={(e) =>
                    updateAnalytics("charts_enabled", e.target.checked)
                  }
                />
                Enable Charts
              </label>
            </div>

            <div className="form-group">
              <div className="section-header">
                <label>Analytics Metrics</label>
                <button
                  type="button"
                  className="btn-add"
                  onClick={addAnalyticsMetric}
                >
                  + Add Metric
                </button>
              </div>
              {(siteContent.analytics?.metrics || []).map((metric, index) => (
                <div key={index} className="card-editor">
                  <div className="card-editor-header">
                    <h4>Metric {index + 1}</h4>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeAnalyticsMetric(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Label</label>
                      <input
                        type="text"
                        value={metric.label || ""}
                        onChange={(e) =>
                          updateAnalyticsMetric(index, "label", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Value</label>
                      <input
                        type="text"
                        value={metric.value || ""}
                        onChange={(e) =>
                          updateAnalyticsMetric(index, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Change</label>
                      <input
                        type="text"
                        value={metric.change || ""}
                        onChange={(e) =>
                          updateAnalyticsMetric(index, "change", e.target.value)
                        }
                        placeholder="+12%"
                      />
                    </div>
                    <div className="form-group">
                      <label>Change Type</label>
                      <select
                        value={metric.changeType || "positive"}
                        onChange={(e) =>
                          updateAnalyticsMetric(
                            index,
                            "changeType",
                            e.target.value
                          )
                        }
                      >
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="neutral">Neutral</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {activeTab === "cta" && (
          <div className="form-section">
            <h2>Call to Action Section</h2>
            <p className="section-desc">Configure the CTA section.</p>

            <div className="form-group">
              <label>Title (HTML supported)</label>
              <input
                type="text"
                value={siteContent.cta?.title || ""}
                onChange={(e) => updateCTA("title", e.target.value)}
                placeholder="Ready to map <em>your</em> future?"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={siteContent.cta?.description || ""}
                onChange={(e) => updateCTA("description", e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  value={siteContent.cta?.button_text || ""}
                  onChange={(e) => updateCTA("button_text", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Button Link</label>
                <input
                  type="text"
                  value={siteContent.cta?.button_link || ""}
                  onChange={(e) => updateCTA("button_link", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        {activeTab === "footer" && (
          <div className="form-section">
            <h2>Footer Section</h2>
            <p className="section-desc">Configure the footer.</p>

            <div className="form-group">
              <label>Logo Text (HTML supported)</label>
              <input
                type="text"
                value={siteContent.footer?.logo_text || ""}
                onChange={(e) => updateFooter("logo_text", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Copyright Text</label>
              <input
                type="text"
                value={siteContent.footer?.copyright || ""}
                onChange={(e) => updateFooter("copyright", e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="section-header">
                <label>Footer Links</label>
                <button
                  type="button"
                  className="btn-add"
                  onClick={addFooterLink}
                >
                  + Add Link
                </button>
              </div>
              {(siteContent.footer?.links || []).map((link, index) => (
                <div key={index} className="inline-edit-row">
                  <input
                    type="text"
                    value={link.label || ""}
                    onChange={(e) =>
                      updateFooterLink(index, "label", e.target.value)
                    }
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={link.url || ""}
                    onChange={(e) =>
                      updateFooterLink(index, "url", e.target.value)
                    }
                    placeholder="URL"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFooterLink(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Section */}
        {activeTab === "navigation" && (
          <div className="form-section">
            <h2>Navigation Links</h2>
            <p className="section-desc">Configure the main navigation menu.</p>

            <div className="form-group">
              <div className="section-header">
                <label>Navigation Links</label>
                <button type="button" className="btn-add" onClick={addNavLink}>
                  + Add Link
                </button>
              </div>
              {(siteContent.nav_links || []).map((link, index) => (
                <div key={index} className="inline-edit-row">
                  <input
                    type="text"
                    value={link.label || ""}
                    onChange={(e) =>
                      updateNavLink(index, "label", e.target.value)
                    }
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={link.url || ""}
                    onChange={(e) =>
                      updateNavLink(index, "url", e.target.value)
                    }
                    placeholder="URL"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeNavLink(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters Section */}
        {activeTab === "filters" && (
          <div className="form-section">
            <h2>Filter Categories</h2>
            <p className="section-desc">
              Configure the filter tabs for reports (e.g., Awakening,
              Transformation, etc.).
            </p>

            <div className="form-group">
              <div className="section-header">
                <label>Filters</label>
                <button type="button" className="btn-add" onClick={addFilter}>
                  + Add Filter
                </button>
              </div>
              {(siteContent.filters || []).map((filter, index) => (
                <div key={index} className="card-editor">
                  <div className="card-editor-header">
                    <h4>Filter {index + 1}</h4>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeFilter(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Display Name</label>
                      <input
                        type="text"
                        value={filter.name || ""}
                        onChange={(e) =>
                          updateFilter(index, "name", e.target.value)
                        }
                        placeholder="Awakening"
                      />
                    </div>
                    <div className="form-group">
                      <label>Key</label>
                      <input
                        type="text"
                        value={filter.key || ""}
                        onChange={(e) =>
                          updateFilter(index, "key", e.target.value)
                        }
                        placeholder="awakening"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Year</label>
                      <input
                        type="number"
                        value={filter.start_year || ""}
                        onChange={(e) =>
                          updateFilter(
                            index,
                            "start_year",
                            e.target.value ? parseInt(e.target.value) : null
                          )
                        }
                        placeholder="2026"
                      />
                    </div>
                    <div className="form-group">
                      <label>End Year</label>
                      <input
                        type="number"
                        value={filter.end_year || ""}
                        onChange={(e) =>
                          updateFilter(
                            index,
                            "end_year",
                            e.target.value ? parseInt(e.target.value) : null
                          )
                        }
                        placeholder="2040"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSiteContent;
