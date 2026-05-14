import { useSiteImages } from "../../hooks/useSiteImages";
import { motion } from "framer-motion";

export default function GalleryGrid({ items, onOpen }) {
  const { images, loading } = useSiteImages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const imageSrc =
          !loading && images[item.imageKey]
            ? images[item.imageKey]
            : item.image;
            
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-[350px] rounded-[32px] overflow-hidden cursor-pointer shadow-premium hover:shadow-premium-hover transition-all duration-500"
            onClick={() => onOpen(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onOpen(index);
              }
            }}
          >
            <img 
              src={imageSrc} 
              alt={item.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.category}
              </span>
              <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {item.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
