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
    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-premium border border-border/50">
      <SectionHeader
        eyebrow="Room Booking"
        title={selectedRoom ? `Book ${selectedRoom.name}` : "Book Your Stay"}
        description="Experience the tranquility of Etili Village. Fill in your details below."
      />

      {submitted && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 text-green-800 rounded-2xl animate-fade-in">
          <strong className="block text-lg mb-1">Thank you.</strong> 
          Your room booking inquiry has been sent. We will contact you shortly.
        </div>
      )}

      {submitError && (
        <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-800 rounded-2xl animate-shake">
          {submitError}
        </div>
      )}

      {selectedRoom && (
        <div className="mb-10 p-6 bg-bg rounded-2xl border border-border/30">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
              <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-primary mb-1">{selectedRoom.name}</h4>
              <p className="text-muted m-0">{selectedRoom.type} • <span className="text-accent font-bold">{selectedRoom.priceText || `$${selectedRoom.pricePerNight}/night`}</span></p>
            </div>
          </div>
        </div>
      )}

      <form className="space-y-8" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={onChange}
              placeholder="Your full name"
              required
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Your email"
              required
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">WhatsApp / Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={onChange}
              placeholder="Your contact number"
              required
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nationality" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Nationality</label>
            <input
              id="nationality"
              name="nationality"
              type="text"
              value={formData.nationality}
              onChange={onChange}
              placeholder="Your nationality"
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="preferredDate" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Check-in Date</label>
            <div className="relative">
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
                required
                className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50 cursor-pointer"
              />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="guests" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={onChange}
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
            >
              {guestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="room" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Select Room</label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={onChange}
              required
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="experience" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Add an Experience? (Optional)</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={onChange}
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">None / Select later</option>
              {experiences?.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Need Pickup?</label>
            <select
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={onChange}
              className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
            >
              {yesNoMaybeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-bold text-primary uppercase tracking-wider ml-1">Special Requests / Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={onChange}
            placeholder="Anything else we should know?"
            className="w-full px-6 py-4 bg-bg border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted/50 resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button disabled={isSubmitting} type="submit" className="flex-1 min-w-[200px]">
            {isSubmitting ? "Sending..." : "Book via Email"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onWhatsAppSubmit} 
            className="flex-1 min-w-[200px] border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:text-white"
          >
            Book via WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
}
