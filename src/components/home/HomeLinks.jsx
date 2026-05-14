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
    { title: "Contact", path: "/contact", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          eyebrow="Explore More"
          title="Discover Etili Village"
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {links.map((link, idx) => (
            <Link 
              smooth={true}
              to={link.path} 
              key={link.title} 
              className="group relative block h-[240px] rounded-[32px] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 transform hover:-translate-y-2"
            >
              <img 
                src={link.img} 
                alt={link.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-8">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight">{link.title}</h3>
                  <div className="w-8 h-1 bg-accent mt-2 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
