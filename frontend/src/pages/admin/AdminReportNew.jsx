import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
import reportsService from "../../services/reportsService";
import "./AdminReports.css";

const AdminReportNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    report_type: "horizon-scan",
    status: "draft",
    featured: false,
    industry: "",
    region: "",
    target_year: new Date().getFullYear() + 40,
    image_url: "",
    cover: {
      reportMeta:
        "Strategic Foresight Report · " +
        new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      title: "",
      subtitle: "",
      stats: [
        { value: "", label: "Future Roles Analyzed" },
        { value: "", label: "Sector RPI Score" },
        { value: "", label: "Net Employment Change" },
        { value: "", label: "Target Year" },
      ],
    },
    nav_links: [
      { id: "executive", label: "Executive Summary" },
      { id: "prologue", label: "Prologue" },
      { id: "methodology", label: "Methodology" },
      { id: "roles", label: "Future Roles" },
      { id: "charts", label: "Analytics" },
      { id: "scenarios", label: "Scenarios" },
      { id: "implications", label: "Implications" },
    ],
    executive_summary: { paragraphs: [], cards: [] },
    prologue: "",
    methodology: {
      sources: [],
      assumptions: [],
      rpiFramework:
        "The Replaceability Potential Index decomposes roles into tasks, scored across: APS (Automation Probability Score), W (Weight/time proportion), HRF (Human Resilience Factor). Task score: HRA_t = APS × W × (1-HRF). Role RPI = Σ HRA_t",
    },
    roles: [],
    scenarios: [],
    implications: { policymakers: [], industry_leaders: [], individuals: [] },
    cta: {
      title: "Ready to understand your industry's future?",
      subtitle: "Commission a custom Horizon Scan for your sector.",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-generate slug and cover title from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug,
        cover: {
          ...prev.cover,
          title: `The <em>${value.split(" ")[0]}</em> Workforce of <em>${
            prev.target_year
          }</em>`,
          subtitle: prev.subtitle,
        },
      }));
    }
  };

  const handleCoverChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      cover: { ...prev.cover, [field]: value },
    }));
  };

  const handleCoverStatChange = (index, field, value) => {
    setFormData((prev) => {
      const newStats = [...prev.cover.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, cover: { ...prev.cover, stats: newStats } };
    });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Executive Summary Card Management
  const addExecutiveCard = () => {
    setFormData((prev) => ({
      ...prev,
      executive_summary: {
        ...prev.executive_summary,
        cards: [
          ...prev.executive_summary.cards,
          {
            title: "",
            value: "",
            change: "",
            changeClass: "positive",
            desc: "",
          },
        ],
      },
    }));
  };

  const updateExecutiveCard = (index, field, value) => {
    setFormData((prev) => {
      const newCards = [...prev.executive_summary.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return {
        ...prev,
        executive_summary: { ...prev.executive_summary, cards: newCards },
      };
    });
  };

  const removeExecutiveCard = (index) => {
    setFormData((prev) => ({
      ...prev,
      executive_summary: {
        ...prev.executive_summary,
        cards: prev.executive_summary.cards.filter((_, i) => i !== index),
      },
    }));
  };

  // Role Management
  const addRole = () => {
    setFormData((prev) => ({
      ...prev,
      roles: [
        ...prev.roles,
        {
          role_number: String(prev.roles.length + 1).padStart(2, "0"),
          title: "",
          emergence_period: "",
          origin: "",
          confidence: "High Confidence",
          narrative: "",
          rpi_score: 0,
          tasks: [],
          gauge_info: { title: "", description: "" },
          causal_chain: [],
          skills: { technical: [], soft: [], domain: [] },
        },
      ],
    }));
  };

  const updateRole = (index, field, value) => {
    setFormData((prev) => {
      const newRoles = [...prev.roles];
      newRoles[index] = { ...newRoles[index], [field]: value };
      return { ...prev, roles: newRoles };
    });
  };

  const removeRole = (index) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index),
    }));
  };

  // Task Management
  const addTask = (roleIndex) => {
    setFormData((prev) => {
      const newRoles = [...prev.roles];
      newRoles[roleIndex].tasks = [
        ...newRoles[roleIndex].tasks,
        { task: "", aps: 0, w: 0, hrf: 0, hrat: 0 },
      ];
      return { ...prev, roles: newRoles };
    });
  };

  const updateTask = (roleIndex, taskIndex, field, value) => {
    setFormData((prev) => {
      const newRoles = [...prev.roles];
      newRoles[roleIndex].tasks[taskIndex] = {
        ...newRoles[roleIndex].tasks[taskIndex],
        [field]: field === "task" ? value : parseFloat(value) || 0,
      };
      const task = newRoles[roleIndex].tasks[taskIndex];
      task.hrat = parseFloat((task.aps * task.w * (1 - task.hrf)).toFixed(4));
      return { ...prev, roles: newRoles };
    });
  };

  const removeTask = (roleIndex, taskIndex) => {
    setFormData((prev) => {
      const newRoles = [...prev.roles];
      newRoles[roleIndex].tasks = newRoles[roleIndex].tasks.filter(
        (_, i) => i !== taskIndex
      );
      return { ...prev, roles: newRoles };
    });
  };

  // Scenario Management
  const addScenario = () => {
    setFormData((prev) => ({
      ...prev,
      scenarios: [
        ...prev.scenarios,
        {
          type: "baseline",
          title: "",
          description: "",
          outcome: "",
          indicators: { title: "Watch Signals", text: "" },
        },
      ],
    }));
  };

  const updateScenario = (index, field, value) => {
    setFormData((prev) => {
      const newScenarios = [...prev.scenarios];
      newScenarios[index] = { ...newScenarios[index], [field]: value };
      return { ...prev, scenarios: newScenarios };
    });
  };

  const removeScenario = (index) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.filter((_, i) => i !== index),
    }));
  };

  // Implication Management
  const addImplication = (category) => {
    setFormData((prev) => ({
      ...prev,
      implications: {
        ...prev.implications,
        [category]: [
          ...prev.implications[category],
          { title: "", description: "" },
        ],
      },
    }));
  };

  const updateImplication = (category, index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.implications[category]];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        implications: { ...prev.implications, [category]: newItems },
      };
    });
  };

  const removeImplication = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      implications: {
        ...prev.implications,
        [category]: prev.implications[category].filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const report = await reportsService.createReport(formData);
<<<<<<< HEAD
      toast.success("Report created successfully!");
      setTimeout(() => navigate(`/admin/reports/${report.id}/edit`), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to create report";
      setError(errorMsg);
      toast.error(errorMsg);
=======
      setSuccess("Report created successfully!");
      setTimeout(() => navigate(`/admin/reports/${report.id}/edit`), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create report");
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-report-new">
      <div className="page-header">
        <div className="header-left">
          <h1>Create New Report</h1>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/reports")}
          >
            ← Cancel
          </button>
          <button
            type="submit"
            form="report-form"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Report"}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="edit-tabs">
        {[
          "basic",
          "cover",
          "executive",
          "prologue",
          "methodology",
          "roles",
          "scenarios",
          "implications",
        ].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab === "roles"
              ? `Roles (${formData.roles.length})`
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form id="report-form" className="report-form" onSubmit={handleSubmit}>
        {activeTab === "basic" && (
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label htmlFor="title">Report Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Goa Hospitality 2064"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle">Subtitle *</label>
              <textarea
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="A brief description..."
                rows="3"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="slug">URL Slug *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="report-url-slug"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="report_type">Report Type</label>
                <select
                  id="report_type"
                  name="report_type"
                  value={formData.report_type}
                  onChange={handleChange}
                >
                  <option value="horizon-scan">Horizon Scan</option>
                  <option value="industry-analysis">Industry Analysis</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., Hospitality"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="region">Region *</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="e.g., Goa, India"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="target_year">Target Year *</label>
                <input
                  type="number"
                  id="target_year"
                  name="target_year"
                  value={formData.target_year}
                  onChange={handleChange}
                  min="2030"
                  max="2150"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image_url">Cover Image URL</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />{" "}
                Featured Report
              </label>
            </div>
          </div>
        )}

        {activeTab === "cover" && (
          <div className="form-section">
            <h2>Cover Section</h2>
            <div className="form-group">
              <label>Report Meta</label>
              <input
                type="text"
                value={formData.cover.reportMeta}
                onChange={(e) =>
                  handleCoverChange("reportMeta", e.target.value)
                }
                placeholder="Strategic Foresight Report · December 2024"
              />
            </div>
            <div className="form-group">
              <label>Cover Title (HTML supported)</label>
              <input
                type="text"
                value={formData.cover.title}
                onChange={(e) => handleCoverChange("title", e.target.value)}
                placeholder="The <em>Goa</em> Hospitality Workforce of <em>2064</em>"
              />
            </div>
            <div className="form-group">
              <label>Cover Subtitle</label>
              <textarea
                value={formData.cover.subtitle}
                onChange={(e) => handleCoverChange("subtitle", e.target.value)}
                rows="3"
                placeholder="A forty-year projection..."
              />
            </div>
            <h3>Cover Statistics</h3>
            <div className="stats-grid">
              {formData.cover.stats.map((stat, i) => (
                <div key={i} className="stat-input-group">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) =>
                      handleCoverStatChange(i, "value", e.target.value)
                    }
                    placeholder="Value"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleCoverStatChange(i, "label", e.target.value)
                    }
                    placeholder="Label"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "executive" && (
          <div className="form-section">
            <h2>Executive Summary</h2>
            <div className="form-group">
              <label>
                Summary Paragraphs (separate with blank lines, HTML supported)
              </label>
              <textarea
                value={formData.executive_summary.paragraphs.join("\n\n")}
                onChange={(e) =>
                  handleNestedChange(
                    "executive_summary",
                    "paragraphs",
                    e.target.value.split("\n\n").filter((p) => p.trim())
                  )
                }
                rows="12"
                placeholder="Enter executive summary..."
              />
            </div>
            <h3>Summary Cards</h3>
            <button
              type="button"
              className="btn-add"
              onClick={addExecutiveCard}
            >
              + Add Card
            </button>
            {formData.executive_summary.cards.map((card, i) => (
              <div key={i} className="card-editor">
                <div className="card-editor-header">
                  <h4>Card {i + 1}</h4>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeExecutiveCard(i)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) =>
                        updateExecutiveCard(i, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Value</label>
                    <input
                      type="text"
                      value={card.value}
                      onChange={(e) =>
                        updateExecutiveCard(i, "value", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Change</label>
                    <input
                      type="text"
                      value={card.change}
                      onChange={(e) =>
                        updateExecutiveCard(i, "change", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Class</label>
                    <select
                      value={card.changeClass}
                      onChange={(e) =>
                        updateExecutiveCard(i, "changeClass", e.target.value)
                      }
                    >
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                      <option value="">Neutral</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={card.desc}
                    onChange={(e) =>
                      updateExecutiveCard(i, "desc", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "prologue" && (
          <div className="form-section">
            <h2>Narrative Prologue</h2>
            <p className="form-hint">
              A narrative story set in the future. Use HTML: &lt;p&gt;,
              &lt;em&gt;, &lt;strong&gt;
            </p>
            <div className="form-group">
              <textarea
                id="prologue"
                name="prologue"
                value={formData.prologue}
                onChange={handleChange}
                rows="20"
                placeholder="<p>Priya Naik wakes at 5:47 AM...</p>"
              />
            </div>
          </div>
        )}

        {activeTab === "methodology" && (
          <div className="form-section">
            <h2>Methodology</h2>
            <div className="form-group">
              <label>Research Sources (one per line)</label>
              <textarea
                value={formData.methodology.sources.join("\n")}
                onChange={(e) =>
                  handleNestedChange(
                    "methodology",
                    "sources",
                    e.target.value.split("\n").filter((s) => s.trim())
                  )
                }
                rows="8"
              />
            </div>
            <div className="form-group">
              <label>Key Assumptions (format: Label: Text)</label>
              <textarea
                value={formData.methodology.assumptions
                  .map((a) => `${a.label} ${a.text}`)
                  .join("\n")}
                onChange={(e) =>
                  handleNestedChange(
                    "methodology",
                    "assumptions",
                    e.target.value
                      .split("\n")
                      .filter((a) => a.trim())
                      .map((line) => {
                        const colonIndex = line.indexOf(":");
                        return colonIndex > 0
                          ? {
                              label: line.substring(0, colonIndex + 1),
                              text: line.substring(colonIndex + 1).trim(),
                            }
                          : { label: "", text: line };
                      })
                  )
                }
                rows="6"
              />
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="form-section">
            <h2>Future Roles</h2>
            <button type="button" className="btn-add" onClick={addRole}>
              + Add Role
            </button>
            {formData.roles.map((role, ri) => (
              <div key={ri} className="role-editor">
                <div className="role-editor-header">
                  <h3>
                    Role {role.role_number}: {role.title || "Untitled"}
                  </h3>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeRole(ri)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Number</label>
                    <input
                      type="text"
                      value={role.role_number}
                      onChange={(e) =>
                        updateRole(ri, "role_number", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={role.title}
                      onChange={(e) => updateRole(ri, "title", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Emergence Period</label>
                    <input
                      type="text"
                      value={role.emergence_period}
                      onChange={(e) =>
                        updateRole(ri, "emergence_period", e.target.value)
                      }
                      placeholder="2035-2045"
                    />
                  </div>
                  <div className="form-group">
                    <label>Origin</label>
                    <input
                      type="text"
                      value={role.origin}
                      onChange={(e) => updateRole(ri, "origin", e.target.value)}
                      placeholder="From: Guest Relations"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Confidence</label>
                    <select
                      value={role.confidence}
                      onChange={(e) =>
                        updateRole(ri, "confidence", e.target.value)
                      }
                    >
                      <option value="High Confidence">High</option>
                      <option value="Moderate Confidence">Moderate</option>
                      <option value="Speculative">Speculative</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>RPI Score</label>
                    <input
                      type="number"
                      step="0.001"
                      value={role.rpi_score}
                      onChange={(e) =>
                        updateRole(
                          ri,
                          "rpi_score",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Narrative</label>
                  <textarea
                    value={role.narrative}
                    onChange={(e) =>
                      updateRole(ri, "narrative", e.target.value)
                    }
                    rows="3"
                  />
                </div>
                <h4>Tasks</h4>
                <button
                  type="button"
                  className="btn-add-small"
                  onClick={() => addTask(ri)}
                >
                  + Add Task
                </button>
                {role.tasks.map((task, ti) => (
                  <div key={ti} className="task-row">
                    <input
                      type="text"
                      value={task.task}
                      onChange={(e) =>
                        updateTask(ri, ti, "task", e.target.value)
                      }
                      placeholder="Task"
                      className="task-name"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={task.aps}
                      onChange={(e) =>
                        updateTask(ri, ti, "aps", e.target.value)
                      }
                      placeholder="APS"
                      className="task-num"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={task.w}
                      onChange={(e) => updateTask(ri, ti, "w", e.target.value)}
                      placeholder="W"
                      className="task-num"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={task.hrf}
                      onChange={(e) =>
                        updateTask(ri, ti, "hrf", e.target.value)
                      }
                      placeholder="HRF"
                      className="task-num"
                    />
                    <span className="task-hrat">
                      HRAT: {task.hrat.toFixed(4)}
                    </span>
                    <button
                      type="button"
                      className="btn-remove-small"
                      onClick={() => removeTask(ri, ti)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "scenarios" && (
          <div className="form-section">
            <h2>Future Scenarios</h2>
            <button type="button" className="btn-add" onClick={addScenario}>
              + Add Scenario
            </button>
            {formData.scenarios.map((s, i) => (
              <div key={i} className="scenario-editor">
                <div className="scenario-editor-header">
                  <h3>{s.title || "Untitled Scenario"}</h3>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeScenario(i)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={s.type}
                      onChange={(e) =>
                        updateScenario(i, "type", e.target.value)
                      }
                    >
                      <option value="acceleration">Acceleration</option>
                      <option value="baseline">Baseline</option>
                      <option value="disruption">Disruption</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={s.title}
                      onChange={(e) =>
                        updateScenario(i, "title", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={s.description}
                    onChange={(e) =>
                      updateScenario(i, "description", e.target.value)
                    }
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Outcome</label>
                  <input
                    type="text"
                    value={s.outcome}
                    onChange={(e) =>
                      updateScenario(i, "outcome", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "implications" && (
          <div className="form-section">
            <h2>Strategic Implications</h2>
            {["policymakers", "industry_leaders", "individuals"].map((cat) => (
              <div key={cat} className="implication-category">
                <h3>
                  {cat
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h3>
                <button
                  type="button"
                  className="btn-add-small"
                  onClick={() => addImplication(cat)}
                >
                  + Add
                </button>
                {formData.implications[cat].map((item, i) => (
                  <div key={i} className="implication-item">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateImplication(cat, i, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          updateImplication(
                            cat,
                            i,
                            "description",
                            e.target.value
                          )
                        }
                        rows="2"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-remove-small"
                      onClick={() => removeImplication(cat, i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/reports")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReportNew;
