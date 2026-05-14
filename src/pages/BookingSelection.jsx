import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { Bed, Map } from "lucide-react";
import { useSiteImages } from "../hooks/useSiteImages";

export default function BookingSelection() {
  const { images } = useSiteImages();

  return (
    <main className="min-h-screen bg-bg">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('${images.hero || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80"}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-0 drop-shadow-lg">
            Plan Your Visit
          </h1>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeader
            eyebrow="Reservations"
            title="What would you like to book?"
            description="Choose your adventure at Etili Village. Whether it's a peaceful stay or an exciting activity, we have something for everyone."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="group bg-white p-12 text-center rounded-[32px] shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-border/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-bg text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                <Bed size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Book a Stay</h3>
              <p className="text-muted mb-8 leading-relaxed">
                Reserve one of our authentic village rooms and wake up to the sounds of nature and fresh mountain air.
              </p>
              <Button to="/stay" variant="primary" className="w-full">
                Choose a Room
              </Button>
            </div>

            <div className="group bg-white p-12 text-center rounded-[32px] shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-border/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-bg text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                <Map size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Book an Activity</h3>
              <p className="text-muted mb-8 leading-relaxed">
                From traditional cooking classes to breathtaking nature hikes, book your local village experience today.
              </p>
              <Button to="/activities" variant="primary" className="w-full">
                Explore Activities
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
