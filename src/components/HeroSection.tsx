"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import GsapWordsPullUp from "@/components/animations/GsapWordsPullUp";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the text and button elements after the heading pull-ups
      gsap.fromTo(
        ".hero-fade-up",
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out", 
          stagger: 0.2,
          delay: 0.5 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen p-4 md:p-6 bg-black" ref={containerRef}>
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Overlays */}
        <div className="noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

        {/* Global Navbar */}
        <Navbar />

        {/* Bottom Content Grid */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 lg:p-16 w-full flex flex-col md:flex-row justify-between items-end gap-8">
          
          {/* Left Column: Heading */}
          <div className="w-full md:w-8/12">
            <GsapWordsPullUp 
              text="Shouri" 
              showAsterisk 
              className="text-[#E1E0CC] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] font-medium leading-[0.85] tracking-[-0.07em]"
            />
          </div>

          {/* Right Column: Description & CTA */}
          <div className="w-full md:w-4/12 flex flex-col gap-6 md:gap-8 pb-2 md:pb-6">
            <p className="hero-fade-up text-primary/70 text-xs sm:text-sm md:text-base leading-snug">
              Diving deep into Generative AI, Agentic systems, AI/ML, and NLP. I love exploring new tools, experimenting with emerging tech, and building things that make computers feel a little smarter.
            </p>
            
            <button className="hero-fade-up group bg-[#DEDBC8] text-black rounded-full pl-6 pr-2 py-2 flex items-center justify-between w-fit gap-8 sm:gap-10 hover:gap-12 transition-all duration-300">
              <span className="font-medium text-sm sm:text-base">Let's Connect</span>
              <div className="bg-black text-[#DEDBC8] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
