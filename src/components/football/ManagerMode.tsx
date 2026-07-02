'use client';

import React, { useState } from 'react';
import { Landmark, Plus, Minus, Cpu, Award, Zap, Code, ShieldCheck } from 'lucide-react';
import GsapMagnetic from '../animations/GsapMagnetic';

interface StackItem {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export default function ManagerMode() {
  const [budget, setBudget] = useState(100);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pitchResult, setPitchResult] = useState<string | null>(null);

  const featuresList: StackItem[] = [
    { id: 'agent', name: 'AI Agent Orchestrator', cost: 25, description: 'Multi-agent MAMWA split-pane interfaces.' },
    { id: 'voice', name: 'Voice Assistant SDK', cost: 20, description: 'Local voice filtration & whisper transcription.' },
    { id: 'rag', name: 'RAG Knowledge DB', cost: 18, description: 'Vector embeddings matching offline local logs.' },
    { id: 'browser', name: 'Browser Automation', cost: 22, description: 'Autonomous browser agents executing tasks.' },
    { id: 'vision', name: 'Vision AI Integration', cost: 15, description: 'Real-time image classification and OCR scanners.' },
    { id: 'collab', name: 'Real-time Collaboration', cost: 20, description: 'Supabase WebSockets for multi-user sync.' },
  ];

  const handleSelectFeature = (feat: StackItem) => {
    if (selectedFeatures.includes(feat.id)) {
      // Remove it, restore budget
      setSelectedFeatures((prev) => prev.filter((id) => id !== feat.id));
      setBudget((prev) => prev + feat.cost);
    } else {
      // Check budget
      if (budget >= feat.cost) {
        setSelectedFeatures((prev) => [...prev, feat.id]);
        setBudget((prev) => prev - feat.cost);
      } else {
        alert('Insufficient coin budget! Adjust your lineup.');
      }
    }
    setPitchResult(null);
  };

  const handleBuildStartup = () => {
    if (selectedFeatures.length === 0) {
      alert('Please recruit at least one feature into your squad!');
      return;
    }

    // Generate simulated pitch
    const names = selectedFeatures.map((id) => featuresList.find((f) => f.id === id)!.name);
    
    let description = '';
    if (selectedFeatures.includes('agent') && selectedFeatures.includes('browser')) {
      description = `A self-correcting terminal agent that spins up autonomous browser nodes to complete research, scrape market data, and deploy server configurations with zero human intervention.`;
    } else if (selectedFeatures.includes('voice') && selectedFeatures.includes('rag')) {
      description = `A conversational privacy-first voice assistant that indexes local documents into vector storage, providing real-time answers without querying external servers.`;
    } else if (selectedFeatures.includes('agent') && selectedFeatures.includes('collab')) {
      description = `A real-time workspace where teams pair program alongside cooperative AI agents who audit pull requests, write test specs, and broadcast state changes dynamically.`;
    } else {
      description = `An advanced intelligence stack bridging ${names.slice(0, 2).join(' and ')} to automate workflows, optimize resource routing, and deliver high-performance user interfaces.`;
    }

    const generatedPitch = `This is the startup Shouri would build with your lineup:\n\n"${description}"\n\nEquipped with these custom components, Shouri can deliver a functional prototype of this concept in under 2 weeks.`;
    setPitchResult(generatedPitch);
  };

  const handleReset = () => {
    setBudget(100);
    setSelectedFeatures([]);
    setPitchResult(null);
  };

  return (
    <div className="w-full bg-black py-20 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: List of items */}
        <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-[#FFD700]/20 bg-[#FFD700]/5 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
            <Landmark size={12} />
            Manager Mode Stack Selection
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white mb-6">
            DRAFT FEATURE SQUAD & <br />
            <span className="font-serif italic font-normal text-[#FFD700]">Build Startups</span>
          </h3>

          <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xl mb-8">
            You are Shouri&apos;s manager. Draft features into the next product lineup with a budget of <strong>100 Coins</strong>. When you are done, compile your stack to see what startup Shouri will construct.
          </p>

          {/* Budget Meter */}
          <div className="w-full max-w-lg bg-white/2 border border-white/5 p-4 rounded-2xl mb-8 flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-white/50 tracking-wider">Remaining Squad Budget</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#FFD700] font-sans">
                {budget}
              </span>
              <span className="text-[10px] uppercase font-mono text-white/40">Coins</span>
            </div>
          </div>

          {/* Features Selection List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
            {featuresList.map((feat) => {
              const selected = selectedFeatures.includes(feat.id);
              return (
                <div
                  key={feat.id}
                  onClick={() => handleSelectFeature(feat)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-start gap-4 ${
                    selected
                      ? 'bg-[#FFD700]/5 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.05)]'
                      : 'bg-white/2 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="grow">
                    <h4 className="text-white text-xs font-black uppercase tracking-wider">{feat.name}</h4>
                    <p className="text-[9px] text-white/40 leading-relaxed font-sans mt-1">{feat.description}</p>
                    <span className="text-[10px] text-[#FFD700] font-bold font-mono mt-2 block">
                      Cost: {feat.cost} Coins
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    selected ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'border-white/10 text-white/45'
                  }`}>
                    {selected ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Simulated AI output */}
        <div className="w-full lg:w-5/12 flex justify-center items-center">
          <div className="w-full max-w-sm bg-[#0c0d08] border border-[#FFD700]/20 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl min-h-[350px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFD700]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Cpu className="text-[#FFD700] w-5 h-5" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Product Board Console</span>
            </div>

            {pitchResult ? (
              <div className="grow flex flex-col justify-between animate-[fadeIn_0.4s_ease-out]">
                <div className="flex flex-col gap-3">
                  <span className="text-[#FFD700] text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5">
                    <ShieldCheck size={12} />
                    STARTUP ARCHITECTURE RECRUITED
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans whitespace-pre-line">
                    {pitchResult}
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <GsapMagnetic strength={10}>
                    <button
                      onClick={handleReset}
                      className="text-[10px] font-bold tracking-widest uppercase bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      Draft New Stack
                    </button>
                  </GsapMagnetic>
                </div>
              </div>
            ) : (
              <div className="grow flex flex-col items-center justify-center gap-4 text-center text-white/40 select-none py-10">
                <Zap className="w-10 h-10 text-[#FFD700]/30 animate-bounce" />
                <h4 className="text-white/60 font-semibold tracking-wider text-xs uppercase">Build Console Idle</h4>
                <p className="text-[10px] max-w-xs leading-relaxed">
                  Recruit features on the left to decrease your remaining coin budget, then compile your selections to generate a startup concept.
                </p>

                <GsapMagnetic strength={15}>
                  <button
                    onClick={handleBuildStartup}
                    className="w-full bg-[#FFD700] text-black font-extrabold uppercase tracking-widest text-[10px] rounded-full py-3.5 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 cursor-pointer shadow-[0_4px_12px_rgba(255,215,0,0.1)] mt-4"
                  >
                    Compile Stack
                  </button>
                </GsapMagnetic>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
