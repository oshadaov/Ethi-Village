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
        <Container>
          <div className="dining-grid-layout">
            <div className="dining-content">
              <SectionHeader
                eyebrow="Food and Drink"
                title="The Best Food in Sri Lanka"
                description="Guests love the food at ETILI, frequently commenting that it is the best food that they tasted in Sri Lanka."
              />
              <div className="dining-text-wrap">
                <p>
                  As far as possible, we produce from our own organic farm, or we source fresh fruit and vegetables from our farming community in the village. We make our own herbal tea, jams and chutneys using ingredients growing around the village. We also grow our own herbs and spices, and we make our own curds and milk from our herd cows in the village.
                </p>
                <p>
                  The ladies who cook for guests are all from the village, so we focus on traditional village-style cuisine. Breakfast usually includes Sri Lankan specialities like roti, hoppers or Milk Rice. For lunch and dinner, we typically serve rice with delicious village-style curries. <strong>Guests can always chat with the chefs and customize their meal choices.</strong>
                </p>
                <p>
                  We can also prepare picnics for hikes and excursions, and guests can enjoy snacks and refreshments throughout the day. Also we built a restaurant called <strong>ETILI Kitchen</strong> by giving the opportunity to learn traditional cooking methods.
                </p>
                <p className="dining-note">
                  <em>We are not licensed, but guests are welcome to bring their own beer, wine and spirits.</em>
                </p>
              </div>
              <Button to="/contact" style={{ marginTop: "24px" }}>Plan Your Dining Experience</Button>
            </div>

            <div className="dining-image-grid">
              <div className="dining-img-card main">
                <img src={images.stay_dining_1 || "/images/food/breakfast.png"} alt="Traditional Breakfast" />
              </div>
              <div className="dining-img-card">
                <img src={images.stay_dining_2 || "/images/food/curries.png"} alt="Village Curries" />
              </div>
              <div className="dining-img-card">
                <img src={images.stay_dining_3 || "/images/food/kitchen.png"} alt="ETILI Kitchen" />
              </div>
            </div>
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
          <div className="section-cta" style={{ textAlign: "center", marginTop: "40px" }}>
            <Button to="/activities" variant="secondary">View All Activities & Details</Button>
          </div>
        </Container>
      </section>

    </main>
  );
}
