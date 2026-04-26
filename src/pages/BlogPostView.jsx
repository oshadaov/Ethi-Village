import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/common/Container";
import { useSiteImages } from "../hooks/useSiteImages";
import { getBlogBySlug } from "../services/api";
import { ArrowLeft } from "lucide-react";

export default function BlogPostView() {
  const { slug } = useParams();
  const { images, loading: imagesLoading } = useSiteImages();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch blog post", err);
        setError("Article not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="blog-post-view">
        <Container><p style={{padding: "100px 0", textAlign: "center"}}>Loading article...</p></Container>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="blog-post-view">
        <Container>
          <div style={{padding: "100px 0", textAlign: "center"}}>
            <h1>{error || "Article not found"}</h1>
            <Link to="/blog" style={{color: "var(--primary)", marginTop: "20px", display: "inline-block"}}>← Back to Blog</Link>
          </div>
        </Container>
      </main>
    );
  }

  const heroImage = post.imageUrl || (!imagesLoading && images[post.imageKey] ? images[post.imageKey] : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80");

  return (
    <main className="blog-post-view">
      <div 
        className="blog-post-hero"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="blog-post-hero-overlay"></div>
        <Container className="blog-post-hero-content">
          <Link to="/blog" className="blog-back-btn">
            <ArrowLeft size={20} /> Back to Blog
          </Link>
          <div className="blog-meta-large">
            <span className="blog-author-large">By {post.author || "Etili Team"}</span>
            <span className="blog-date-large">
              {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
        </Container>
      </div>

      <Container className="blog-article-container">
        <article className="blog-article-content">
           <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </article>
      </Container>
    </main>
  );
}
