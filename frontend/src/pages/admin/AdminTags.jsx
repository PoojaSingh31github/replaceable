import React, { useState, useEffect } from "react";
import siteContentService from "../../services/siteContentService";
import "./AdminTags.css";

const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [newTag, setNewTag] = useState({
    name: "",
    slug: "",
    color: "#c41e3a",
  });
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const data = await siteContentService.getAllTags();
      setTags(data);
    } catch (err) {
      setError("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!newTag.name.trim()) {
      setError("Tag name is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const created = await siteContentService.createTag(newTag);
      setTags([...tags, created]);
      setNewTag({ name: "", slug: "", color: "#c41e3a" });
      setShowNewForm(false);
      setSuccess("Tag created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create tag");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTag = async (tagId) => {
    if (!editingTag || !editingTag.name.trim()) {
      setError("Tag name is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const updated = await siteContentService.updateTag(tagId, editingTag);
      setTags(tags.map((t) => (t.id === tagId ? updated : t)));
      setEditingTag(null);
      setSuccess("Tag updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update tag");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;

    try {
      await siteContentService.deleteTag(tagId);
      setTags(tags.filter((t) => t.id !== tagId));
      setSuccess("Tag deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete tag");
    }
  };

  const startEditing = (tag) => {
    setEditingTag({ ...tag });
    setShowNewForm(false);
  };

  const cancelEditing = () => {
    setEditingTag(null);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading tags...</p>
      </div>
    );
  }

  return (
    <div className="admin-tags">
      <div className="page-header">
        <div className="header-left">
          <h1>Tags Management</h1>
          <p>Manage tags for reports and landing page cards</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => {
              setShowNewForm(true);
              setEditingTag(null);
            }}
          >
            + Add New Tag
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* New Tag Form */}
      {showNewForm && (
        <div className="tag-form-card">
          <h3>Create New Tag</h3>
          <form onSubmit={handleCreateTag}>
            <div className="form-row">
              <div className="form-group">
                <label>Tag Name *</label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) =>
                    setNewTag({ ...newTag, name: e.target.value })
                  }
                  placeholder="e.g., Technology"
                  required
                />
              </div>
              <div className="form-group">
                <label>Slug (auto-generated if empty)</label>
                <input
                  type="text"
                  value={newTag.slug}
                  onChange={(e) =>
                    setNewTag({ ...newTag, slug: e.target.value })
                  }
                  placeholder="e.g., technology"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={newTag.color}
                    onChange={(e) =>
                      setNewTag({ ...newTag, color: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={newTag.color}
                    onChange={(e) =>
                      setNewTag({ ...newTag, color: e.target.value })
                    }
                    placeholder="#c41e3a"
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Creating..." : "Create Tag"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tags List */}
      <div className="tags-list">
        {tags.length === 0 ? (
          <div className="empty-state">
            <p>
              No tags created yet. Click "Add New Tag" to create your first tag.
            </p>
          </div>
        ) : (
          tags.map((tag) => (
            <div key={tag.id} className="tag-item">
              {editingTag && editingTag.id === tag.id ? (
                <div className="tag-edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tag Name</label>
                      <input
                        type="text"
                        value={editingTag.name}
                        onChange={(e) =>
                          setEditingTag({ ...editingTag, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Slug</label>
                      <input
                        type="text"
                        value={editingTag.slug}
                        onChange={(e) =>
                          setEditingTag({ ...editingTag, slug: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          value={editingTag.color}
                          onChange={(e) =>
                            setEditingTag({
                              ...editingTag,
                              color: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editingTag.color}
                          onChange={(e) =>
                            setEditingTag({
                              ...editingTag,
                              color: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => handleUpdateTag(tag.id)}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tag-display">
                  <div className="tag-info">
                    <span
                      className="tag-color-preview"
                      style={{ backgroundColor: tag.color }}
                    ></span>
                    <span className="tag-name">{tag.name}</span>
                    <span className="tag-slug">{tag.slug}</span>
                  </div>
                  <div className="tag-actions">
                    <button
                      className="btn-edit"
                      onClick={() => startEditing(tag)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTags;
