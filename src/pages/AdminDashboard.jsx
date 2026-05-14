import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import {
  ImagePlus,
  Pencil,
  Trash2,
  Plus,
  X,
  Calendar,
  LayoutDashboard,
  Database,
  Image as ImageIcon,
  BookOpen,
  Hotel,
  Settings,
  RefreshCw,
  Users,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  Menu,
  Upload,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { siteImageKeys } from "../data/siteImageKey";
import { galleryCategories } from "../data/gallery";
import { uploadSiteImage, deleteSiteImage, clearCache } from "../services/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const tabs = [
  { key: "experiences", label: "Activities", icon: Database },
  { key: "rooms", label: "Accommodation", icon: Hotel },
  { key: "gallery", label: "Gallery", icon: ImageIcon },
  { key: "blogs", label: "Blogs", icon: BookOpen },
  { key: "guides", label: "Guides", icon: Users },
  { key: "faq", label: "FAQs", icon: HelpCircle },
  { key: "testimonials", label: "Reviews", icon: MessageSquare },
  { key: "images", label: "Site Assets", icon: Settings },
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
  description: "",
  highlights: [""],
  includes: [""],
  bestFor: [""],
  galleryImages: [""],
};
const emptyGallery = {
  title: "",
  category: "",
  imageKey: "",
  alt: "",
  description: "",
};
const emptyRoom = {
  name: "",
  type: "",
  guests: "",
  priceText: "",
  pricePerNight: "",
  minNights: "",
  imageKey: "",
  description: "",
  amenities: [""],
  highlights: [""],
  mealsIncluded: [""],
  staffServices: [""],
  galleryImages: [""],
  bookedDates: [],
};
const emptyBlog = {
  title: "",
  slug: "",
  author: "",
  content: "",
  shortDescription: "",
  imageKey: "",
};
const emptyGuide = { name: "", bio: "", imageKey: "", specialties: [""] };
const emptyFAQ = { question: "", answer: "", category: "" };
const emptyTestimonial = {
  author: "",
  content: "",
  role: "",
  location: "",
  rating: 5,
  date: new Date().toISOString().split("T")[0],
};

function arrayClean(values) {
  if (!Array.isArray(values)) return [];
  return values.map((item) => String(item).trim()).filter(Boolean);
}

