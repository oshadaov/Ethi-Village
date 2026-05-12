import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCachedData, getRooms } from "../services/api";
import { useSiteImages } from "../hooks/useSiteImages";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ImageSlider from "../components/common/ImageSlider";
import {
  ArrowLeft,
  CheckCircle,
  Users,
  Clock,
  Utensils,
  Info,
} from "lucide-react";
import "../styles/accommodation-detail.css";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { images, loading } = useSiteImages();
  const cachedRooms = getCachedData("/rooms");
  const initialRoom = cachedRooms ? cachedRooms.find(r => r.id === parseInt(id)) : null;
  const [room, setRoom] = useState(initialRoom);
  const [loadingData, setLoadingData] = useState(!initialRoom);

  useEffect(() => {
    if (!initialRoom) {
      const loadRoom = async () => {
        setLoadingData(true);
        try {
          const rooms = await getRooms();
          const data = rooms.find(r => r.id === parseInt(id));
          if (data) {
            setRoom(data);
          } else {
            navigate("/stay");
          }
        } catch (error) {
          console.error("Error loading room:", error);
          navigate("/stay");
        } finally {
          setLoadingData(false);
        }
      };
      loadRoom();
    }
  }, [id, navigate, initialRoom]);

  if (loadingData || !room) {
    return (
      <div className="admin-loading">
        <Container>
          <p>Loading room details...</p>
        </Container>
      </div>
    );
  }

  const imageSrc =
    !loading && images[room.imageKey] ? images[room.imageKey] : room.image;

  const sliderImages =
    Array.isArray(room.galleryImages) && room.galleryImages.length > 0
      ? room.galleryImages
      : imageSrc
        ? [imageSrc]
        : [];

  return (
    <main className="room-detail-page">
      {/* Hero Header */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <Container className="detail-hero-overlay">
          <div className="detail-hero-topbar">
            <button onClick={() => navigate(-1)} className="back-button">
              <ArrowLeft size={16} />
              Back to Stays
            </button>
            <span className="detail-hero-status">Premium village retreat</span>
          </div>

          <div className="detail-hero-content">
            <span className="detail-badge">{room.type}</span>
            <h1>{room.name}</h1>
            <p className="detail-hero-tagline">
              A refined stay designed for comfort, culture, and unforgettable
              village sunsets.
            </p>
            <div className="detail-price-section">
              <span className="detail-price">
                {room.priceText || `$${room.pricePerNight}/night`}
              </span>
              <span className="detail-capacity">
                Up to {room.guests} guests • Min {room.minNights} nights
              </span>
            </div>
            <div className="detail-hero-meta">
              {room.mealsIncluded?.length > 0 && (
                <div className="detail-hero-chip">
                  <Utensils size={16} />
                  <span>{room.mealsIncluded.join(", ")}</span>
                </div>
              )}
              <div className="detail-hero-chip">
                <Users size={16} />
                <span>{room.guests} guests</span>
              </div>
              <div className="detail-hero-chip">
                <Clock size={16} />
                <span>Min {room.minNights} nights</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="detail-section">
        <Container>
          <div className="detail-layout">
            {/* Left Content */}
            <div className="detail-main">
              {/* Gallery Slider Inside Main Layout */}
              {sliderImages.length > 0 && (
                <div
                  className="detail-slider-wrapper"
                  style={{ marginBottom: "3rem" }}
                >
                  <ImageSlider
                    images={sliderImages}
                    alt={room.name}
                    aspectRatio="16/9"
                  />
                </div>
              )}

              <div className="tab-content">
                <h2>About this Stay</h2>
                <p className="detail-description">{room.description}</p>
              </div>

              <div className="amenities-section" style={{ marginTop: "3rem" }}>
                <h3>Amenities</h3>
                <div className="amenities-chips">
                  {(room.amenities || []).map((amenity, idx) => (
                    <div key={idx} className="amenity-chip">
                      <CheckCircle size={14} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="detail-sidebar">
              <div className="booking-card-v2">
                <div className="booking-card-header">
                  <span className="price-tag-large">
                    {room.priceText || `$${room.pricePerNight}`}
                  </span>
                  <p>per night</p>
                </div>

                <div className="booking-details-v2">
                  <div className="detail-item">
                    <Users size={20} />
                    <span>Up to {room.guests} guests</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={20} />
                    <span>Min {room.minNights} nights stay</span>
                  </div>
                  <div className="detail-item">
                    <Utensils size={20} />
                    <span>Meals: {(room.mealsIncluded || []).join(", ")}</span>
                  </div>
                  <div className="detail-item">
                    <Info size={20} />
                    <span>
                      Services: {(room.staffServices || []).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="booking-card-actions">
                  <Button to={`/book-room/${room.id}`} className="btn-full">
                    Book This Stay
                  </Button>
                  <Button
                    href={`https://wa.me/94771234567?text=${encodeURIComponent(
                      `Hi, I'm interested in booking ${room.name}.`,
                    )}`}
                    variant="secondary"
                    className="btn-full"
                  >
                    💬 Chat on WhatsApp
                  </Button>
                  <p
                    className="booking-note"
                    style={{
                      textAlign: "center",
                      fontSize: "0.85rem",
                      color: "#6b5b4f",
                      marginTop: "1rem",
                    }}
                  >
                    Check-in: 2:00 PM | Check-out: 11:00 AM
                  </p>
                </div>
              </div>

              <div
                className="sidebar-info-box"
                style={{
                  marginTop: "2rem",
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "24px",
                  padding: "2rem",
                }}
              >
                <h4
                  style={{
                    color: "#d4af37",
                    marginBottom: "0.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  Recommendation
                </h4>
                <p
                  style={{
                    color: "#4a4a4a",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                  }}
                >
                  We recommend staying at least 2 nights so that you have time
                  to enjoy the excellent hikes, wildlife, swims, kayaking and
                  sunsets in the village.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
