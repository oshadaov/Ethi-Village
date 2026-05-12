import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";

export default function ExperienceBookingForm({
  formData,
  submitted,
  isSubmitting,
  submitError,
  experiences,
  rooms,
  guestOptions,
  yesNoMaybeOptions,
  onChange,
  onSubmit,
  onWhatsAppSubmit,
}) {
  const selectedExp = experiences?.find(e => e.title === formData.experience);

  return (
    <div className="booking-form-card">
      <SectionHeader
        eyebrow="Activity Booking"
        title={selectedExp ? `Book ${selectedExp.title}` : "Book an Activity"}
        description="Join us for a unique village experience. Fill in the details below."
      />

      {submitted && (
        <div className="form-success-message">
          <strong>Thank you.</strong> Your activity booking inquiry has been sent. We will contact you shortly.
        </div>
      )}

      {submitError && (
        <div className="form-error-message" style={{ color: "red", marginBottom: "20px", padding: "12px", background: "#fee2e2", borderRadius: "8px" }}>
          {submitError}
        </div>
      )}

      {selectedExp && (
        <div className="booking-selection-summary">
          <div className="selection-item">
            <h4>Selected Activity</h4>
            <div className="selection-details">
              <img src={selectedExp.imageUrl || selectedExp.image} alt={selectedExp.title} />
              <div>
                <p className="selection-name">{selectedExp.title}</p>
                <p className="selection-meta">{selectedExp.duration} • {selectedExp.priceText}</p>
              </div>
            </div>
          </div>
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
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="guests">Number of Guests</label>
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
            <label htmlFor="experience">Select Activity</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={onChange}
              required
            >
              <option value="">Select an activity</option>
              {experiences?.map((item) => (
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
          {formData.accommodation === "Yes" && (
            <div className="form-field">
              <label htmlFor="room">Preferred Room? (Optional)</label>
              <select
                id="room"
                name="room"
                value={formData.room}
                onChange={onChange}
              >
                <option value="">Select a room</option>
                {rooms?.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}
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
          <label htmlFor="message">Message / Special Requirements</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={onChange}
            placeholder="Tell us about your interests or questions..."
          />
        </div>

        <div className="form-actions booking-dual-actions">
          <Button disabled={isSubmitting} type="submit" className="btn-email">
            {isSubmitting ? "Sending..." : "Book via Email"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onWhatsAppSubmit} 
            className="btn-whatsapp"
          >
            Book via WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
}
