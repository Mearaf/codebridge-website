import HeroSection from "@/components/HeroSection";
import MissionBlock from "@/components/MissionBlock";
import WhoWeHelp from "@/components/WhoWeHelp";
import ServicesPreview from "@/components/ServicesPreview";
import TestimonialSection from "@/components/TestimonialSection";
import NotForSection from "@/components/NotForSection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50/50 to-white/80">
      <HeroSection />
      <MissionBlock />
      <WhoWeHelp />
      <ServicesPreview />
      <TestimonialSection />
      <NotForSection />
      <EmailSignup />
      <Footer />
    </div>
  );
}
