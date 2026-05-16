import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCachedData, getRooms } from "../services/api";
import { useSiteImages } from "../hooks/useSiteImages";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import ImageSlider from "../components/common/ImageSlider";
import {
  ArrowLeft,
  CheckCircle,
  Users,
  Clock,
  Utensils,
  Info,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { images, loading } = useSiteImages();
  const cachedRooms = getCachedData("/rooms");
  const initialRoom = cachedRooms
    ? cachedRooms.find((r) => r.id === parseInt(id))
    : null;
  const [room, setRoom] = useState(initialRoom);
  const [loadingData, setLoadingData] = useState(!initialRoom);

  useEffect(() => {
    if (!initialRoom) {
      const loadRoom = async () => {
        setLoadingData(true);
        try {
          const rooms = await getRooms();
          const data = rooms.find((r) => r.id === parseInt(id));
          if (data) {
            setRoom(data);
          } else {
            navigate("/stay");
          }
        } catch (error) {
          console.error("Error loading room:", error);
          navigate("/stay");
        } finally {
          setLoadingData(false);
        }
      };
      loadRoom();
    }
  }, [id, navigate, initialRoom]);

  if (loadingData || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Container className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted font-bold">Loading room details...</p>
        </Container>
      </div>
    );
  }

  const imageSrc =
    !loading && images[room.imageKey] ? images[room.imageKey] : room.image;

  const sliderImages =
    Array.isArray(room.galleryImages) && room.galleryImages.length > 0
      ? room.galleryImages
      : imageSrc
        ? [imageSrc]
        : [];

  return (
    <main className="bg-bg">
      {/* Hero Header */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent z-1" />

        <Container className="relative z-10 pb-12 md:pb-20">
          <div className="flex flex-col gap-6 text-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center md:justify-start gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-bold transition-all transform hover:-translate-x-1"
              >
                <ArrowLeft size={16} />
                Back to Stays
              </button>
            </div>

            <div className="max-w-4xl animate-fade-in-up justify-center">
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white text-xs font-bold uppercase tracking-widest mb-4">
                {room.type}
              </span>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl font-serif text-center">
                {room.name}
              </h1>
              {/* <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl italic font-light text-center">
                {room.shortDescription }
              </p> */}

              <div className="flex flex-wrap gap-6 items-center border-t border-white/20 pt-8 mt-8">
                <div className="flex flex-col">
                  <span className="text-white/60 text-xs uppercase tracking-widest mb-1">
                    Starting from
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-accent">
                    {room.priceText || `$${room.pricePerNight}`}
                  </span>
                </div>
                <div className="h-12 w-px bg-white/10 hidden md:block" />
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Users size={16} className="text-accent" />
                    <span className="text-sm font-bold">
                      {room.guests} guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Clock size={16} className="text-accent" />
                    <span className="text-sm font-bold">
                      Min {room.minNights} nights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
            {/* Left Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              {/* Gallery Slider */}
              {sliderImages.length > 0 && (
                <div className="mb-16 rounded-[40px] overflow-hidden shadow-premium border-8 border-white group hover:shadow-premium-hover transition-all duration-500 transform hover:-translate-y-1">
                  <ImageSlider
                    images={sliderImages}
                    alt={room.name}
                    aspectRatio="16/9"
                  />
                </div>
              )}

              <div className="space-y-12 text-center ">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4 justify-center md:justify-start">
                    About this Stay
                    <div className="h-1 flex-1 bg-bg border-b border-accent/20" />
                  </h2>
                  <p className="text-muted text-xl leading-loose font-light">
                    {room.description}
                  </p>
                </div>

                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-4 justify-center md:justify-start">
                    Amenities & Comforts
                    <div className="h-1 flex-1 bg-bg border-b border-accent/20" />
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(room.amenities || []).map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border/10 group hover:border-accent transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                          <CheckCircle
                            size={14}
                            className="text-accent group-hover:text-white"
                          />
                        </div>
                        <span className="text-muted font-bold text-sm tracking-wide">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-4 justify-center md:justify-start">
                    Services Included
                    <div className="h-1 flex-1 bg-bg border-b border-accent/20" />
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(room.staffServices || []).map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10"
                      >
                        <ShieldCheck size={20} className="text-primary" />
                        <span className="text-primary font-bold">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* Booking Card */}
                <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-premium border border-border/20 backdrop-blur-xl">
                  <div className="mb-10 pb-8 border-b border-border/30">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">
                        {room.priceText || `$${room.pricePerNight}`}
                      </span>
                      <span className="text-muted font-bold tracking-widest text-xs uppercase">
                        per night
                      </span>
                    </div>
                    <p className="text-muted text-sm mt-3 flex items-center gap-2">
                      <Info size={14} className="text-accent" />
                      Minimum {room.minNights} nights stay required
                    </p>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border/10">
                      <Users size={20} className="text-accent" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-muted tracking-widest">
                          Capacity
                        </span>
                        <span className="text-primary font-bold text-sm">
                          Up to {room.guests} guests
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border/10">
                      <Utensils size={20} className="text-accent" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-muted tracking-widest">
                          Dining
                        </span>
                        <span className="text-primary font-bold text-sm">
                          {(room.mealsIncluded || []).join(", ") ||
                            "No meals included"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border/10">
                      <Calendar size={20} className="text-accent" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-muted tracking-widest">
                          Schedule
                        </span>
                        <span className="text-primary font-bold text-sm">
                          Check-in: 2:00 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      to={`/book-room/${room.id}`}
                      className="w-full py-5 text-lg shadow-xl shadow-primary/20"
                    >
                      Book This Stay
                    </Button>
                    <Button
                      href={`https://wa.me/94771234567?text=${encodeURIComponent(
                        `Hi, I'm interested in booking ${room.name}.`,
                      )}`}
                      variant="secondary"
                      className="w-full py-5 text-lg border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                    >
                      💬 Chat on WhatsApp
                    </Button>
                  </div>

                  <p className="text-center text-[11px] font-bold text-muted uppercase tracking-[0.2em] mt-8">
                    Instant confirmation available
                  </p>
                </div>

                {/* Recommendation Box */}
                <div className="bg-primary/95 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <h4 className="text-accent text-lg font-bold mb-4 flex items-center gap-3">
                    <Info size={20} />
                    Recommendation
                  </h4>
                  <p className="text-white/80 leading-loose font-medium text-lg">
                    We recommend staying at least 2 nights to truly immerse
                    yourself in the village life, hikes, and wildlife.
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
