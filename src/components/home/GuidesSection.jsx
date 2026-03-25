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

        <div className="team-grid">
          {guides.map((member, index) => (
            <div key={index} className="team-card">
              <div className="image-wrapper">
                <img src={member.img} alt={member.name} />
              </div>

              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              <p className="desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
