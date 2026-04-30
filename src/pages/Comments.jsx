import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Comments() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.comments_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Guest Comments & Reviews</h1>
          <p>
            Etili village has been honoured by the consistently superlative
            reviews we receive from guests and visitors.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="What People Say"
            title="Real Reviews from Our Guests"
            description="Explore our reviews on major platforms."
          />

          <div className="comments-grid">
            {/* Placeholders for actual embedded widgets */}
            <div className="review-widget-placeholder">
              <h3>TripAdvisor</h3>
              <p>Excellent 5/5</p>
              <a
                href={import.meta.env.VITE_TRIPADVISOR_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View on TripAdvisor
              </a>
            </div>

            <div className="review-widget-placeholder">
              <h3>Google Reviews</h3>
              <p>4.9/5 Stars</p>
              <a
                href={import.meta.env.VITE_GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View on Google
              </a>
            </div>

            <div className="review-widget-placeholder">
              <h3>Facebook</h3>
              <p>Recommended by 100+ people</p>
              <a
                href={import.meta.env.VITE_FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View on Facebook
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container>
          <SectionHeader
            eyebrow="Featured Media"
            title="Videos by ITN"
            description="Watch the coverage of Etili Village by Independent Television Network (ITN)."
            center
          />

          <div
            className="video-container"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* Placeholder for YouTube Embed */}
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src="https://www.youtube.com/embed/8I2r8AtFLMs"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Etili Village Experience Video"
              ></iframe>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
