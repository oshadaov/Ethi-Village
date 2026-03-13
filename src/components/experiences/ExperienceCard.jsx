import Button from "../common/Button";

export default function ExperienceCard({ experience }) {
  return (
    <article className="experience-detail-card">
      <div className="experience-detail-image">
        <img src={experience.image} alt={experience.title} />
      </div>

      <div className="experience-detail-content">
        <div className="experience-top-row">
          <span className="experience-category">{experience.category}</span>
          <span className="experience-price">{experience.priceText}</span>
        </div>

        <h3>{experience.title}</h3>
        <p>{experience.shortDescription}</p>

        <div className="experience-meta">
          <span><strong>Duration:</strong> {experience.duration}</span>
          <span><strong>Group:</strong> {experience.groupType}</span>
          <span><strong>Difficulty:</strong> {experience.difficulty}</span>
        </div>

        <div className="experience-columns">
          <div>
            <h4>Highlights</h4>
            <ul>
              {experience.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Includes</h4>
            <ul>
              {experience.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="experience-tags">
          {experience.bestFor.map((tag) => (
            <span key={tag} className="experience-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="experience-actions">
          <Button to="/contact">Book This Experience</Button>
          <Button
            href={`https://wa.me/94771234567?text=${encodeURIComponent(
              `Hello, I’m interested in the ${experience.title}. Please share more details.`
            )}`}
            variant="secondary"
          >
            WhatsApp Inquiry
          </Button>
        </div>
      </div>
    </article>
  );
}