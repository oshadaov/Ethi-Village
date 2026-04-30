import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperiences } from "../data/experiences";

import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
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

  const [activity, setActivity] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
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
  }, [id, navigate]);

  if (loadingData) {
    return (
      <main style={{ padding: "120px 24px", textAlign: "center" }}>
        <p>Loading activity...</p>
      </main>
    );
  }

  if (!activity) return null;

  const imageSrc = activity.image || activity.imageUrl;

  return (
    <main className="activity-detail-page">
      <section
        className="page-hero-small"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <div className="page-hero-overlay" />

        <Container className="page-hero-content">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            <ArrowLeft size={18} />
            Back to Activities
          </Button>

          <h1>{activity.title}</h1>
          <p className="room-type-pill">{activity.category}</p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="room-detail-grid">
            <div className="room-detail-main">
              <div className="room-detail-block">
                <SectionHeader
                  eyebrow="Overview"
                  title="About this Experience"
                />

                <p className="room-description-large">
                  {activity.description || activity.shortDescription}
                </p>
              </div>

              <div className="room-detail-block">
                <h3>Experience Highlights</h3>

                <div className="highlights-grid-v2">
                  {(activity.highlights || []).map((highlight, index) => (
                    <div key={index} className="highlight-item-v2">
                      <CheckCircle size={18} className="text-accent" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="room-detail-block">
                <h3>What's Included</h3>

                <ul className="amenities-list-v2">
                  {(activity.includes || []).map((item, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="room-detail-block">
                <h3>Best For</h3>

                <div className="experience-tags">
                  {(activity.bestFor || []).map((tag) => (
                    <span key={tag} className="experience-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="room-detail-sidebar">
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
                  <Button to="/contact" className="btn-full">
                    Inquire & Book
                  </Button>

                  <Button
                    href={`https://wa.me/94771234567?text=${encodeURIComponent(
                      `Hi, I'm interested in booking the ${activity.title}.`
                    )}`}
                    variant="secondary"
                    className="btn-full"
                    style={{ marginTop: "12px" }}
                  >
                    WhatsApp Chat
                  </Button>
                </div>
              </div>

              <div className="sidebar-info-box">
                <h4>
                  <MapPin
                    size={18}
                    style={{
                      verticalAlign: "middle",
                      marginRight: "8px",
                    }}
                  />
                  Location
                </h4>

                <p>
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