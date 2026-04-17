import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </main>
  );
}
