import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import { experiences } from "../data/experiences";
import {
  contactInfo,
  guestOptions,
  initialContactForm,
  yesNoMaybeOptions,
} from "../data/contactConfig";
import ContactInfoPanel from "../components/contact/ContactInfoPanel";
import BookingInquiryForm from "../components/contact/BookingInquiryForm";
import { buildWhatsAppMessage } from "../utils/contactUtils";

export default function Contact() {
  const [formData, setFormData] = useState(initialContactForm);
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage(formData),
    [formData]
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
      <section className="page-hero page-hero-contact">
        <Container className="page-hero-content">
          <p className="section-eyebrow">Contact & Booking</p>
          <h1>Plan Your Village Escape with Confidence</h1>
          <p>
            Share your preferred date, group size, and interests. We’ll help
            you choose the right experience and stay option.
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
            experiences={experiences}
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