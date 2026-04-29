import { motion } from "framer-motion";
import Container from "../common/Container";

export default function HeroIntroSection() {
  return (
    <section className="hero-intro-section">
      <Container>
        <motion.div
          className="hero-intro-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="hero-intro-text">
            <h2>A Rural Community Enterprise</h2>

            <p>
              Etili Village is a rural community that provides opportunities for
              wildlife encounters, showcases authentic culture, and promotes
              community-driven enterprises in the Uva province of Sri Lanka.
            </p>

            <p>
              Our objective is to enhance local employment and income levels
              while simultaneously preserving and restoring the natural
              environment and wildlife.
            </p>

            <p>
              We collaborate with the local community to create and offer a
              diverse array of authentic experiences, allowing guests to unwind
              and rejuvenate in one of the most beautiful spots in Sri Lanka,
              surrounded by mountains, lakes, caves, forests, and rice paddies.
            </p>

            <p className="highlight">
              <strong>
                Our village consistently ranks among the top community-driven
                enterprises in Sri Lanka.
              </strong>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

