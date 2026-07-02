'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CareerModePreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Powering up floodlights...');

  useEffect(() => {
    // Progress counter
    const obj = { value: 0 };
    const progressTween = gsap.to(obj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => setProgress(Math.floor(obj.value)),
    });

    // Animate status text
    const statusTimeline = gsap.timeline();
    statusTimeline
      .to({}, { duration: 0.5, onComplete: () => setStatusText('Powering up floodlights...') })
      .to({}, { duration: 0.6, onComplete: () => setStatusText('Tuning crowd chants...') })
      .to({}, { duration: 0.6, onComplete: () => setStatusText('Drafting squad lineup...') })
      .to({}, { duration: 0.5, onComplete: () => setStatusText('Entering Career Mode...') });

    // Exit transition
    const exitTween = gsap.timeline({
      delay: 2.4,
      onComplete: onComplete,
    });

    // Wipe down screen wipe animation
    exitTween.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });

    return () => {
      progressTween.kill();
      statusTimeline.kill();
      exitTween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#020202] text-white flex flex-col justify-between items-center py-20 px-6 overflow-hidden select-none font-mono"
    >
      {/* Stadium Grid Overlay & Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,100,0,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(0,100,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-radial-gradient from-emerald-500/10 via-transparent to-transparent blur-3xl opacity-60" />
      
      {/* Stadium Floodlights glow (animated sweeps) */}
      <div className="absolute top-0 left-1/4 w-[100px] h-[500px] bg-linear-to-b from-white/10 to-transparent -skew-x-[25deg] blur-md pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-1/4 w-[100px] h-[500px] bg-linear-to-b from-white/10 to-transparent skew-x-[25deg] blur-md pointer-events-none animate-pulse" />

      {/* Header Info */}
      <div className="relative z-10 text-center">
        <h4 className="text-[10px] tracking-[0.3em] text-[#FFD700] uppercase font-bold">
          Career Mode Selection
        </h4>
        <h3 className="text-2xl font-bold tracking-widest uppercase text-white mt-2">
          Dev Career FC ⚽
        </h3>
      </div>

      {/* Central progress container */}
      <div className="relative z-10 w-full max-w-[500px] flex flex-col items-center gap-4">
        {/* Animated Soccer Ball indicator */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#FFD700]/30 border-t-[#FFD700] animate-spin" />
          <img
            src="/soccer_ball.png"
            alt="World Cup Soccer Ball"
            className="w-8 h-8 object-cover animate-bounce"
          />
        </div>

        {/* Loading details */}
        <div className="text-center w-full">
          <span className="text-[#FFD700] font-bold text-3xl font-sans tracking-tighter">
            {progress}%
          </span>
          <p className="text-xs text-white/50 mt-2 min-h-[16px] uppercase tracking-wider font-mono">
            {statusText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 border border-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FFD700] shadow-[0_0_12px_#FFD700] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom context details */}
      <div className="relative z-10 text-[9px] text-white/30 uppercase tracking-widest text-center">
        <span>loading season 2026 // devshouri.in</span>
      </div>
    </div>
  );
}
