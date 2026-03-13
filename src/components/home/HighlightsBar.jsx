import Container from "../common/Container";

const items = [
  "Authentic Village Experience",
  "Local Guides",
  "Traditional Meals",
  "Nature and Culture",
  "Family Friendly",
  "Near Ella",
];

export default function HighlightsBar() {
  return (
    <section className="highlights-bar">
      <Container className="highlights-grid">
        {items.map((item) => (
          <div key={item} className="highlight-pill">
            {item}
          </div>
        ))}
      </Container>
    </section>
  );
}
