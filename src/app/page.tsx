import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import GsapMarquee from "@/components/animations/GsapMarquee";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { fetchProjects } from "@/lib/supabase";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <main className="w-full min-h-screen bg-black">
      <HeroSection />
      <GsapMarquee 
        items={["Generative AI", "Coding Agents", "Machine Learning", "System Architecture", "NLP Models"]} 
        speed={40} 
      />
      <AboutSection />
      <ProjectsShowcase projects={projects} />
      <FeaturesSection />
    </main>
  );
}
