import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reportsService from "../../services/reportsService";
import "./AdminReports.css";

const AdminReportNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    report_type: "horizon-scan",
    status: "draft",
    industry: "",
    region: "",
    target_year: new Date().getFullYear() + 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await reportsService.createReport(formData);
      navigate("/admin/reports");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-report-new">
      <div className="page-header">
        <h1>Create New Report</h1>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/admin/reports")}
        >
          ← Cancel
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter report title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subtitle">Subtitle *</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter report subtitle"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug *</label>
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

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Technology, Healthcare"
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
              placeholder="e.g., North America, Global"
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
              min={2024}
              max={2100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReportNew;
