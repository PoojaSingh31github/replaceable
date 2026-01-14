import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reportsService from "../../services/reportsService";
import consultationsService from "../../services/consultationsService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    publishedReports: 0,
    draftReports: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    completedConsultations: 0,
  });
  const [recentConsultations, setRecentConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch reports
      const reports = await reportsService.getAllReports();
      const publishedReports = reports.filter(
        (r) => r.status === "published"
      ).length;

      // Fetch consultations
      const consultations = await consultationsService.getAllConsultations();
      const newConsultations = consultations.filter(
        (c) => c.status === "new"
      ).length;
      const completedConsultations = consultations.filter(
        (c) => c.status === "completed"
      ).length;

      setStats({
        totalReports: reports.length,
        publishedReports,
        draftReports: reports.length - publishedReports,
        totalConsultations: consultations.length,
        pendingConsultations: newConsultations,
        completedConsultations,
      });

      // Get recent consultations (last 5)
      setRecentConsultations(consultations.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back. Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon reports">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalReports}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-breakdown">
            <span className="stat-item published">
              {stats.publishedReports} Published
            </span>
            <span className="stat-item draft">{stats.draftReports} Drafts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon consultations">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalConsultations}</span>
            <span className="stat-label">Consultation Requests</span>
          </div>
          <div className="stat-breakdown">
            <span className="stat-item pending">
              {stats.pendingConsultations} Pending
            </span>
            <span className="stat-item completed">
              {stats.completedConsultations} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/news/new" className="action-card">
            <div className="action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span>Create News Card</span>
          </Link>
          <Link to="/admin/reports/new" className="action-card">
            <div className="action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span>Create New Report</span>
          </Link>
          <Link to="/admin/consultations" className="action-card">
            <div className="action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span>View Pending Requests</span>
          </Link>
          <Link to="/admin/reports" className="action-card">
            <div className="action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <span>Manage Reports</span>
          </Link>
        </div>
      </div>

      {/* Recent Consultations */}
      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Consultation Requests</h2>
          <Link to="/admin/consultations" className="view-all">
            View All →
          </Link>
        </div>
        {recentConsultations.length > 0 ? (
          <div className="consultations-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Organization</th>
                  <th>Industry</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentConsultations.map((consultation) => (
                  <tr key={consultation.id}>
                    <td className="name-cell">
                      {consultation.first_name} {consultation.last_name}
                    </td>
                    <td>{consultation.company}</td>
                    <td>{consultation.industry_sector}</td>
                    <td>{formatDate(consultation.created_at)}</td>
                    <td>
                      <span className={`status-badge ${consultation.status}`}>
                        {consultation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No consultation requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
