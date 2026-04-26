import { useState, useEffect } from "react";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { getExperiences } from "../../data/experiences";
import { useSiteImages } from "../../hooks/useSiteImages";
import { motion } from "framer-motion";

export default function ExperiencesSection() {
  const { images, loading } = useSiteImages();
  const [experiencesData, setExperiencesData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      setLoadingData(true);
      const data = await getExperiences();
      setExperiencesData(data);
      setLoadingData(false);
    };
    loadExperiences();
  }, []);

  const mappedExperiences = experiencesData.map((item) => {
    const key = item.imageKey || `experience_${item.slug}`;
    const remoteImage = images[key];
    const apiImage = item.imageUrl;

    return {
      ...item,
      image:
        apiImage ||
        (!loading && remoteImage
          ? remoteImage
          : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"),
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
          {loadingData ? (
            <p>Loading experiences...</p>
          ) : (
            mappedExperiences.map((item, index) => (
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
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
