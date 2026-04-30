import { useMemo, useState, useEffect } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
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

  const [galleryCategories, setGalleryCategories] = useState(
    staticGalleryCategories,
  );
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
                  category: "Tours", // Grouping under Tours category
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

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <main>
      <section
        className="page-hero page-hero-gallery"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          {/* <p className="section-eyebrow">Gallery</p> */}
          <h1>See the Spirit of Etili Through Real Moments</h1>
          <p>
            Explore village life, traditional food, nature, local guides, and
            peaceful stays through a visual journey shaped by authentic
            experiences.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Visual Journey"
            title="Moments That Make the Experience Memorable"
            description="Browse by category and open any image for a larger full-screen preview."
          />

          <GalleryFilter
            categories={galleryCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="results-bar">
            <p>
              Showing <strong>{filteredItems.length}</strong> image
              {filteredItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loadingData ? (
            <p>Loading gallery...</p>
          ) : (
            <GalleryGrid items={filteredItems} onOpen={handleOpenLightbox} />
          )}
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
