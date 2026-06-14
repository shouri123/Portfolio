"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubCalendar } from "react-github-calendar";

gsap.registerPlugin(ScrollTrigger);

const customTheme = {
  dark: [
    "rgba(255, 255, 255, 0.03)", // Level 0
    "rgba(222, 219, 200, 0.15)", // Level 1
    "rgba(222, 219, 200, 0.35)", // Level 2
    "rgba(222, 219, 200, 0.65)", // Level 3
    "rgba(222, 219, 200, 0.95)", // Level 4
  ],
};

export default function GithubContributions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalContributions: "847+",
    longestStreak: "23 days",
    publicRepos: "12"
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    async function loadStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalContributions: `${data.totalContributions}+`,
            longestStreak: `${data.longestStreak} days`,
            publicRepos: String(data.publicRepos)
          });
        }
      } catch (err) {
        console.error("Failed to fetch live GitHub stats:", err);
      }
    }
    loadStats();
    return () => clearTimeout(timer);
  }, []);

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
      <div className="relative z-10 max-w-[1220px] mx-auto contrib-section">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-[#E1E0CC] text-2xl md:text-4xl font-bold tracking-tight">
              GitHub{" "}
              <span className="font-serif italic font-normal text-primary">
                Activity
              </span>
            </h2>
            <p className="text-gray-500 mt-2 text-xs md:text-sm">
              Live contributions fetched directly from Github.
            </p>
          </div>
        </div>

        {/* Contribution Grid */}
        <div className="rounded-2xl md:rounded-3xl border border-white/8 bg-[#0a0a0a] p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[1170px] flex justify-center py-2 w-full">
            {!mounted ? (
              <div className="h-[140px] animate-pulse bg-white/5 rounded-xl w-full flex items-center justify-center border border-white/5">
                <span className="text-xs text-white/30 font-mono">LOADING GITHUB ACTIVITY...</span>
              </div>
            ) : (
              <GitHubCalendar
                username="shouri123"
                colorScheme="dark"
                theme={customTheme}
                blockSize={18}
                blockMargin={4}
                fontSize={14}
              />
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-6 md:mt-8">
          {[
            { label: "Total Contributions", value: stats.totalContributions },
            { label: "Longest Streak", value: stats.longestStreak },
            { label: "Public Repos", value: stats.publicRepos },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-primary text-xl md:text-2xl font-semibold tracking-tight">
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
