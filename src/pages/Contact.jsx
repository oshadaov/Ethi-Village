import { useMemo, useState, useEffect } from "react";
import Container from "../components/common/Container";
import { getExperiences } from "../data/experiences";
import {
  contactInfo,
  guestOptions,
  initialContactForm,
  yesNoMaybeOptions,
} from "../data/contactConfig";
import ContactInfoPanel from "../components/contact/ContactInfoPanel";
import BookingInquiryForm from "../components/contact/BookingInquiryForm";
import { buildWhatsAppMessage } from "../utils/contactUtils";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Contact() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.contact_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1800&q=80";
  const [formData, setFormData] = useState(initialContactForm);
  const [submitted, setSubmitted] = useState(false);
  const [experiencesData, setExperiencesData] = useState([]);
  const [loadingExperiences, setLoadingExperiences] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      setLoadingExperiences(true);
      const data = await getExperiences();
      setExperiencesData(data);
      setLoadingExperiences(false);
    };
    loadExperiences();
  }, []);

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage(formData),
    [formData],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(initialContactForm);
  };

  return (
    <main>
      <section
        className="page-hero page-hero-contact"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          {/* <p className="section-eyebrow">Contact & Booking</p> */}
          <h1>Plan Your Village Escape with Confidence</h1>
          <p>
            Share your preferred date, group size, and interests. We’ll help you
            choose the right experience and stay option.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container className="contact-layout">
          <ContactInfoPanel
            contactInfo={contactInfo}
            whatsappMessage={whatsappMessage}
          />

          <BookingInquiryForm
            formData={formData}
            submitted={submitted}
            experiences={loadingExperiences ? [] : experiencesData}
            guestOptions={guestOptions}
            yesNoMaybeOptions={yesNoMaybeOptions}
            whatsappNumber={contactInfo.whatsappNumber}
            whatsappMessage={whatsappMessage}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Container>
      </section>
    </main>
  );
}
