import { useState, useEffect } from "react";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { getGuides } from "../../data/guides";

export default function GuidesSection() {
  const [guidesData, setGuidesData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadGuides = async () => {
      setLoadingData(true);
      const data = await getGuides();
      setGuidesData(data);
      setLoadingData(false);
    };
    loadGuides();
  }, []);

  return (
    <section className="section section-soft">
      <Container>
        <SectionHeader
          eyebrow="Local Guides"
          title="Meet the People Behind the Experience"
          description="Our guides bring village stories, food culture, and local knowledge to life."
        />

        <div className="team-grid">
          {loadingData ? (
            <p>Loading guides...</p>
          ) : (
            guidesData.map((member, index) => (
              <div key={index} className="team-card">
                <div className="image-wrapper">
                  <img src={member.img} alt={member.name} />
                </div>

                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="desc">{member.desc}</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
