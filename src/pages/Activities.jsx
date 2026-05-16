import { useState, useEffect, useMemo } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { getCachedData, getExperiences } from "../services/api";
import { useSiteImages } from "../hooks/useSiteImages";

export default function Activities() {
  const { images, loading } = useSiteImages();
  const cachedExp = getCachedData("/experiences");
  const [experiencesData, setExperiencesData] = useState(cachedExp || []);
  const [loadingData, setLoadingData] = useState(!cachedExp);

  useEffect(() => {
    if (!cachedExp) {
      const load = async () => {
        setLoadingData(true);
        try {
          const data = await getExperiences();
          setExperiencesData(data || []);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingData(false);
        }
      };
      load();
    }
  }, [cachedExp]);

  const remoteHero = images?.experiencesData_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80";

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
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Adventures & Relaxation
          </h1>
          {/* <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
            From peaceful meditation to thrilling wildlife encounters, discover
            the diverse experiences Etili Village has to offer.
          </p> */}
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <Container>
          <div className="relative z-10 text-center mb-12">
            <p className="text-black/90 text-lg md:text-xl leading-relaxed mb-0">
              Discover our authentic mud houses, tree houses, and glamping
              units. Learn organic farming, enjoy local cuisine, and coexist
              with nature in the heart of our mountain village.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Experience Etili"
                title="Your Gateway to Rejuvenation"
              />
              <div className="space-y-6 text-muted text-lg leading-relaxed text-center lg:text-left">
                <p className="text-primary font-medium text-xl leading-relaxed">
                  Etili Village is a perfect spot for relaxation and rejuvenation.
                  Those who want to escape from the stressful urban life, we
                  provide an extensive selection of books, games, swings, and stunning views.
                </p>
                <p>
                  For those who are into adventures, there is a wide range of
                  activities and attractions in and around the village. From hiking Candeyaya rock to kayaking on the lake, we have it all.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {[
                { label: "Unique Activities", value: "10+" },
                { label: "to Major Parks", value: "1hr" },
                { label: "Farm Tours", value: "Daily" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-premium flex items-center justify-between group hover:bg-primary transition-colors duration-500">
                  <span className="text-muted group-hover:text-white/80 font-bold uppercase tracking-wider">{stat.label}</span>
                  <strong className="text-3xl font-bold text-primary group-hover:text-accent transition-colors">{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Activities Grid */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeader
            center
            eyebrow="Explore"
            title="Things to Do"
            description="Hand-picked activities to make your stay unforgettable."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingData ? (
              <div className="col-span-full py-12 text-center text-muted">Loading activities...</div>
            ) : (
              mappedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="relative rounded-[40px] overflow-hidden p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-md" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Adventure?</h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed">
                Whether it's a safari to Yala, a hike up Kandeyaya rock, or a
                peaceful kayak trip, we can arrange everything for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button to="/book" className="!px-10">
                  Book an Activity
                </Button>
                <Button
                  href="https://wa.me/94771234567"
                  variant="secondary"
                  className="!px-10 !border-white/20 !text-white hover:!bg-white hover:!text-primary"
                >
                  WhatsApp Inquiry
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Regional Highlights */}
      <section className="py-24 bg-bg">
        <Container>
          <SectionHeader
            eyebrow="Beyond the Village"
            title="Regional Attractions"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Historical Sites",
                desc: "Visit the Buddhist statues at Buduruwagala (1-hour drive). Features seven colossal statues carved into a 70-foot rock face."
              },
              {
                title: "Waterfalls & Nature",
                desc: "Explore Diyaluma Falls, Ella wala waterfalls, and Rawana falls. Discover World’s End and Horton Plains (within 2 hours)."
              },
              {
                title: "Safaris & Culture",
                desc: "Base yourself for Yala or Udawalawe safaris. Visit colonial mansions or historical sites, all within a scenic drive."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-premium border border-border/10 hover:border-accent/30 transition-all group">
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
