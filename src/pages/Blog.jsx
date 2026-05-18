import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";
import { getBlogs } from "../services/api";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const { images, loading: imagesLoading } = useSiteImages();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const remoteHero = images?.blog_hero;
  const heroBackground =
    !imagesLoading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            Etili Journals
          </h1>
          {/* <p className="max-w-4xl mx-auto text-xl italic font-light leading-relaxed text-white/90">
            Stories from the village, wildlife encounters, cultural heritage, and our journey towards sustainable tourism.
          </p> */}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="relative z-10 mb-12 text-center">
            <p className="max-w-4xl mx-auto text-xl italic font-light leading-relaxed text-black/90">
               Stories from the village, wildlife encounters, cultural heritage, and our journey towards sustainable tourism.
            </p>
          </div>
          <SectionHeader
            center
            eyebrow="Latest Articles"
            title="Read Our Stories"
            description="Discover life at Etili Village through our regular updates."
          />

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 mx-auto mb-4 border-4 rounded-full border-primary border-t-transparent animate-spin" />
              <p className="text-xs font-bold tracking-widest uppercase text-muted">Fetching journals...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="max-w-2xl mx-auto mt-20 p-16 bg-white rounded-[40px] shadow-premium border border-border/10 text-center">
              <div className="mb-6 text-6xl">🚧</div>
              <h2 className="mb-4 text-2xl font-bold text-primary">Blog is under construction</h2>
              <p className="leading-relaxed text-muted">We are currently writing our first amazing stories. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article key={blog.id} className="group bg-white rounded-[32px] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 transform hover:-translate-y-2 border border-border/5">
                  <Link to={`/blog/${blog.slug}`} className="relative block h-64 overflow-hidden">
                    <img 
                      src={blog.imageUrl || (!imagesLoading && images[blog.imageKey] ? images[blog.imageKey] : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80")} 
                      alt={blog.title} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                        Journal
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-6 text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-4">
                      <span className="flex items-center gap-2">
                        <User size={14} className="text-accent" />
                        {blog.author || "Etili Team"}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-accent" />
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="mb-4 text-2xl font-bold leading-tight transition-colors text-primary group-hover:text-accent">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    
                    <p className="mb-8 text-sm leading-relaxed text-muted line-clamp-3">
                      {blog.shortDescription}
                    </p>
                    
                    <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all text-primary group-hover:gap-4">
                      Read Article <ArrowRight size={16} className="text-accent" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
