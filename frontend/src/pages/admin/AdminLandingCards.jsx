import React, { useState, useEffect } from "react";
import siteContentService from "../../services/siteContentService";
import "./AdminLandingCards.css";

const AdminLandingCards = () => {
  const [cards, setCards] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCard, setEditingCard] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const emptyCard = {
    year: new Date().getFullYear(),
    title: "",
    category: "",
    summary: "",
    rpi: 0,
    augment: 0,
    roles: 0,
    tags: [],
    linked_report_slug: "",
    featured: false,
    order: 0,
    is_active: true,
    image_url: "",
    image_category: "technology",
  };

  const [newCard, setNewCard] = useState({ ...emptyCard });

  const imageCategories = [
    "workforce",
    "technology",
    "policy",
    "healthcare",
    "creative",
    "legal",
    "science",
    "economy",
    "politics",
    "governance",
    "society",
    "industry",
    "culture",
    "evolution",
    "philosophy",
    "future",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cardsData, tagsData] = await Promise.all([
        siteContentService.getAllCards(true),
        siteContentService.getAllTags(),
      ]);
      setCards(cardsData);
      setTags(tagsData);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    if (!newCard.title.trim()) {
      setError("Card title is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const created = await siteContentService.createCard(newCard);
      setCards([...cards, created]);
      setNewCard({ ...emptyCard });
      setShowNewForm(false);
      setSuccess("Card created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create card");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCard = async (cardId) => {
    if (!editingCard || !editingCard.title.trim()) {
      setError("Card title is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const updated = await siteContentService.updateCard(cardId, editingCard);
      setCards(cards.map((c) => (c.id === cardId ? updated : c)));
      setEditingCard(null);
      setSuccess("Card updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update card");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      await siteContentService.deleteCard(cardId);
      setCards(cards.filter((c) => c.id !== cardId));
      setSuccess("Card deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete card");
    }
  };

  const handleToggleActive = async (card) => {
    try {
      const updated = await siteContentService.updateCard(card.id, {
        is_active: !card.is_active,
      });
      setCards(cards.map((c) => (c.id === card.id ? updated : c)));
    } catch (err) {
      setError("Failed to update card");
    }
  };

  const handleTagChange = (cardSetter, currentTags, tagSlug) => {
    if (currentTags.includes(tagSlug)) {
      cardSetter((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tagSlug),
      }));
    } else {
      cardSetter((prev) => ({
        ...prev,
        tags: [...prev.tags, tagSlug],
      }));
    }
  };

  const CardForm = ({ card, setCard, onSubmit, onCancel, submitText }) => (
    <form onSubmit={onSubmit} className="card-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Year *</label>
          <input
            type="number"
            value={card.year}
            onChange={(e) =>
              setCard({ ...card, year: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={card.category}
            onChange={(e) => setCard({ ...card, category: e.target.value })}
            placeholder="e.g., Technology"
          />
        </div>
        <div className="form-group">
          <label>Image Category</label>
          <select
            value={card.image_category}
            onChange={(e) =>
              setCard({ ...card, image_category: e.target.value })
            }
          >
            {imageCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Summary</label>
        <textarea
          value={card.summary}
          onChange={(e) => setCard({ ...card, summary: e.target.value })}
          rows="3"
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>RPI Score</label>
          <input
            type="number"
            value={card.rpi}
            onChange={(e) =>
              setCard({ ...card, rpi: parseInt(e.target.value) || 0 })
            }
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Augmentation %</label>
          <input
            type="number"
            value={card.augment}
            onChange={(e) =>
              setCard({ ...card, augment: parseInt(e.target.value) || 0 })
            }
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label>Roles Count</label>
          <input
            type="number"
            value={card.roles}
            onChange={(e) =>
              setCard({ ...card, roles: parseInt(e.target.value) || 0 })
            }
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Order</label>
          <input
            type="number"
            value={card.order}
            onChange={(e) =>
              setCard({ ...card, order: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Linked Report Slug</label>
        <input
          type="text"
          value={card.linked_report_slug || ""}
          onChange={(e) =>
            setCard({ ...card, linked_report_slug: e.target.value })
          }
          placeholder="e.g., goa-hospitality-2064"
        />
      </div>

      <div className="form-group full-width">
        <label>Image URL (optional, overrides category image)</label>
        <input
          type="text"
          value={card.image_url || ""}
          onChange={(e) => setCard({ ...card, image_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="form-group full-width">
        <label>Tags</label>
        <div className="tags-selector">
          {tags.map((tag) => (
            <label key={tag.id} className="tag-checkbox">
              <input
                type="checkbox"
                checked={card.tags.includes(tag.slug)}
                onChange={() => handleTagChange(setCard, card.tags, tag.slug)}
              />
              <span
                className="tag-label"
                style={{ backgroundColor: tag.color + "20", color: tag.color }}
              >
                {tag.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.featured}
            onChange={(e) => setCard({ ...card, featured: e.target.checked })}
          />
          Featured Card
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.is_active}
            onChange={(e) => setCard({ ...card, is_active: e.target.checked })}
          />
          Active (visible on landing page)
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="admin-landing-cards">
      <div className="page-header">
        <div className="header-left">
          <h1>Landing Page Cards</h1>
          <p>Manage cards displayed on the landing page</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => {
              setShowNewForm(true);
              setEditingCard(null);
            }}
          >
            + Add New Card
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* New Card Form */}
      {showNewForm && (
        <div className="card-form-container">
          <h3>Create New Card</h3>
          <CardForm
            card={newCard}
            setCard={setNewCard}
            onSubmit={handleCreateCard}
            onCancel={() => setShowNewForm(false)}
            submitText="Create Card"
          />
        </div>
      )}

      {/* Cards List */}
      <div className="cards-list">
        {cards.length === 0 ? (
          <div className="empty-state">
            <p>
              No cards created yet. Click "Add New Card" to create your first
              card.
            </p>
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className={`card-item ${!card.is_active ? "inactive" : ""}`}
            >
              {editingCard && editingCard.id === card.id ? (
                <div className="card-edit-container">
                  <h4>Edit Card</h4>
                  <CardForm
                    card={editingCard}
                    setCard={setEditingCard}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateCard(card.id);
                    }}
                    onCancel={() => setEditingCard(null)}
                    submitText="Save Changes"
                  />
                </div>
              ) : (
                <div className="card-display">
                  <div className="card-main-info">
                    <div className="card-header-row">
                      <span className="card-year">{card.year}</span>
                      <span className="card-category">{card.category}</span>
                      {card.featured && (
                        <span className="featured-badge">Featured</span>
                      )}
                      {!card.is_active && (
                        <span className="inactive-badge">Inactive</span>
                      )}
                    </div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-summary">{card.summary}</p>
                    <div className="card-metrics">
                      <span>RPI: {card.rpi}%</span>
                      <span>Augment: {card.augment}%</span>
                      <span>Roles: {card.roles.toLocaleString()}</span>
                    </div>
                    {card.tags.length > 0 && (
                      <div className="card-tags">
                        {card.tags.map((tagSlug) => {
                          const tag = tags.find((t) => t.slug === tagSlug);
                          return tag ? (
                            <span
                              key={tagSlug}
                              className="tag-badge"
                              style={{
                                backgroundColor: tag.color + "20",
                                color: tag.color,
                              }}
                            >
                              {tag.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn-toggle"
                      onClick={() => handleToggleActive(card)}
                    >
                      {card.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setEditingCard({ ...card });
                        setShowNewForm(false);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCard(card.id)}
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

export default AdminLandingCards;
