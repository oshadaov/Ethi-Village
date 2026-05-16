import { useState, useEffect, useMemo } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import RoomCard from "../components/accommodation/RoomCard";
import ExperienceCard from "../components/experiences/ExperienceCard";
import ImageSlider from "../components/common/ImageSlider";
import { getCachedData, getRooms, getExperiences } from "../services/api";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Stay() {
  const { images, loading } = useSiteImages();
  const cachedRooms = getCachedData("/rooms");
  const cachedExp = getCachedData("/experiences");

  const [roomsData, setRoomsData] = useState(cachedRooms || []);
  const [experiencesData, setExperiencesData] = useState(cachedExp || []);
  const [loadingData, setLoadingData] = useState(!cachedRooms || !cachedExp);

  useEffect(() => {
    if (!cachedRooms || !cachedExp) {
      const loadData = async () => {
        setLoadingData(true);
        try {
          const [rooms, experiences] = await Promise.all([
            getRooms(),
            getExperiences(),
          ]);
          setRoomsData(rooms || []);
          setExperiencesData(experiences || []);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingData(false);
        }
      };
      loadData();
    }
  }, [cachedRooms, cachedExp]);

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
        image:
          item.imageUrl ||
          (!loading && remoteImage
            ? remoteImage
            : "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"),
      };
    });
  }, [experiencesData, images, loading]);

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />

        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stay & Experience Etili
          </h1>
        </Container>
      </section>

      {/* ACCOMMODATION SECTION */}
      <section id="accommodation" className="py-24">
        <Container>
          <div className="relative z-10 text-center mb-12">
            <p className="text-black/90 text-lg md:text-xl leading-relaxed mb-0 ">
              Discover our authentic mud houses, tree houses, and glamping
              units. Learn organic farming, enjoy local cuisine, and coexist
              with nature in the heart of our mountain village.
            </p>
          </div>

          <SectionHeader
          center
            eyebrow="Accommodation"
            title="Simple, Unspoiled Surroundings"
            description="Our rooms are simple, yet regularly rated as one of the best guest-houses in Sri Lanka, thanks to the stunning scenery, delicious food, and authentic village vibes."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadingData ? (
              <div className="col-span-full py-12 text-center text-muted">
                Loading accommodation...
              </div>
            ) : (
              roomsData.map((room) => <RoomCard key={room.id} room={room} />)
            )}
          </div>
        </Container>
      </section>

      {/* FOOD AND DRINK SECTION */}
      <section id="food" className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-1 text-center lg:text-left">
              <SectionHeader
                eyebrow="Food and Drink"
                title="The Best Food in Sri Lanka"
                description="Guests frequently comment that ETILI serves the most authentic and delicious food they tasted in Sri Lanka."
              />
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  Most of our ingredients come from our own organic farm or
                  local village community. We make our own herbal tea, jams, and
                  chutneys using fresh local ingredients, herbs, and spices.
                </p>
                <p>
                  Our village chefs specialize in traditional cuisine. Enjoy
                  roti, hoppers, or Milk Rice for breakfast, and delicious
                  village-style curries for lunch and dinner.
                </p>
                <div className="p-6 bg-bg rounded-2xl border-l-4 border-accent italic">
                  "Guests can always chat with the chefs and customize their
                  meal choices. We also offer cooking classes at ETILI Kitchen."
                </div>
                <Button to="/book" className="mt-8">
                  Plan Your Dining Experience
                </Button>
              </div>
            </div>

            <div className="lg:order-2">
              <ImageSlider
                images={[
                  images?.stay_dining_1 || "/images/food/breakfast.png",
                  images?.stay_dining_2 || "/images/food/curries.png",
                  images?.stay_dining_3 || "/images/food/kitchen.png",
                ]}
                alt="ETILI Dining"
                aspectRatio="4/3"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ACTIVITIES SECTION */}
      <section id="activities" className="py-24">
        <Container>
          <SectionHeader
            center
            eyebrow="Activities & Experiences"
            title="Adventures Around the Village"
            description="Etili Village is a perfect spot for relaxation and rejuvenation, or an adventurous escape."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingData ? (
              <div className="col-span-full py-12 text-center text-muted">
                Loading activities...
              </div>
            ) : (
              mappedExperiences
                .slice(0, 3)
                .map((exp) => <ExperienceCard key={exp.id} experience={exp} />)
            )}
          </div>
          <div className="text-center mt-12">
            <Button to="/activities" variant="secondary">
              View All Activities
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
