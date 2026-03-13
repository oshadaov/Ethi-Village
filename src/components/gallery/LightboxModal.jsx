// src/components/gallery/LightboxModal.jsx

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function LightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || currentIndex < 0 || currentIndex >= items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        className="lightbox-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery image preview"
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close gallery preview"
        >
          <X size={24} />
        </button>

        <button
          type="button"
          className="lightbox-nav left"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="lightbox-content">
          <div className="lightbox-image-wrap">
            <img
              src={currentItem.image}
              alt={currentItem.alt}
              className="lightbox-image"
            />
          </div>

          <div className="lightbox-info">
            <span className="lightbox-category">{currentItem.category}</span>
            <h3>{currentItem.title}</h3>
            <p>{currentItem.description}</p>
            <span className="lightbox-counter">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="lightbox-nav right"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}