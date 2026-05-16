import Container from "../components/common/Container";
import { contactInfo } from "../data/contactConfig";
import ContactInfoPanel from "../components/contact/ContactInfoPanel";
import { useSiteImages } from "../hooks/useSiteImages";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import {
  Facebook,
  Instagram,
  Youtube,
  Map as MapIcon,
  Download,
} from "lucide-react";

export default function Contact() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.contact_hero;
  const heroBackground =
    !loading && remoteHero
      ? remoteHero
      : "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1800&q=80";

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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif drop-shadow-2xl">
            Plan Your Village Escape
          </h1>
          {/* <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed italic font-light">
            Share your preferred date, group size, and interests. We’ll help you
            choose the right experience and stay option.
          </p> */}
        </Container>
      </section>

      {/* Info Section */}
      <section className="py-24">
        <Container className="max-w-5xl mx-auto">
          <div className="relative z-10 text-center mb-12">
            <p className="text-black/90 text-lg md:text-xl leading-relaxed mb-0">
              Discover our authentic mud houses, tree houses, and glamping
              units. Learn organic farming, enjoy local cuisine, and coexist
              with nature in the heart of our mountain village.
            </p>
          </div>
          <ContactInfoPanel contactInfo={contactInfo} />

          <div className="mt-20 p-12 md:p-16 rounded-[40px] bg-white shadow-premium border border-border/10 text-center group hover:border-accent transition-all duration-500">
            <h2 className="text-3xl font-bold text-primary mb-4 font-serif">
              Looking to book a stay or activity?
            </h2>
            <p className="text-muted text-lg mb-10">
              Visit our dedicated booking sections to secure your spot directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button to="/stay" className="!px-10">
                View Stays
              </Button>
              <Button to="/activities" variant="secondary" className="!px-10">
                View Activities
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Map & Social Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 rounded-[40px] overflow-hidden shadow-premium border-8 border-bg transform hover:-rotate-1 transition-transform duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.6189998!2d81.1270888!3d6.6189998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae415baaa374107%3A0x89bb285e3167cd54!2sEtili%20Village%20Experience!5e0!3m2!1sen!2sus!4v1714567890123!5m2!1sen!2sus"
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Etili Village Map"
              ></iframe>
            </div>

            <div className="lg:col-span-5 space-y-12 text-center">
              <SectionHeader
                center
                eyebrow="Location & Info"
                title="Find Us & Connect"
                description="ETILI Village is located in between Tissamaharama and Ella. It's a 15 minutes drive from Wellawaya town."
              />

              <div className="space-y-6 ">
                <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Facebook size={20} />
                  </span>
                  Connect With Us
                </h3>
                <p className="text-muted leading-relaxed">
                  Find all the latest information, photos, reviews and more on
                  our social channels:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    {
                      label: "Facebook",
                      url: import.meta.env.VITE_FACEBOOK_URL,
                      icon: Facebook,
                    },
                    {
                      label: "Instagram",
                      url: import.meta.env.VITE_INSTAGRAM_URL,
                      icon: Instagram,
                    },
                    {
                      label: "YouTube",
                      url: import.meta.env.VITE_YOUTUBE_URL,
                      icon: Youtube,
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2 rounded-full border border-border/20 text-xs font-bold text-muted hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-widest"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
