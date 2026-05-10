import { useState, useEffect ,useMemo} from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { getCachedData, getExperiences } from "../services/api";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Activities() {
  const { images, loading } = useSiteImages();
  const cachedExp = getCachedData("/experiences");
  const [experiencesData, setExperiencesData] = useState(cachedExp || []);
  const [loadingData, setLoadingData] = useState(!cachedExp);

  useEffect(() => {
    if (!cachedExp) {
      const load = async () => {
        setLoadingData(true);
        try {
          const data = await getExperiences();
          setExperiencesData(data || []);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingData(false);
        }
      };
      load();
    }
  }, [cachedExp]);

  const remoteHero = images?.experiencesData_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

  const mappedExperiences = useMemo(() => {
    return experiencesData.map((item) => {
      const key = item.imageKey || `experience_${item.slug}`;
      const remoteImage = images[key];
      return {
        ...item,
        image:
          item.imageUrl ||
          (!loading && remoteImage
            ? remoteImage
            : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"),
      };
    });
  }, [experiencesData, images, loading]);

  return (
    <main className="activities-page">
      <section
        className="page-hero"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Adventures & Relaxation</h1>
          <p>
            From peaceful meditation to thrilling wildlife encounters, discover
            the diverse experiences Etili Village has to offer.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="activities-intro-grid">
            <div className="intro-text">
              <SectionHeader
                eyebrow="Experience Etili"
                title="Your Gateway to Rejuvenation"
              />
              <p className="large-text">
                Etili Village is a perfect spot for relaxation and rejuvenation.
                Those who want to escape from the stressful urban life, we
                provide an extensive selection of books, games, swings, shaded
                sitouts, and stunning views for peaceful walks or meditation.
              </p>
              <p>
                For those who are into adventures, there is a wide range of
                activities and attractions in and around the village. Explore
                our curated experiences below.
              </p>
            </div>
            <div className="intro-stats">
              <div className="stat-box">
                <strong>10+</strong>
                <span>Unique Activities</span>
              </div>
              <div className="stat-box">
                <strong>1hr</strong>
                <span>to Major Parks</span>
              </div>
              <div className="stat-box">
                <strong>Daily</strong>
                <span>Farm Tours</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container>
          <SectionHeader
            center
            eyebrow="Explore"
            title="Things to Do"
            description="Hand-picked activities to make your stay unforgettable."
          />
          <div className="experience-list">
            {loadingData ? (
              <p>Loading activities...</p>
            ) : (
              mappedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))
            )}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="cta-box glass">
            <div className="cta-content">
              <h2>Ready to Adventure?</h2>
              <p>
                Whether it's a safari to Yala, a hike up Kandeyaya rock, or a
                peaceful kayak trip, we can arrange everything for you.
              </p>
              <div className="cta-actions">
                <Button to="/contact" size="lg">
                  Book an Activity
                </Button>
                <Button
                  href="https://wa.me/94771234567"
                  variant="secondary"
                  size="lg"
                >
                  WhatsApp Inquiry
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* REGIONAL HIGHLIGHTS */}
      <section className="section section-soft">
        <Container>
          <SectionHeader
            eyebrow="Beyond the Village"
            title="Regional Attractions"
          />
          <div className="regional-grid">
            <div className="regional-card">
              <h3>Historical Sites</h3>
              <p>
                Visit the Buddhist statues at <strong>Buduruwagala</strong>{" "}
                (1-hour drive). Features seven colossal statues carved into a
                70-foot rock face, dating back to the 10th century.
              </p>
            </div>
            <div className="regional-card">
              <h3>Waterfalls & Nature</h3>
              <p>
                Explore <strong>Diyaluma Falls</strong>, Ella wala waterfalls,
                and Rawana falls. Discover the unique ecosystems of{" "}
                <strong>World’s End</strong> and <strong>Horton Plains</strong>{" "}
                (within 2 hours).
              </p>
            </div>
            <div className="regional-card">
              <h3>Safaris & Culture</h3>
              <p>
                Base yourself for <strong>Yala</strong> or{" "}
                <strong>Udawalawe</strong> safaris. Visit colonial mansions or
                historical sites, all within a scenic drive from the village.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
