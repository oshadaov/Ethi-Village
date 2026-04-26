import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";
import { images as defaultImagess } from "../assets/images";

export default function Impact() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.impact_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Community & Environment First</h1>
          <p>
            Despite its scenic charm, Uva Province ranks as one of the least developed regions in Sri Lanka. Through tourism, we generate economic opportunities and promote environmental restoration.
          </p>
        </Container>
      </section>

      <section id="community" className="section">
        <Container className="split-layout">
          <div>
            <SectionHeader
              eyebrow="Community Development"
              title="Enhancing Local Livelihoods"
              description="Our primary mission is to create and increase economic opportunities for the people of Etili village, through welcoming tourists and developing higher value tourism products."
            />
            <p>
              As a business, we create jobs, raise incomes and, as far as possible, source our goods and services from within the local community. We also support a number of initiatives to improve livelihoods in the village.
            </p>
            <ul className="bullet-list" style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
              <li><strong>Education:</strong> Conducted an English language teaching program for school students involving guests.</li>
              <li><strong>Facilities:</strong> Built a library for the local school.</li>
              <li><strong>Health:</strong> Donated a water filter for the school to prevent Chronic Kidney Diseases, a major public health crisis.</li>
              <li><strong>Empowerment:</strong> Conducted a program to promote entrepreneurship and self-employment in collaboration with university students.</li>
            </ul>
          </div>

          <div className="split-image">
            <img src={images?.impact_community || defaultImagess?.split || "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80"} alt="Community Development" />
          </div>
        </Container>
      </section>

      <section id="environment" className="section section-soft">
        <Container className="split-layout">
           <div className="split-image" style={{ order: -1 }}>
            <img src={images?.impact_environment || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"} alt="Environmental Restoration" />
          </div>

          <div>
            <SectionHeader
              eyebrow="Environmental Restoration"
              title="Safeguarding Habitats"
              description="ETILI's fundamental goal is to safeguard and restore the environment and wildlife habitats within and surrounding the village."
            />
            <p>
              In various regions of Sri Lanka, deforestation, poor land management, and the overuse of agro-chemicals are contributing to erosion, flooding, loss of habitats, and increase of diseases. Consequently, all our initiatives aim to reduce our environmental footprint while restoring natural ecosystems.
            </p>
            <ul className="bullet-list" style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
              <li><strong>Wildlife Protection:</strong> Actively involved in rescuing elephants and other wildlife, coordinating with authorities to prevent poaching and providing information to Wildlife officers.</li>
              <li><strong>Reforestation:</strong> Planting trees involving guests, especially medicinal plants, endemic plants, and keystone species to protect wildlife, water sources, and mitigate climate change.</li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
