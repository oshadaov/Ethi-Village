import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import ReservationChecker from "../components/accommodation/ReservationChecker";
import {
  getAccommodationById,
  getAccommodationData,
} from "../data/accommodationData";
import "../styles/accommodation-detail.css";

export default function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [data, allRooms] = await Promise.all([
          getAccommodationById(id),
          getAccommodationData()
        ]);
        if (data) {
          setAccommodation(data);
          setRooms(allRooms);
        } else {
          // Handle case where specific room is not found
        }
      } catch (err) {
        console.error("Error loading accommodation:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <main>
        <section className="page-hero">
          <Container className="page-hero-content">
            <h1>Loading...</h1>
          </Container>
        </section>
      </main>
    );
  }

  if (!accommodation) {
    return (
      <main>
        <section className="page-hero page-hero-error">
          <Container className="page-hero-content">
            <h1>Property Not Found</h1>
            <p>The accommodation you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/stay#accommodation")}>
              ← Back to Accommodations
            </Button>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section
        className="detail-hero"
        style={{ backgroundImage: `url('${accommodation.image}')` }}
      >
        <Container className="detail-hero-overlay">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="detail-hero-content">
            <span className="detail-badge">{accommodation.type}</span>
            <h1>{accommodation.name}</h1>
            <div className="detail-price-section">
              <span className="detail-price">
                ${accommodation.pricePerNight}/night
              </span>
              <span className="detail-capacity">
                👥 {accommodation.guests} guests • 🌙 Min{" "}
                {accommodation.minNights} nights
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="detail-section">
        <Container>
          <div className="detail-layout">
            {/* Left Column - Content */}
            <div className="detail-main">
              {/* Tabs */}
              <div className="detail-tabs">
                <button
                  className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`tab-button ${activeTab === "amenities" ? "active" : ""}`}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities
                </button>
                <button
                  className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="tab-content">
                  <h2>About This Property</h2>
                  <p className="detail-description">
                    {accommodation.description}
                  </p>

                  <div className="highlights-section">
                    <h3>Experience Highlights</h3>
                    <ul className="highlights-list">
                      {accommodation.highlights.map((highlight, idx) => (
                        <li key={idx}>
                          <span className="highlight-icon">✨</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "amenities" && (
                <div className="tab-content">
                  <h2>Amenities & Facilities</h2>
                  <div className="amenities-grid">
                    {accommodation.amenities.map((amenity, idx) => (
                      <div key={idx} className="amenity-card">
                        <span className="amenity-icon">🏠</span>
                        <span className="amenity-text">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="tab-content">
                  <h2>Stay Information</h2>

                  <div className="info-grid">
                    <div className="info-card">
                      <h4>Meals Included</h4>
                      <ul>
                        {accommodation.mealsIncluded.map((meal, idx) => (
                          <li key={idx}>🍽️ {meal}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="info-card">
                      <h4>Staff Services</h4>
                      <ul>
                        {accommodation.staffServices.map((service, idx) => (
                          <li key={idx}>👥 {service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="important-info">
                    <h3>Important Information</h3>
                    <ul>
                      <li>
                        <strong>Minimum Stay:</strong> {accommodation.minNights}{" "}
                        nights
                      </li>
                      <li>
                        <strong>Capacity:</strong> {accommodation.guests} guests
                      </li>
                      <li>
                        <strong>Price:</strong> ${accommodation.pricePerNight}{" "}
                        per night
                      </li>
                      <li>
                        <strong>Full-time Staff:</strong> Available for all your
                        needs
                      </li>
                      <li>
                        <strong>Recommendation:</strong> We suggest staying at
                        least 2 nights to fully enjoy hiking, wildlife spotting,
                        kayaking, and village sunsets.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Reservation Checker */}
            <div className="detail-sidebar">
              <ReservationChecker rooms={rooms} />

              <div className="contact-box">
                <h3>Questions?</h3>
                <p>
                  Contact us directly for special requests or custom
                  arrangements.
                </p>
                <Button
                  href="https://wa.me/94771234567?text=Hello, I have questions about your accommodations."
                  className="whatsapp-button"
                >
                  💬 Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Properties */}
      <section className="detail-related">
        <Container>
          <h2>Other Properties</h2>
          <div className="related-grid">
            {rooms
              .filter((prop) => prop.id !== accommodation.id)
              .slice(0, 3)
              .map((prop) => (
                <div key={prop.id} className="related-card">
                  <img src={prop.image} alt={prop.name} />
                  <h4>{prop.name}</h4>
                  <p>${prop.pricePerNight}/night</p>
                  <Button
                    to={`/accommodation/${prop.id}`}
                    className="related-button"
                  >
                    View Property
                  </Button>
                </div>
              ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
