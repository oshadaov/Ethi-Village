import { useState, useMemo } from "react";
import Button from "../common/Button";
import "../accommodation/ReservationChecker.css";

export default function ReservationChecker({ rooms = [] }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Calculate night count and total price
  const nightCount = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const check_in = new Date(checkInDate);
    const check_out = new Date(checkOutDate);
    const diffTime = check_out - check_in;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkInDate, checkOutDate]);

  const totalPrice = useMemo(() => {
    if (!selectedRoom || nightCount === 0) return 0;
    return (selectedRoom.pricePerNight || 0) * nightCount;
  }, [selectedRoom, nightCount]);

  // Check availability (simple 2-night minimum check for now)
  const isAvailable = nightCount >= 2 || nightCount === 0;
  const availabilityMessage =
    nightCount > 0 && nightCount < 2
      ? "Minimum 2 nights required"
      : nightCount >= 2
        ? "Available"
        : "";

  // Validate date inputs
  const isValidForm =
    checkInDate && checkOutDate && selectedRoom && nightCount >= 2;

  const handleCheckAvailability = () => {
    if (!isValidForm) return;

    // Pass booking info to contact page or booking system
    const bookingData = {
      room: selectedRoom.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: nightCount,
      guests,
      totalPrice,
    };

    const message = `I'd like to book ${selectedRoom.name} from ${checkInDate} to ${checkOutDate} (${nightCount} nights) for ${guests} guest(s). Total: $${totalPrice}`;

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/94771234567?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="reservation-checker">
      <div className="checker-card">
        <h3>Check Availability & Reserve</h3>
        <p className="checker-subtitle">Find your perfect stay</p>

        <div className="checker-form">
          {/* Select Room */}
          <div className="form-group">
            <label htmlFor="room-select">Select Property</label>
            <select
              id="room-select"
              value={selectedRoom?.id || ""}
              onChange={(e) => {
                const room = rooms.find(
                  (r) => r.id === parseInt(e.target.value),
                );
                setSelectedRoom(room || null);
              }}
              className="form-input"
            >
              <option value="">Choose a property...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - ${room.pricePerNight}/night
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div className="form-group">
            <label htmlFor="check-in">Check-in Date</label>
            <input
              id="check-in"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="form-input"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Check-out Date */}
          <div className="form-group">
            <label htmlFor="check-out">Check-out Date</label>
            <input
              id="check-out"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="form-input"
              min={checkInDate || new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Guests */}
          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              id="guests"
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="form-input"
            />
          </div>

          {/* Display Results */}
          {nightCount > 0 && selectedRoom && (
            <div className="checker-results">
              <div className="result-row">
                <span>Number of Nights:</span>
                <strong>{nightCount}</strong>
              </div>
              <div className="result-row">
                <span>Price per Night:</span>
                <strong>${selectedRoom.pricePerNight}</strong>
              </div>
              <div className="result-row total-price">
                <span>Total Price:</span>
                <strong>${totalPrice}</strong>
              </div>

              <div
                className={`availability-status ${isAvailable ? "available" : "unavailable"}`}
              >
                {availabilityMessage}
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleCheckAvailability}
            disabled={!isValidForm}
            className={isValidForm ? "" : "disabled"}
          >
            {isValidForm
              ? "Check & Reserve via WhatsApp"
              : "Complete all fields"}
          </Button>
        </div>

        <p className="checker-note">
          💡 We recommend staying at least 2 nights to fully enjoy hiking,
          wildlife spotting, kayaking, and village sunsets.
        </p>
      </div>
    </div>
  );
}
