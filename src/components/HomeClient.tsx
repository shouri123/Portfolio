'use client';

import { useState, useEffect } from 'react';
import GsapPreloader from '@/components/animations/GsapPreloader';
import GsapCustomCursor from '@/components/animations/GsapCustomCursor';
import HeroSection from '@/components/HeroSection';
import GsapMarquee from '@/components/animations/GsapMarquee';
import AboutSection from '@/components/AboutSection';
import TechStackSection from '@/components/TechStackSection';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import GithubContributions from '@/components/GithubContributions';
import BlogSection from '@/components/BlogSection';
import FooterSection from '@/components/FooterSection';

interface HomeClientProps {
  initialProjects: any[];
}

export default function HomeClient({ initialProjects }: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <GsapPreloader onComplete={() => setIsLoading(false)} />}
      <GsapCustomCursor />
      <main className={`w-full min-h-screen bg-black transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <HeroSection />
        <GsapMarquee 
          items={["Generative AI", "Coding Agents", "Machine Learning", "System Architecture", "NLP Models"]} 
          speed={40} 
        />
        <AboutSection />
        <TechStackSection />
        <ProjectsShowcase projects={initialProjects} />
        <GithubContributions />
        <BlogSection />
        <FooterSection />
      </main>
    </>
  );
}
