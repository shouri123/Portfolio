'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { Shield, Sparkles, X, Activity, GitCommit, GitPullRequest, Code, Eye, RefreshCw } from 'lucide-react';

interface StatDetail {
  name: string;
  rating: number;
  label: string;
  description: string;
  evidence: string[];
}

export default function UltimateTeamCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedStat, setSelectedStat] = useState<StatDetail | null>(null);

  const statsList: StatDetail[] = [
    {
      name: 'PAC',
      rating: 95,
      label: 'Learning Speed',
      description: 'Rapid adaptation to emerging AI frameworks, Next.js releases, and LLM orchestration tools.',
      evidence: [
        'Merged 30+ hotfixes within 15 minutes of report.',
        'Adopted Next.js v16 App Router & Tailwind v4 on launch day.',
        'Built full-stack agentic dashboard in under 48 hours.',
      ],
    },
    {
      name: 'PAS',
      rating: 93,
      label: 'Collaboration',
      description: 'Active communications, system integrations, API designs, and pull request audits.',
      evidence: [
        '273+ code reviews conducted as GSSoC 2026 Admin.',
        'Coordinated integration of Supabase Auth & WebSockets across frontend.',
        'Maintained active community communications on WhatsApp agents.',
      ],
    },
    {
      name: 'SHO',
      rating: 97,
      label: 'Shipping Projects',
      description: 'Exceptional project completion rate, taking abstract designs directly to deployment.',
      evidence: [
        'Shipped Late-Meet Chrome extension (38★, 88 forks).',
        'Built Aven Multi-Agent platform and Chat-Buddy UI.',
        'Published chat-buddy package directly to npm.',
      ],
    },
    {
      name: 'DEF',
      rating: 88,
      label: 'Bug Fixing',
      description: 'Refactoring systems, tracing memory leaks, and configuring secure database policies.',
      evidence: [
        'Resolved 120+ issues on active repos.',
        'Secured Supabase row-level security (RLS) tables.',
        'Designed custom secure proxy endpoints in Next.js.',
      ],
    },
    {
      name: 'DRI',
      rating: 96,
      label: 'UI Creativity',
      description: 'Crafting responsive layouts, parallax interactions, custom cursors, and neural networks.',
      evidence: [
        'Authored Canvas constellations and GSAP magnetics.',
        'Designed custom dark-glassmorphism styles.',
        '60 FPS animation fallbacks for high-performance responsive renders.',
      ],
    },
    {
      name: 'PHY',
      rating: 90,
      label: 'Consistency',
      description: 'Sustained contribution streams, daily git check-ins, and high commit velocities.',
      evidence: [
        '1470+ GitHub contributions over the last season.',
        'Maintained code check-in streak of 90+ days.',
        'Active repository maintenance across 18 public repos.',
      ],
    },
  ];

  // 3D Card Hover Effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotX = -y / (rect.height / 30); // Max 30 deg rotation
      const rotY = x / (rect.width / 30);

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 800,
        ease: 'power2.out',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto py-12 px-4 relative">
      
      {/* FUT Card Container */}
      <div className="relative cursor-pointer select-none group w-[290px] sm:w-[320px] h-[450px] sm:h-[500px]">
        {/* Glowing Background Glow */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-[#FFD700]/30 via-emerald-500/20 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
        
        {/* Card Body */}
        <div
          ref={cardRef}
          className="w-full h-full relative rounded-[2.5rem] border border-[#FFD700]/40 backdrop-blur-xl bg-gradient-to-b from-[#181504]/90 via-[#0d0d08]/90 to-black/90 p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_10px_rgba(255,215,0,0.2)] select-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateZ(1px)' }} />
          {/* Fut Card Layout Design */}
          {/* Card Top Info */}
          <div className="flex justify-between items-start pt-4" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                94
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-white/70 uppercase tracking-widest font-bold mt-1">
                AI
              </span>
              <div className="w-6 h-px bg-white/20 my-2" />
              {/* Flag India */}
              <div className="w-5 h-3.5 bg-gradient-to-b from-[#FF9933] via-white to-[#128807] rounded-sm relative shadow-sm border border-black/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
              </div>
              {/* Club Logo */}
              <div className="w-7 h-7 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center mt-3 p-1 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                <img src="/soccer_ball.png" alt="Soccer" className="w-full h-full object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" />
              </div>
            </div>

            {/* Portrait Frame */}
            <div className="relative w-[150px] sm:w-[170px] h-[190px] sm:h-[210px] rounded-2xl overflow-hidden border border-[#FFD700]/10 bg-black/40 shadow-inner">
              <Image
                src="/developer_portrait.jpg"
                alt="Shouri Chakraborty"
                fill
                sizes="170px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d08] via-transparent to-transparent" />
            </div>
          </div>

          {/* Name & Divider */}
          <div className="text-center mt-2" style={{ transform: 'translateZ(40px)' }}>
            <h3 className="text-white text-xl sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
              SHOURI
            </h3>
            <span className="text-[9px] text-[#FFD700]/70 uppercase tracking-widest font-mono font-bold block mt-1">
              AI Software Engineer
            </span>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent my-3" />
          </div>

          {/* Attributes Grid */}
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-2.5 px-4 mb-4"
            style={{ transform: 'translateZ(30px)' }}
          >
            {statsList.map((stat) => (
              <div
                key={stat.name}
                onClick={() => setSelectedStat(stat)}
                className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg border border-white/5 bg-white/2 hover:bg-[#FFD700]/5 hover:border-[#FFD700]/30 transition-all duration-300 group/item cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#FFD700] font-bold group-hover/item:scale-110 transition-transform">
                    {stat.rating}
                  </span>
                  <span className="text-white/60 tracking-wider font-semibold font-mono uppercase">
                    {stat.name}
                  </span>
                </div>
                <span className="text-[8px] text-white/30 uppercase tracking-wider text-right font-mono truncate max-w-[65px] group-hover/item:text-white/70">
                  {stat.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Details / Evidence Card */}
      <div className="grow max-w-lg w-full flex flex-col justify-center min-h-[350px]">
        {selectedStat ? (
          <div className="bg-[#0b0b0b] border border-[#FFD700]/30 rounded-3xl p-6 md:p-8 relative shadow-2xl animate-[fadeIn_0.4s_ease-out]">
            <button
              onClick={() => setSelectedStat(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-[#FFD700] font-mono">
                {selectedStat.rating}
              </span>
              <div>
                <h4 className="text-white text-lg font-bold uppercase tracking-wider">
                  {selectedStat.label}
                </h4>
                <span className="text-[10px] text-[#FFD700]/70 uppercase font-mono tracking-widest">
                  Stat Type: {selectedStat.name}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 border-b border-white/5 pb-4">
              {selectedStat.description}
            </p>

            {/* Evidence items */}
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-1 flex items-center gap-1.5">
                <Shield size={12} className="text-[#FFD700]" />
                GitHub Verified Evidence
              </h5>
              {selectedStat.evidence.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-white/2 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors"
                >
                  <span className="text-[#FFD700] text-xs font-mono mt-0.5">#{idx + 1}</span>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border border-white/5 bg-white/1 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 text-white/40 min-h-[300px] select-none">
            <Sparkles className="w-10 h-10 text-[#FFD700]/30 animate-pulse" />
            <h4 className="text-white/70 font-semibold tracking-wider">Ultimate Stats Evaluator</h4>
            <p className="text-xs max-w-xs leading-relaxed">
              Click on any of the ratings (PAC, PAS, SHO, DEF, DRI, PHY) on Shouri&apos;s Developer Card to inspect verified open-source and professional evidence.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
