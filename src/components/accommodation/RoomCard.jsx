import Button from "../common/Button";
import { useSiteImages } from "../../hooks/useSiteImages";
import { images as defaultImages } from "../../assets/images";

export default function RoomCard({ room }) {
  const { images, loading } = useSiteImages();
  
  const imageSrc =
    !loading && images[room.imageKey]
      ? images[room.imageKey]
      : room.image || defaultImages.stay01;

  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-premium hover:shadow-premium-hover transition-all duration-500 h-[500px]">
      <div className="absolute inset-0">
        <img 
          src={imageSrc} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <div className="lg:transform lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-4 py-1 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-lg">
            {room.type}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {room.name}
          </h3>
          <p className="text-white/80 font-medium mb-8">
            {room.priceText || `$${room.pricePerNight}/night`}
          </p>

          <div className="flex flex-wrap gap-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Button to={`/stay/${room.id}`} variant="secondary" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white hover:!text-primary !py-2.5 !px-6 !text-sm">
              View Details
            </Button>
            <Button to={`/book-room/${room.id}`} className="!py-2.5 !px-6 !text-sm">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
