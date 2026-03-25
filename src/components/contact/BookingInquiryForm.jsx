import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { buildWhatsAppUrl } from "../../utils/contactUtils";

export default function BookingInquiryForm({
  formData,
  submitted,
  experiences,
  guestOptions,
  yesNoMaybeOptions,
  whatsappNumber,
  whatsappMessage,
  onChange,
  onSubmit,
}) {
  const whatsappLink = buildWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <div className="booking-form-card">
      <SectionHeader
        eyebrow="Booking Form"
        title="Send Your Inquiry"
        description="Fill in the details below and we’ll get back to you with the best option."
      />

      {submitted && (
        <div className="form-success-message">
          <strong>Thank you.</strong> Your inquiry has been prepared. Next,
          connect this form to your backend or email service.
        </div>
      )}

      <form className="booking-form" onSubmit={onSubmit}>
        <div className="form-grid two">
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={onChange}
            >
              {guestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="experience">Preferred Experience</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={onChange}
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
              onChange={onChange}
            >
              {yesNoMaybeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="pickup">Need Pickup?</label>
            <select
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={onChange}
            >
              {yesNoMaybeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
            onChange={onChange}
            placeholder="Tell us about your travel plan, interests, or questions..."
          />
        </div>

        <div className="form-actions">
          <Button>Send Inquiry</Button>
          <Button href={whatsappLink} variant="secondary">
            Send on WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
}