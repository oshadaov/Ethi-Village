import { motion } from "framer-motion";
import Container from "../common/Container";
import Button from "../common/Button";
import { useSiteImages } from "../../hooks/useSiteImages";
import { images as defaultImages } from "../../assets/images";

export default function HeroSection() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.hero_main;
  const heroBackground = !loading && remoteHero ? remoteHero : defaultImages.hero;
  return (
    <section className="hero-section" style={{ backgroundImage: `url('${heroBackground}')` }}>
      <div className="hero-overlay" />
      <Container className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="hero-eyebrow">Authentic Sri Lankan Village Experience</p>
          <h1>Experience the Soul of Rural Sri Lanka</h1>
          <p className="hero-subtext">
            Discover village life, traditional food, peaceful landscapes, and
            warm local hospitality in Etili.
          </p>

          <div className="hero-actions">
            <Button to="/contact">Book Your Experience</Button>
            <Button to="/accommodation" variant="secondary">
              Explore Accommodation
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
