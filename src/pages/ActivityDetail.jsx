import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCachedData, getExperiences } from "../services/api";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ImageSlider from "../components/common/ImageSlider";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Calendar,
  Info,
  Sparkles,
  ShieldCheck,
  Smile
} from "lucide-react";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cachedExp = getCachedData("/experiences");
  const initialActivity = cachedExp
    ? cachedExp.find(
        (item) => item.slug === id || String(item.id) === String(id)
      )
    : null;

  const [activity, setActivity] = useState(initialActivity);
  const [loadingData, setLoadingData] = useState(!initialActivity);

  useEffect(() => {
    if (!initialActivity) {
      const loadActivity = async () => {
        setLoadingData(true);
        try {
          const data = await getExperiences();
          const selectedActivity = data.find(
            (item) => item.slug === id || String(item.id) === String(id)
          );

          if (selectedActivity) {
            setActivity(selectedActivity);
          } else {
            navigate("/activities");
          }
        } catch (error) {
          console.error("Error loading activity:", error);
          navigate("/activities");
        } finally {
          setLoadingData(false);
        }
      };
      loadActivity();
    }
  }, [id, navigate, initialActivity]);

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted font-bold tracking-widest uppercase text-xs">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!activity) return null;

  const heroImage = activity.image || activity.imageUrl;
  const sliderImages =
    Array.isArray(activity.galleryImages) && activity.galleryImages.length > 0
      ? activity.galleryImages
      : heroImage
      ? [heroImage]
      : [];

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
        
        <Container className="relative z-10 pb-12 md:pb-20">
         
          
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg mb-4 shadow-lg">
              {activity.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight font-serif drop-shadow-2xl">
              {activity.title}
            </h1>
            <div className="flex flex-wrap gap-6 items-center mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Pricing Info</span>
                <span className="text-2xl font-bold text-accent">{activity.priceText || "Inquiry required"}</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs font-bold">
                   <Clock size={14} className="text-accent" /> {activity.duration || "Custom"}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs font-bold">
                   <Info size={14} className="text-accent" /> {activity.difficulty || "Easy"}
                </div>
              </div>
            </div>
          </div>
           <button 
            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold transition-all mb-8 transform hover:-translate-x-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> Back to Activities
          </button>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20">
            <div className="lg:col-span-8">
              {/* Gallery Slider */}
              {sliderImages.length > 0 && (
                <div className="mb-16 rounded-[40px] overflow-hidden shadow-premium border-8 border-white">
                  <ImageSlider
                    images={sliderImages}
                    alt={activity.title}
                    aspectRatio="16/9"
                  />
                </div>
              )}

              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                    About this Experience
                    <div className="h-1 flex-1 bg-bg border-b border-accent/20" />
                  </h2>
                  <p className="text-muted text-xl leading-loose font-light italic">
                    {activity.description || activity.shortDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-4">
                    Experience Highlights
                    <div className="h-1 flex-1 bg-bg border-b border-accent/20" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(activity.highlights || []).map((highlight, index) => (
                      <div key={index} className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-border/10 group hover:border-accent transition-all">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                          <Sparkles size={18} className="text-accent group-hover:text-white" />
                        </div>
                        <p className="text-muted font-medium">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div>
                      <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                        <ShieldCheck className="text-accent" /> What's Included
                      </h3>
                      <div className="space-y-3">
                        {(activity.includes || []).map((item, index) => (
                          <div key={index} className="flex items-center gap-3 text-muted text-sm font-bold">
                            <CheckCircle size={14} className="text-accent" />
                            {item}
                          </div>
                        ))}
                      </div>
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                        <Smile className="text-accent" /> Best For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(activity.bestFor || []).map((tag, index) => (
                          <span key={index} className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-10 rounded-[40px] shadow-premium border border-border/10">
                  <div className="mb-10 pb-8 border-b border-border/10">
                    <span className="text-3xl font-bold text-primary block mb-1">
                      {activity.priceText || "Inquiry required"}
                    </span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Pricing Subject to group size</span>
                  </div>

                  <div className="space-y-6 mb-10">
                    {[
                      { icon: Clock, label: "Duration", value: activity.duration || "Custom" },
                      { icon: Info, label: "Difficulty", value: activity.difficulty || "Easy" },
                      { icon: Users, label: "Groups", value: activity.groupType || "Private / Small Group" },
                      { icon: Calendar, label: "Availability", value: "Daily on Request" }
                    ].map((detail, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center shrink-0">
                          <detail.icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-muted uppercase tracking-tighter">{detail.label}</span>
                          <span className="text-primary font-bold text-sm">{detail.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button to={`/book-experience/${activity.id}`} className="w-full py-4 text-lg">
                      Inquire & Book
                    </Button>
                    <Button
                      href={`https://wa.me/94771234567?text=${encodeURIComponent(
                        `Hi, I'm interested in booking the ${activity.title}.`
                      )}`}
                      variant="secondary"
                      className="w-full py-4 text-lg !border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white"
                    >
                      💬 WhatsApp Chat
                    </Button>
                  </div>
                </div>

                <div className="bg-primary p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h4 className="text-accent text-lg font-bold mb-4 flex items-center gap-3">
                    <MapPin size={20} />
                    Location
                  </h4>
                  <p className="text-white/80 leading-relaxed font-medium">
                    This activity starts directly from Etili Village or includes
                    transport to nearby sites.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}