import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from "lucide-react";
import Button from "../common/Button";
import Container from "../common/Container";
import { images } from "../../assets/images";

const navLinks = [
  { label: "Home", path: "/" },
  { 
    label: "Stay", 
    path: "/stay",
    dropdown: [
      { label: "Accommodation", path: "/stay#accommodation" },
      { label: "Food and drinks", path: "/stay#food" },
      { label: "Activities", path: "/activities" }
    ]
  },
  { 
    label: "Impact", 
    path: "/impact",
    dropdown: [
      { label: "Community development", path: "/impact#community" },
      { label: "Environmental restoration", path: "/impact#environment" }
    ]
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Comments", path: "/comments" },
  { label: "Blog", path: "/blog" },
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
  <img src={images.logo} alt="Etili Village Experience" className="logo-img" />

  {/* <div className="logo-text">
    <strong>Etili Village</strong>
    <span>Experience</span>
  </div> */}
</Link>

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <div key={link.path} className={`nav-item ${link.dropdown ? "has-dropdown" : ""}`}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {link.label}
              </NavLink>
              {link.dropdown && (
                <div className="dropdown-menu">
                  {link.dropdown.map(drop => {
                    const isHashLink = drop.path.includes("#");
                    return isHashLink ? (
                      <HashLink smooth key={drop.path} to={drop.path} className="dropdown-link">
                        {drop.label}
                      </HashLink>
                    ) : (
                      <Link key={drop.path} to={drop.path} className="dropdown-link">
                        {drop.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
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
              <div key={link.path} className="mobile-nav-item">
                <NavLink
                  to={link.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
                {link.dropdown && (
                  <div className="mobile-dropdown">
                    {link.dropdown.map(drop => {
                      const isHashLink = drop.path.includes("#");
                      return isHashLink ? (
                        <HashLink 
                          smooth
                          key={drop.path} 
                          to={drop.path} 
                          className="mobile-dropdown-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {drop.label}
                        </HashLink>
                      ) : (
                        <Link 
                          key={drop.path} 
                          to={drop.path} 
                          className="mobile-dropdown-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {drop.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
