import { useState } from "react";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { faqItems } from "../../data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section-soft">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions Travelers Often Ask"
          description="Everything you need before planning your visit."
        />

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={item.question} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                {item.question}
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
