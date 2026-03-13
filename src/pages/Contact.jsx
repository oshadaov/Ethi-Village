import { useState } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { experiences } from "../data/experiences";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  preferredDate: "",
  guests: "2",
  experience: "",
  accommodation: "No",
  pickup: "No",
  message: ""
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(initialForm);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book or inquire about Etili Village Experience.
Name: ${formData.fullName || "-"}
Email: ${formData.email || "-"}
Phone: ${formData.phone || "-"}
Nationality: ${formData.nationality || "-"}
Preferred Date: ${formData.preferredDate || "-"}
Guests: ${formData.guests || "-"}
Experience: ${formData.experience || "-"}
Accommodation Needed: ${formData.accommodation || "-"}
Pickup Needed: ${formData.pickup || "-"}
Message: ${formData.message || "-"}`
  );

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
                <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer">
                  +94 77 123 4567
                </a>
              </div>

              <div className="contact-info-card">
                <h3>Email</h3>
                <p>For detailed travel plans and special requests.</p>
                <a href="mailto:hello@etilivillage.com">hello@etilivillage.com</a>
              </div>

              <div className="contact-info-card">
                <h3>Location</h3>
                <p>Near Ella, Sri Lanka</p>
                <span>Peaceful village surroundings with guided local access.</span>
              </div>
            </div>

            <div className="contact-cta-box">
              <h3>Prefer WhatsApp?</h3>
              <p>
                Send your trip details instantly and get a faster reply for
                availability, transport, and package questions.
              </p>
              <Button
                href={`https://wa.me/94771234567?text=${whatsappMessage}`}
              >
                Book via WhatsApp
              </Button>
            </div>
          </div>

          <div className="booking-form-card">
            <SectionHeader
              eyebrow="Booking Form"
              title="Send Your Inquiry"
              description="Fill in the details below and we’ll get back to you with the best option."
            />

            {submitted && (
              <div className="form-success-message">
                <strong>Thank you.</strong> Your inquiry has been prepared. Next, connect this form to your backend or email service.
              </div>
            )}

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-grid two">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="form-grid two">
                <div className="form-field">
                  <label htmlFor="phone">WhatsApp / Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your contact number"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    id="nationality"
                    name="nationality"
                    type="text"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Your nationality"
                  />
                </div>
              </div>

              <div className="form-grid three">
                <div className="form-field">
                  <label htmlFor="preferredDate">Preferred Date</label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="guests">Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="experience">Preferred Experience</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select an experience</option>
                    {experiences.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid two">
                <div className="form-field">
                  <label htmlFor="accommodation">Need Accommodation?</label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="pickup">Need Pickup?</label>
                  <select
                    id="pickup"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plan, interests, or questions..."
                />
              </div>

              <div className="form-actions">
                <Button>Send Inquiry</Button>
                <Button
                  href={`https://wa.me/94771234567?text=${whatsappMessage}`}
                  variant="secondary"
                >
                  Send on WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </main>
  );
}