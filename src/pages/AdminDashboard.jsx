import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { ImagePlus, Pencil, Trash2, Plus, X } from "lucide-react";
import { siteImageKeys } from "../data/siteImageKey";
import { galleryCategories } from "../data/gallery";
import {
  getSiteImages,
  uploadSiteImage,
  deleteSiteImage,
} from "../services/api";

import "../styles/admin.css";
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8085/api/admin";

const tabs = [
  { key: "experiences", label: "Experiences" },
  { key: "gallery", label: "Gallery" },
  { key: "guides", label: "Guides" },
  { key: "rooms", label: "Rooms" },
  { key: "images", label: "Images" },
];

const experienceCategories = [
  "All",
  "Culture",
  "Food",
  "Nature",
  "Adventure",
  "Stay",
];

const emptyExperience = {
  slug: "",
  imageKey: "",
  title: "",
  category: "",
  duration: "",
  groupType: "",
  difficulty: "",
  priceText: "",
  shortDescription: "",
  highlights: [""],
  includes: [""],
  bestFor: [""],
};

const emptyGallery = {
  title: "",
  category: "",
  imageKey: "",
  alt: "",
  description: "",
};

const emptyGuide = {
  name: "",
  role: "",
  descp: "",
  imageKey: "",
  
};

const emptyRoom = {
  name: "",
  type: "",
  guests: "",
  priceText: "",
  imageKey: "",
  description: "",
  amenities: [""],
  highlights: [""],
};

function arrayClean(values) {
  return values.map((item) => item.trim()).filter(Boolean);
}

function normalizeForSubmit(tab, form) {
  let payload = { ...form };

  if (tab === "experiences") {
    payload = {
      ...payload,
      highlights: arrayClean(payload.highlights),
      includes: arrayClean(payload.includes),
      bestFor: arrayClean(payload.bestFor),
    };
  }

  if (tab === "rooms") {
    payload = {
      ...payload,
      amenities: arrayClean(payload.amenities),
      highlights: arrayClean(payload.highlights),
    };
  }

  // Remove empty imageKey for all content types to avoid database constraint violation
  if (!payload.imageKey || payload.imageKey.trim() === "") {
    delete payload.imageKey;
  }

  return payload;
}

function parseFormFromItem(tab, item) {
  if (tab === "experiences") {
    return {
      slug: item.slug || "",
      imageKey: item.imageKey || "",
      title: item.title || "",
      category: item.category || "",
      duration: item.duration || "",
      groupType: item.groupType || "",
      difficulty: item.difficulty || "",
      priceText: item.priceText || "",
      shortDescription: item.shortDescription || "",
      highlights: item.highlights?.length ? item.highlights : [""],
      includes: item.includes?.length ? item.includes : [""],
      bestFor: item.bestFor?.length ? item.bestFor : [""],
    };
  }

  if (tab === "gallery") {
    return {
      title: item.title || "",
      category: item.category || "",
      imageKey: item.imageKey || "",
      alt: item.alt || "",
      description: item.description || "",
    };
  }

  if (tab === "guides") {
    return {
      name: item.name || "",
      role: item.role || "",
      imageKey: item.imageKey || "",

      descp: item.descp || "",
    };
  }

  return {
    name: item.name || "",
    type: item.type || "",
    guests: item.guests || "",
    priceText: item.priceText || "",
    imageKey: item.imageKey || "",
    description: item.description || "",
    amenities: item.amenities?.length ? item.amenities : [""],
    highlights: item.highlights?.length ? item.highlights : [""],
  };
}

function getDefaultForm(tab) {
  if (tab === "experiences") return emptyExperience;
  if (tab === "gallery") return emptyGallery;
  if (tab === "guides") return emptyGuide;
  return emptyRoom;
}

function getItemId(item, tab) {
  if (tab === "gallery") {
    return item.id || item.imageKey || `gallery-${item.title}-${item.category}`;
  }
  return item.id || `${tab}-${item.name || item.title}-${Date.now()}`;
}

function getEndpoint(tab) {
  if (tab === "experiences") return `${API_BASE}/experiences`;
  if (tab === "gallery") return `${API_BASE}/gallery`;
  if (tab === "guides") return `${API_BASE}/guides`;
  if (tab === "images") return `${API_BASE}/site-images`;
  return `${API_BASE}/rooms`;
}

