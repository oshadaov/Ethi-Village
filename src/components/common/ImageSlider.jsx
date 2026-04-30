import { useState, useCallback, useEffect } from "react";
import "./ImageSlider.css";

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
  const [animating, setAnimating] = useState(false);

  // Normalise: if no gallery images fall back to empty (caller handles it)
  const slides = images.length > 0 ? images : [];

  const goTo = useCallback(
    (index) => {
      if (animating || index === current) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 400);
    },
    [animating, current]
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, slides.length, goTo]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, slides.length, goTo]
  );

  // Keyboard navigation
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
    <div className="img-slider">
      {/* ── Main Frame ────────────────────────────────────── */}
      <div className="img-slider__frame" style={{ aspectRatio }}>
        <img
          key={current}
          src={slides[current]}
          alt={`${alt} ${current + 1}`}
          className={`img-slider__main-img ${animating ? "img-slider__main-img--fade" : ""}`}
          draggable={false}
        />

        {/* Prev / Next buttons */}
        {slides.length > 1 && (
          <>
            <button
              className="img-slider__btn img-slider__btn--prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="15 18 9 12 15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className="img-slider__btn img-slider__btn--next"
              onClick={next}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="img-slider__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`img-slider__dot ${i === current ? "img-slider__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnail Strip ──────────────────────────────── */}
      {slides.length > 1 && (
        <div className="img-slider__thumbs">
          {slides.map((src, i) => (
            <button
              key={i}
              className={`img-slider__thumb ${i === current ? "img-slider__thumb--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
