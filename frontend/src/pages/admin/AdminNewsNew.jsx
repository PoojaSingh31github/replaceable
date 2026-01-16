import React, { useState } from "react";
import "./AdminNews.css";

const AdminNewsNew = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
    featured: false,
    status: "draft",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const categories = [
    "Workforce Transformation",
    "AI & Automation",
    "Policy & Regulation",
    "Industry Analysis",
    "Technology Trends",
    "Future of Work",
    "Research Insights",
    "Case Studies",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // TODO: Implement API call to save news card
      // const response = await newsService.createNews(formData);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

<<<<<<< HEAD
      toast.success("News card created successfully!");
=======
>>>>>>> 1055df777e5d1d621b49525d27396c396e695208

      // Reset form
      setFormData({
        title: "",
        category: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        date: new Date().toISOString().split("T")[0],
        featured: false,
        status: "draft",
      });
    } catch (error) {
<<<<<<< HEAD
      const errorMsg = error.message || "Failed to create news card";
      toast.error(errorMsg);
      setMessage({
        type: "error",
        text: errorMsg,
=======
      setMessage({
  };

  return (
      <div className="page-header">
        <h1>Create News Card</h1>
        <p>Add a new news card or industry update</p>
      </div>

      {message.text && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-row">
            <div className="form-group full">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter news title"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Publication Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
              <span className="form-hint">
                Optional - URL to featured image
              </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Content</h2>

          <div className="form-row">
            <div className="form-group full">
              <label className="form-label">Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="form-textarea"
                rows="3"
                placeholder="Brief summary (appears on card)"
                required
              ></textarea>
              <span className="form-hint">
                2-3 sentences summarizing the news
              </span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label className="form-label">Full Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="form-textarea"
                rows="12"
                placeholder="Full article content (supports basic markdown)"
                required
              ></textarea>
              <span className="form-hint">
                Full article content - you can use markdown formatting
              </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Publishing Options</h2>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-checkbox-container">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <span className="form-checkbox-label">Featured</span>
                <span className="form-hint">Show as featured news</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create News Card"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewsNew;
