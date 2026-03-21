import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
  const defaultMessage =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    "Hello, I would like to know more.";

  if (!phone) return null;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <span className="floating-whatsapp-icon">
        <MessageCircle size={22} />
      </span>
      <span className="floating-whatsapp-text">WhatsApp</span>
    </a>
  );
}