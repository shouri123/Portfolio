"use client";

import GsapWordsPullUpMultiStyle from "@/components/animations/GsapWordsPullUpMultiStyle";
import GsapScrollRevealChars from "@/components/animations/GsapScrollRevealChars";
import Gsap3DTilt from "@/components/animations/Gsap3DTilt";
import Image from "next/image";
import GssocBadge from "@/components/GssocBadge";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AboutSection() {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);

  const handlePhotoClick = () => {
    setClickCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        router.push("/admin");
        return 0;
      }
      return nextCount;
    });
  };
  const headingSegments = [
    { text: "I am Shouri," },
    { text: "an aspiring developer.", className: "font-serif italic text-white" },
    { text: "I love exploring AI systems and building tools that make computers feel smarter." }
  ];

  return (
    <section id="about" className="w-full bg-black py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#0a0a0a] rounded-4xl md:rounded-[3rem] p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 border border-white/5 text-center lg:text-left">
        
        {/* Left Column: Bio & Core details */}
        <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start">
          <p className="text-[#00ff66] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-[#00ff66]/20 bg-[#00ff66]/5 px-3 py-1 rounded-full">
            Engineering & AI
          </p>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-normal leading-[1.1] mb-8 text-primary">
            <GsapWordsPullUpMultiStyle segments={headingSegments} />
          </div>

          <div className="w-full max-w-2xl">
            <GsapScrollRevealChars 
              text="Curiosity. I enjoy breaking concepts down, trying bold ideas, and pushing boundaries with AI. Whether it’s a new tool, a coding agent, or a fresh model architecture — if it’s interesting, I’m jumping in. Currently studying Computer Science at IEM Kolkata while actively contributing to open source ecosystems."
              className="text-primary/80 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left font-medium"
            />
          </div>
          
          {/* Quick bullet points */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 w-full text-left mb-8">
            <div>
              <h5 className="text-[#00ff66] text-xs font-mono font-bold uppercase tracking-wider">Institution</h5>
              <p className="text-white text-xs sm:text-sm mt-1">IEM Kolkata (BCA)</p>
            </div>
            <div>
              <h5 className="text-[#00ff66] text-xs font-mono font-bold uppercase tracking-wider">Focus Areas</h5>
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
              <div className="absolute inset-0 rounded-4xl bg-linear-to-tr from-[#00ff66]/30 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Outer Card Frame */}
              <div className="absolute inset-0 rounded-4xl border border-white/10 bg-bg-card p-4 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                {/* Scanner/Terminal Header decoration */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]/80" />
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">face_scanner.exe</span>
                  </div>
                  <span className="text-[8px] font-mono text-[#00ff66]/60">ONLINE</span>
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
                  {/* Cyber Grid scanning line overlay */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-[#00ff66] opacity-35 animate-[scan_3s_ease-in-out_infinite]" />
                </div>

                {/* Card footer details */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="text-white text-xs font-bold tracking-wide">Shouri Chakraborty</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-wider font-mono">Builder // Developer</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/20">
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
