import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import { useSiteImages } from "../hooks/useSiteImages";
import { getBlogBySlug } from "../services/api";
import { ArrowLeft, User, Calendar, Share2 } from "lucide-react";

export default function BlogPostView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { images, loading: imagesLoading } = useSiteImages();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogBySlug(slug);
        if (!data) throw new Error("Not found");
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
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted font-bold tracking-widest uppercase text-xs">Opening Journal...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-6 font-serif">{error || "Article not found"}</h1>
          <button onClick={() => navigate("/blog")} className="text-accent font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
            <ArrowLeft size={18} /> Back to Journals
          </button>
        </Container>
      </div>
    );
  }

  const heroImage = post.imageUrl || (!imagesLoading && images[post.imageKey] ? images[post.imageKey] : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80");

  return (
    <main className="bg-bg min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end overflow-hidden mb-12 md:mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
        
        <Container className="relative z-10 pb-12 md:pb-20">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold transition-all mb-8">
            <ArrowLeft size={16} />
            Back to Journals
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-6 items-center text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="flex items-center gap-2 bg-accent px-4 py-1.5 rounded-full text-white">
                <User size={14} />
                {post.author || "Etili Team"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight font-serif drop-shadow-2xl">
              {post.title}
            </h1>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Body */}
          <article className="lg:col-span-8 bg-white p-8 md:p-16 rounded-[40px] shadow-premium border border-border/5">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted prose-p:leading-loose prose-img:rounded-[32px] prose-a:text-accent font-light"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
            />
            
            <div className="mt-16 pt-8 border-t border-border/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  {post.author?.[0] || 'E'}
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-muted uppercase tracking-widest">Written By</span>
                  <span className="font-bold text-primary">{post.author || 'Etili Village Team'}</span>
                </div>
              </div>
              <button className="p-3 rounded-2xl bg-bg hover:bg-primary hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <div className="bg-primary p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Want to visit?</h4>
                <p className="text-white/80 leading-relaxed font-medium text-lg mb-8 italic">
                  Experience these stories first-hand in our beautiful village.
                </p>
                <Link to="/book" className="inline-block px-8 py-3 bg-white text-primary rounded-2xl font-bold text-sm shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
                  Plan Your Escape
                </Link>
              </div>
              
              <div className="p-8 bg-white rounded-[32px] border border-border/10">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-6 border-b border-border/10 pb-4">Recent Stories</h4>
                {/* This could be a list of other blogs if passed as props or fetched */}
                <p className="text-muted text-sm italic">More stories coming soon...</p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
