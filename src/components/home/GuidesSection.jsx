import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { guides } from "../../data/guides";

export default function GuidesSection() {
  return (
    <section className="section section-soft">
      <Container>
        <SectionHeader
          eyebrow="Local Guides"
          title="Meet the People Behind the Experience"
          description="Our guides bring village stories, food culture, and local knowledge to life."
        />

        <div className="card-grid two">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-card">
              <img src={guide.image} alt={guide.name} />
              <div className="card-body">
                <h3>{guide.name}</h3>
                <p className="guide-role">{guide.role}</p>
                <p className="guide-languages">{guide.languages}</p>
                <p>{guide.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
