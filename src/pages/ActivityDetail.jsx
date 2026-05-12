import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCachedData, getExperiences } from "../services/api";
import "../styles/accommodation-detail.css"; // Reuse premium detail styles

import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ImageSlider from "../components/common/ImageSlider";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Calendar,
  Info,
} from "lucide-react";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cachedExp = getCachedData("/experiences");
  const initialActivity = cachedExp
    ? cachedExp.find(
        (item) => item.slug === id || String(item.id) === String(id)
      )
    : null;

  const [activity, setActivity] = useState(initialActivity);
  const [loadingData, setLoadingData] = useState(!initialActivity);

  useEffect(() => {
    if (!initialActivity) {
      const loadActivity = async () => {
        setLoadingData(true);
        try {
          const data = await getExperiences();
          const selectedActivity = data.find(
            (item) => item.slug === id || String(item.id) === String(id)
          );

          if (selectedActivity) {
            setActivity(selectedActivity);
          } else {
            navigate("/activities");
          }
        } catch (error) {
          console.error("Error loading activity:", error);
          navigate("/activities");
        } finally {
          setLoadingData(false);
        }
      };
      loadActivity();
    }
  }, [id, navigate, initialActivity]);

  if (loadingData) {
    return (
      <main style={{ padding: "120px 24px", textAlign: "center" }}>
        <p>Loading activity...</p>
      </main>
    );
  }

  if (!activity) return null;

  const heroImage = activity.image || activity.imageUrl;

  // Build slider images: prefer galleryImages array; fall back to single hero image
  const sliderImages =
    Array.isArray(activity.galleryImages) && activity.galleryImages.length > 0
      ? activity.galleryImages
      : heroImage
      ? [heroImage]
      : [];

  return (
    <main className="activity-detail-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <Container className="detail-hero-overlay">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="detail-hero-content">
            <span className="detail-badge">{activity.category}</span>
            <h1>{activity.title}</h1>
            <div className="detail-price-section">
              <span className="detail-price">
                {activity.priceText || "Inquiry required"}
              </span>
              <span className="detail-capacity">
                ⏱ {activity.duration || "Custom"} • 📊 {activity.difficulty || "Easy"}
              </span>
            </div>
          </div>
        </Container>
      </section>


      {/* ── Main Content ─────────────────────────────────────────────── */}
      <section className="detail-section">
        <Container>
          <div className="detail-layout">
            <div className="detail-main">
              {/* Gallery Slider Inside Main Layout */}
              {sliderImages.length > 0 && (
                <div className="detail-slider-wrapper" style={{ marginBottom: "3rem" }}>
                  <ImageSlider
                    images={sliderImages}
                    alt={activity.title}
                    aspectRatio="16/9"
                  />
                </div>
              )}

              <div className="tab-content">
                <h2>About this Experience</h2>

                <p className="detail-description">
                  {activity.description || activity.shortDescription}
                </p>
              </div>

              <div className="highlights-section">
                <h3>Experience Highlights</h3>

                <ul className="highlights-list">
                  {(activity.highlights || []).map((highlight, index) => (
                    <li key={index}>
                      <span className="highlight-icon">✨</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="highlights-section">
                <h3>What's Included</h3>

                <div className="amenities-grid">
                  {(activity.includes || []).map((item, index) => (
                    <div key={index} className="amenity-card">
                      <span className="amenity-icon">✓</span>
                      <span className="amenity-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="highlights-section">
                <h3>Best For</h3>

                <div className="amenities-grid">
                  {(activity.bestFor || []).map((tag, index) => (
                    <div key={index} className="amenity-card" style={{ padding: "1rem" }}>
                      <span className="amenity-text">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="booking-card-v2">
                <div className="booking-card-header">
                  <span className="price-tag-large">
                    {activity.priceText || "Inquiry required"}
                  </span>
                  <p>Inquiry required</p>
                </div>

                <div className="booking-details-v2">
                  <div className="detail-item">
                    <Clock size={20} />
                    <span>
                      <strong>Duration:</strong> {activity.duration || "Custom"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Info size={20} />
                    <span>
                      <strong>Difficulty:</strong>{" "}
                      {activity.difficulty || "Easy"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Users size={20} />
                    <span>
                      <strong>Groups:</strong>{" "}
                      {activity.groupType || "Private / Small Group"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Calendar size={20} />
                    <span>Daily available</span>
                  </div>
                </div>

                <div className="booking-card-actions">
                  <Button to={`/book-experience/${activity.id}`} className="btn-full">
                    Inquire & Book
                  </Button>
                  <Button
                    href={`https://wa.me/94771234567?text=${encodeURIComponent(
                      `Hi, I'm interested in booking the ${activity.title}.`
                    )}`}
                    variant="secondary"
                    className="btn-full"
                  >
                    💬 Chat on WhatsApp
                  </Button>
                </div>
              </div>

              <div className="sidebar-info-box" style={{ marginTop: "2rem", background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "24px", padding: "2rem" }}>
                <h4 style={{ color: "#d4af37", marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "600" }}>
                  <MapPin
                    size={20}
                    style={{ verticalAlign: "text-bottom", marginRight: "8px" }}
                  />
                  Location
                </h4>
                <p style={{ color: "#4a4a4a", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  This activity starts directly from Etili Village or includes
                  transport to nearby sites.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}