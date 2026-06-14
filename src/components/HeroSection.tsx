"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import GsapWordsPullUp from "@/components/animations/GsapWordsPullUp";
import GsapMagnetic from "@/components/animations/GsapMagnetic";
import GsapSeamlessVideo from "@/components/animations/GsapSeamlessVideo";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

      // Parallax effect on the video wrapper
      gsap.to(".video-parallax-container", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden" ref={containerRef}>
      <div className="video-parallax-container absolute inset-0 w-full h-[115%]">
        {/* Background Seamless Loop Video */}
        <GsapSeamlessVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Overlays */}
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80 z-10" />

      {/* Global Navbar */}
      <Navbar />

      {/* Bottom Content Grid */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 lg:p-16 w-full flex flex-col md:flex-row justify-between items-end gap-8">
        
        {/* Left Column: Heading */}
        <div className="w-full md:w-8/12">
          <h1 className="sr-only">Shouri Chakraborty | AI Developer & Software Engineer Portfolio</h1>
          <GsapWordsPullUp 
            text="Shouri" 
            showAsterisk 
            className="text-[#E1E0CC] text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[17vw] font-medium leading-[0.85] tracking-[-0.07em]"
          />
        </div>

        {/* Right Column: Description & CTA */}
        <div className="w-full md:w-4/12 flex flex-col gap-5 pb-2 md:pb-6">
          {/* Availability Badge */}
          <div className="hero-fade-up flex items-center gap-2 border border-white/10 bg-white/3 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/80 font-bold">
              Available for Internships & OSS
            </span>
          </div>

          {/* Stats Bar */}
          <div className="hero-fade-up grid grid-cols-3 gap-2 border-y border-white/10 py-4 my-1">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">273+</h4>
              <p className="text-[8px] uppercase tracking-widest text-white/40 mt-1 font-mono">PR Reviews</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">18</h4>
              <p className="text-[8px] uppercase tracking-widest text-white/40 mt-1 font-mono">Repos</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">847+</h4>
              <p className="text-[8px] uppercase tracking-widest text-white/40 mt-1 font-mono">Commits</p>
            </div>
          </div>

          <p className="hero-fade-up text-primary/70 text-xs sm:text-sm md:text-base leading-relaxed">
            Diving deep into Generative AI, Agentic systems, AI/ML, and NLP. I love exploring new tools, experimenting with emerging tech, and building things that make computers feel a little smarter.
          </p>
          
          <div className="hero-fade-up w-fit mt-2">
            <GsapMagnetic strength={40}>
              <button 
                onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-primary text-black rounded-full pl-6 pr-2 py-2 flex items-center justify-between gap-8 sm:gap-10 hover:bg-white transition-colors duration-300"
              >
                <span className="font-medium text-sm sm:text-base">Let&apos;s Connect</span>
                <div className="bg-black text-primary rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight size={18} />
                </div>
              </button>
            </GsapMagnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
