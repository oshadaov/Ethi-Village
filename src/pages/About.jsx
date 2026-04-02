import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import { useSiteImages } from "../hooks/useSiteImages";
import { images as defaultImages } from "../assets/images";

export default function About() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.about_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=1800&q=80";
  const remoteStory = images?.about_story;
  const storyImage =
    !loading && remoteStory
      ? remoteStory
      : "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80";

  return (
    <main>
      <section
        className="page-hero page-hero-about"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <p className="section-eyebrow">About Etili</p>
          <h1>Rooted in People, Place, and Meaningful Travel</h1>
          <p>
            Etili Village Experience is built around real village life, warm
            hospitality, and the beauty of slowing down in rural Sri Lanka.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container className="split-layout about-story-layout">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="A Village Experience Shaped by Authentic Connection"
              description="Etili was created for travelers who want more than a quick stop. It is a chance to connect with local people, enjoy traditional food, and understand the rhythm of rural life."
            />
            <p>
              Instead of offering a rushed or staged tourist experience, Etili
              invites guests into a calmer and more human side of Sri Lanka.
              Every activity is designed to feel personal, respectful, and
              rooted in real everyday culture.
            </p>
            <p>
              From shared meals and local stories to peaceful landscapes and
              hands-on village moments, the experience centers on warmth,
              simplicity, and genuine hospitality.
            </p>
          </div>

          <div className="split-image">
            <img src={storyImage} alt="Village life in Sri Lanka" />
          </div>
        </Container>
      </section>

      <section className="section section-soft">
        <Container>
          <SectionHeader
            eyebrow="What We Value"
            title="Community, Culture, and Care"
            description="The heart of Etili is not just the destination. It is the people, traditions, and sense of belonging that guests carry home with them."
            center
          />

          <div className="value-grid">
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>
                We focus on real experiences shaped by local life, not
                artificial performances.
              </p>
            </div>

            <div className="value-card">
              <h3>Community Connection</h3>
              <p>
                Local guides, hosts, and families are central to the experience
                and its meaning.
              </p>
            </div>

            <div className="value-card">
              <h3>Cultural Respect</h3>
              <p>
                We welcome guests in a way that honors traditions, values, and
                everyday village rhythms.
              </p>
            </div>

            <div className="value-card">
              <h3>Slow Travel</h3>
              <p>
                We believe the best travel memories come from taking time to
                connect, learn, and appreciate.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="impact-layout">
          <div className="impact-card large">
            <p className="section-eyebrow">Community Value</p>
            <h2>Travel That Supports Local People</h2>
            <p>
              Etili is designed to create value within the community by
              involving local knowledge, local food traditions, and local
              hospitality at the center of the visitor experience.
            </p>
            <p>
              That means guests do not just pass through. They contribute to a
              model of travel that celebrates the people and culture of the
              village in a respectful and meaningful way.
            </p>
          </div>

          <div className="impact-side">
            <div className="impact-card">
              <h3>Local Hosts</h3>
              <p>
                Experiences are shaped by people who live the culture every day.
              </p>
            </div>
            <div className="impact-card">
              <h3>Traditional Food</h3>
              <p>
                Meals and cooking experiences keep local flavors and stories
                alive.
              </p>
            </div>
            <div className="impact-card">
              <h3>Shared Understanding</h3>
              <p>
                Guests leave with a deeper appreciation for village life in Sri
                Lanka.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
