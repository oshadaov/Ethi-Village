import { useState, useEffect, useMemo } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import RoomCard from "../components/accommodation/RoomCard";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { getRooms } from "../data/rooms";
import { getExperiences } from "../data/experiences";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Stay() {
  const { images, loading } = useSiteImages();
  const [roomsData, setRoomsData] = useState([]);
  const [experiencesData, setExperiencesData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      const [rooms, experiences] = await Promise.all([
        getRooms(),
        getExperiences()
      ]);
      setRoomsData(rooms);
      setExperiencesData(experiences);
      setLoadingData(false);
    };
    loadData();
  }, []);

  const remoteHero = images?.stay_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80";

  const mappedExperiences = useMemo(() => {
    return experiencesData.map((item) => {
      const key = item.imageKey || `experience_${item.slug}`;
      const remoteImage = images[key];
      return {
        ...item,
        image: item.imageUrl || (!loading && remoteImage ? remoteImage : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"),
      };
    });
  }, [experiencesData, images, loading]);

  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      >
        <Container className="page-hero-content">
          <h1>Stay & Experience Etili</h1>
          <p>
            A mud house, a tree house, a glamping unit and one Farmhouse operating as a comprehensive guest house, providing visitors with the chance to learn organic farming, local cuisine and coexistence with wildlife.
          </p>
        </Container>
      </section>

      {/* ACCOMMODATION SECTION */}
      <section id="accommodation" className="section">
        <Container>
          <SectionHeader
            eyebrow="Accommodation"
            title="Simple, Unspoiled Surroundings"
            description="The accommodation is simple, yet regularly rated as one of the best guest-houses in Sri Lanka, thanks to the stunning scenery, delicious food, wildlife and unspoiled surroundings."
          />

          <div className="room-list">
            {loadingData ? (
              <p>Loading accommodation...</p>
            ) : (
              roomsData.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            )}
          </div>
        </Container>
      </section>

      {/* FOOD AND DRINK SECTION */}
      <section id="food" className="section section-soft">
        <Container className="split-layout">
          <div className="split-image" style={{ order: -1 }}>
            <img src={images?.stay_food || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"} alt="Traditional Sri Lankan Food" />
          </div>

          <div>
            <SectionHeader
              eyebrow="Food and Drink"
              title="The Best Food in Sri Lanka"
              description="Guests love the food at ETILI, frequently commenting that it is the best food they tasted in Sri Lanka."
            />
            <p>
              As far as possible, we produce from our own organic farm, or we source fresh fruit and vegetables from our farming community in the village. We make our own herbal tea, jams and chutneys using ingredients growing around the village.
            </p>
            <p>
              The ladies who cook for guests are all from the village, focusing on traditional village-style cuisine. Breakfast usually includes Sri Lankan specialities like roti, hoppers or Milk Rice. For lunch and dinner, we serve rice with delicious village-style curries.
            </p>
            <p>
              We also built a restaurant called ETILI Kitchen, giving the opportunity to learn traditional cooking methods.
            </p>
            <Button to="/contact" style={{ marginTop: "20px" }}>Request a Custom Meal Plan</Button>
          </div>
        </Container>
      </section>

      {/* ACTIVITIES SECTION */}
      <section id="activities" className="section">
        <Container>
          <SectionHeader
            eyebrow="Activities & Experiences"
            title="Adventures Around the Village"
            description="Etili Village is a perfect spot for relaxation and rejuvenation, or an adventurous escape."
          />

          <div className="experience-list">
             {loadingData ? (
              <p>Loading activities...</p>
            ) : (
              mappedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))
            )}
          </div>
        </Container>
      </section>

    </main>
  );
}
