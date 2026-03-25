// src/components/gallery/GalleryGrid.jsx

export default function GalleryGrid({ items, onOpen }) {
  return (
    <div className="gallery-page-grid">
      {items.map((item, index) => (
        <article
          key={item.id}
          className="gallery-page-card"
          onClick={() => onOpen(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onOpen(index);
            }
          }}
        >
          <div className="gallery-page-image">
            <img src={item.image} alt={item.alt} />
          </div>

          <div className="gallery-page-overlay">
            {/* <span className="gallery-page-category">{item.category}</span> */}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}