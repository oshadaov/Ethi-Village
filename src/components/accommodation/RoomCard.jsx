import Button from "../common/Button";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card-image">
        <img src={room.image} alt={room.name} />
      </div>

      <div className="room-card-content">
        <div className="room-top-row">
          <span className="room-type">{room.type}</span>
          <span className="room-price">{room.priceText}</span>
        </div>

        <h3>{room.name}</h3>
        <p>{room.description}</p>

        <div className="room-meta">
          <span><strong>Capacity:</strong> {room.guests}</span>
        </div>

        <div className="room-columns">
          <div>
            <h4>Amenities</h4>
            <ul>
              {room.amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Best Highlights</h4>
            <ul>
              {room.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="room-actions">
          <Button to="/contact">Book This Stay</Button>
          <Button
            href={`https://wa.me/94771234567?text=${encodeURIComponent(
              `Hello, I’m interested in the ${room.name}. Please share availability and details.`
            )}`}
            variant="secondary"
          >
            WhatsApp Inquiry
          </Button>
        </div>
      </div>
    </article>
  );
}