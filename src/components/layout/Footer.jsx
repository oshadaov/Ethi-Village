import { Link } from "react-router-dom";
import Container from "../common/Container";
import { images } from "../../assets/images";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const socialLinks = {
    facebook: import.meta.env.VITE_FACEBOOK_URL || "#",
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "#",
    youtube: import.meta.env.VITE_YOUTUBE_URL || "#",
  };

  return (
    <footer className="footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <img src={images.logo} alt="Etili Village Experience" className="footer-img" />
          <p>
            An authentic village experience in the heart of Sri Lanka, where nature, culture, and community thrive together.
          </p>
          <div className="footer-socials">
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/stay">Stay & Accommodation</Link></li>
            <li><Link to="/experiences">Village Experiences</Link></li>
            <li><Link to="/impact">Community Impact</Link></li>
            <li><Link to="/gallery">Photo Gallery</Link></li>
            <li><Link to="/blog">Latest Stories</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <ul>
            <li><strong>Email:</strong> info@etilivillage.com</li>
            <li><strong>WhatsApp:</strong> +94 77 1111111</li>
            <li><strong>Phone:</strong> +94-11111111</li>
            <li><strong>Location:</strong> Between Tissamaharama and Ella</li>
          </ul>
        </div>
      </Container>

      <Container>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>© 2026 Etili Village Experience. Crafted with care for our community.</p>
          <Link to="/admin/dashboard" className="footer-admin-link">Staff Portal</Link>
        </div>
      </Container>
    </footer>
  );
}
