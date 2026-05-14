import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { buildWhatsAppUrl } from "../../utils/contactUtils";
import { MessageSquare, Mail, MapPin } from "lucide-react";

export default function ContactInfoPanel({
  contactInfo,
  whatsappMessage,
}) {
  const whatsappLink = buildWhatsAppUrl(
    contactInfo.whatsappNumber,
    whatsappMessage
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Get in Touch"
        title="Let’s Plan Something Meaningful"
        description="Whether you want a day experience, overnight stay, or custom village visit, we’ll guide you personally."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: MessageSquare, 
            title: "WhatsApp", 
            desc: "Fastest way to ask questions and confirm availability.",
            link: buildWhatsAppUrl(contactInfo.whatsappNumber, ""),
            label: contactInfo.whatsappDisplay
          },
          { 
            icon: Mail, 
            title: "Email", 
            desc: "For detailed travel plans and special requests.",
            link: `mailto:${contactInfo.email}`,
            label: contactInfo.email
          },
          { 
            icon: MapPin, 
            title: "Location", 
            desc: contactInfo.location,
            label: contactInfo.locationNote
          }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-premium border border-border/10 flex flex-col items-center text-center group hover:border-accent transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
              <item.icon className="text-accent group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest text-xs">{item.title}</h3>
            <p className="text-muted text-sm mb-6 leading-relaxed">{item.desc}</p>
            {item.link ? (
              <a href={item.link} className="text-primary font-bold hover:text-accent transition-colors border-b border-primary/20 pb-1">
                {item.label}
              </a>
            ) : (
              <span className="text-primary font-bold italic">{item.label}</span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}