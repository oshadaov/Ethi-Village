export default function GalleryFilter({
  categories,
  activeCategory,
  onChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 border-2 ${
            activeCategory === category 
              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" 
              : "bg-white border-border/10 text-muted hover:border-accent hover:text-accent"
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}