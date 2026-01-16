import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import reportsService from "../../services/reportsService";
import "./AdminReports.css";

const AdminReportEdit = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    target_year: "",
    image_url: "",
    // Content sections
    prologue: "",
    executive_summary: {
      paragraphs: [],
      cards: [],
    },
    methodology: {
      sources: [],
      assumptions: [],
    },
    roles: [],
    scenarios: [],
    implications: {
      policymakers: [],
      industry: [],
      individuals: [],
    },
    cta: {
      title: "",
      subtitle: "",
      buttons: [],
    },
  });

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const report = await reportsService.getReportById(reportId);
      setFormData({
        title: report.title || "",
        subtitle: report.subtitle || "",
        slug: report.slug || "",
        report_type: report.report_type || "horizon-scan",
        status: report.status || "draft",
        featured: report.featured || false,
        industry: report.industry || "",
        region: report.region || "",
        target_year: report.target_year || "",
        image_url: report.image_url || "",
        prologue: report.prologue || "",
        executive_summary: report.executive_summary || {
          paragraphs: [],
          cards: [],
        },
        methodology: report.methodology || { sources: [], assumptions: [] },
        roles: report.roles || [],
        scenarios: report.scenarios || [],
        implications: report.implications || {
          policymakers: [],
          industry: [],
          individuals: [],
        },
        cta: report.cta || { title: "", subtitle: "", buttons: [] },
      });
    } catch (err) {
      setError("Failed to load report");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await reportsService.updateReport(reportId, formData);
<<<<<<< HEAD
      toast.success("Report updated successfully!");
      setSuccess("Report updated successfully!");
      setError(err.response?.data?.detail || "Failed to update report");
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
    } finally {
      setSaving(false);
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      await reportsService.publishReport(reportId);
      setFormData((prev) => ({ ...prev, status: "published" }));
<<<<<<< HEAD
      toast.success("Report published successfully!");
      setSuccess("Report published successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      toast.error("Failed to publish report");
=======
      setSuccess("Report published successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
      setError("Failed to publish report");
    } finally {
      await reportsService.unpublishReport(reportId);
      setFormData((prev) => ({ ...prev, status: "draft" }));
<<<<<<< HEAD
      setSuccess("Report unpublished");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      toast.error("Failed to unpublish report");
=======
      setSuccess("Report unpublished");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
      setError("Failed to unpublish report");
    } finally {
      setSaving(false);
    }
  };

  // Role management
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
          confidence: "High",
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
    const updatedRoles = [...formData.roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const removeRole = (index) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index),
    }));
  };

