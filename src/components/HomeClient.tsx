'use client';

import { useState, useEffect } from 'react';
import GsapPreloader from '@/components/animations/GsapPreloader';
import HeroSection from '@/components/HeroSection';
import GsapMarquee from '@/components/animations/GsapMarquee';
import AboutSection from '@/components/AboutSection';
import TechStackSection from '@/components/TechStackSection';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import AchievementsSection from '@/components/AchievementsSection';
import GithubContributions from '@/components/GithubContributions';
import BlogSection from '@/components/BlogSection';
import FooterSection from '@/components/FooterSection';

// CR fix: Replace loose any[] with a concrete Project type matching Supabase schema
interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  live_url: string;
  source_code_url?: string;
  tech_stack: string[];
  theme_color: string;
  is_active?: boolean;
  stars?: number;
  forks?: number;
  issues?: number;
}

interface HomeClientProps {
  initialProjects: Project[];
}

export default function HomeClient({ initialProjects }: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  // CR fix: Capture original overflow so cleanup restores it correctly
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <GsapPreloader onComplete={() => setIsLoading(false)} />}
      {/* CR fix: Defer mounting heavy sections until preloader completes — prevents
          BlogSection & GithubContributions from firing network requests during animation */}
      {!isLoading && (
        <main className="w-full min-h-screen bg-black">
          <HeroSection />
          <GsapMarquee
            items={["Generative AI", "Coding Agents", "Machine Learning", "System Architecture", "NLP Models"]}
            speed={40}
          />
          <AboutSection />
          <TechStackSection />
          <ProjectsShowcase projects={initialProjects} />
          <AchievementsSection />
          <GithubContributions />
          <BlogSection />
          <FooterSection />
        </main>
      )}
    </>
  );
}
