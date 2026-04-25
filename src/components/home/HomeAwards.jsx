import Container from "../common/Container";

export default function HomeAwards() {
  // Cloudinary keys or URLs for awards
  const awards = [
    { id: 1, name: "Award 1", url: "https://images.unsplash.com/photo-1552508744-1696d4464960?auto=format&fit=crop&w=200&q=80" }, // Placeholder logo
    { id: 2, name: "Award 2", url: "https://images.unsplash.com/photo-1552508744-1696d4464960?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Award 3", url: "https://images.unsplash.com/photo-1552508744-1696d4464960?auto=format&fit=crop&w=200&q=80" },
  ];

  return (
    <section className="section section-soft" style={{ padding: "60px 0", textAlign: "center" }}>
      <Container>
        <p className="section-eyebrow">Recognized Excellence</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginTop: "30px" }}>
          {awards.map(award => (
            <img key={award.id} src={award.url} alt={award.name} style={{ width: "120px", height: "120px", objectFit: "contain", opacity: 0.7 }} />
          ))}
        </div>
      </Container>
    </section>
  );
}
