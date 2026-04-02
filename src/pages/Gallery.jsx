import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryGrid from "../components/gallery/GalleryGrid";
import LightboxModal from "../components/gallery/LightboxModal";
import { galleryCategories, galleryItems } from "../data/gallery";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Gallery() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.gallery_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

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

          <GalleryGrid items={filteredItems} onOpen={handleOpenLightbox} />
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
