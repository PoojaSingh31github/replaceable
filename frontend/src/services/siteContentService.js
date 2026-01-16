import api from "./api";

export const siteContentService = {
  // ============= Public Endpoints =============

  // Get public site content
  async getPublicSiteContent() {
    const response = await api.get("/site-content/public");
    return response.data;
  },

  // Get public tags
  async getPublicTags() {
    const response = await api.get("/site-content/public/tags");
    return response.data;
  },

  // Get public landing page cards
  async getPublicCards(tag = null) {
    const params = tag ? { tag } : {};
    const response = await api.get("/site-content/public/cards", { params });
    return response.data;
  },

  // ============= Admin: Site Content =============

  // Get site content (admin)
  async getSiteContent() {
    const response = await api.get("/site-content/");
    return response.data;
  },

  // Update site content (admin)
  async updateSiteContent(data) {
    const response = await api.put("/site-content/", data);
    return response.data;
  },

  // Initialize site content (admin)
  async initializeSiteContent() {
    const response = await api.post("/site-content/initialize");
    return response.data;
  },

  // ============= Admin: Tags =============

  // Get all tags (admin)
  async getAllTags() {
    const response = await api.get("/site-content/tags");
    return response.data;
  },

  // Create tag (admin)
  async createTag(tagData) {
    const response = await api.post("/site-content/tags", tagData);
    return response.data;
  },

  // Get tag by ID (admin)
  async getTagById(tagId) {
    const response = await api.get(`/site-content/tags/${tagId}`);
    return response.data;
  },

  // Update tag (admin)
  async updateTag(tagId, tagData) {
    const response = await api.put(`/site-content/tags/${tagId}`, tagData);
    return response.data;
  },

  // Delete tag (admin)
  async deleteTag(tagId) {
    const response = await api.delete(`/site-content/tags/${tagId}`);
    return response.data;
  },

  // ============= Admin: Landing Cards =============

  // Get all cards (admin)
  async getAllCards(includeInactive = false) {
    const response = await api.get("/site-content/cards", {
      params: { include_inactive: includeInactive },
    });
    return response.data;
  },

  // Create card (admin)
  async createCard(cardData) {
    const response = await api.post("/site-content/cards", cardData);
    return response.data;
  },

  // Get card by ID (admin)
  async getCardById(cardId) {
    const response = await api.get(`/site-content/cards/${cardId}`);
    return response.data;
  },

  // Update card (admin)
  async updateCard(cardId, cardData) {
    const response = await api.put(`/site-content/cards/${cardId}`, cardData);
    return response.data;
  },

  // Delete card (admin)
  async deleteCard(cardId) {
    const response = await api.delete(`/site-content/cards/${cardId}`);
    return response.data;
  },

  // Reorder cards (admin)
  async reorderCards(cardOrders) {
    const response = await api.post("/site-content/cards/reorder", cardOrders);
    return response.data;
  },
};

export default siteContentService;
