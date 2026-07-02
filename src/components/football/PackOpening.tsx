'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Trophy, Plus, RefreshCw, X, Code, ExternalLink, Activity, Package, Star } from 'lucide-react';

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
}

interface PackOpeningProps {
  projects: Project[];
}

export default function PackOpening({ projects }: PackOpeningProps) {
  const [packStatus, setPackStatus] = useState<'idle' | 'opening' | 'opened'>('idle');
  const [openedProject, setOpenedProject] = useState<Project | null>(null);
  
  const packRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeProjects = projects.filter(p => p.is_active !== false);

  const handleOpenPack = () => {
    if (packStatus !== 'idle') return;

    setPackStatus('opening');

    // Select a random project
    const randProj = activeProjects[Math.floor(Math.random() * activeProjects.length)];
    setOpenedProject(randProj);

    // Opening animation sequence
    const pack = packRef.current;
    if (!pack) return;

    const tl = gsap.timeline();

    // Shake the pack
    tl.to(pack, { x: -10, duration: 0.05, repeat: 5, yoyo: true })
      .to(pack, { x: 10, duration: 0.05, repeat: 5, yoyo: true })
      // Grow and pulse gold flares
      .to(pack, { scale: 1.15, duration: 0.5, ease: 'power2.out' })
      .call(() => {
        setPackStatus('opened');
        // Animate card entrance
        setTimeout(() => {
          if (cardRef.current) {
            gsap.fromTo(
              cardRef.current,
              { scale: 0.3, opacity: 0, rotationY: 180 },
              { scale: 1, opacity: 1, rotationY: 0, duration: 0.85, ease: 'back.out(1.2)' }
            );
          }
        }, 100);
      });
  };

  const handleClosePack = () => {
    setPackStatus('idle');
    setOpenedProject(null);
  };

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {packStatus === 'idle' && (
        <div className="flex flex-col items-center gap-6 max-w-md animate-[fadeIn_0.5s_ease-out]">
          <Trophy className="text-[#FFD700] w-12 h-12 animate-pulse" />
          <h3 className="text-2xl font-black uppercase text-white tracking-wider">
            GOLD PROJECTS PACK
          </h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
            Unlock premium developer items! Open this pack to reveal a random project card with ratings, metrics, and source links.
          </p>

          {/* FUT Card Pack Graphic */}
          <div
            ref={packRef}
            onClick={handleOpenPack}
            className="w-[170px] h-[240px] bg-gradient-to-b from-[#FFD700] via-[#c5a059] to-[#806020] rounded-2xl shadow-[0_15px_35px_rgba(255,215,0,0.15)] flex flex-col justify-between p-4 border-2 border-white/30 cursor-pointer select-none hover:scale-105 transition-all duration-300 relative group"
          >
            {/* Gloss shine */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex justify-between items-center text-[8px] font-bold text-black uppercase font-mono">
              <span>ULTIMATE PACK</span>
              <span>85+ OVR</span>
            </div>
            <div className="flex flex-col items-center justify-center grow relative">
              <div className="absolute inset-0 bg-[#FFD700]/20 blur-xl rounded-full" />
              <Package className="w-12 h-12 text-black drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)] relative z-10" strokeWidth={1.5} />
              <span className="text-black font-black text-sm uppercase tracking-widest mt-3 block font-mono relative z-10 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
                DEV PACK
              </span>
            </div>
            <div className="bg-black/90 text-[#FFD700] text-[9px] font-black uppercase tracking-widest text-center py-1 rounded border border-[#FFD700]/30">
              OPEN PACK
            </div>
          </div>
        </div>
      )}

      {packStatus === 'opening' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0 bg-radial-gradient from-[#FFD700]/20 via-transparent to-transparent animate-pulse duration-700" />
          <div className="relative w-20 h-20 flex items-center justify-center z-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#FFD700]/30 border-t-[#FFD700] animate-spin" />
            <Sparkles className="w-8 h-8 text-[#FFD700] animate-pulse drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
          </div>
          <p className="text-[#FFD700] text-xs font-mono uppercase tracking-widest animate-pulse mt-6 z-10 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            Opening Gold Pack...
          </p>
        </div>
      )}

      {packStatus === 'opened' && openedProject && (
        <div className="flex flex-col items-center gap-8 w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
          
          {/* Revealed FUT Card */}
          <div
            ref={cardRef}
            className="w-[260px] h-[370px] bg-gradient-to-b from-[#181504] via-[#0d0d08] to-black border border-[#FFD700]/30 rounded-[2rem] p-5 flex flex-col justify-between relative shadow-[0_15px_40px_rgba(255,215,0,0.15)] overflow-hidden"
          >
            {/* Header rating badge */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-[#FFD700] leading-none drop-shadow">
                  94
                </span>
                <span className="text-[8px] font-mono text-white/50 uppercase mt-0.5 font-bold">
                  PROJ
                </span>
              </div>
              <div className="w-5 h-3.5 bg-gradient-to-b from-[#FF9933] via-white to-[#128807] rounded-sm border border-black/10 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900" />
              </div>
            </div>

            {/* Project title */}
            <div className="text-center mt-3">
              <span className="text-[8px] text-[#FFD700] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-1 mb-1 drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]">
                <Star size={10} className="fill-[#FFD700]" /> SPECIAL ICON
              </span>
              <h4 className="text-white text-base font-black uppercase tracking-wider truncate max-w-[200px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {openedProject.title}
              </h4>
            </div>

            {/* Description list */}
            <p className="text-white/60 text-[10px] leading-relaxed line-clamp-4 text-center my-3 max-w-[220px] mx-auto font-sans">
              {openedProject.description}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap justify-center gap-1 my-2">
              {openedProject.tech_stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-white/5 border border-white/10 text-white/60 text-[8px] px-1.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project stats */}
            <div className="flex justify-around items-center border-t border-white/5 pt-3 text-[10px] font-mono text-white/40">
              <div>
                <strong className="text-white">{openedProject.stars ?? 8}</strong> Stars
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div>
                <strong className="text-white">{openedProject.forks ?? 3}</strong> Forks
              </div>
            </div>
          </div>

          {/* Action Button Links */}
          <div className="flex gap-4">
            <a
              href={openedProject.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all px-4 py-2.5 rounded-full flex items-center gap-1.5"
            >
              <ExternalLink size={12} />
              <span>Launch App</span>
            </a>
            <button
              onClick={handleClosePack}
              className="text-[10px] font-bold tracking-widest uppercase bg-[#FFD700] text-black hover:bg-white transition-all px-4 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Open Another Pack</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
