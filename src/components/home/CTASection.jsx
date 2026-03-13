import Container from "../common/Container";
import Button from "../common/Button";

export default function CTASection() {
  return (
    <section className="cta-section">
      <Container className="cta-box">
        <div>
          <p className="section-eyebrow">Ready to Visit?</p>
          <h2>Plan Your Village Escape</h2>
          <p>
            Share your travel date and group size, and we will help you choose
            the right experience.
          </p>
        </div>

        <div className="cta-actions">
          <Button to="/contact">Send Inquiry</Button>
          <Button
            href="https://wa.me/94771234567"
            variant="secondary"
          >
            Book via WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
