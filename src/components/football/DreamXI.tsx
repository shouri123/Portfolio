'use client';

import React, { useState } from 'react';
import { Plus, X, Users, RefreshCw, Share2 } from 'lucide-react';

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
}

interface PitchSlot {
  id: string;
  position: string; // e.g. LW, CAM, CDM, CB
  top: string;      // CSS percentage from top
  left: string;     // CSS percentage from left
}

const FORMATIONS: Record<string, PitchSlot[]> = {
  '4-3-3': [
    { id: 'st', position: 'ST', top: '15%', left: '50%' },
    { id: 'lw', position: 'LW', top: '22%', left: '20%' },
    { id: 'rw', position: 'RW', top: '22%', left: '80%' },
    { id: 'cam', position: 'CAM', top: '42%', left: '50%' },
    { id: 'lcm', position: 'LCM', top: '50%', left: '30%' },
    { id: 'rcm', position: 'RCM', top: '50%', left: '70%' },
    { id: 'lb', position: 'LB', top: '75%', left: '15%' },
    { id: 'lcb', position: 'LCB', top: '78%', left: '38%' },
    { id: 'rcb', position: 'RCB', top: '78%', left: '62%' },
    { id: 'rb', position: 'RB', top: '75%', left: '85%' },
    { id: 'gk', position: 'GK', top: '90%', left: '50%' },
  ],
  '3-5-2': [
    { id: 'lst', position: 'ST', top: '15%', left: '40%' },
    { id: 'rst', position: 'ST', top: '15%', left: '60%' },
    { id: 'lm', position: 'LM', top: '42%', left: '15%' },
    { id: 'cam', position: 'CAM', top: '38%', left: '50%' },
    { id: 'rm', position: 'RM', top: '42%', left: '85%' },
    { id: 'ldm', position: 'LDM', top: '55%', left: '35%' },
    { id: 'rdm', position: 'RDM', top: '55%', left: '65%' },
    { id: 'lcb', position: 'LCB', top: '78%', left: '25%' },
    { id: 'cb', position: 'CB', top: '78%', left: '50%' },
    { id: 'rcb', position: 'RCB', top: '78%', left: '75%' },
    { id: 'gk', position: 'GK', top: '90%', left: '50%' },
  ],
  '4-2-3-1': [
    { id: 'st', position: 'ST', top: '15%', left: '50%' },
    { id: 'lam', position: 'LAM', top: '32%', left: '22%' },
    { id: 'cam', position: 'CAM', top: '30%', left: '50%' },
    { id: 'ram', position: 'RAM', top: '32%', left: '78%' },
    { id: 'ldm', position: 'LDM', top: '55%', left: '35%' },
    { id: 'rdm', position: 'RDM', top: '55%', left: '65%' },
    { id: 'lb', position: 'LB', top: '75%', left: '15%' },
    { id: 'lcb', position: 'LCB', top: '78%', left: '38%' },
    { id: 'rcb', position: 'RCB', top: '78%', left: '62%' },
    { id: 'rb', position: 'RB', top: '75%', left: '85%' },
    { id: 'gk', position: 'GK', top: '90%', left: '50%' },
  ],
};

interface DreamXIProps {
  projects: Project[];
}

