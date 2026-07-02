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
import { useFootballMode } from '@/lib/context/FootballModeContext';

// Football Mode Components
import UltimateTeamCard from '@/components/football/UltimateTeamCard';
import TransferMarket from '@/components/football/TransferMarket';
import PackOpening from '@/components/football/PackOpening';
import DreamXI from '@/components/football/DreamXI';
import TrophyCabinet from '@/components/football/TrophyCabinet';
import ManagerMode from '@/components/football/ManagerMode';
import MatchCommentary from '@/components/football/MatchCommentary';

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
  const { isFootballMode, startAudio } = useFootballMode();

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
      {isLoading && (
        <GsapPreloader
          onComplete={() => {
            setIsLoading(false);
            startAudio();
          }}
        />
      )}
      {!isLoading && (
        <main className="w-full min-h-screen bg-black">
          <HeroSection />
          
          <GsapMarquee
            items={
              isFootballMode
                ? ['Dev Career FC', 'Ultimate Team Card', 'Transfer Market Active', 'Dream XI Draft', 'Manager Mode 2026']
                : ['Generative AI', 'Coding Agents', 'Machine Learning', 'System Architecture', 'NLP Models']
            }
            speed={40}
          />

          {/* FUT Card Section - Top highlight in Football Mode */}
          {isFootballMode && (
            <section className="w-full bg-[#080d04] py-20 border-b border-[#FFD700]/10 relative">
              <div className="max-w-6xl mx-auto px-6 text-center mb-8">
                <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#FFD700] border border-[#FFD700]/20 bg-[#FFD700]/5 px-3.5 py-1.5 rounded-full">
                  FUT Player Roster
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">
                  DEVELOPER ULTIMATE CARD
                </h3>
              </div>
              <UltimateTeamCard />
            </section>
          )}

          <AboutSection />
          
          {/* Tactical Pitch Squad Builder */}
          {isFootballMode && <DreamXI projects={initialProjects} />}
          
          <TechStackSection />
          
          {/* Manager Mode drafting stack */}
          {isFootballMode && <ManagerMode />}

          {/* Project Pack opening */}
          {isFootballMode && (
            <section className="w-full bg-black py-20 border-y border-white/5 relative">
              <div className="max-w-6xl mx-auto px-6 text-center mb-8">
                <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#FFD700] border border-[#FFD700]/20 bg-[#FFD700]/5 px-3.5 py-1.5 rounded-full">
                  Project Loot Box
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-4 uppercase tracking-tight">
                  PACK OPENING
                </h3>
              </div>
              <PackOpening projects={initialProjects} />
            </section>
          )}

          <ProjectsShowcase projects={initialProjects} />

          {/* Trophy Cabinet Achievements */}
          {isFootballMode && <TrophyCabinet />}

          <AchievementsSection />

          {/* Transfer Market listing */}
          {isFootballMode && <TransferMarket />}

          <GithubContributions />
          <BlogSection />
          <FooterSection />

          {/* Live matches commentaries */}
          {isFootballMode && <MatchCommentary />}
        </main>
      )}
    </>
  );
}
