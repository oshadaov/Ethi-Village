import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import RoomCard from "../components/accommodation/RoomCard";
import { rooms } from "../data/rooms";

export default function Accommodation() {
  return (
    <main>
      <section className="page-hero page-hero-accommodation">
        <Container className="page-hero-content">
          <p className="section-eyebrow">Accommodation</p>
          <h1>Stay Close to Nature, Comfort, and Village Life</h1>
          <p>
            Complete your Etili journey with a peaceful countryside stay that
            blends comfort, warm hospitality, and easy access to local
            experiences.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Stay Options"
            title="Comfortable Stays for Every Kind of Traveler"
            description="Choose from thoughtfully prepared rooms designed for couples, families, and slow travelers seeking a meaningful village escape."
          />

          <div className="room-list">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container className="split-layout accommodation-info-layout">
          <div>
            <SectionHeader
              eyebrow="Why Stay Here"
              title="More Than a Room, It’s Part of the Experience"
              description="Your stay is not separate from the journey. It is part of the slower rhythm, local warmth, and peaceful environment that define Etili."
            />

            <div className="feature-list">
              <div className="feature-card">
                <h3>Peaceful Setting</h3>
                <p>
                  Wake up to greenery, open skies, and a quieter pace away from crowded tourist zones.
                </p>
              </div>

              <div className="feature-card">
                <h3>Flexible Experience Add-ons</h3>
                <p>
                  Pair your stay with cooking, village activities, nature moments, or custom local experiences.
                </p>
              </div>

              <div className="feature-card">
                <h3>Warm Local Hospitality</h3>
                <p>
                  Enjoy a welcoming environment shaped by personal care and genuine Sri Lankan hosting.
                </p>
              </div>
            </div>
          </div>

          <div className="split-image">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
              alt="Countryside accommodation"
            />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="stay-includes-box">
            <div>
              <p className="section-eyebrow">Stay Benefits</p>
              <h2>What You Can Expect</h2>
            </div>

            <div className="stay-benefits-grid">
              <div className="benefit-card">
                <h3>Comfortable Rooms</h3>
                <p>Clean, calm, and thoughtfully prepared spaces for restful stays.</p>
              </div>
              <div className="benefit-card">
                <h3>Meal Options</h3>
                <p>Traditional food and breakfast options based on your stay package.</p>
              </div>
              <div className="benefit-card">
                <h3>Easy Booking Support</h3>
                <p>Personal guidance for room selection, activities, and transport questions.</p>
              </div>
              <div className="benefit-card">
                <h3>Custom Packages</h3>
                <p>Combine accommodation with village experiences for a complete itinerary.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="cta-section">
        <Container className="cta-box">
          <div>
            <p className="section-eyebrow">Plan Your Stay</p>
            <h2>Book a Village Escape That Feels Personal</h2>
            <p>
              Tell us your travel date, group size, and preferred room style,
              and we’ll help you choose the best stay option.
            </p>
          </div>

          <div className="cta-actions">
            <Button to="/contact">Send Inquiry</Button>
            <Button
              href="https://wa.me/94771234567"
              variant="secondary"
            >
              WhatsApp Us
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}