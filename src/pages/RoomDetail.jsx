import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccommodationById } from "../data/accommodationData";
import { useSiteImages } from "../hooks/useSiteImages";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { ArrowLeft, CheckCircle, Users, Clock, Utensils, Info } from "lucide-react";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { images, loading } = useSiteImages();
  const [room, setRoom] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      setLoadingData(true);
      try {
        const data = await getAccommodationById(id);
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
  }, [id, navigate]);

  if (loadingData || !room) {
    return (
      <div className="admin-loading">
        <Container>
          <p>Loading room details...</p>
        </Container>
      </div>
    );
  }

  const imageSrc = !loading && images[room.imageKey] ? images[room.imageKey] : room.image;

  return (
    <main className="room-detail-page">
      {/* Hero Header */}
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
            Back to Stays
          </Button>
          <h1>{room.name}</h1>
          <p className="room-type-pill">{room.type}</p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="room-detail-grid">
            {/* Left Content */}
            <div className="room-detail-main">
              <div className="room-detail-block">
                <SectionHeader 
                  eyebrow="Overview" 
                  title="About this Stay" 
                />
                <p className="room-description-large">{room.description}</p>
              </div>

              <div className="room-detail-block">
                <h3>Best Highlights</h3>
                <div className="highlights-grid-v2">
                  {(room.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="highlight-item-v2">
                      <CheckCircle size={18} className="text-accent" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="room-detail-block">
                <h3>Amenities</h3>
                <ul className="amenities-list-v2">
                  {(room.amenities || []).map((amenity, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="room-detail-sidebar">
              <div className="booking-card-v2">
                <div className="booking-card-header">
                  <span className="price-tag-large">{room.priceText}</span>
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
                    <span>Services: {(room.staffServices || []).join(", ")}</span>
                  </div>
                </div>

                <div className="booking-card-actions">
                  <Button to="/contact" className="btn-full">Book This Stay</Button>
                  <p className="booking-note">
                    Check-in: 2:00 PM | Check-out: 11:00 AM
                  </p>
                </div>
              </div>

              <div className="sidebar-info-box">
                <h4>Recommendation</h4>
                <p>
                  We recommend staying at least 2 nights so that you have time to enjoy the excellent hikes, wildlife, swims, kayaking and sunsets in the village.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
