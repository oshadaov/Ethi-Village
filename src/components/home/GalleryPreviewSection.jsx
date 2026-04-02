import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { galleryItems } from "../../data/gallery";
import { useSiteImages } from "../../hooks/useSiteImages";

export default function GalleryPreviewSection() {
  const { images, loading } = useSiteImages();
  const previewImages = galleryItems.slice(0, 4);

  return (
    <section className="section gallery-section">
      <Container>
        <SectionHeader
          eyebrow="Gallery"
          title="Moments from Etili"
          description="A glimpse into the people, food, landscapes, and peaceful atmosphere of the village."
        />

        <div className="gallery-grid">
          {previewImages.map((item, index) => {
            const imageSrc =
              !loading && images[item.imageKey]
                ? images[item.imageKey]
                : item.image;
            let sizeClass = "";

            if (index === 0) sizeClass = "large";
            else if (index === 3) sizeClass = "wide";

            return (
              <div key={item.id} className={`gallery-card ${sizeClass}`}>
                <img src={imageSrc} alt={item.alt} />

                <div className="gallery-overlay">
                  <div className="overlay-content">
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
