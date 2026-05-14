import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        <button
          type="button"
          className="absolute top-8 right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div 
          className="relative w-full max-w-6xl h-full flex flex-col md:flex-row items-center gap-8 md:gap-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation Buttons */}
          <button
            type="button"
            className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-white text-white hover:text-primary rounded-full transition-all border border-white/10"
            onClick={onPrev}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            type="button"
            className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 z-[110] p-4 bg-white/10 hover:bg-white text-white hover:text-primary rounded-full transition-all border border-white/10"
            onClick={onNext}
          >
            <ChevronRight size={32} />
          </button>

          {/* Main Image Area */}
          <div className="flex-1 w-full h-[50vh] md:h-full flex items-center justify-center">
            <motion.img
              key={currentItem.image}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={currentItem.image}
              alt={currentItem.alt}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Info Area */}
          <div className="w-full md:w-80 shrink-0 text-white space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 shadow-lg">
                {currentItem.category}
              </span>
              <h3 className="text-3xl font-bold font-serif leading-tight">{currentItem.title}</h3>
            </div>
            
            <p className="text-white/70 text-lg leading-relaxed font-light italic">
              {currentItem.description}
            </p>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                Moment {currentIndex + 1} of {items.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}