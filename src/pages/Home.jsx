import HeroSection from "../components/home/HeroSection";
import HeroIntroSection from "../components/home/HeroIntroSection";
import HomeAwards from "../components/home/HomeAwards";
import HomeLinks from "../components/home/HomeLinks";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroIntroSection />
      <HomeAwards />
      <HomeLinks />
    </>
  );
}
