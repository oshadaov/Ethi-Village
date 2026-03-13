import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";

export default function WhyEtiliSection() {
  return (
    <section className="section section-soft">
      <Container className="split-layout">
        <div>
          <SectionHeader
            eyebrow="Why Etili"
            title="A Slower, More Meaningful Way to Travel"
            description="Etili is designed for travelers who want real connection, local culture, and calm natural beauty."
          />

          <div className="feature-list">
            <div className="feature-card">
              <h3>Authentic Local Connection</h3>
              <p>Meet local hosts and experience village traditions in a genuine, welcoming setting.</p>
            </div>
            <div className="feature-card">
              <h3>Food with Story and Heart</h3>
              <p>Enjoy dishes prepared with fresh local ingredients and traditional methods.</p>
            </div>
            <div className="feature-card">
              <h3>Peaceful Natural Surroundings</h3>
              <p>Step away from crowded tourist paths and enjoy a slower rhythm of travel.</p>
            </div>
          </div>
        </div>

        <div className="split-image">
          <img
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
            alt="Nature and village atmosphere"
          />
        </div>
      </Container>
    </section>
  );
}
