import Button from "../common/Button";

export default function ExperienceCard({ experience }) {
  const resolvedImage = experience.image;

  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-premium hover:shadow-premium-hover transition-all duration-500 h-[450px]">
      <div className="absolute inset-0">
        <img 
          src={resolvedImage} 
          alt={experience.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="lg:transform lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-4 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 shadow-lg">
            {experience.category}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            {experience.title}
          </h3>
          <p className="text-white/80 text-sm font-medium mb-6">
            {experience.duration} • <span className="text-accent-soft font-bold">{experience.priceText}</span>
          </p>

          <div className="flex flex-wrap gap-3 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Button to={`/activities/${experience.id}`} variant="secondary" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white hover:!text-primary !py-2 !px-5 !text-xs">
              View Details
            </Button>
            <Button to={`/book-experience/${experience.id}`} className="!py-2 !px-5 !text-xs">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
