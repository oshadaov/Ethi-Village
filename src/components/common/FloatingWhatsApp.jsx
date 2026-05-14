import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "94771234567";
  const defaultMessage =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    "Hello Etili Village! I'm interested in booking a stay.";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      initial={{ opacity: 0, y: 100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5 }}
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle size={24} fill="currentColor" className="text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366]" />
      </div>
      <span className="font-bold text-sm tracking-wide hidden md:block">
        Chat with us
      </span>
      
      {/* Tooltip for mobile */}
      <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl md:hidden">
        Book on WhatsApp
      </div>
    </motion.a>
  );
}