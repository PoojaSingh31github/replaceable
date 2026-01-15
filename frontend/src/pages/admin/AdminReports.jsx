import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import reportsService from "../../services/reportsService";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportsService.getAllReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (report) => {
    try {
      if (report.status === "published") {
        await reportsService.unpublishReport(report.id);
      } else {
        await reportsService.publishReport(report.id);
      }
      fetchReports();
    } catch (error) {
      console.error("Failed to update report status:", error);
    }
  };

  const handleDelete = async (reportId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    ) {
      try {
        await reportsService.deleteReport(reportId);
        fetchReports();
        toast.success("Report deleted successfully");
      } catch (error) {
        console.error("Failed to delete report:", error);
        toast.error("Failed to delete report");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.industry?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && report.status === "published") ||
      (filterStatus === "draft" && report.status === "draft");
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="reports-loading">
        <div className="loading-spinner"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="admin-reports">
      <div className="reports-header">
        <div className="header-content">
          <h1>Reports</h1>
          <p>Manage your industry analysis reports</p>
        </div>
        <Link to="/admin/reports/new" className="btn-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Report
        </Link>
      </div>

      {/* Filters */}
      <div className="reports-filters">
        <div className="search-box">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button
            className={filterStatus === "all" ? "active" : ""}
            onClick={() => setFilterStatus("all")}
          >
            All ({reports.length})
          </button>
          <button
            className={filterStatus === "published" ? "active" : ""}
            onClick={() => setFilterStatus("published")}
          >
            Published ({reports.filter((r) => r.status === "published").length})
          </button>
          <button
            className={filterStatus === "draft" ? "active" : ""}
            onClick={() => setFilterStatus("draft")}
          >
            Drafts ({reports.filter((r) => r.status === "draft").length})
          </button>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="reports-list">
          {filteredReports.map((report) => (
            <div key={report.id} className="report-item">
              <div className="report-info">
                <div className="report-meta">
                  <span
                    className={`status-badge ${
                      report.status === "published" ? "published" : "draft"
                    }`}
                  >
                    {report.status === "published" ? "Published" : "Draft"}
                  </span>
                  <span className="report-date">
                    {formatDate(report.created_at)}
                  </span>
                </div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-subtitle">{report.subtitle}</p>
                <div className="report-details">
                  {report.industry && <span>{report.industry}</span>}
                  {report.industry && report.region && <span>·</span>}
                  {report.region && <span>{report.region}</span>}
                  {(report.industry || report.region) && report.target_year && (
                    <span>·</span>
                  )}
                  {report.target_year && (
                    <span>Target: {report.target_year}</span>
                  )}
                </div>
              </div>
              <div className="report-actions">
                <Link
                  to={`/admin/reports/${report.id}/edit`}
                  className="action-btn edit"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Link>
                <button
                  className={`action-btn ${
                    report.status === "published" ? "unpublish" : "publish"
                  }`}
                  onClick={() => handlePublishToggle(report)}
                >
                  {report.status === "published" ? (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                      Unpublish
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Publish
                    </>
                  )}
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(report.id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <h3>No reports found</h3>
          <p>
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter"
              : "Create your first report to get started"}
          </p>
          {!searchTerm && filterStatus === "all" && (
            <Link to="/admin/reports/new" className="btn-primary">
              Create Report
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
