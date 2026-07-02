'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Trophy, Award, Medal, ShieldAlert, Sparkles } from 'lucide-react';

interface TrophyItem {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  icon: 'trophy' | 'award' | 'medal';
  color: string;
}

export default function TrophyCabinet() {
  const cabinetRef = useRef<HTMLDivElement>(null);

  const achievements: TrophyItem[] = [
    {
      id: 'gssoc',
      title: 'GSSoC Admin',
      subtitle: '2026 Season',
      detail: 'Administered open-source contributions, audited 273+ pull requests.',
      icon: 'trophy',
      color: '#FFD700', // Gold
    },
    {
      id: 'mlh',
      title: 'MLH Hackathon Winner',
      subtitle: 'First Place',
      detail: 'Won multiple MLH hackathons with agentic web tools.',
      icon: 'award',
      color: '#C0C0C0', // Silver
    },
    {
      id: 'os',
      title: 'Open Source Icon',
      subtitle: 'Active Builder',
      detail: 'Contributions to node ecosystems and local-first LLMs.',
      icon: 'medal',
      color: '#CD7F32', // Bronze
    },
    {
      id: 'prs',
      title: '200+ PRs Merged',
      subtitle: 'Milestone Shield',
      detail: 'Shipped a continuous stream of patches across 18 public repos.',
      icon: 'trophy',
      color: '#FFD700',
    },
  ];

  useEffect(() => {
    const cabinet = cabinetRef.current;
    if (!cabinet) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cabinet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      
      // Rotate Y-axis based on mouse position
      const rotY = x / (rect.width / 15); // Max 15 deg rotation

      gsap.to(cabinet, {
        rotateY: rotY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cabinet, {
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.6,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    cabinet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cabinet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full bg-[#030303] py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.03),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 text-center">
        <div>
          <h2 className="text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 border border-[#FFD700]/20 bg-[#FFD700]/5 px-3 py-1 rounded-full w-fit mx-auto">
            TROPHY CABINET
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            DECORATIONS & <span className="font-serif italic font-normal text-[#FFD700]">Honours</span>
          </h3>
        </div>

        {/* 3D Cabinet Board */}
        <div
          ref={cabinetRef}
          className="w-full max-w-4xl bg-gradient-to-b from-[#111] to-[#050505] border border-white/5 rounded-3xl p-8 flex flex-wrap justify-center gap-8 shadow-2xl relative select-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glass shelf line decoration */}
          <div className="absolute bottom-6 left-6 right-6 h-2 bg-[#FFD700]/25 rounded border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)] pointer-events-none" />

          {achievements.map((item) => (
            <div
              key={item.id}
              className="w-[180px] sm:w-[200px] h-[250px] border border-white/5 bg-white/2 hover:bg-white/4 rounded-2xl p-4 flex flex-col justify-between items-center relative group transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(255,215,0,0.05)] cursor-pointer"
              style={{ transform: 'translateZ(30px)' }}
            >
              {/* Flares and lighting */}
              <div className="absolute inset-0 rounded-2xl bg-[#FFD700]/3 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Icon visual */}
              <div className="grow flex items-center justify-center relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/10 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: item.color, borderColor: `${item.color}30` }}
                >
                  {item.icon === 'trophy' && <Trophy className="w-8 h-8 drop-shadow" />}
                  {item.icon === 'award' && <Award className="w-8 h-8 drop-shadow" />}
                  {item.icon === 'medal' && <Medal className="w-8 h-8 drop-shadow" />}
                </div>
              </div>

              {/* Details text */}
              <div className="text-center w-full z-10">
                <h4 className="text-white text-xs font-black uppercase tracking-wider truncate">
                  {item.title}
                </h4>
                <span className="text-[9px] text-[#FFD700] uppercase font-mono tracking-widest font-bold mt-1 block">
                  {item.subtitle}
                </span>
                <p className="text-[9px] text-white/50 leading-relaxed font-sans mt-2 line-clamp-2">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
