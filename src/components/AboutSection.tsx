"use client";

import GsapWordsPullUpMultiStyle from "@/components/animations/GsapWordsPullUpMultiStyle";
import GsapScrollRevealChars from "@/components/animations/GsapScrollRevealChars";
import Gsap3DTilt from "@/components/animations/Gsap3DTilt";
import Image from "next/image";
import GssocBadge from "@/components/GssocBadge";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AboutSection() {
  const router = useRouter();
  const clickCountRef = useRef(0);

  const handlePhotoClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      router.push("/admin");
      clickCountRef.current = 0;
    }
  };
  const headingSegments = [
    { text: "I am Shouri Chakraborty," },
    { text: "an aspiring developer.", className: "font-serif italic text-white" },
    { text: "I love exploring AI systems and building tools that make computers feel smarter." }
  ];

  return (
    <section id="about" className="w-full bg-black py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#0a0a0a] rounded-4xl md:rounded-[3rem] p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 border border-white/5 text-center lg:text-left">
        
        {/* Left Column: Bio & Core details */}
        <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start">
          <h2 className="text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Engineering & AI // About
          </h2>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-[1.1] mb-8 text-primary">
            <GsapWordsPullUpMultiStyle segments={headingSegments} />
          </h3>

          <div className="w-full max-w-2xl">
            <GsapScrollRevealChars 
              text="Curiosity. I enjoy breaking concepts down, trying bold ideas, and pushing boundaries with AI. Whether it’s a new tool, a coding agent, or a fresh model architecture — if it’s interesting, I’m jumping in. Currently studying Computer Science at IEM Kolkata while actively contributing to open source ecosystems."
              className="text-primary/80 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left font-medium"
            />
          </div>
          
          {/* Quick bullet points */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 w-full text-left mb-8">
            <div>
              <h5 className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Institution</h5>
              <p className="text-white text-xs sm:text-sm mt-1">IEM Kolkata (BCA)</p>
            </div>
            <div>
              <h5 className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Focus Areas</h5>
              <p className="text-white text-xs sm:text-sm mt-1">GenAI, Agents, NLP</p>
            </div>
          </div>

          <GssocBadge />
        </div>

        {/* Right Column: Portrait Card with 3D Tilt */}
        <div className="w-full lg:w-5/12 flex justify-center items-center">
          <div className="w-[280px] sm:w-[320px] h-[360px] sm:h-[400px] relative group">
            <Gsap3DTilt>
              {/* Glowing Outline Background */}
              <div className="absolute inset-0 rounded-4xl bg-linear-to-tr from-primary/25 to-zinc-800/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Outer Card Frame */}
              <div className="absolute inset-0 rounded-4xl border border-white/10 bg-bg-card p-4 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                {/* Header decoration */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">profile.jpg</span>
                  <span className="text-[8px] font-mono text-primary/60">ACTIVE_SYS</span>
                </div>

                {/* Portrait Image container */}
                <div 
                  onClick={handlePhotoClick}
                  className="relative grow my-4 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center cursor-pointer select-none"
                >
                  <Image 
                    src="/developer_portrait.jpg" 
                    alt="Shouri Chakraborty portrait" 
                    fill
                    sizes="(max-w-768px) 280px, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card footer details */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="text-white text-xs font-bold tracking-wide">Shouri Chakraborty</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-wider font-mono">Builder // Developer</p>
                  </div>
                  <span className="text-[9px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/20">
                    2026_SYS
                  </span>
                </div>
              </div>
            </Gsap3DTilt>
          </div>
        </div>

      </div>
    </section>
  );
}
