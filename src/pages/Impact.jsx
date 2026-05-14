import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { useSiteImages } from "../hooks/useSiteImages";
import { images as defaultImagess } from "../assets/images";
import { Book, HeartPulse, GraduationCap, Lightbulb, TreeDeciduous, ShieldCheck } from "lucide-react";

export default function Impact() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.impact_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=80";

  return (
    <main className="bg-bg">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackground}')` }}
        />
        <div className="absolute inset-0 bg-primary/50 backdrop-blur-[2px]" />
        
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif drop-shadow-2xl">
            Community & Environment First
          </h1>
          <p className="text-white/90 text-xl max-w-4xl mx-auto leading-relaxed italic font-light">
            Despite its scenic charm, Uva Province ranks as one of the least developed regions in Sri Lanka. Through tourism, we generate economic opportunities and promote environmental restoration.
          </p>
        </Container>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <SectionHeader
                eyebrow="Community Development"
                title="Enhancing Local Livelihoods"
                description="Our primary mission is to create and increase economic opportunities for the people of Etili village, through welcoming tourists and developing higher value tourism products."
              />
              <p className="text-muted text-lg mb-8 leading-relaxed">
                As a business, we create jobs, raise incomes and, as far as possible, source our goods and services from within the local community. We also support a number of initiatives to improve livelihoods in the village.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: GraduationCap, title: "Education", desc: "English language programs for local school students." },
                  { icon: Book, title: "Facilities", desc: "Built and stocked a library for the village school." },
                  { icon: HeartPulse, title: "Health", desc: "Clean water filters to prevent chronic kidney disease." },
                  { icon: Lightbulb, title: "Empowerment", desc: "Entrepreneurship programs for local youth." }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-premium border border-border/10 group hover:border-accent transition-all">
                    <item.icon className="text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">{item.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-[40px] blur-2xl opacity-50" />
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white transform hover:rotate-1 transition-transform duration-500">
                  <img 
                    src={images?.impact_community || defaultImagess?.split || "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80"} 
                    alt="Community Development" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Environment Section */}
      <section id="environment" className="py-24 bg-primary/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl opacity-50" />
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white transform hover:-rotate-1 transition-transform duration-500">
                <img 
                  src={images?.impact_environment || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"} 
                  alt="Environmental Restoration" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Environmental Restoration"
                title="Safeguarding Habitats"
                description="ETILI's fundamental goal is to safeguard and restore the environment and wildlife habitats within and surrounding the village."
              />
              <p className="text-muted text-lg mb-8 leading-relaxed">
                In various regions of Sri Lanka, deforestation, poor land management, and the overuse of agro-chemicals are contributing to erosion, flooding, loss of habitats, and increase of diseases. Consequently, all our initiatives aim to reduce our environmental footprint while restoring natural ecosystems.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: ShieldCheck, 
                    title: "Wildlife Protection", 
                    desc: "Actively involved in rescuing elephants and coordinating with authorities to prevent poaching." 
                  },
                  { 
                    icon: TreeDeciduous, 
                    title: "Reforestation", 
                    desc: "Planting endemic and medicinal trees to protect water sources and mitigate climate change." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl shadow-premium border border-border/5 group hover:shadow-premium-hover transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                      <item.icon className="text-accent group-hover:text-white transition-colors" size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2 text-xl">{item.title}</h4>
                      <p className="text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
