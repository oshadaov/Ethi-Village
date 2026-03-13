import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Choose Your Experience",
    text: "Select the village activity or stay option that matches your travel style.",
  },
  {
    number: "02",
    title: "Send Your Preferred Date",
    text: "Tell us your date, group size, and any accommodation needs.",
  },
  {
    number: "03",
    title: "Confirm and Enjoy",
    text: "Receive your booking details and get ready for a memorable village experience.",
  },
];

export default function BookingStepsSection() {
  return (
    <section className="section">
      <Container>
        <SectionHeader
          eyebrow="How It Works"
          title="Simple and Personal Booking"
          description="A smooth and friendly process from inquiry to arrival."
          center
        />

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
