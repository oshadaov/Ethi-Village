import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ImageSlider
 *
 * Props:
 *   images   — string[]  — list of image URLs (required, at least 1)
 *   alt      — string    — base alt text for images
 *   aspectRatio — string — CSS aspect-ratio value for the main frame (default "16/9")
 */
export default function ImageSlider({ images = [], alt = "Image", aspectRatio = "16/9" }) {
  const [current, setCurrent] = useState(0);
  const slides = images.length > 0 ? images : [];

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, slides.length, goTo]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, slides.length, goTo]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  if (slides.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Main Frame */}
      <div 
        className="relative overflow-hidden rounded-[32px] shadow-2xl group border border-border/5" 
        style={{ aspectRatio }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current]}
            alt={`${alt} ${current + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Prev / Next buttons */}
        {slides.length > 1 && (
          <>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-10"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-10"
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {slides.length > 1 && (
        <div className="flex flex-wrap gap-4 px-2">
          {slides.map((src, i) => (
            <button
              key={i}
              className={`relative w-24 aspect-video rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                i === current 
                  ? "border-accent scale-105 shadow-lg shadow-accent/20" 
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              onClick={() => goTo(i)}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
