import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";
import { getBlogs } from "../services/api";

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
    <main className="blog-page">
      <section
        className="page-hero"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Etili Journals</h1>
          <p>
            Stories from the village, wildlife encounters, cultural heritage, and our journey towards sustainable tourism.
          </p>
        </Container>
      </section>

      <section className="section bg-soft">
        <Container>
          <SectionHeader
            eyebrow="Latest Articles"
            title="Read Our Stories"
            description="Discover life at Etili Village through our regular updates."
          />

          {loading ? (
            <p className="blog-loading">Loading articles...</p>
          ) : blogs.length === 0 ? (
            <div className="blog-empty-state">
              <div className="empty-icon">🚧</div>
              <h2>Blog is under construction</h2>
              <p>We are currently writing our first amazing stories. Please check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-card-image">
                    <img 
                      src={blog.imageUrl || (!imagesLoading && images[blog.imageKey] ? images[blog.imageKey] : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80")} 
                      alt={blog.title} 
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span className="blog-author">{blog.author || "Etili Team"}</span>
                      <span className="blog-date">
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="blog-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="blog-excerpt">{blog.shortDescription}</p>
                    <Link to={`/blog/${blog.slug}`} className="blog-read-more">
                      Read Article <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
