'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface VarReplayProps {
  projectName: string;
  starsCount: number;
  onComplete: () => void;
}

export default function VarReplay({ projectName, starsCount, onComplete }: VarReplayProps) {
  const [logIndex, setLogIndex] = useState(0);
  const [decision, setDecision] = useState(false);

  const logs = [
    `Checking source code registration for ${projectName}...`,
    `Verifying GitHub repository authenticity...`,
    `Auditing stats: ${starsCount} stars check...`,
    `Analysing commit tree branch integrity...`,
  ];

  useEffect(() => {
    // Stage logs sequentially
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(logInterval);
          setDecision(true);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(logInterval);
  }, [logs.length]);

  useEffect(() => {
    if (decision) {
      // Hold decision on screen for 1 second, then exit
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [decision, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black/90 flex flex-col justify-center items-center select-none font-mono">
      {/* Scanline pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_5px]" />
      
      {/* Outer monitor frame */}
      <div className="w-[90%] max-w-[500px] border-4 border-white/20 bg-black/80 rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(255,215,0,0.1)] relative">
        <div className="absolute top-4 left-4 flex gap-1.5 items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">LIVE VAR CONTROL</span>
        </div>
        <div className="absolute top-4 right-4 text-[10px] text-white/40 font-mono">
          FEED_01_SYS
        </div>

        {/* VAR Badge */}
        <div className="bg-[#FFD700] text-black font-black text-xs px-3 py-1 rounded-sm tracking-widest uppercase mt-4">
          VAR REVIEW
        </div>

        {/* Video monitor screen view */}
        <div className="w-full h-[150px] border border-white/10 bg-zinc-950/80 rounded-lg flex flex-col justify-center items-center p-4 relative overflow-hidden">
          
          {decision ? (
            <div className="text-center flex flex-col items-center gap-2 animate-[scaleIn_0.3s_ease-out]">
              <ShieldCheck className="text-emerald-400 w-12 h-12 animate-bounce" />
              <span className="text-emerald-400 text-base font-black tracking-widest uppercase">
                GOAL // MERGED
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#FFD700] animate-spin" />
              <span className="text-white/80 text-xs uppercase tracking-widest">
                Reviewing Play
              </span>
            </div>
          )}
        </div>

        {/* Review progress logs */}
        <div className="w-full flex flex-col gap-2.5 text-[10px] sm:text-xs text-white/60">
          {logs.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#FFD700] font-bold">{`>`}</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
