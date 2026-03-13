// src/components/gallery/GalleryFilter.jsx

export default function GalleryFilter({
  categories,
  activeCategory,
  onChange,
}) {
  return (
    <div className="gallery-filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`gallery-filter-pill ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}