import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { guides } from "../data/guides";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Guides() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.guides_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section
        className="page-hero page-hero-guides"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          {/* <p className="section-eyebrow">Local Guides</p> */}
          <h1>Meet the People Who Bring Etili to Life</h1>
          <p>
            Our guides are not just tour leaders. They are local storytellers,
            hosts, and companions who make every visit more personal and
            meaningful.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Our Team"
            title="Guided by Local Knowledge and Genuine Hospitality"
            description="Each guide brings their own perspective, warmth, and connection to village life, food, nature, and local tradition."
          />

          <div className="guides-page-grid">
            {guides.map((guide) => (
              <article key={guide.id} className="guide-profile-card">
                <div className="guide-profile-image">
                  <img src={guide.img} alt={guide.name} />
                </div>

                <div className="guide-profile-content">
                  <h3>{guide.name}</h3>
                  <p className="guide-role">{guide.role}</p>
                  <p className="guide-languages">
                    <strong>Languages:</strong> {guide.languages}
                  </p>
                  <p>{guide.desc}</p>

                  <div className="guide-specialties">
                    <span className="guide-specialty-pill">Village Life</span>
                    <span className="guide-specialty-pill">Local Culture</span>
                    <span className="guide-specialty-pill">Guest Care</span>
                  </div>

                  <div className="guide-profile-actions">
                    <Button
                      href={`https://wa.me/94771234567?text=${encodeURIComponent(
                        `Hello, I would like to know more about experiences guided by ${guide.name}.`,
                      )}`}
                    >
                      Ask About This Guide
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container className="split-layout">
          <div>
            <SectionHeader
              eyebrow="Why Guides Matter"
              title="The Best Experiences Come from Real Human Connection"
              description="What makes Etili memorable is not only the setting. It is the way local people share stories, traditions, and everyday life with guests."
            />

            <div className="feature-list">
              <div className="feature-card">
                <h3>Local Storytelling</h3>
                <p>
                  Guides help guests understand the meaning behind food, places,
                  customs, and village routines.
                </p>
              </div>

              <div className="feature-card">
                <h3>Comfort and Personal Care</h3>
                <p>
                  Visitors feel more relaxed and welcomed when guided by people
                  who know the place deeply.
                </p>
              </div>

              <div className="feature-card">
                <h3>Authentic Insight</h3>
                <p>
                  Guests experience Etili through real local perspectives, not
                  scripted tourism.
                </p>
              </div>
            </div>
          </div>

          <div className="split-image">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
              alt="Local guide"
            />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="guide-values-box">
            <SectionHeader
              eyebrow="Guide Values"
              title="What Guests Can Expect from Every Guide"
              description="A warm, respectful, and meaningful experience centered on trust, hospitality, and local understanding."
              center
            />

            <div className="guide-values-grid">
              <div className="benefit-card">
                <h3>Warm Welcome</h3>
                <p>
                  Friendly hosting that makes guests feel comfortable from the
                  beginning.
                </p>
              </div>
              <div className="benefit-card">
                <h3>Clear Guidance</h3>
                <p>
                  Simple support throughout the journey, from activities to
                  local customs.
                </p>
              </div>
              <div className="benefit-card">
                <h3>Cultural Respect</h3>
                <p>
                  A respectful and thoughtful way of sharing local traditions
                  and community life.
                </p>
              </div>
              <div className="benefit-card">
                <h3>Personal Connection</h3>
                <p>
                  Conversations, stories, and human moments that make the visit
                  memorable.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="cta-section">
        <Container className="cta-box">
          <div>
            <p className="section-eyebrow">Travel with Local Insight</p>
            <h2>Let Our Guides Shape Your Best Memories</h2>
            <p>
              Book an experience guided by people who know the village, its
              stories, and its spirit.
            </p>
          </div>

          <div className="cta-actions">
            <Button to="/experiences">Explore Experiences</Button>
            <Button to="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