<<<<<<< HEAD
=======
  // Task management within a role
  const addTask = (roleIndex) => {
    const updatedRoles = [...formData.roles];
    const role = updatedRoles[roleIndex];
    if (!role.tasks) role.tasks = [];
    role.tasks.push({
      name: "",
      APS: 0,
      W: 0,
      HRF: 0,
      HRA_t: 0,
    });
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const updateTask = (roleIndex, taskIndex, field, value) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[roleIndex].tasks[taskIndex][field] = value;
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const removeTask = (roleIndex, taskIndex) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[roleIndex].tasks = updatedRoles[roleIndex].tasks.filter(
      (_, i) => i !== taskIndex
    );
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  // Skills management within a role
  const updateSkills = (roleIndex, skillType, value) => {
    const updatedRoles = [...formData.roles];
    if (!updatedRoles[roleIndex].skills) {
      updatedRoles[roleIndex].skills = { technical: [], soft: [], domain: [] };
    }
    // Convert comma-separated string to array
    updatedRoles[roleIndex].skills[skillType] = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  // Gauge info management
  const updateGaugeInfo = (roleIndex, field, value) => {
    const updatedRoles = [...formData.roles];
    if (!updatedRoles[roleIndex].gauge_info) {
      updatedRoles[roleIndex].gauge_info = { title: "", description: "" };
    }
    updatedRoles[roleIndex].gauge_info[field] = value;
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

  // Causal chain management
  const updateCausalChain = (roleIndex, value) => {
    const updatedRoles = [...formData.roles];
    // Convert comma-separated string to array
    updatedRoles[roleIndex].causal_chain = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData((prev) => ({ ...prev, roles: updatedRoles }));
  };

>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
  // Scenario management
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
          indicators: { title: "", content: "" },
        },
      ],
    }));
  };

  const updateScenario = (index, field, value) => {
    const updated = [...formData.scenarios];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, scenarios: updated }));
  };

  const removeScenario = (index) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="reports-loading">
        <div className="loading-spinner"></div>
        <p>Loading report...</p>
      </div>
    );
  }

  return (
    <div className="admin-report-edit">
      <div className="page-header">
        <div className="header-left">
          <h1>Edit Report</h1>
          <span className={`status-badge ${formData.status}`}>
            {formData.status}
          </span>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/reports")}
          >
            ← Back
          </button>
          {formData.status === "draft" ? (
            <button
              type="button"
              className="btn-success"
              onClick={handlePublish}
              disabled={saving}
            >
              Publish
            </button>
          ) : (
            <button
              type="button"
              className="btn-warning"
              onClick={handleUnpublish}
              disabled={saving}
            >
              Unpublish
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Tab Navigation */}
      <div className="edit-tabs">
        <button
          className={activeTab === "basic" ? "active" : ""}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={activeTab === "executive" ? "active" : ""}
          onClick={() => setActiveTab("executive")}
        >
          Executive Summary
        </button>
        <button
          className={activeTab === "prologue" ? "active" : ""}
          onClick={() => setActiveTab("prologue")}
        >
          Prologue
        </button>
        <button
          className={activeTab === "methodology" ? "active" : ""}
          onClick={() => setActiveTab("methodology")}
        >
          Methodology
        </button>
        <button
          className={activeTab === "roles" ? "active" : ""}
          onClick={() => setActiveTab("roles")}
        >
          Roles ({formData.roles.length})
        </button>
        <button
          className={activeTab === "scenarios" ? "active" : ""}
          onClick={() => setActiveTab("scenarios")}
        >
          Scenarios
        </button>
        <button
          className={activeTab === "implications" ? "active" : ""}
          onClick={() => setActiveTab("implications")}
        >
          Implications
        </button>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Report title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">Subtitle</label>
              <textarea
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Report subtitle/description"
                rows="2"
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
                  <option value="workforce-report">Workforce Report</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., Hospitality, Technology"
                />
              </div>
              <div className="form-group">
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="e.g., Goa, Global"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="target_year">Target Year</label>
                <input
                  type="number"
                  id="target_year"
                  name="target_year"
                  value={formData.target_year}
                  onChange={handleChange}
                  min="2024"
                  max="2150"
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
                />
                Featured Report
              </label>
            </div>
          </div>
        )}

        {/* Executive Summary Tab */}
        {activeTab === "executive" && (
          <div className="form-section">
            <h2>Executive Summary</h2>

            <div className="form-group">
              <label>Summary Paragraphs</label>
              <p className="form-hint">
                Enter each paragraph on a new line. Use &lt;strong&gt; and
                &lt;em&gt; for formatting.
              </p>
              <textarea
                value={
                  formData.executive_summary.paragraphs?.join("\n\n") || ""
                }
                onChange={(e) =>
                  handleNestedChange(
                    "executive_summary",
                    "paragraphs",
                    e.target.value.split("\n\n").filter((p) => p.trim())
                  )
                }
                rows="10"
                placeholder="Enter executive summary paragraphs..."
              />
            </div>
          </div>
        )}

        {/* Prologue Tab */}
        {activeTab === "prologue" && (
          <div className="form-section">
            <h2>Narrative Prologue</h2>

            <div className="form-group">
              <label htmlFor="prologue">Prologue Content</label>
              <p className="form-hint">
                HTML formatting supported. Use &lt;p&gt;, &lt;em&gt;, etc.
              </p>
              <textarea
                id="prologue"
                name="prologue"
                value={formData.prologue}
                onChange={handleChange}
                rows="15"
                placeholder="Enter the narrative prologue..."
              />
            </div>
          </div>
        )}

        {/* Methodology Tab */}
        {activeTab === "methodology" && (
          <div className="form-section">
            <h2>Methodology</h2>

            <div className="form-group">
              <label>Research Sources (one per line)</label>
              <textarea
                value={formData.methodology.sources?.join("\n") || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "methodology",
                    "sources",
                    e.target.value.split("\n").filter((s) => s.trim())
                  )
                }
                rows="8"
                placeholder="Enter research sources..."
              />
            </div>

            <div className="form-group">
              <label>Key Assumptions (one per line, format: Label: Text)</label>
              <textarea
                value={
                  formData.methodology.assumptions
                    ?.map((a) => `${a.label} ${a.text}`)
                    .join("\n") || ""
                }
                onChange={(e) =>
                  handleNestedChange(
                    "methodology",
                    "assumptions",
                    e.target.value
                      .split("\n")
                      .filter((s) => s.trim())
                      .map((line) => {
                        const colonIndex = line.indexOf(":");
                        if (colonIndex > -1) {
                          return {
                            label: line.substring(0, colonIndex + 1).trim(),
                            text: line.substring(colonIndex + 1).trim(),
                          };
                        }
                        return { label: "", text: line };
                      })
                  )
                }
                rows="6"
                placeholder="Climate: 40% of areas impacted by 2050..."
              />
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Future Roles Analysis</h2>
              <button type="button" className="btn-add" onClick={addRole}>
                + Add Role
              </button>
            </div>

            {formData.roles.map((role, index) => (
              <div key={index} className="role-editor">
                <div className="role-editor-header">
                  <span className="role-number">{role.role_number}</span>
                  <input
                    type="text"
                    value={role.title}
                    onChange={(e) => updateRole(index, "title", e.target.value)}
                    placeholder="Role Title"
                    className="role-title-input"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeRole(index)}
                  >
                    ×
                  </button>
                </div>

                <div className="role-editor-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Emergence Period</label>
                      <input
                        type="text"
                        value={role.emergence_period}
                        onChange={(e) =>
                          updateRole(index, "emergence_period", e.target.value)
                        }
                        placeholder="e.g., 2035-2045"
                      />
                    </div>
                    <div className="form-group">
                      <label>Origin</label>
                      <input
                        type="text"
                        value={role.origin}
                        onChange={(e) =>
                          updateRole(index, "origin", e.target.value)
                        }
                        placeholder="e.g., From: Guest Relations + Cultural Guide"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confidence</label>
                      <select
                        value={role.confidence}
                        onChange={(e) =>
                          updateRole(index, "confidence", e.target.value)
                        }
                      >
                        <option value="High">High Confidence</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Speculative">Speculative</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>RPI Score</label>
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      value={role.rpi_score}
                      onChange={(e) =>
                        updateRole(
                          index,
                          "rpi_score",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Narrative Description</label>
                    <textarea
                      value={role.narrative}
                      onChange={(e) =>
                        updateRole(index, "narrative", e.target.value)
                      }
                      rows="3"
                      placeholder="Role description and responsibilities..."
                    />
                  </div>
<<<<<<< HEAD
=======

                  {/* Tasks Section */}
                  <div className="tasks-section">
                    <div className="tasks-header">
                      <label>Tasks & Metrics</label>
                      <button
                        type="button"
                        className="btn-add-small"
                        onClick={() => addTask(index)}
                      >
                        + Add Task
                      </button>
                    </div>
                    {role.tasks && role.tasks.length > 0 ? (
                      <div className="tasks-list">
                        {role.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="task-item">
                            <div className="task-row">
                              <input
                                type="text"
                                value={task.name || ""}
                                onChange={(e) =>
                                  updateTask(
                                    index,
                                    taskIndex,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Task name"
                                className="task-name-input"
                              />
                              <button
                                type="button"
                                className="btn-remove-small"
                                onClick={() => removeTask(index, taskIndex)}
                              >
                                ×
                              </button>
                            </div>
                            <div className="task-metrics">
                              <div className="metric-input">
                                <label>APS</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="1"
                                  value={task.APS || 0}
                                  onChange={(e) =>
                                    updateTask(
                                      index,
                                      taskIndex,
                                      "APS",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                              <div className="metric-input">
                                <label>W (Weight)</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="1"
                                  value={task.W || 0}
                                  onChange={(e) =>
                                    updateTask(
                                      index,
                                      taskIndex,
                                      "W",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                              <div className="metric-input">
                                <label>HRF</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="1"
                                  value={task.HRF || 0}
                                  onChange={(e) =>
                                    updateTask(
                                      index,
                                      taskIndex,
                                      "HRF",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                              <div className="metric-input">
                                <label>HRA_t</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="1"
                                  value={task.HRA_t || 0}
                                  onChange={(e) =>
                                    updateTask(
                                      index,
                                      taskIndex,
                                      "HRA_t",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-tasks">
                        No tasks defined. Click "Add Task" to add one.
                      </p>
                    )}
                  </div>

                  {/* Skills Section */}
                  <div className="skills-section">
                    <label>Skills</label>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Technical Skills (comma-separated)</label>
                        <input
                          type="text"
                          value={role.skills?.technical?.join(", ") || ""}
                          onChange={(e) =>
                            updateSkills(index, "technical", e.target.value)
                          }
                          placeholder="e.g., AI Systems, Data Analysis"
                        />
                      </div>
                      <div className="form-group">
                        <label>Soft Skills (comma-separated)</label>
                        <input
                          type="text"
                          value={role.skills?.soft?.join(", ") || ""}
                          onChange={(e) =>
                            updateSkills(index, "soft", e.target.value)
                          }
                          placeholder="e.g., Communication, Leadership"
                        />
                      </div>
                      <div className="form-group">
                        <label>Domain Skills (comma-separated)</label>
                        <input
                          type="text"
                          value={role.skills?.domain?.join(", ") || ""}
                          onChange={(e) =>
                            updateSkills(index, "domain", e.target.value)
                          }
                          placeholder="e.g., Hospitality, Tourism"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gauge Info */}
                  <div className="gauge-section">
                    <label>Gauge Information</label>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Gauge Title</label>
                        <input
                          type="text"
                          value={role.gauge_info?.title || ""}
                          onChange={(e) =>
                            updateGaugeInfo(index, "title", e.target.value)
                          }
                          placeholder="e.g., Human Advantage"
                        />
                      </div>
                      <div className="form-group">
                        <label>Gauge Description</label>
                        <input
                          type="text"
                          value={role.gauge_info?.description || ""}
                          onChange={(e) =>
                            updateGaugeInfo(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Short description"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Causal Chain */}
                  <div className="form-group">
                    <label>Causal Chain (comma-separated steps)</label>
                    <input
                      type="text"
                      value={role.causal_chain?.join(", ") || ""}
                      onChange={(e) => updateCausalChain(index, e.target.value)}
                      placeholder="e.g., Step 1, Step 2, Step 3"
                    />
                  </div>
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scenarios Tab */}
        {activeTab === "scenarios" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Scenarios</h2>
              <button type="button" className="btn-add" onClick={addScenario}>
                + Add Scenario
              </button>
            </div>

            {formData.scenarios.map((scenario, index) => (
              <div key={index} className="scenario-editor">
                <div className="scenario-editor-header">
                  <select
                    value={scenario.type}
                    onChange={(e) =>
                      updateScenario(index, "type", e.target.value)
                    }
                    className="scenario-type-select"
                  >
                    <option value="acceleration">Acceleration</option>
                    <option value="baseline">Baseline</option>
                    <option value="disruption">Disruption</option>
                  </select>
                  <input
                    type="text"
                    value={scenario.title}
                    onChange={(e) =>
                      updateScenario(index, "title", e.target.value)
                    }
                    placeholder="Scenario Title"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeScenario(index)}
                  >
                    ×
                  </button>
                </div>

                <div className="scenario-editor-body">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={scenario.description}
                      onChange={(e) =>
                        updateScenario(index, "description", e.target.value)
                      }
                      rows="2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Outcome</label>
                    <textarea
                      value={scenario.outcome}
                      onChange={(e) =>
                        updateScenario(index, "outcome", e.target.value)
                      }
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Implications Tab */}
        {activeTab === "implications" && (
          <div className="form-section">
            <h2>Strategic Implications</h2>

            <div className="form-group">
              <label>
                For Policymakers (one per line, format: Title | Description)
              </label>
              <textarea
                value={
                  formData.implications.policymakers
                    ?.map((i) => `${i.title} | ${i.description}`)
                    .join("\n") || ""
                }
                onChange={(e) =>
                  handleNestedChange(
                    "implications",
                    "policymakers",
                    e.target.value
                      .split("\n")
                      .filter((s) => s.trim())
                      .map((line) => {
                        const [title, desc] = line
                          .split("|")
                          .map((s) => s.trim());
                        return { title: title || "", description: desc || "" };
                      })
                  )
                }
                rows="6"
                placeholder="Establish Certification Framework | Create regulatory standards..."
              />
            </div>

            <div className="form-group">
              <label>
                For Industry Leaders (one per line, format: Title | Description)
              </label>
              <textarea
                value={
                  formData.implications.industry
                    ?.map((i) => `${i.title} | ${i.description}`)
                    .join("\n") || ""
                }
                onChange={(e) =>
                  handleNestedChange(
                    "implications",
                    "industry",
                    e.target.value
                      .split("\n")
                      .filter((s) => s.trim())
                      .map((line) => {
                        const [title, desc] = line
                          .split("|")
                          .map((s) => s.trim());
                        return { title: title || "", description: desc || "" };
                      })
                  )
                }
                rows="6"
              />
            </div>

            <div className="form-group">
              <label>
                For Individuals (one per line, format: Title | Description)
              </label>
              <textarea
                value={
                  formData.implications.individuals
                    ?.map((i) => `${i.title} | ${i.description}`)
                    .join("\n") || ""
                }
                onChange={(e) =>
                  handleNestedChange(
                    "implications",
                    "individuals",
                    e.target.value
                      .split("\n")
                      .filter((s) => s.trim())
                      .map((line) => {
                        const [title, desc] = line
                          .split("|")
                          .map((s) => s.trim());
                        return { title: title || "", description: desc || "" };
                      })
                  )
                }
                rows="6"
              />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReportEdit;