function Field({ label, children }) {
  return (
    <div className="admin-form-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function TextInput(props) {
  return <input {...props} type="text" />;
}

function TextArea(props) {
  return <textarea {...props} />;
}

function ArrayField({ label, values, onChange }) {
  const updateItem = (index, value) => {
    const next = [...(values || [])];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => onChange([...(values || []), ""]);
  const removeItem = (index) => {
    const next = (values || []).filter((_, i) => i !== index);
    onChange(next.length ? next : [""]);
  };

  return (
    <div className="admin-array-field">
      <div className="admin-array-header">
        <label>{label}</label>
        <button type="button" onClick={addItem} className="admin-array-btn">
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="admin-array-items">
        {(values || []).map((item, index) => (
          <div key={`${item}-${index}`} className="admin-array-item">
            <input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} item`}
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="admin-remove-btn"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCard({ item, tab, onEdit, onDelete }) {
  const imageSrc = item.imageUrl || item.image || item.img;
  const title = item.title || item.name;
  const subtitle = item.category || item.role || item.type || item.duration;
  const body = item.shortDescription || item.description || item.descp;

  return (
    <div className="admin-card">
      <div className="admin-card-image">
        {imageSrc ? (
          <img src={imageSrc} alt={title} />
        ) : (
          <div className="admin-card-image-placeholder">No image</div>
        )}
      </div>

      <div className="admin-card-body">
        <div>
          <div className="admin-card-badge">{subtitle || tab}</div>
          <h3 className="admin-card-title">{title}</h3>
          <p className="admin-card-desc">{body}</p>
        </div>

        <div className="admin-card-actions">
          <button onClick={onEdit} className="admin-edit-btn">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={onDelete} className="admin-delete-btn">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("experiences");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [form, setForm] = useState(getDefaultForm("experiences"));

  const endpoint = useMemo(() => getEndpoint(activeTab), [activeTab]);

  const resetEditor = useCallback(
    (tab = activeTab) => {
      setEditingId(null);
      setImageFile(null);
      setPreviewUrl("");
      setForm(getDefaultForm(tab));
    },
    [activeTab],
  );

  const loadItems = async (tab) => {
    setLoading(true);
    try {
      const response = await axios.get(getEndpoint(tab));
      setItems(response.data || []);
    } catch (error) {
      console.error(error);
      alert(`Failed to load ${tab}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetEditor(activeTab);
    loadItems(activeTab);
  }, [activeTab, resetEditor]);

  const startEdit = (item) => {
    const itemId = getItemId(item, activeTab);
    setEditingId(itemId);
    setImageFile(null);
    setPreviewUrl(item.imageUrl || item.image || item.img || "");
    setForm(parseFormFromItem(activeTab, item));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTextChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setImageFile(file || null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "images") {
      return;
    }

    setSaving(true);

    try {
      const payload = normalizeForSubmit(activeTab, form);
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFile) formData.append("image", imageFile);

      if (editingId) {
        await axios.put(`${endpoint}/${editingId}`, formData);
        alert("Updated successfully.");
      } else {
        await axios.post(endpoint, formData);
        alert("Created successfully.");
      }

      resetEditor(activeTab);
      await loadItems(activeTab);
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (itemId) => {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;

    try {
      await axios.delete(`${endpoint}/${itemId}`);
      if (editingId === itemId) resetEditor(activeTab);
      await loadItems(activeTab);
      alert("Deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const handleImageUpload = async (imageKey, file) => {
    if (!file) return;

    setSaving(true);
    try {
      await uploadSiteImage(imageKey, file);
      await loadItems("images");
      alert("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageDelete = async (imageKey) => {
    if (!window.confirm("Delete this site image?")) return;

    setSaving(true);
    try {
      await deleteSiteImage(imageKey);
      await loadItems("images");
      alert("Image deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Image delete failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-header">
        <p className="admin-header-eyebrow">Admin Panel</p>
        <h1>Content Manager</h1>
        <p>
          Manage all your content with ease - experiences, gallery items,
          guides, and rooms.
        </p>
      </div>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`admin-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="admin-form-section">
            <div className="admin-form-header">
              <div className="admin-form-title">
                <h2>
                  {editingId
                    ? `Edit ${activeTab.slice(0, -1)}`
                    : `Create ${activeTab.slice(0, -1)}`}
                </h2>
                <p>Fill the form and upload an image if needed.</p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={() => resetEditor(activeTab)}
                  className="admin-reset-btn"
                >
                  Reset
                </button>
              )}
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              {activeTab === "experiences" && (
                <>
                  <Field label="Slug">
                    <TextInput
                      value={form.slug}
                      onChange={(e) => handleTextChange("slug", e.target.value)}
                      placeholder="overnight-village-escape"
                    />
                  </Field>
                  <Field label="Image Key">
                    <TextInput
                      value={form.imageKey}
                      onChange={(e) =>
                        handleTextChange("imageKey", e.target.value)
                      }
                      placeholder="experience_overnight-village-escape"
                    />
                  </Field>
                  <Field label="Title">
                    <TextInput
                      value={form.title}
                      onChange={(e) =>
                        handleTextChange("title", e.target.value)
                      }
                      placeholder="Overnight Village Escape"
                    />
                  </Field>
                  <div className="admin-form-grid-2">
                    <Field label="Category">
                      <select
                        value={form.category}
                        onChange={(e) =>
                          handleTextChange("category", e.target.value)
                        }
                      >
                        <option value="">Select category</option>
                        {experienceCategories
                          .filter((cat) => cat !== "All")
                          .map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                    </Field>
                    <Field label="Duration">
                      <TextInput
                        value={form.duration}
                        onChange={(e) =>
                          handleTextChange("duration", e.target.value)
                        }
                        placeholder="1 Night / 2 Days"
                      />
                    </Field>
                  </div>
                  <div className="admin-form-grid-2">
                    <Field label="Group Type">
                      <TextInput
                        value={form.groupType}
                        onChange={(e) =>
                          handleTextChange("groupType", e.target.value)
                        }
                        placeholder="Private"
                      />
                    </Field>
                    <Field label="Difficulty">
                      <TextInput
                        value={form.difficulty}
                        onChange={(e) =>
                          handleTextChange("difficulty", e.target.value)
                        }
                        placeholder="Easy"
                      />
                    </Field>
                  </div>
                  <Field label="Price Text">
                    <TextInput
                      value={form.priceText}
                      onChange={(e) =>
                        handleTextChange("priceText", e.target.value)
                      }
                      placeholder="Custom package"
                    />
                  </Field>
                  <Field label="Short Description">
                    <TextArea
                      rows={3}
                      value={form.shortDescription}
                      onChange={(e) =>
                        handleTextChange("shortDescription", e.target.value)
                      }
                      placeholder="Describe the experience"
                    />
                  </Field>
                  <ArrayField
                    label="Highlights"
                    values={form.highlights}
                    onChange={(value) => handleArrayChange("highlights", value)}
                  />
                  <ArrayField
                    label="Includes"
                    values={form.includes}
                    onChange={(value) => handleArrayChange("includes", value)}
                  />
                  <ArrayField
                    label="Best For"
                    values={form.bestFor}
                    onChange={(value) => handleArrayChange("bestFor", value)}
                  />
                </>
              )}

              {activeTab === "gallery" && (
                <>
                  <Field label="Title">
                    <TextInput
                      value={form.title}
                      onChange={(e) =>
                        handleTextChange("title", e.target.value)
                      }
                      placeholder="Morning Village Walk"
                    />
                  </Field>
                  <div className="admin-form-grid-2">
                    <Field label="Category">
                      <select
                        value={form.category}
                        onChange={(e) =>
                          handleTextChange("category", e.target.value)
                        }
                      >
                        {galleryCategories
                          .filter((cat) => cat !== "All")
                          .map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                    </Field>
                    <Field label="Image Key">
                      <TextInput
                        value={form.imageKey}
                        onChange={(e) =>
                          handleTextChange("imageKey", e.target.value)
                        }
                        placeholder="gallery_1"
                      />
                    </Field>
                  </div>
                  <Field label="Alt Text">
                    <TextInput
                      value={form.alt}
                      onChange={(e) => handleTextChange("alt", e.target.value)}
                      placeholder="Guests exploring village pathways in Etili"
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        handleTextChange("description", e.target.value)
                      }
                      placeholder="Describe the gallery item"
                    />
                  </Field>
                </>
              )}

              {activeTab === "guides" && (
                <>
                  <Field label="Name">
                    <TextInput
                      value={form.name}
                      onChange={(e) => handleTextChange("name", e.target.value)}
                      placeholder="Bandara"
                    />
                  </Field>
                  <Field label="Role">
                    <TextInput
                      value={form.role}
                      onChange={(e) => handleTextChange("role", e.target.value)}
                      placeholder="Master Gardener"
                    />
                  </Field>
{/*                   
                  <Field label="Image Key">
                    <TextInput
                      value={form.imageKey}
                      onChange={(e) =>
                        handleTextChange("imageKey", e.target.value)
                      }
                      placeholder="guide_bandara"
                    />
                  </Field> */}
                  <Field label="Description">
                    <TextArea
                      rows={4}
                      value={form.descp}
                      onChange={(e) =>
                        handleTextChange("descp", e.target.value)
                      }
                      placeholder="Guide bio"
                    />
                  </Field>
                </>
              )}

              {activeTab === "rooms" && (
                <>
                  <Field label="Room Name">
                    <TextInput
                      value={form.name}
                      onChange={(e) => handleTextChange("name", e.target.value)}
                      placeholder="Family Village Room"
                    />
                  </Field>
                  <div className="admin-form-grid-2">
                    <Field label="Type">
                      <TextInput
                        value={form.type}
                        onChange={(e) =>
                          handleTextChange("type", e.target.value)
                        }
                        placeholder="Family Stay"
                      />
                    </Field>
                    <Field label="Guests">
                      <TextInput
                        value={form.guests}
                        onChange={(e) =>
                          handleTextChange("guests", e.target.value)
                        }
                        placeholder="4 Guests"
                      />
                    </Field>
                  </div>
                  <div className="admin-form-grid-2">
                    <Field label="Price Text">
                      <TextInput
                        value={form.priceText}
                        onChange={(e) =>
                          handleTextChange("priceText", e.target.value)
                        }
                        placeholder="From LKR 18,500 / night"
                      />
                    </Field>
                    <Field label="Image Key">
                      <TextInput
                        value={form.imageKey}
                        onChange={(e) =>
                          handleTextChange("imageKey", e.target.value)
                        }
                        placeholder="room_family_village"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <TextArea
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        handleTextChange("description", e.target.value)
                      }
                      placeholder="Room description"
                    />
                  </Field>
                  <ArrayField
                    label="Amenities"
                    values={form.amenities}
                    onChange={(value) => handleArrayChange("amenities", value)}
                  />
                  <ArrayField
                    label="Highlights"
                    values={form.highlights}
                    onChange={(value) => handleArrayChange("highlights", value)}
                  />
                </>
              )}

              {activeTab !== "images" ? (
                <>
                  <div className="admin-upload-zone">
                    <div className="admin-upload-label">
                      <ImagePlus size={20} />
                      <span>Upload image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e.target.files?.[0] || null)
                      }
                      className="admin-upload-input"
                      id={`image-upload-${activeTab}`}
                    />
                    <label htmlFor={`image-upload-${activeTab}`}>
                      Choose image or drag here
                    </label>
                    {previewUrl && (
                      <div className="admin-preview">
                        <img src={previewUrl} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="admin-form-actions">
                    <button
                      type="submit"
                      disabled={saving}
                      className="admin-submit-btn"
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                          ? "Update Item"
                          : "Create Item"}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetEditor(activeTab)}
                      className="admin-clear-btn"
                    >
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <div className="admin-images-grid">
                  {siteImageKeys.map((entry) => {
                    const current =
                      items.find((i) => i.imageKey === entry.key) || {};
                    const imageUrl =
                      current.imageDataUrl || current.imageUrl || current.image;
                    return (
                      <div key={entry.key} className="admin-image-card">
                        <h4>{entry.label}</h4>
                        <div className="admin-image-preview">
                          {imageUrl ? (
                            <img src={imageUrl} alt={entry.label} />
                          ) : (
                            <div className="admin-card-image-placeholder">
                              No image
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(entry.key, e.target.files?.[0])
                          }
                        />
                        {imageUrl && (
                          <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() => handleImageDelete(entry.key)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </form>
          </div>
        </aside>

        <section className="admin-main">
          <div className="admin-main-header">
            <div className="admin-main-title">
              <h2>{activeTab}</h2>
              <p>Manage all existing {activeTab} here.</p>
            </div>
            <div className="admin-count-badge">
              {loading
                ? "Loading..."
                : `${items.length} item${items.length === 1 ? "" : "s"}`}
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">Loading data...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty">No items yet.</div>
          ) : (
            <div className="admin-grid">
              {items.map((item) => (
                <PreviewCard
                  key={getItemId(item, activeTab)}
                  item={item}
                  tab={activeTab}
                  onEdit={() => startEdit(item)}
                  onDelete={() => handleDelete(getItemId(item, activeTab))}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