function normalizeForSubmit(tab, form) {
  let payload = { ...form };
  if (tab === "experiences") {
    payload = {
      ...payload,
      highlights: arrayClean(payload.highlights),
      includes: arrayClean(payload.includes),
      bestFor: arrayClean(payload.bestFor),
      galleryImages: arrayClean(payload.galleryImages),
    };
  }
  if (tab === "rooms") {
    payload = {
      ...payload,
      amenities: arrayClean(payload.amenities),
      highlights: arrayClean(payload.highlights),
      mealsIncluded: arrayClean(payload.mealsIncluded),
      staffServices: arrayClean(payload.staffServices),
      galleryImages: arrayClean(payload.galleryImages),
      bookedDates: arrayClean(payload.bookedDates),
    };
  }
  if (tab === "guides") {
    payload = {
      ...payload,
      specialties: arrayClean(payload.specialties),
    };
  }
  if (
    !payload.imageKey ||
    (typeof payload.imageKey === "string" && payload.imageKey.trim() === "")
  ) {
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
      description: item.description || "",
      highlights: item.highlights?.length ? item.highlights : [""],
      includes: item.includes?.length ? item.includes : [""],
      bestFor: item.bestFor?.length ? item.bestFor : [""],
      galleryImages: item.galleryImages?.length ? item.galleryImages : [""],
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
  if (tab === "blogs") {
    return {
      title: item.title || "",
      slug: item.slug || "",
      author: item.author || "",
      content: item.content || "",
      shortDescription: item.shortDescription || "",
      imageKey: item.imageKey || "",
    };
  }
  if (tab === "rooms") {
    return {
      name: item.name || "",
      type: item.type || "",
      guests: item.guests || "",
      priceText: item.priceText || "",
      pricePerNight: item.pricePerNight || "",
      minNights: item.minNights || "",
      imageKey: item.imageKey || "",
      description: item.description || "",
      amenities: item.amenities?.length ? item.amenities : [""],
      highlights: item.highlights?.length ? item.highlights : [""],
      mealsIncluded: item.mealsIncluded?.length ? item.mealsIncluded : [""],
      staffServices: item.staffServices?.length ? item.staffServices : [""],
      galleryImages: item.galleryImages?.length ? item.galleryImages : [""],
      bookedDates: item.bookedDates?.length ? item.bookedDates : [""],
    };
  }
  if (tab === "guides") {
    return {
      name: item.name || "",
      bio: item.bio || "",
      imageKey: item.imageKey || "",
      specialties: item.specialties?.length ? item.specialties : [""],
    };
  }
  if (tab === "faq") {
    return {
      question: item.question || "",
      answer: item.answer || "",
      category: item.category || "",
    };
  }
  if (tab === "testimonials") {
    return {
      author: item.author || "",
      content: item.content || "",
      role: item.role || "",
      location: item.location || "",
      rating: item.rating || 5,
      date: item.date || new Date().toISOString().split("T")[0],
    };
  }
  return {};
}

function getDefaultForm(tab) {
  if (tab === "experiences") return emptyExperience;
  if (tab === "gallery") return emptyGallery;
  if (tab === "blogs") return emptyBlog;
  if (tab === "rooms") return emptyRoom;
  if (tab === "guides") return emptyGuide;
  if (tab === "faq") return emptyFAQ;
  if (tab === "testimonials") return emptyTestimonial;
  return {};
}

function getItemId(item, tab) {
  if (tab === "gallery")
    return item.id || item.imageKey || `gallery-${item.title}-${item.category}`;
  if (tab === "faq") return item.id || `faq-${item.question.slice(0, 10)}`;
  if (tab === "testimonials")
    return item.id || `testimonial-${item.author.slice(0, 10)}`;
  return item.id || `${tab}-${item.name || item.title || "item"}-${Date.now()}`;
}

function getEndpoint(tab) {
  if (tab === "experiences") return `${API_BASE}/experiences`;
  if (tab === "gallery") return `${API_BASE}/gallery`;
  if (tab === "blogs") return `${API_BASE}/blogs`;
  if (tab === "images") return `${API_BASE}/site-images`;
  if (tab === "rooms") return `${API_BASE}/rooms`;
  if (tab === "guides") return `${API_BASE}/guides`;
  if (tab === "faq") return `${API_BASE}/faq`;
  if (tab === "testimonials") return `${API_BASE}/testimonials`;
  return `${API_BASE}/${tab}`;
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${className}`}>
      <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyles =
  "w-full px-5 py-3.5 bg-bg border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/40 text-sm font-medium";

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
    <div className="flex flex-col gap-3 mb-6 w-full">
      <div className="flex items-center justify-between ml-1">
        <label className="text-xs font-bold text-primary/60 uppercase tracking-widest">
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="text-[10px] font-bold text-accent hover:text-accent/80 flex items-center gap-1 uppercase tracking-tighter"
        >
          <Plus size={12} /> Add Field
        </button>
      </div>
      <div className="space-y-2">
        {(values || []).map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} item`}
              className={inputStyles}
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DateArrayField({ label, values, onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const addDate = (date) => {
    if (!date) return;
    const dateStr = date.toISOString().split("T")[0];
    if (!values.includes(dateStr)) onChange([...(values || []), dateStr]);
    setSelectedDate(null);
  };
  const removeDate = (dateToRemove) => {
    const next = (values || []).filter((date) => date !== dateToRemove);
    onChange(next.length ? next : [""]);
  };

  return (
    <div className="flex flex-col gap-3 mb-6 w-full">
      <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={addDate}
          placeholderText="Select a date to block"
          dateFormat="yyyy-MM-dd"
          className={inputStyles}
        />
        <Calendar
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 pointer-events-none"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(values || []).filter(Boolean).map((date, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-primary/5 text-primary border border-primary/10 px-3 py-1.5 rounded-full text-xs font-bold"
          >
            <span>{date}</span>
            <button
              type="button"
              onClick={() => removeDate(date)}
              className="hover:text-red-500"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCard({ item, tab, onEdit, onDelete }) {
  const imageSrc = item.imageUrl || item.image || item.img || item.imageLink;
  const title = item.title || item.name || item.question || item.author;
  const subtitle = item.category || item.type || item.author || item.role;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-border/10 transition-all duration-300">
      {tab !== "faq" && tab !== "testimonials" && (
        <div className="aspect-[4/3] bg-bg relative overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted/30 text-xs font-bold uppercase tracking-widest">
              No image
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
              {subtitle || tab}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-bold text-primary mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted text-xs line-clamp-2 leading-relaxed mb-6">
          {item.shortDescription ||
            item.description ||
            item.answer ||
            item.content ||
            "No details available."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-bg text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(getItemId(item, tab))}
            className="flex items-center justify-center p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
          >
            <Trash2 size={16} />
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
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [form, setForm] = useState(getDefaultForm("experiences"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const endpoint = useMemo(() => getEndpoint(activeTab), [activeTab]);

  const resetEditor = useCallback(
    (tab = activeTab) => {
      setEditingId(null);
      setImageFile(null);
      setGalleryFiles([]);
      setGalleryPreviews([]);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetEditor(activeTab);
    loadItems(activeTab);
  }, [activeTab]);

  const startEdit = (item) => {
    const itemId = getItemId(item, activeTab);
    setEditingId(itemId);
    setImageFile(null);
    setGalleryFiles([]);
    // Load existing gallery images as previews
    const existingGallery = item.galleryImages || [];
    setGalleryPreviews(existingGallery);
    setPreviewUrl(
      item.imageUrl || item.image || item.img || item.imageLink || "",
    );
    setForm(parseFormFromItem(activeTab, item));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "images") return;
    setSaving(true);
    try {
      const payload = normalizeForSubmit(activeTab, form);
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFile) formData.append("image", imageFile);
      if (galleryFiles?.length > 0) {
        galleryFiles.forEach((file) => formData.append("galleryFiles", file));
      }

      if (editingId) {
        await axios.put(`${endpoint}/${editingId}`, formData);
      } else {
        await axios.post(endpoint, formData);
      }

      clearCache();
      resetEditor(activeTab);
      await loadItems(activeTab);
    } catch (error) {
      console.error(error);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryItem = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${endpoint}/${itemId}`);
      clearCache();
      if (editingId === itemId) resetEditor(activeTab);
      await loadItems(activeTab);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (imageKey, file) => {
    if (!file) return;
    setSaving(true);
    try {
      await uploadSiteImage(imageKey, file);
      await loadItems("images");
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-primary flex flex-col">
      {/* Top Banner */}
      <div className="bg-primary text-white py-8 md:py-12 px-6 md:px-12 rounded-b-[30px] md:rounded-b-[40px] shadow-2xl z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center justify-between md:block">
            <div>
              <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-3">
                <LayoutDashboard size={16} />
                <span>Etili Village Administration</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 font-serif">
                Content Manager
              </h1>
              <p className="text-white/60 max-w-xl text-sm hidden md:block">
                Central hub for managing activities, accommodation, blogs, and
                site assets.
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-3 bg-white/10 rounded-2xl"
            >
              <Menu size={24} />
            </button>
          </div>
          <button
            onClick={() => clearCache()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm transition-all border border-white/10 group"
          >
            <RefreshCw
              size={18}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Clear Cache
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full p-4 md:p-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-4 fixed inset-0 z-30 lg:relative lg:inset-auto bg-primary/20 backdrop-blur-xl lg:bg-transparent transition-all duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"}`}
        >
          <div
            className={`bg-white p-3 rounded-[32px] shadow-2xl lg:shadow-sm border border-border/10 lg:sticky top-28 w-4/5 lg:w-full h-full lg:h-auto transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
          >
            <div className="flex items-center justify-between mb-4 px-4 py-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                Main Menu
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-bg rounded-xl"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-none scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                    activeTab === tab.key
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-muted hover:bg-bg hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon
                      size={20}
                      className={
                        activeTab === tab.key
                          ? "text-accent"
                          : "text-primary/40"
                      }
                    />
                    {tab.label}
                  </div>
                  {activeTab === tab.key && (
                    <ChevronRight size={16} className="text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-12">
          {/* Editor Section */}
          {activeTab !== "images" && (
            <section className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-border/10 overflow-hidden">
              <div className="p-6 md:p-12 border-b border-border/10 bg-bg/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      {editingId
                        ? `Edit ${activeTab.replace(/s$/, "")}`
                        : `Create New ${activeTab.replace(/s$/, "")}`}
                    </h2>
                    <p className="text-muted text-sm mt-1 italic font-medium">
                      Update fields and sync with live site.
                    </p>
                  </div>
                  {editingId && (
                    <button
                      onClick={() => resetEditor()}
                      className="w-full md:w-auto px-5 py-2.5 bg-white border border-border text-xs font-bold rounded-xl hover:bg-bg transition-colors"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Form Fields depend on tab */}
                  {activeTab === "experiences" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Title">
                          <input
                            className={inputStyles}
                            value={form.title || ""}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                            placeholder="e.g. Hiking Adventure"
                          />
                        </Field>
                        <Field label="Slug">
                          <input
                            className={inputStyles}
                            value={form.slug || ""}
                            onChange={(e) =>
                              setForm({ ...form, slug: e.target.value })
                            }
                            placeholder="hiking-adventure"
                          />
                        </Field>
                        <Field label="Category">
                          <select
                            className={inputStyles}
                            value={form.category || ""}
                            onChange={(e) =>
                              setForm({ ...form, category: e.target.value })
                            }
                          >
                            <option value="">Select Category</option>
                            {experienceCategories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <div className="space-y-6">
                        <Field label="Price Info">
                          <input
                            className={inputStyles}
                            value={form.priceText || ""}
                            onChange={(e) =>
                              setForm({ ...form, priceText: e.target.value })
                            }
                            placeholder="From $25"
                          />
                        </Field>
                        <Field label="Duration">
                          <input
                            className={inputStyles}
                            value={form.duration || ""}
                            onChange={(e) =>
                              setForm({ ...form, duration: e.target.value })
                            }
                            placeholder="3-4 Hours"
                          />
                        </Field>
                        <Field label="Image Key">
                          <input
                            className={inputStyles}
                            value={form.imageKey || ""}
                            onChange={(e) =>
                              setForm({ ...form, imageKey: e.target.value })
                            }
                            placeholder="experience_hiking"
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Short Description">
                          <textarea
                            className={`${inputStyles} h-24 resize-none`}
                            value={form.shortDescription || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                shortDescription: e.target.value,
                              })
                            }
                          />
                        </Field>
                        <Field label="Long Description">
                          <textarea
                            className={`${inputStyles} h-48 resize-none`}
                            value={form.description || ""}
                            onChange={(e) =>
                              setForm({ ...form, description: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ArrayField
                          label="Highlights"
                          values={form.highlights}
                          onChange={(val) =>
                            setForm({ ...form, highlights: val })
                          }
                        />
                        <ArrayField
                          label="Includes"
                          values={form.includes}
                          onChange={(val) =>
                            setForm({ ...form, includes: val })
                          }
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "rooms" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Room Name">
                          <input
                            className={inputStyles}
                            value={form.name || ""}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Room Type">
                          <input
                            className={inputStyles}
                            value={form.type || ""}
                            onChange={(e) =>
                              setForm({ ...form, type: e.target.value })
                            }
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Price/Night">
                            <input
                              type="number"
                              className={inputStyles}
                              value={form.pricePerNight || ""}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  pricePerNight: e.target.value,
                                })
                              }
                            />
                          </Field>
                          <Field label="Max Guests">
                            <input
                              type="number"
                              className={inputStyles}
                              value={form.guests || ""}
                              onChange={(e) =>
                                setForm({ ...form, guests: e.target.value })
                              }
                            />
                          </Field>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <Field label="Image Key">
                          <input
                            className={inputStyles}
                            value={form.imageKey || ""}
                            onChange={(e) =>
                              setForm({ ...form, imageKey: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Price Display Text">
                          <input
                            className={inputStyles}
                            value={form.priceText || ""}
                            onChange={(e) =>
                              setForm({ ...form, priceText: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Min Nights">
                          <input
                            type="number"
                            className={inputStyles}
                            value={form.minNights || ""}
                            onChange={(e) =>
                              setForm({ ...form, minNights: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Description">
                          <textarea
                            className={`${inputStyles} h-32 resize-none`}
                            value={form.description || ""}
                            onChange={(e) =>
                              setForm({ ...form, description: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ArrayField
                          label="Amenities"
                          values={form.amenities}
                          onChange={(val) =>
                            setForm({ ...form, amenities: val })
                          }
                        />
                        <DateArrayField
                          label="Blocked/Booked Dates"
                          values={form.bookedDates}
                          onChange={(val) =>
                            setForm({ ...form, bookedDates: val })
                          }
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "gallery" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Title">
                          <input
                            className={inputStyles}
                            value={form.title || ""}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Category">
                          <select
                            className={inputStyles}
                            value={form.category || ""}
                            onChange={(e) =>
                              setForm({ ...form, category: e.target.value })
                            }
                          >
                            <option value="">Select Category</option>
                            {galleryCategories
                              .filter((c) => c !== "All")
                              .map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                          </select>
                        </Field>
                      </div>
                      <div className="space-y-6">
                        <Field label="Alt Text">
                          <input
                            className={inputStyles}
                            value={form.alt || ""}
                            onChange={(e) =>
                              setForm({ ...form, alt: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Image Key">
                          <input
                            className={inputStyles}
                            value={form.imageKey || ""}
                            onChange={(e) =>
                              setForm({ ...form, imageKey: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Description">
                          <textarea
                            className={`${inputStyles} h-32 resize-none`}
                            value={form.description || ""}
                            onChange={(e) =>
                              setForm({ ...form, description: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {activeTab === "blogs" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Title">
                          <input
                            className={inputStyles}
                            value={form.title || ""}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Slug">
                          <input
                            className={inputStyles}
                            value={form.slug || ""}
                            onChange={(e) =>
                              setForm({ ...form, slug: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Author">
                          <input
                            className={inputStyles}
                            value={form.author || ""}
                            onChange={(e) =>
                              setForm({ ...form, author: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="space-y-6">
                        <Field label="Image Key">
                          <input
                            className={inputStyles}
                            value={form.imageKey || ""}
                            onChange={(e) =>
                              setForm({ ...form, imageKey: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Short Description">
                          <textarea
                            className={`${inputStyles} h-24 resize-none`}
                            value={form.shortDescription || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                shortDescription: e.target.value,
                              })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Content (HTML support)">
                          <textarea
                            className={`${inputStyles} h-64 resize-none font-mono text-xs`}
                            value={form.content || ""}
                            onChange={(e) =>
                              setForm({ ...form, content: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {activeTab === "guides" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Guide Name">
                          <input
                            className={inputStyles}
                            value={form.name || ""}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Image Key">
                          <input
                            className={inputStyles}
                            value={form.imageKey || ""}
                            onChange={(e) =>
                              setForm({ ...form, imageKey: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Bio">
                          <textarea
                            className={`${inputStyles} h-32 resize-none`}
                            value={form.bio || ""}
                            onChange={(e) =>
                              setForm({ ...form, bio: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <ArrayField
                          label="Specialties"
                          values={form.specialties}
                          onChange={(val) =>
                            setForm({ ...form, specialties: val })
                          }
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "faq" && (
                    <>
                      <div className="col-span-full space-y-6">
                        <Field label="Question">
                          <input
                            className={inputStyles}
                            value={form.question || ""}
                            onChange={(e) =>
                              setForm({ ...form, question: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Answer">
                          <textarea
                            className={`${inputStyles} h-32 resize-none`}
                            value={form.answer || ""}
                            onChange={(e) =>
                              setForm({ ...form, answer: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Category">
                          <input
                            className={inputStyles}
                            value={form.category || ""}
                            onChange={(e) =>
                              setForm({ ...form, category: e.target.value })
                            }
                            placeholder="General, Activities, Stay etc."
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {activeTab === "testimonials" && (
                    <>
                      <div className="space-y-6">
                        <Field label="Author">
                          <input
                            className={inputStyles}
                            value={form.author || ""}
                            onChange={(e) =>
                              setForm({ ...form, author: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Role/Title">
                          <input
                            className={inputStyles}
                            value={form.role || ""}
                            onChange={(e) =>
                              setForm({ ...form, role: e.target.value })
                            }
                            placeholder="Guest, Travel Blogger etc."
                          />
                        </Field>
                        <Field label="Location">
                          <input
                            className={inputStyles}
                            value={form.location || ""}
                            onChange={(e) =>
                              setForm({ ...form, location: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="space-y-6">
                        <Field label="Rating (1-5)">
                          <input
                            type="number"
                            min="1"
                            max="5"
                            className={inputStyles}
                            value={form.rating || 5}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                rating: parseInt(e.target.value),
                              })
                            }
                          />
                        </Field>
                        <Field label="Date">
                          <input
                            type="date"
                            className={inputStyles}
                            value={form.date || ""}
                            onChange={(e) =>
                              setForm({ ...form, date: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <div className="col-span-full">
                        <Field label="Testimonial Content">
                          <textarea
                            className={`${inputStyles} h-32 resize-none`}
                            value={form.content || ""}
                            onChange={(e) =>
                              setForm({ ...form, content: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                    </>
                  )}
                </div>

                {/* Main Hero Image Upload */}
                {activeTab !== "faq" && activeTab !== "testimonials" && (
                  <div className="mt-12 p-6 md:p-8 bg-bg rounded-3xl border-2 border-dashed border-border/50">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="shrink-0">
                        {previewUrl ? (
                          <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-premium border-4 border-white group relative">
                            <img
                              src={previewUrl}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImageFile(null);
                                setPreviewUrl("");
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="w-40 h-40 rounded-2xl bg-white border-2 border-border/10 flex flex-col items-center justify-center text-primary/30">
                            <ImagePlus size={40} strokeWidth={1} />
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">
                              Preview
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <h4 className="font-bold text-primary">
                          Featured Image
                        </h4>
                        <p className="text-xs text-muted leading-relaxed">
                          Upload a high-quality image. Max file size 5MB.
                        </p>
                        <label className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-border shadow-sm rounded-xl font-bold text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all">
                          <Plus size={16} /> Choose File
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setImageFile(file);
                              if (file)
                                setPreviewUrl(URL.createObjectURL(file));
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Multiple Gallery Images Upload */}
                {(activeTab === "experiences" || activeTab === "rooms") && (
                  <div className="mt-8 p-6 md:p-8 bg-white rounded-3xl border-2 border-dashed border-border/50">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-primary">
                            Gallery Images
                          </h4>
                          <p className="text-xs text-muted mt-1">
                            Upload multiple photos to showcase this{" "}
                            {activeTab.slice(0, -1)}.
                          </p>
                        </div>
                        <label className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-primary-dark transition-all shadow-lg shadow-primary/10">
                          <Upload size={16} /> Add Images
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange}
                          />
                        </label>
                      </div>

                      {galleryPreviews.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {galleryPreviews.map((url, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-xl overflow-hidden group border border-border/10"
                            >
                              <img
                                src={url}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryItem(idx)}
                                className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 border-2 border-dotted border-border/20 rounded-2xl flex flex-col items-center justify-center text-primary/20">
                          <ImageIcon size={48} strokeWidth={1} />
                          <p className="text-xs font-bold uppercase tracking-widest mt-4">
                            No gallery images added
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-border/10 flex justify-end">
                  <button
                    disabled={saving}
                    type="submit"
                    className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Update Content"
                        : "Create Content"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* List Section */}
          <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary flex flex-wrap items-center gap-3 italic">
                {activeTab === "images"
                  ? "Site Asset Settings"
                  : `Published ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs not-italic">
                  {items.length} items
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <RefreshCw
                  className="mx-auto mb-4 text-primary/20 animate-spin"
                  size={40}
                />
                <p className="text-muted font-bold">Fetching latest data...</p>
              </div>
            ) : activeTab === "images" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteImageKeys.map((item) => {
                  const key = item.key;
                  const label = item.label;
                  const currentImg = items.find((i) => i.imageKey === key);
                  return (
                    <div
                      key={key}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-border/10 flex items-center gap-6"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-bg rounded-2xl shrink-0 overflow-hidden border border-border/10">
                        {currentImg ? (
                          <img
                            src={currentImg.imageUrl}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary/10">
                            <ImageIcon size={30} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-primary truncate text-sm mb-1">
                          {label}
                        </h4>
                        <p className="text-[10px] text-muted font-mono uppercase tracking-tighter mb-4">
                          {key}
                        </p>
                        <div className="flex gap-2">
                          <label className="px-3 py-1.5 bg-bg hover:bg-primary hover:text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all">
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(key, e.target.files[0])
                              }
                            />
                          </label>
                          {currentImg && (
                            <button
                              onClick={() => handleImageDelete(key)}
                              className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-[10px] font-bold transition-all"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map((item) => (
                  <PreviewCard
                    key={getItemId(item, activeTab)}
                    item={item}
                    tab={activeTab}
                    onEdit={() => startEdit(item)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 md:p-20 rounded-[32px] md:rounded-[40px] text-center border-2 border-dashed border-border/20">
                <p className="text-muted font-bold italic text-lg">
                  No content found in this category.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
