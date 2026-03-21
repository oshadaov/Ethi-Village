import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { buildWhatsAppUrl } from "../../utils/contactUtils";

export default function ContactInfoPanel({
  contactInfo,
  whatsappMessage,
}) {
  const whatsappLink = buildWhatsAppUrl(
    contactInfo.whatsappNumber,
    whatsappMessage
  );

  return (
    <div className="contact-info-panel">
      <SectionHeader
        eyebrow="Get in Touch"
        title="Let’s Plan Something Meaningful"
        description="Whether you want a day experience, overnight stay, or custom village visit, we’ll guide you personally."
      />

      <div className="contact-info-cards">
        <div className="contact-info-card">
          <h3>WhatsApp</h3>
          <p>Fastest way to ask questions and confirm availability.</p>
          <a href={buildWhatsAppUrl(contactInfo.whatsappNumber, "")} target="_blank" rel="noreferrer">
            {contactInfo.whatsappDisplay}
          </a>
        </div>

        <div className="contact-info-card">
          <h3>Email</h3>
          <p>For detailed travel plans and special requests.</p>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>

        <div className="contact-info-card">
          <h3>Location</h3>
          <p>{contactInfo.location}</p>
          <span>{contactInfo.locationNote}</span>
        </div>
      </div>

      <div className="contact-cta-box">
        <h3>Prefer WhatsApp?</h3>
        <p>
          Send your trip details instantly and get a faster reply for
          availability, transport, and package questions.
        </p>
        <Button href={whatsappLink}>Book via WhatsApp</Button>
      </div>
    </div>
  );
}