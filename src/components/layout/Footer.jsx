import { Link } from "react-router-dom";
import Container from "../common/Container";
import { images } from "../../assets/images";
import { Facebook, Instagram, Youtube, Heart, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const socialLinks = {
    facebook: import.meta.env.VITE_FACEBOOK_URL || "#",
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "#",
    youtube: import.meta.env.VITE_YOUTUBE_URL || "#",
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block group">
              <img src={images.logo} alt="Etili Village" className="h-16 w-auto transition-all" />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-md font-light italic">
              An authentic village experience in the heart of Sri Lanka, where nature, culture, and community thrive together.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, url: socialLinks.facebook, label: "Facebook" },
                { icon: Instagram, url: socialLinks.instagram, label: "Instagram" },
                { icon: Youtube, url: socialLinks.youtube, label: "YouTube" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: "Stay & Accommodation", path: "/stay" },
                { label: "Village Experiences", path: "/activities" },
                { label: "Community Impact", path: "/impact" },
                { label: "Photo Gallery", path: "/gallery" },
                { label: "Staff Portal", path: "/admin/dashboard" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path} 
                    className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent transition-colors">
                  <Mail size={18} className="text-accent group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Email Us</span>
                  <a href="mailto:info@etilivillage.com" className="text-white/80 hover:text-white font-medium">info@etilivillage.com</a>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent transition-colors">
                  <Phone size={18} className="text-accent group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Call/WhatsApp</span>
                  <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "94771234567"}`} className="text-white/80 hover:text-white font-medium">
                    {import.meta.env.VITE_DISPLAY_PHONE || "+94 77 123 4567"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-accent transition-colors">
                  <MapPin size={18} className="text-accent group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Our Location</span>
                  <span className="text-white/80 font-medium">Between Tissamaharama & Ella</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm flex items-center gap-2 text-center md:text-left">
            © 2026 Etili Village Experience. Crafted with <Heart size={14} className="text-accent fill-accent" /> for our community.
          </p>
          <div className="flex gap-8">
          </div>
        </div>
      </Container>
    </footer>
  );
}
