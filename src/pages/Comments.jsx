import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";
import { Star, ExternalLink, Play } from "lucide-react";
import Button from "../components/common/Button";

export default function Comments() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.comments_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

  const reviewPlatforms = [
    {
      name: "TripAdvisor",
      score: "5.0/5",
      count: "Excellent",
      url: import.meta.env.VITE_TRIPADVISOR_URL,
      color: "bg-[#00af87]"
    },
    {
      name: "Google Reviews",
      score: "4.9/5",
      count: "150+ Reviews",
      url: import.meta.env.VITE_GOOGLE_REVIEWS_URL || "#",
      color: "bg-[#4285F4]"
    },
    {
      name: "Facebook",
      score: "Highly Rated",
      count: "100+ Recommendations",
      url: import.meta.env.VITE_FACEBOOK_URL,
      color: "bg-[#1877F2]"
    }
  ];

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
            Guest Moments & Reviews
          </h1>
          <p className="text-white/90 text-xl max-w-4xl mx-auto leading-relaxed italic font-light">
            Etili village has been honoured by the consistently superlative
            reviews we receive from guests and visitors worldwide.
          </p>
        </Container>
      </section>

      {/* Reviews Grid */}
      <section className="py-24">
        <Container>
          <div className="relative z-10 text-center mb-12">
            <p className="text-black/90 text-lg md:text-xl leading-relaxed mb-0">
              Discover our authentic mud houses, tree houses, and glamping
              units. Learn organic farming, enjoy local cuisine, and coexist
              with nature in the heart of our mountain village.
            </p>
          </div>
          <SectionHeader
            eyebrow="What People Say"
            title="Voices of Our Community"
            description="Explore our authentic reviews across global platforms."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {reviewPlatforms.map((platform, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-premium border border-border/10 group hover:border-accent transition-all duration-500 transform hover:-translate-y-2">
                <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/5`}>
                  <ExternalLink className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{platform.name}</h3>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                  <span className="ml-2 text-primary font-bold">{platform.score}</span>
                </div>
                <p className="text-muted text-sm mb-10 leading-relaxed font-medium">
                  {platform.count} from verified travelers and village visitors.
                </p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:text-accent transition-colors border-b-2 border-accent pb-1"
                >
                  Read Full Reviews
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-primary/5">
        <Container>
          <SectionHeader
            eyebrow="Featured Media"
            title="National Recognition"
            description="Watch the coverage of Etili Village by Independent Television Network (ITN)."
            center
          />

          <div className="relative max-w-5xl mx-auto mt-12 group">
            <div className="absolute -inset-4 bg-accent/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-black aspect-video">
              <iframe
                src="https://www.youtube.com/embed/8I2r8AtFLMs"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Etili Village Experience Video"
              ></iframe>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-white hidden md:flex">
              <Play className="text-accent text-5xl animate-pulse" />
            </div>
          </div>
          
          <div className="text-center mt-20">
            <Button href="https://www.youtube.com/@EtiliVillage" target="_blank" variant="secondary" className="!px-12">
              Explore Our YouTube Channel
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
