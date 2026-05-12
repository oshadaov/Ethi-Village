import Button from "../common/Button";
import { Link } from "react-router-dom";
import { useSiteImages } from "../../hooks/useSiteImages";
import { images as defaultImages } from "../../assets/images";

export default function RoomCard({ room }) {
  const { images, loading } = useSiteImages();
  
  const imageSrc =
    !loading && images[room.imageKey]
      ? images[room.imageKey]
      : room.image || defaultImages.stay01;

  return (
    <article className="room-card-v3">
      <div className="room-card-image-v3">
        <img src={imageSrc} alt={room.name} />
      </div>

      <div className="room-card-overlay-v3">
        <div className="room-card-content-v3">
          <div className="room-card-header-v3">
            <span className="room-type-v3">{room.type}</span>
            <h3 className="room-name-v3">{room.name}</h3>
          </div>
          
          <p className="room-price-v3">{room.priceText}</p>

          <div className="room-card-actions-v3">
            <Button to={`/stay/${room.id}`} variant="secondary" className="view-details-btn-v3">
              View Details
            </Button>
            <Button to={`/book-room/${room.id}`} className="book-stay-btn-v3">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
