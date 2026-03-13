import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { galleryItems } from "../../data/gallery";

export default function GalleryPreviewSection() {
  const previewImages = galleryItems.slice(0, 4);

  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="Gallery"
          title="Moments from Etili"
          description="A glimpse into the people, food, landscapes, and peaceful atmosphere of the village."
        />

        <div className="destination-grid">
          {previewImages.map((item, index) => {
            let cardClass = "destination-card";

            if (index === 0) cardClass += " tall";
            if (index === 3) cardClass += " wide";

            return (
              <div key={item.id} className={cardClass}>
                <img src={item.image} alt={item.alt} />

                <div className="destination-overlay">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-actions">
          <Button to="/gallery" variant="secondary">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}