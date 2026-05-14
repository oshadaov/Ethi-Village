import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X, ChevronDown } from "lucide-react";
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
      { label: "Activities", path: "/activities" },
    ],
  },
  {
    label: "Impact",
    path: "/impact",
    dropdown: [
      { label: "Community development", path: "/impact#community" },
      { label: "Environmental restoration", path: "/impact#environment" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Comments", path: "/comments" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled || mobileOpen ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 relative z-[110]" onClick={() => setMobileOpen(false)}>
          <img
            src={images.logo}
            alt="Etili Village Experience"
            className="h-10 md:h-12 w-auto object-contain transition-all drop-shadow-md"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 font-bold transition-colors ${
                    isActive || (link.dropdown && link.dropdown.some(d => location.pathname === d.path))
                      ? "text-accent" 
                      : scrolled ? "text-primary hover:text-accent" : "text-white hover:text-accent"
                  }`
                }
              >
                {link.label}
                {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </NavLink>

              {link.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white rounded-2xl shadow-premium border border-border/10 p-3 min-w-[220px]">
                    {link.dropdown.map((drop) => {
                      const isHashLink = drop.path.includes("#");
                      const LinkComponent = isHashLink ? HashLink : Link;
                      return (
                        <LinkComponent
                          smooth={isHashLink}
                          key={drop.path}
                          to={drop.path}
                          className="block px-4 py-3 rounded-xl text-sm font-bold text-primary hover:bg-bg hover:text-accent transition-all"
                        >
                          {drop.label}
                        </LinkComponent>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative z-[110]">
          <Button to="/book" variant={scrolled || mobileOpen ? "primary" : "secondary"} className="hidden lg:inline-flex !py-2.5 !px-6 !text-sm">
            Book Now
          </Button>
          
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              scrolled || mobileOpen ? "text-primary bg-bg" : "text-white bg-white/10"
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[105] bg-white transition-all duration-500 ease-in-out transform ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="pt-24 pb-12 px-6 h-screen overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.path} className="flex flex-col gap-4 border-b border-border/5 pb-6">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `text-xl font-bold transition-colors ${isActive ? "text-accent" : "text-primary"}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
                {link.dropdown && (
                  <div className="flex flex-col gap-4 pl-6 border-l-2 border-accent/20">
                    {link.dropdown.map((drop) => {
                      const isHashLink = drop.path.includes("#");
                      const LinkComponent = isHashLink ? HashLink : Link;
                      return (
                        <LinkComponent
                          smooth={isHashLink}
                          key={drop.path}
                          to={drop.path}
                          className="text-lg font-bold text-muted hover:text-accent transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {drop.label}
                        </LinkComponent>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 hidden lg:block">
              <Button to="/book" className="w-full !py-5 !text-lg" onClick={() => setMobileOpen(false)}>
                Plan Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
