import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GsapMarquee from "@/components/animations/GsapMarquee";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { fetchProjects } from "@/lib/supabase";
import TechStackSection from "@/components/TechStackSection";
import BlogSection from "@/components/BlogSection";
import GithubContributions from "@/components/GithubContributions";
import FooterSection from "@/components/FooterSection";

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
      <TechStackSection />
      <ProjectsShowcase projects={projects} />
      <GithubContributions />
      <BlogSection />
      <FooterSection />
    </main>
  );
}
