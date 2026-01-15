import api from "./api";

export const consultationsService = {
  // Submit consultation request (public)
  async submitConsultation(consultationData) {
    const response = await api.post("/consultations/submit", consultationData);
    return response.data;
  },

  // Get all consultations (admin)
  async getAllConsultations() {
    const response = await api.get("/consultations/");
    return response.data;
  },

  // Get consultation by ID (admin)
  async getConsultationById(consultationId) {
    const response = await api.get(`/consultations/${consultationId}`);
    return response.data;
  },

  // Update consultation status (admin)
  async updateConsultationStatus(consultationId, status, notes = null) {
    const params = new URLSearchParams({
      status,
      ...(notes && { notes }),
    });
    const response = await api.patch(
      `/consultations/${consultationId}/status?${params.toString()}`
    );
    return response.data;
  },

  // Update consultation (admin)
  async updateConsultation(consultationId, data) {
    const response = await api.put(`/consultations/${consultationId}`, data);
    return response.data;
  },

  // Delete consultation (admin)
  async deleteConsultation(consultationId) {
    const response = await api.delete(`/consultations/${consultationId}`);
    return response.data;
  },
};

export default consultationsService;
