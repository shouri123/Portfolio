"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, GitPullRequest, Users, Award } from "lucide-react";

export default function GssocBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, badgeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={badgeRef}
      className="relative overflow-hidden w-full max-w-xl rounded-2xl border border-[#ff9900]/20 bg-[#ff9900]/5 p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:border-[#ff9900]/40 group"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff9900]/10 rounded-full blur-2xl group-hover:bg-[#ff9900]/20 transition-all duration-500" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Left Side: Icon Shield */}
        <div className="flex items-center justify-center p-3.5 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/30 text-[#ff9900] group-hover:scale-110 transition-transform duration-500">
          <Award size={28} className="animate-[pulse_3s_infinite]" />
        </div>

        {/* Center: Title & Role */}
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-[#ff9900] bg-[#ff9900]/10 px-2 py-0.5 rounded border border-[#ff9900]/20 font-bold uppercase tracking-wider">
              GSSoC 2026
            </span>
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              OFFICIAL CREW
            </span>
          </div>
          <h4 className="text-white text-base md:text-lg font-bold tracking-tight mt-1.5">
            GirlScript Summer of Code
          </h4>
          <p className="text-[#DEDBC8]/70 text-xs mt-0.5 flex items-center gap-1 font-mono">
            <ShieldCheck size={12} className="text-[#ff9900]" /> Program Administrator
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-mono">PR Reviews</span>
          <span className="text-[#ff9900] text-sm md:text-base font-bold font-mono mt-0.5 flex items-center gap-1">
            <GitPullRequest size={12} /> 273+
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-mono">Repos Managed</span>
          <span className="text-white text-sm md:text-base font-bold font-mono mt-0.5">
            18+
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-mono">Mentoring</span>
          <span className="text-white text-sm md:text-base font-bold font-mono mt-0.5 flex items-center gap-1">
            <Users size={12} className="text-white/40" /> 100+
          </span>
        </div>
      </div>
    </div>
  );
}
