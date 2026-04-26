import { Link } from "react-router-dom";
import Button from "../common/Button";
import "../accommodation/AccommodationGrid.css";

export default function AccommodationGrid({ accommodations = [] }) {
  return (
    <div className="accommodation-grid">
      {accommodations.map((property) => (
        <article key={property.id} className="accommodation-card">
          <div className="accommodation-image-wrapper">
            <img
              src={property.image}
              alt={property.name}
              className="accommodation-image"
            />
            <div className="accommodation-badge">{property.type}</div>
            <div className="accommodation-price-badge">
              ${property.pricePerNight}/night
            </div>
          </div>

          <div className="accommodation-content">
            <h3 className="accommodation-name">{property.name}</h3>

            <p className="accommodation-description">{property.description}</p>

            <div className="accommodation-meta">
              <span className="meta-item">
                <strong>👥</strong> {property.guests} guests
              </span>
              <span className="meta-item">
                <strong>🌙</strong> Min {property.minNights} nights
              </span>
            </div>

            <div className="accommodation-highlights">
              <strong>Highlights:</strong>
              <ul>
                {property.highlights.slice(0, 3).map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="accommodation-actions">
              <Link
                to={`/accommodation/${property.id}`}
                className="view-button"
              >
                View & Book
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
