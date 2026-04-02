import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { experiences } from "../../data/experiences";
import { useSiteImages } from "../../hooks/useSiteImages";
import { motion } from "framer-motion";

export default function ExperiencesSection() {
  const { images, loading } = useSiteImages();

  const mappedExperiences = experiences.map((item) => {
    const key = item.imageKey || `experience_${item.slug}`;
    const remoteImage = images[key];

    return {
      ...item,
      image: !loading && remoteImage ? remoteImage : item.image,
    };
  });

  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="Signature Experiences"
          title="Immersive Village Moments"
          description="Choose from carefully crafted cultural, food, and nature-based experiences."
        />

        <div className="card-grid three">
          {mappedExperiences.map((item, index) => (
            <motion.article
              key={item.id}
              className="experience-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <img src={item.image} alt={item.title} />

              <div className="card-body">
                <span className="card-tag">{item.duration}</span>
                <h3>{item.title}</h3>
                <p>{item.shortDescription}</p>

                <Button to="/experiences" variant="secondary">
                  View More
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
