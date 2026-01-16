import React, { useState, useEffect } from "react";
import consultationsService from "../../services/consultationsService";
import "./AdminConsultations.css";

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const data = await consultationsService.getAllConsultations();
      setConsultations(data);
    } catch (error) {
      console.error("Failed to fetch consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (consultationId, newStatus) => {
    try {
      await consultationsService.updateConsultationStatus(
        consultationId,
        newStatus
      );
      fetchConsultations();
<<<<<<< HEAD
      if (selectedConsultation?.id === consultationId) {
        setSelectedConsultation((prev) => ({ ...prev, status: newStatus }));
      }
      console.error("Failed to update status:", error);
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
    }
  };

    if (
      window.confirm(
        "Are you sure you want to delete this consultation request?"
      )
    ) {
      try {
        await consultationsService.deleteConsultation(consultationId);
        fetchConsultations();
<<<<<<< HEAD
        if (selectedConsultation?.id === consultationId) {
          setSelectedConsultation(null);
        }
        toast.success("Consultation deleted successfully");
      } catch (error) {
        console.error("Failed to delete consultation:", error);
        toast.error("Failed to delete consultation");
=======
        if (selectedConsultation?._id === consultationId) {
          setSelectedConsultation(null);
        }
      } catch (error) {
        console.error("Failed to delete consultation:", error);
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const filteredConsultations = consultations.filter((c) => {
    if (filterStatus === "all") return true;
    return c.status === filterStatus;
  });

  const statusCounts = {
    all: consultations.length,
    pending: consultations.filter((c) => c.status === "pending").length,
    contacted: consultations.filter((c) => c.status === "contacted").length,
    completed: consultations.filter((c) => c.status === "completed").length,
    cancelled: consultations.filter((c) => c.status === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="consultations-loading">
        <div className="loading-spinner"></div>
        <p>Loading consultations...</p>
      </div>
    );
  }

  return (
    <div className="admin-consultations">
      <div className="consultations-header">
        <h1>Consultation Requests</h1>
        <p>Manage incoming consultation inquiries</p>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs">
        {["all", "pending", "contacted", "completed", "cancelled"].map(
          (status) => (
            <button
              key={status}
              className={filterStatus === status ? "active" : ""}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="count">{statusCounts[status]}</span>
            </button>
          )
        )}
      </div>

      <div className="consultations-container">
        {/* List */}
        <div className="consultations-list">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <div
<<<<<<< HEAD
                key={consultation.id}
                className={`consultation-item ${
                  selectedConsultation?.id === consultation.id
=======
                key={consultation._id}
                className={`consultation-item ${
                  selectedConsultation?._id === consultation._id
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <div className="consultation-header">
                  <span className={`status-dot ${consultation.status}`}></span>
                  <span className="consultation-date">
                    {formatDate(consultation.created_at)}
                  </span>
                </div>
                <h3 className="consultation-name">
                  {consultation.first_name} {consultation.last_name}
                </h3>
                <p className="consultation-org">{consultation.organization}</p>
                <div className="consultation-tags">
                  <span className="tag">{consultation.industry}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-list">
              <p>No consultations found</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedConsultation ? (
          <div className="consultation-detail">
            <div className="detail-header">
              <div className="detail-title">
                <h2>
                  {selectedConsultation.first_name}{" "}
                  {selectedConsultation.last_name}
                </h2>
                <span className={`status-badge ${selectedConsultation.status}`}>
                  {selectedConsultation.status}
                </span>
              </div>
              <div className="detail-actions">
                <select
                  value={selectedConsultation.status}
                  onChange={(e) =>
<<<<<<< HEAD
                    handleStatusChange(selectedConsultation.id, e.target.value)
=======
                    handleStatusChange(selectedConsultation._id, e.target.value)
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                  }
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className="delete-btn"
<<<<<<< HEAD
                  onClick={() => handleDelete(selectedConsultation.id)}
=======
                  onClick={() => handleDelete(selectedConsultation._id)}
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="detail-body">
              <div className="detail-section">
                <h4>Contact Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Email</label>
                    <p>
                      <a href={`mailto:${selectedConsultation.email}`}>
                        {selectedConsultation.email}
                      </a>
                    </p>
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <p>{selectedConsultation.phone || "Not provided"}</p>
                  </div>
                  <div className="detail-item">
                    <label>Organization</label>
                    <p>{selectedConsultation.organization}</p>
                  </div>
                  <div className="detail-item">
                    <label>Industry</label>
                    <p>{selectedConsultation.industry}</p>
                  </div>
                </div>
              </div>

              {selectedConsultation.preferred_date && (
                <div className="detail-section">
                  <h4>Preferred Contact Date</h4>
                  <p>{selectedConsultation.preferred_date}</p>
                </div>
              )}

              {selectedConsultation.interests &&
                selectedConsultation.interests.length > 0 && (
                  <div className="detail-section">
                    <h4>Areas of Interest</h4>
                    <div className="interest-tags">
                      {selectedConsultation.interests.map((interest, idx) => (
                        <span key={idx} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {selectedConsultation.message && (
                <div className="detail-section">
                  <h4>Message</h4>
                  <p className="message-text">{selectedConsultation.message}</p>
                </div>
              )}

              <div className="detail-section">
                <h4>Submission Details</h4>
                <p className="submission-date">
                  Submitted on {formatDate(selectedConsultation.created_at)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Select a consultation request to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsultations;
