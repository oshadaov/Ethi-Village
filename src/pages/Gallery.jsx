import { useMemo, useState, useEffect } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryGrid from "../components/gallery/GalleryGrid";
import LightboxModal from "../components/gallery/LightboxModal";
import {
  galleryCategories as staticGalleryCategories,
  getGalleryItems,
} from "../data/gallery";
import { getExperiences } from "../data/experiences";
import { getAccommodationData } from "../data/accommodationData";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Gallery() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.gallery_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

  const [galleryCategories] = useState(staticGalleryCategories);
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      setLoadingData(true);
      try {
        const [manualItems, experiences, rooms] = await Promise.all([
          getGalleryItems(),
          getExperiences(),
          getAccommodationData(),
        ]);

        const experienceImages = [];
        experiences.forEach((exp) => {
          if (Array.isArray(exp.galleryImages)) {
            exp.galleryImages.forEach((url, idx) => {
              if (url) {
                experienceImages.push({
                  id: `exp-${exp.id}-${idx}`,
                  title: `${exp.title} - Image ${idx + 1}`,
                  category: "Tours",
                  imageKey: `exp-${exp.id}-${idx}`,
                  image: url,
                  alt: exp.title,
                  description: exp.shortDescription || exp.title,
                });
              }
            });
          }
        });

        const roomImages = [];
        rooms.forEach((room) => {
          if (Array.isArray(room.galleryImages)) {
            room.galleryImages.forEach((url, idx) => {
              if (url) {
                roomImages.push({
                  id: `room-${room.id}-${idx}`,
                  title: `${room.name} - Image ${idx + 1}`,
                  category: "Accommodation",
                  imageKey: `room-${room.id}-${idx}`,
                  image: url,
                  alt: room.name,
                  description: room.description || room.name,
                });
              }
            });
          }
        });

        setGalleryItems([...manualItems, ...experienceImages, ...roomImages]);
      } catch (err) {
        console.error("Failed to load combined gallery data", err);
      } finally {
        setLoadingData(false);
      }
    };
    loadGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const handleOpenLightbox = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => setLightboxOpen(false);
  const handlePrev = () => setSelectedIndex((prev) => prev === 0 ? filteredItems.length - 1 : prev - 1);
  const handleNext = () => setSelectedIndex((prev) => prev === filteredItems.length - 1 ? 0 : prev + 1);

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg font-serif">
            See the Spirit of Etili
          </h1>
          {/* <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed italic font-light">
            Explore village life, traditional food, and peaceful stays through a visual journey shaped by authentic experiences.
          </p> */}
        </Container>
      </section>

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
            center
            eyebrow="Visual Journey"
            title="Moments That Make the Experience"
            description="Browse by category and open any image for a full-screen preview."
          />

          <div className="mt-12">
            <GalleryFilter
              categories={galleryCategories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />

            <div className="flex items-center justify-center mb-12">
              <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-border/10 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Found {filteredItems.length} {filteredItems.length === 1 ? 'Moment' : 'Moments'}
              </div>
            </div>

            {loadingData ? (
              <div className="py-24 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted font-bold">Developing films...</p>
              </div>
            ) : (
              <GalleryGrid items={filteredItems} onOpen={handleOpenLightbox} />
            )}
          </div>
        </Container>
      </section>

      <LightboxModal
        items={filteredItems}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </main>
  );
}
