import HeroSection from "../components/home/HeroSection";
import HighlightsBar from "../components/home/HighlightsBar";
import ExperiencesSection from "../components/home/ExperiencesSection";
import WhyEtiliSection from "../components/home/WhyEtiliSection";
import StayPreviewSection from "../components/home/StayPreviewSection";
import GuidesSection from "../components/home/GuidesSection";
import GalleryPreviewSection from "../components/home/GalleryPreviewSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import BookingStepsSection from "../components/home/BookingStepsSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HighlightsBar />
      <ExperiencesSection />
      <WhyEtiliSection />
      <StayPreviewSection />
      <GuidesSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      
      <BookingStepsSection />
      <FAQSection />
      {/* <CTASection /> */}
    </>
  );
}
