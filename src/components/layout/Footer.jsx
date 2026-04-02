import { Link } from "react-router-dom";
import Container from "../common/Container";
import { images } from "../../assets/images";
export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-grid">
        <div>
          <img src={images.logo} alt="Etili Village Experience" className="footer-img" />
        
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/experiences">Experiences</Link></li>
            <li><Link to="/accommodation">Accommodation</Link></li>
            <li><Link to="/guides">Local Guides</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>Email: hello@etilivillage.com</li>
            <li>Phone: +94 77 123 4567</li>
            <li>Ella, Sri Lanka</li>
          </ul>
        </div>
      </Container>

      <Container>
        <div className="footer-bottom">
          <p>© 2026 Etili Village Experience. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
