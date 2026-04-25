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
            <li><Link to="/stay">Stay</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/comments">Comments</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>Email: info@etilivillage.com</li>
            <li>WhatsApp: +94 77 1111111</li>
            <li>Phone: +94-11111111</li>
            <li>Between Tissamaharama and Ella</li>
          </ul>
        </div>
      </Container>

      <Container>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>© 2026 Etili Village Experience. All rights reserved.</p>
          <Link to="/admin/dashboard" className="footer-admin-link">Admin Portal</Link>
        </div>
      </Container>
    </footer>
  );
}
