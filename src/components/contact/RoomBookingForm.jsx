import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export default function RoomBookingForm({
  formData,
  submitted,
  isSubmitting,
  submitError,
  rooms,
  experiences,
  guestOptions,
  yesNoMaybeOptions,
  onChange,
  onSubmit,
  onWhatsAppSubmit,
}) {
  const selectedRoom = rooms?.find(r => r.name === formData.room);

  // Convert bookedDates strings (YYYY-MM-DD) to Date objects
  const excludedDates = selectedRoom?.bookedDates 
    ? selectedRoom.bookedDates.map(dateStr => new Date(dateStr))
    : [];

  const handleDateChange = (date) => {
    // Format to YYYY-MM-DD for consistency with backend
    const formattedDate = date ? date.toISOString().split('T')[0] : "";
    onChange({ target: { name: "preferredDate", value: formattedDate } });
  };

  return (
    <div className="booking-form-card">
      <SectionHeader
        eyebrow="Room Booking"
        title={selectedRoom ? `Book ${selectedRoom.name}` : "Book Your Stay"}
        description="Experience the tranquility of Etili Village. Fill in your details below."
      />

      {submitted && (
        <div className="form-success-message">
          <strong>Thank you.</strong> Your room booking inquiry has been sent. We will contact you shortly.
        </div>
      )}

      {submitError && (
        <div className="form-error-message" style={{ color: "red", marginBottom: "20px", padding: "12px", background: "#fee2e2", borderRadius: "8px" }}>
          {submitError}
        </div>
      )}

      {selectedRoom && (
        <div className="booking-selection-summary">
          <div className="selection-item">
            <h4>Selected Accommodation</h4>
            <div className="selection-details">
              <img src={selectedRoom.image} alt={selectedRoom.name} />
              <div>
                <p className="selection-name">{selectedRoom.name}</p>
                <p className="selection-meta">{selectedRoom.type} • {selectedRoom.priceText || `$${selectedRoom.pricePerNight}/night`}</p>
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
            <label htmlFor="preferredDate">Check-in Date</label>
            <div className="custom-datepicker-container">
              <DatePicker
                selected={formData.preferredDate ? new Date(formData.preferredDate) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                highlightDates={[
                  {
                    "booked-date-highlight": excludedDates
                  }
                ]}
                excludeDates={excludedDates}
                placeholderText="Select check-in date"
                className="datepicker-input-full"
                required
              />
              <Calendar className="datepicker-field-icon" size={18} />
            </div>
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
            <label htmlFor="room">Select Room</label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={onChange}
              required
            >
              <option value="">Select a room</option>
              {rooms?.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid two">
          <div className="form-field">
            <label htmlFor="experience">Add an Experience? (Optional)</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={onChange}
            >
              <option value="">None / Select later</option>
              {experiences?.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
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
          <label htmlFor="message">Special Requests / Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={onChange}
            placeholder="Anything else we should know?"
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
