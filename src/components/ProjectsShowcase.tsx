"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsShowcase({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      
      const totalWidth = track.scrollWidth - window.innerWidth;
      
      // Horizontal Scroll pinning logic
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          // Calculate the end scrolling distance based on total width 
          end: () => `+=${totalWidth}`,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} className="h-screen w-full bg-black overflow-hidden relative border-t border-white/5">
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
        <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">Active <span className="font-serif italic font-normal text-[#DEDBC8]">Builds</span></h2>
      </div>
      
      <div ref={trackRef} className="flex h-full items-center pt-20 px-[10vw] gap-[8vw] md:gap-[15vw] w-fit">
        {projects.map((project, i) => (
          <div key={project.id} className="w-[85vw] md:w-[65vw] h-[60vh] md:h-[65vh] shrink-0 relative group">
            
            {/* The Outer GSAP Mac Window Frame */}
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-[#101010] flex flex-col relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.01]">
              
              {/* Window Header */}
              <div className="h-10 md:h-12 border-b border-white/5 bg-[#1a1a1a] flex items-center px-4 md:px-6 gap-2 shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                </div>
                <div className="mx-auto text-[10px] md:text-xs text-white/30 font-medium tracking-widest uppercase">
                  {project.live_url.replace('https://', '')}
                </div>
              </div>
              
              {/* IFRAME Container */}
              <div className="flex-1 relative w-full bg-black">
                {/* Fallback loader */}
                <div className="absolute inset-0 flex items-center justify-center text-white/10 text-sm font-medium tracking-widest animate-pulse">
                  INITIALIZING INSTANCE...
                </div>
                
                <iframe 
                  src={project.live_url} 
                  className="w-full h-full border-none relative z-10 pointer-events-auto mix-blend-lighten opacity-90 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Hover Context Info Box */}
            <div className="absolute sm:-bottom-8 sm:-right-8 bottom-4 right-4 w-64 md:w-80 bg-[#151515]/95 backdrop-blur-xl p-5 md:p-8 rounded-2xl border border-white/10 z-20 shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 transition-all duration-700 ease-out pointer-events-none">
               <h3 className="text-[#DEDBC8] text-lg md:text-xl font-medium mb-3 md:mb-4">{project.title}</h3>
               <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">{project.description}</p>
               <div className="flex flex-wrap gap-2">
                 {project.tech_stack.map((ts: string) => (
                   <span key={ts} className="text-[9px] md:text-[10px] tracking-wider uppercase text-[#E1E0CC]/60 border border-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-black/50">{ts}</span>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
