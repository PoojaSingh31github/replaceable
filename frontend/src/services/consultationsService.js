import api from "./api";

export const consultationsService = {
  // Submit consultation request (public)
  async submitConsultation(consultationData) {
    const response = await api.post("/consultations/", consultationData);
    return response.data;
  },

  // Get all consultations (admin)
  async getAllConsultations() {
    const response = await api.get("/consultations/admin/");
    return response.data;
  },

  // Get consultation by ID (admin)
  async getConsultationById(consultationId) {
    const response = await api.get(`/consultations/admin/${consultationId}`);
    return response.data;
  },

  // Update consultation status (admin)
  async updateConsultationStatus(consultationId, status) {
    const response = await api.put(
      `/consultations/admin/${consultationId}/status`,
      { status }
    );
    return response.data;
  },

  // Add notes to consultation (admin)
  async addNotes(consultationId, notes) {
    const response = await api.put(
      `/consultations/admin/${consultationId}/notes`,
      { notes }
    );
    return response.data;
  },

  // Delete consultation (admin)
  async deleteConsultation(consultationId) {
    const response = await api.delete(`/consultations/admin/${consultationId}`);
    return response.data;
  },
};

export default consultationsService;
