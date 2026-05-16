import { motion } from "framer-motion";
import Container from "../common/Container";
import { useSiteImages } from "../../hooks/useSiteImages";
import { images as defaultImages } from "../../assets/images";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";

export default function HeroSection() {
  const { images, loading } = useSiteImages();
  const remoteHero = images?.hero_main;
  const heroBackground =
    !loading && remoteHero ? remoteHero : defaultImages.hero;

  const mobileHero = images?.heromobile;
  const mobileBackground =
    !loading && mobileHero ? mobileHero : defaultImages.heromobile;

  const socialLinks = [
    {
      icon: FaFacebook,
      url: import.meta.env.VITE_FACEBOOK_URL,
      label: "Facebook",
      color: "hover:text-[#1877F2]",
    },
    {
      icon: FaYoutube,
      url: import.meta.env.VITE_YOUTUBE_URL,
      label: "YouTube",
      color: "hover:text-[#FF0000]",
    },
    {
      icon: FaInstagram,
      url: import.meta.env.VITE_INSTAGRAM_URL,
      label: "Instagram",
      color: "hover:text-[#E4405F]",
    },
    {
      icon: SiTripadvisor,
      url: import.meta.env.VITE_TRIPADVISOR_URL,
      label: "TripAdvisor",
      color: "hover:text-[#00AF87]",
    },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105 hover:scale-100 hidden md:block"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105 hover:scale-100 block md:hidden"
        style={{ backgroundImage: `url('${mobileBackground}')` }}
      />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-9xl font-bold text-white mb-2 tracking-[0.2em] drop-shadow-2xl font-serif">
            ETHILI
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-white uppercase tracking-[0.5em] mb-12 drop-shadow-lg">
            Village Sri Lanka
          </h2>

          <div className="flex gap-8 items-center bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 shadow-2xl">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white text-2xl transition-all duration-300 transform hover:scale-125 ${link.color}`}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>
      </Container>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/0 via-white to-white/0" />
      </div>
    </section>
  );
}
