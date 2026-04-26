import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function ExperienceCard({ experience }) {
  const resolvedImage = experience.image;

  return (
    <article className="experience-card-v3">
      <div className="experience-card-image-v3">
        <img src={resolvedImage} alt={experience.title} />
      </div>

      <div className="experience-card-overlay-v3">
        <div className="experience-card-content-v3">
          <div className="experience-card-header-v3">
            <span className="experience-category-v3">{experience.category}</span>
            <h3 className="experience-title-v3">{experience.title}</h3>
          </div>
          
          <p className="experience-price-v3">{experience.priceText}</p>

          <div className="experience-card-actions-v3">
            <Button to={`/activities/${experience.id}`} variant="secondary" className="view-details-btn-v3">
              View Details
            </Button>
            <Button to="/contact" className="book-now-btn-v3">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
