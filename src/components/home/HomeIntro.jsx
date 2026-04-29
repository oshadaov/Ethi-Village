import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { useSiteImages } from "../../hooks/useSiteImages";

export default function HomeIntro() {
  const { images, loading } = useSiteImages();
  
  return (
    <section className="section">
      <Container className="split-layout">
        <div>
          <SectionHeader
            eyebrow="Welcome to Etili"
            title="A Rural Community Enterprise"
          />
          <p>
            Etili Village is a rural community that provides opportunities for wildlife encounters, showcases authentic culture, and promotes community-driven enterprises in the Uva province of Sri Lanka.
          </p>
          <p>
            Our objective is to enhance local employment and income levels while simultaneously preserving and restoring the natural environment and wildlife.
          </p>
          <p>
            We collaborate with the local community to create and offer a diverse array of authentic experiences, allowing guests to unwind and rejuvenate in one of the most beautiful spots in Sri Lanka, surrounded by mountains, lakes, caves, forests, and rice paddies.
          </p>
          <p><strong>Our village consistently ranks among the top community-driven enterprises in Sri Lanka.</strong></p>
        </div>
        
        
      </Container>
    </section>
  );
}
