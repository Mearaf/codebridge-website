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
    <div className="pt-16 bg-slate-900">
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
