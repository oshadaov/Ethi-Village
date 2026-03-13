import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../common/Button";
import Container from "../common/Container";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Experiences", path: "/experiences" },
  { label: "Accommodation", path: "/accommodation" },
  { label: "Guides", path: "/guides" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Container className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">E</span>
          <div>
            <strong>Etili Village</strong>
            <span>Experience</span>
          </div>
        </Link>

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Button to="/contact">Book Now</Button>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="mobile-menu">
          <Container className="mobile-menu-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mobile-book-btn">
              Book Now
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
