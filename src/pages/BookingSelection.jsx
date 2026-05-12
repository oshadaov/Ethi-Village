import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { Bed, Map } from "lucide-react";
import { useSiteImages } from "../hooks/useSiteImages";

export default function BookingSelection() {
  const { images } = useSiteImages();

  return (
    <main className="booking-selection-page">
      <section className="page-hero" style={{ height: '40vh', backgroundImage: `url('${images.hero || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80"}')` }}>
        <Container className="page-hero-content">
          <h1>Plan Your Visit</h1>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Reservations"
            title="What would you like to book?"
            description="Choose your adventure at Etili Village. Whether it's a peaceful stay or an exciting activity, we have something for everyone."
            centered
          />

          <div className="booking-options-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginTop: '3rem' 
          }}>
            <div className="booking-option-card glass-v2" style={{ padding: '3rem', textAlign: 'center', borderRadius: '24px' }}>
              <div className="option-icon" style={{ marginBottom: '1.5rem', color: '#d4af37' }}>
                <Bed size={48} strokeWidth={1.5} />
              </div>
              <h3>Book a Stay</h3>
              <p style={{ marginBottom: '2rem' }}>Reserve one of our authentic village rooms and wake up to the sounds of nature.</p>
              <Button to="/stay" variant="primary" className="btn-full">Choose a Room</Button>
            </div>

            <div className="booking-option-card glass-v2" style={{ padding: '3rem', textAlign: 'center', borderRadius: '24px' }}>
              <div className="option-icon" style={{ marginBottom: '1.5rem', color: '#d4af37' }}>
                <Map size={48} strokeWidth={1.5} />
              </div>
              <h3>Book an Activity</h3>
              <p style={{ marginBottom: '2rem' }}>From cooking classes to nature hikes, book your local village experience today.</p>
              <Button to="/activities" variant="primary" className="btn-full">Explore Activities</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
