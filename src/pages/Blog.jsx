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
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif drop-shadow-2xl">
            Etili Journals
          </h1>
          <p className="text-white/90 text-xl max-w-4xl mx-auto leading-relaxed italic font-light">
            Stories from the village, wildlife encounters, cultural heritage, and our journey towards sustainable tourism.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeader
            center
            eyebrow="Latest Articles"
            title="Read Our Stories"
            description="Discover life at Etili Village through our regular updates."
          />

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted font-bold tracking-widest uppercase text-xs">Fetching journals...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="max-w-2xl mx-auto mt-20 p-16 bg-white rounded-[40px] shadow-premium border border-border/10 text-center">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-primary mb-4">Blog is under construction</h2>
              <p className="text-muted leading-relaxed">We are currently writing our first amazing stories. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {blogs.map((blog) => (
                <article key={blog.id} className="group bg-white rounded-[32px] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 transform hover:-translate-y-2 border border-border/5">
                  <Link to={`/blog/${blog.slug}`} className="block relative h-64 overflow-hidden">
                    <img 
                      src={blog.imageUrl || (!imagesLoading && images[blog.imageKey] ? images[blog.imageKey] : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80")} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    
                    <h3 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    
                    <p className="text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                      {blog.shortDescription}
                    </p>
                    
                    <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
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
