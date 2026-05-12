import Container from "../components/common/Container";
import { contactInfo } from "../data/contactConfig";
import ContactInfoPanel from "../components/contact/ContactInfoPanel";
import { useSiteImages } from "../hooks/useSiteImages";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";

export default function Contact() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.contact_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section
        className="page-hero page-hero-contact"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Plan Your Village Escape with Confidence</h1>
          <p>
            Share your preferred date, group size, and interests. We’ll help you
            choose the right experience and stay option.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container className="contact-layout" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ContactInfoPanel
            contactInfo={contactInfo}
          />
          
          <div className="contact-cta-box glass" style={{ marginTop: '3rem', padding: '3rem', textAlign: 'center' }}>
            <h2>Looking to book a stay or activity?</h2>
            <p>Visit our Accommodation or Activities pages to book directly.</p>
            <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Button to="/stay">View Stays</Button>
              <Button to="/activities" variant="secondary">View Activities</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container className="contact-extras">
          <div className="contact-extras-grid">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126685.25368146683!2d81.16127814282035!3d6.8452331575037165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae46500732dc7c3%3A0xe54e2ed11f75d5ee!2sWellawaya!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "20px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Etili Village Map"
              ></iframe>
            </div>

            <div className="extras-content">
              <SectionHeader
                eyebrow="Location & Info"
                title="Find Us & Connect"
                description="ETILI Village is located in between Tissamaharama and Ella. It's a 15 minutes drive from Wellawaya town."
              />

              <div className="social-links-box">
                <h3>Connect With Us</h3>
                <p>
                  Find all the latest information, photos, reviews and more on
                  our pages:
                </p>
                <div className="social-links-grid">
                  <a
                    href={import.meta.env.VITE_FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    Facebook
                  </a>
                  <a
                    href={import.meta.env.VITE_INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    Instagram
                  </a>
                  <a
                    href={import.meta.env.VITE_TRIPADVISOR_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    TripAdvisor
                  </a>
                  <a
                    href={import.meta.env.VITE_YOUTUBE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                  >
                    YouTube
                  </a>
                </div>
              </div>

              <div className="download-box">
                <h3>Directions</h3>
                <p>Download our detailed map and directions guide.</p>
                <Button
                  variant="secondary"
                  href="/Etili_Directions.pdf"
                  download
                >
                  Download PDF Map
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
