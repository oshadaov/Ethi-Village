import { motion } from "framer-motion";
import Container from "../common/Container";
import { useSiteImages } from "../../hooks/useSiteImages";
import { images as defaultImages } from "../../assets/images";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";

export default function HeroSection() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.hero_main;
  // Using default hero image - you can replace this URL with the new landscape image
  const heroBackground =
    !loading && remoteHero ? remoteHero : defaultImages.hero;

  const socialLinks = [
    {
      icon: FaFacebook,
      url: import.meta.env.VITE_FACEBOOK_URL,
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: FaYoutube,
      url: import.meta.env.VITE_YOUTUBE_URL,
      label: "YouTube",
      color: "#FF0000",
    },
    {
      icon: FaInstagram,
      url: import.meta.env.VITE_INSTAGRAM_URL,
      label: "Instagram",
      color: "#E4405F",
    },
    {
      icon: SiTripadvisor,
      url: import.meta.env.VITE_TRIPADVISOR_URL,
      label: "TripAdvisor",
      color: "#00AF87",
    },
  ];

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url('${heroBackground}')` }}
    >
      <div className="hero-overlay" />
      <Container className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1>
            ETHILI
            <br />
            VILLAGE SRI LANKA
          </h1>

          <div className="hero-social-links">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={{ color: link.color }}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
