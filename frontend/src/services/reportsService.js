import api from "./api";

export const reportsService = {
  // Get all published reports (public)
  async getPublishedReports() {
    const response = await api.get("/reports/public");
    return response.data;
  },

  // Get single report by slug (public)
  async getReportBySlug(slug) {
    const response = await api.get(`/reports/public/${slug}`);
    return response.data;
  },

  // Get all reports (admin)
  async getAllReports() {
    const response = await api.get("/reports/");
    return response.data;
  },

  // Create report (admin)
  async createReport(reportData) {
    const response = await api.post("/reports/", reportData);
    return response.data;
  },

  // Update report (admin)
  async updateReport(reportId, reportData) {
    const response = await api.put(`/reports/${reportId}`, reportData);
    return response.data;
  },

  // Delete report (admin)
  async deleteReport(reportId) {
    const response = await api.delete(`/reports/${reportId}`);
    return response.data;
  },

  // Publish report (admin)
  async publishReport(reportId) {
    const response = await api.post(`/reports/${reportId}/publish`);
    return response.data;
  },

  // Unpublish report (admin)
  async unpublishReport(reportId) {
    const response = await api.post(`/reports/${reportId}/unpublish`);
    return response.data;
  },

  // Upload file (admin)
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/reports/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default reportsService;
