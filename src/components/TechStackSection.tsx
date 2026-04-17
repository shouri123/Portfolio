"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapWordsPullUpMultiStyle from "./animations/GsapWordsPullUpMultiStyle";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: "Frontend & UI",
    techs: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "GSAP 3", "Framer Motion", "Shadcn/UI"]
  },
  {
    title: "Backend & Data",
    techs: ["Python 3", "Flask", "C++", "Java", "Node.js", "Supabase", "MySQL", "PostgreSQL", "REST APIs"]
  },
  {
    title: "AI, ML & Agentic",
    techs: ["LLM Reasoning", "RAG Systems", "Coding Agents", "NLP Models", "LangChain", "OpenAI APIs", "Vector DBs"]
  },
  {
    title: "Tools & Architecture",
    techs: ["Git / GitHub", "Docker", "Vercel", "AWS / Cloudfront", "System Design", "Chrome Extensions"]
  }
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-category",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const headerSegments = [
    { text: "The engineering", className: "text-gray-500 block" },
    { text: "Foundation", className: "text-[#DEDBC8] block font-serif italic" }
  ];

  return (
    <section id="tech-stack" className="relative w-full min-h-screen bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 mix-blend-screen pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="/videos/tech_bg.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none z-10" />
      <div className="bg-noise absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none z-10" />
      
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32 w-full lg:w-1/3 text-4xl md:text-6xl lg:text-7xl font-normal leading-tight">
          <GsapWordsPullUpMultiStyle segments={headerSegments} />
          <p className="mt-8 text-gray-400 text-sm md:text-base max-w-sm leading-relaxed font-sans">
            A comprehensive overview of the tools, languages, and frameworks leveraged to build scalable architectures and immersive cinematic experiences.
          </p>
        </div>
        
        <div ref={containerRef} className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16">
          {techCategories.map((cat, i) => (
            <div key={i} className="tech-category flex flex-col gap-6 group">
              <h3 className="text-xl md:text-2xl font-medium text-[#E1E0CC] tracking-tight flex items-center border-b border-white/10 pb-4 group-hover:border-[#DEDBC8]/50 transition-colors duration-500">
                <span className="text-white/20 text-xs font-mono mr-4">/{(i+1).toString().padStart(2, '0')}</span>
                {cat.title}
              </h3>
              
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {cat.techs.map((tech, j) => (
                  <li key={j} className="text-xs md:text-sm text-gray-400 border border-white/5 bg-[#151515] px-4 py-2 rounded-full cursor-default hover:text-black hover:bg-[#DEDBC8] transition-all duration-300">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
