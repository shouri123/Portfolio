'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const PRELOADER_LOGS = [
  { text: 'SYSTEM: Initializing portfolio core...', delay: 0.2 },
  { text: 'NETWORK: Resolving GitHub credentials for shouri123...', delay: 0.6 },
  { text: 'DATABASE: Connecting to Supabase serverless client...', delay: 1.0 },
  { text: 'SOCKET: Listening on real-time pg_changes channels...', delay: 1.4 },
  { text: 'METRICS: Compiling PR counts (273+ reviewed) and 18 repositories...', delay: 1.8 },
  { text: 'ASSETS: Loading video parallax loops from motionsites.ai...', delay: 2.2 },
  { text: 'GSAP: Compiling timeline animations at 60fps...', delay: 2.6 },
  { text: 'STATUS: Shouri Chakraborty portfolio is ready.', delay: 3.0 },
];

export default function GsapPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Simulate progress counter
    const progressCtx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 100,
        duration: 3.5,
        ease: 'power1.inOut',
        onUpdate: () => setProgress(Math.floor(obj.value)),
      });
    });

    // 2. Schedule logs printing
    const timers: NodeJS.Timeout[] = [];
    PRELOADER_LOGS.forEach((log) => {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log.text]);
        if (terminalRef.current) {
          // Keep scrolling to the bottom
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, log.delay * 1000);
      timers.push(timer);
    });

    // 3. Fade out timeline
    const fadeCtx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 3.8,
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    });

    return () => {
      progressCtx.revert();
      fadeCtx.revert();
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-primary font-mono select-none px-6"
    >
      {/* Video Background Loop - Layered underneath */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen pointer-events-none"
      >
        <source src="/preloader-bg.mp4" type="video/mp4" />
        {/* Fallback gradient if video fails */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#110022] via-[#050505] to-[#221e1a]" />
      </video>

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px]" />

      <div className="w-full max-w-[800px] bg-black/60 backdrop-blur-md border border-primary/20 p-6 rounded-lg shadow-[0_0_40px_rgba(222,219,200,0.15)] relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-primary/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-primary/60 ml-2">devshouri.in // boot_sequence.sh</span>
          </div>
          <span className="text-xs text-primary/40">v2.1.0</span>
        </div>

        {/* Console Logs */}
        <div
          ref={terminalRef}
          className="h-[250px] overflow-y-auto pr-2 flex flex-col gap-2 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
        >
          {visibleLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary/40">{`>`}</span>
              <span>{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <span className="text-primary/40">{`>`}</span>
            <span className="w-2 h-4 bg-primary animate-pulse" />
          </div>
        </div>

        {/* Progress & Stats Footer */}
        <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full mr-6">
            <span className="text-xs text-primary/60 min-w-[32px]">{progress}%</span>
            <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
              <div
                className="h-full bg-primary transition-all duration-75 ease-out shadow-[0_0_8px_#DEDBC8]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-primary/60 uppercase tracking-widest min-w-[90px] text-right">
            {progress === 100 ? 'READY' : 'COMPILING'}
          </span>
        </div>
      </div>

      {/* Decorative Matrix Watermark */}
      <div className="absolute bottom-6 right-6 text-[10px] text-primary/20 flex flex-col items-end pointer-events-none select-none font-sans">
        <span>LATENCY: 12ms</span>
        <span>SHOURI CHAKRABORTY // PORTFOLIO ELEVATION</span>
      </div>
    </div>
  );
}