export default function DreamXI({ projects }: DreamXIProps) {
  const [formation, setFormation] = useState<string>('4-3-3');
  const [squad, setSquad] = useState<Record<string, Project>>({});
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const activeProjects = projects.filter(p => p.is_active !== false);
  const slots = FORMATIONS[formation];

  const handleSelectProject = (project: Project) => {
    if (!activeSlotId) return;

    setSquad((prev) => ({
      ...prev,
      [activeSlotId]: project,
    }));
    setActiveSlotId(null);
  };

  const handleRemoveProject = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSquad((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const handleReset = () => {
    setSquad({});
    setActiveSlotId(null);
  };

  const handleShare = () => {
    const text = `Check out my Dream Shouri XI lineup from Shouri's portfolio! | https://devshouri.in`;
    navigator.clipboard.writeText(text);
    alert('Lineup description copied to clipboard! Share it with your developer friends.');
  };

  return (
    <div className="w-full bg-black py-20 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Formations & Selection list */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-[#FFD700]/20 bg-[#FFD700]/5 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
            <Users size={12} />
            Dream XI Roster Builder
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white mb-6">
            BUILD YOUR <br />
            <span className="font-serif italic font-normal text-[#FFD700]">Dream Shouri XI</span>
          </h3>

          <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
            Click on any slot on the pitch to assign one of Shouri&apos;s projects. Try different formations to set up your ideal startup stack!
          </p>

          {/* Formation Selectors */}
          <div className="flex gap-2 mb-6">
            {Object.keys(FORMATIONS).map((name) => (
              <button
                key={name}
                onClick={() => {
                  setFormation(name);
                  setSquad({});
                }}
                className={`text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border cursor-pointer transition-all ${
                  formation === name
                    ? 'bg-[#FFD700] text-black border-[#FFD700]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Project Selector Drawer (Shown when slot is active) */}
          {activeSlotId ? (
            <div className="w-full bg-[#0a0a0a] border border-[#FFD700]/30 rounded-3xl p-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">
                  Select Project for {slots.find(s => s.id === activeSlotId)?.position}
                </span>
                <button
                  onClick={() => setActiveSlotId(null)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                {activeProjects.map((project) => {
                  const isAssigned = Object.values(squad).some(p => p.id === project.id);
                  return (
                    <button
                      key={project.id}
                      disabled={isAssigned}
                      onClick={() => handleSelectProject(project)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex justify-between items-center transition-all cursor-pointer ${
                        isAssigned
                          ? 'opacity-40 border-white/5 bg-transparent cursor-not-allowed'
                          : 'border-white/5 bg-white/2 hover:bg-[#FFD700]/5 hover:border-[#FFD700]/30'
                      }`}
                    >
                      <span className="font-bold text-white uppercase">{project.title}</span>
                      <span className="text-[9px] text-white/40 uppercase">Select</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="text-[10px] font-bold tracking-widest uppercase bg-[#FFD700] text-black hover:bg-white transition-all px-5 py-3 rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 size={12} />
                <span>Share Lineup</span>
              </button>
              <button
                onClick={handleReset}
                className="text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all px-5 py-3 rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Reset Squad</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Football Pitch visualizer */}
        <div className="w-full lg:w-7/12 flex justify-center items-center relative">
          {/* Glow Behind Pitch */}
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl pointer-events-none rounded-[3rem]" />
          
          {/* Tactical Pitch Board */}
          <div className="w-full max-w-[420px] h-[550px] relative bg-gradient-to-b from-emerald-900 via-emerald-950 to-black border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(0,0,0,0.6)] p-4 overflow-hidden select-none backdrop-blur-xl">
            {/* Pitch Markings */}
            {/* Touchlines */}
            <div className="absolute inset-4 border-2 border-white/20 pointer-events-none" />
            {/* Center Line */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-white/20 pointer-events-none" />
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30 pointer-events-none" />
            {/* Penalty Box Top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-44 h-24 border-2 border-t-0 border-white/20 pointer-events-none" />
            {/* Penalty Box Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-24 border-2 border-b-0 border-white/20 pointer-events-none" />

            {/* Slots */}
            {slots.map((slot) => {
              const assignedProject = squad[slot.id];
              return (
                <div
                  key={slot.id}
                  onClick={() => setActiveSlotId(slot.id)}
                  style={{ top: slot.top, left: slot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer group"
                >
                  {assignedProject ? (
                    <div className="relative w-12 h-12 rounded-full border-2 border-[#FFD700] bg-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      {/* Close button to remove from squad */}
                      <button
                        onClick={(e) => handleRemoveProject(slot.id, e)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center border-2 border-black hover:bg-red-600 transition-colors shadow-md z-20"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                      <span className="text-[10px] text-white font-extrabold tracking-tighter uppercase font-mono">
                        {assignedProject.title.substring(0, 3)}
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/30 hover:border-[#FFD700] bg-black/50 hover:bg-black flex items-center justify-center transition-all">
                      <Plus className="w-4 h-4 text-white/40 group-hover:text-[#FFD700]" />
                    </div>
                  )}

                  {/* Position Tag */}
                  <span className="bg-black/90 text-[8px] font-bold px-1.5 py-0.5 rounded border border-white/10 text-white font-mono uppercase tracking-wider">
                    {assignedProject ? assignedProject.title.substring(0, 8) : slot.position}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
