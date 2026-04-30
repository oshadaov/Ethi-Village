import { HashLink as Link } from 'react-router-hash-link';
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";

export default function HomeLinks() {
  const links = [
    { title: "Stay", path: "/stay", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80" },
    { title: "Visit", path: "/stay#activities", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80" },
    { title: "Learn", path: "/stay#food", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    { title: "Impact", path: "/impact", img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=600&q=80" },
    { title: "View", path: "/gallery", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" },
    { title: "Comments", path: "/comments", img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80" },
    { title: "Contact", path: "/contact", img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="Explore More"
          title="Discover Etili Village"
          center
        />

        <div className="home-links-grid" style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px"
        }}>
          {links.map(link => (
            <Link smooth to={link.path} key={link.title} className="home-link-card" style={{
              display: "block",
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              height: "200px",
              textDecoration: "none"
            }}>
              <img src={link.img} alt={link.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                display: "flex",
                alignItems: "flex-end",
                padding: "20px"
              }}>
                <h3 style={{ color: "white", margin: 0 }}>{link.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
