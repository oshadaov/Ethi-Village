import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { useSiteImages } from "../../hooks/useSiteImages";

export default function StayPreviewSection() {
  const { images, loading } = useSiteImages();
  const remoteImage = images?.stay_preview;
  const previewImage =
    !loading && remoteImage
      ? remoteImage
      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="Accommodation"
          title="Stay Close to Nature"
          description="Complete your village journey with a peaceful countryside stay."
        />

        <div className="stay-preview">
          <div className="stay-preview-image">
            <img src={previewImage} alt="Accommodation preview" />
          </div>

          <div className="stay-preview-content">
            <h3>Comfort, Calm, and Local Warmth</h3>
            <p>
              Our stay experience is designed for travelers who want rest,
              natural beauty, and easy access to village activities.
            </p>

            <ul className="bullet-list">
              <li>Garden and countryside setting</li>
              <li>Traditional meals on request</li>
              <li>Comfortable rooms for couples and families</li>
              <li>Easy pairing with village experiences</li>
            </ul>

            <Button to="/accommodation">Explore Stay Options</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
