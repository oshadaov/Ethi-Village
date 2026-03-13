import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { testimonials } from "../../data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="section section-soft">
      <Container>
        <SectionHeader
          eyebrow="Guest Reviews"
          title="What Visitors Remember Most"
          description="Real impressions from travelers who experienced the warmth of Etili."
        />

        <div className="card-grid two">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card">
              <p className="testimonial-quote">“{item.quote}”</p>
              <div className="testimonial-meta">
                <strong>{item.name}</strong>
                <span>{item.country}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
