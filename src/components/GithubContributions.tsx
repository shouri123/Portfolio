"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Generate a mock contribution grid (52 weeks x 7 days)
function generateContributions(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random: more 0s, fewer high values
      const rand = Math.random();
      if (rand < 0.35) week.push(0);
      else if (rand < 0.6) week.push(1);
      else if (rand < 0.8) week.push(2);
      else if (rand < 0.93) week.push(3);
      else week.push(4);
    }
    weeks.push(week);
  }
  return weeks;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-white/[0.03]",
  1: "bg-[#DEDBC8]/15",
  2: "bg-[#DEDBC8]/30",
  3: "bg-[#DEDBC8]/55",
  4: "bg-[#DEDBC8]/85",
};

export default function GithubContributions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contributions = useRef(generateContributions());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contrib-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-16 md:py-24 px-4 md:px-8 border-t border-white/5"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto contrib-section">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-[#E1E0CC] text-2xl md:text-4xl font-bold tracking-tight">
              GitHub{" "}
              <span className="font-serif italic font-normal text-[#DEDBC8]">
                Activity
              </span>
            </h2>
            <p className="text-gray-500 mt-2 text-xs md:text-sm">
              Contribution graph from the past year.
            </p>
          </div>

          {/* Legend */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-white/25 uppercase tracking-widest">
            Less
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[level]}`}
              />
            ))}
            More
          </div>
        </div>

        {/* Contribution Grid */}
        <div className="rounded-2xl md:rounded-[1.5rem] border border-white/8 bg-[#0a0a0a] p-4 md:p-6 overflow-x-auto">
          <div className="flex gap-[3px] min-w-[720px]">
            {contributions.current.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[level]} transition-colors duration-200 hover:ring-1 hover:ring-[#DEDBC8]/30`}
                    title={`Week ${wi + 1}, Day ${di + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-6 md:mt-8">
          {[
            { label: "Total Contributions", value: "847+" },
            { label: "Longest Streak", value: "23 days" },
            { label: "Public Repos", value: "12" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[#DEDBC8] text-xl md:text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/20 text-[10px] md:text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
