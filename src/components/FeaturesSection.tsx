"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";
import GsapWordsPullUpMultiStyle from "./animations/GsapWordsPullUpMultiStyle";
import Gsap3DTilt from "./animations/Gsap3DTilt";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card entrance animation
      gsap.fromTo(
        ".feature-card",
        { scale: 0.95, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // triggers slightly before scrolling into full view
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators.", className: "text-[#DEDBC8] block" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500 block" }
  ];

  return (
    <section id="features" className="relative min-h-screen bg-black px-4 md:px-6 py-20 pb-32 overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-12 sm:mb-16 md:mb-20 text-center flex flex-col gap-2">
          <GsapWordsPullUpMultiStyle segments={headerSegments} />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-4 lg:gap-3 lg:h-[480px]">
          
          {/* Card 1 - Video Component */}
          <Gsap3DTilt className="feature-card h-[400px] md:h-[450px] lg:h-full">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 bg-[#101010]">
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                autoPlay
                loop
                muted
                playsInline
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-[#E1E0CC] text-xl font-medium tracking-tight">Engineering the Future.</h3>
              </div>
            </div>
          </Gsap3DTilt>

          {/* Card 2 - GenAI & Agentics */}
          <Gsap3DTilt className="feature-card h-[400px] md:h-[450px] lg:h-full">
            <div className="w-full h-full bg-[#212121] rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:bg-[#252525] transition-colors duration-300">
              <div>
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon 1" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-12 mix-blend-screen opacity-80" />
                <h3 className="text-[#DEDBC8] text-xl md:text-2xl font-medium mb-8">GenAI & Agents. <span className="text-gray-600 text-sm align-top ml-1">(01)</span></h3>
                <ul className="space-y-4">
                  {["LLM Reasoning & RAG", "Coding Agent Systems", "Advanced NLP Modularity", "Prompt Engineering Mastery"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="text-[#DEDBC8] shrink-0 w-4 h-4 mt-1" />
                      <span className="text-gray-400 text-sm md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#" className="flex justify-between items-center text-[#DEDBC8] text-sm md:text-sm font-medium hover:text-white transition-colors uppercase tracking-wide mt-8">
                Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
              </a>
            </div>
          </Gsap3DTilt>

          {/* Card 3 - Tech Stack */}
          <Gsap3DTilt className="feature-card h-[400px] md:h-[450px] lg:h-full">
            <div className="w-full h-full bg-[#212121] rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:bg-[#252525] transition-colors duration-300">
              <div>
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon 2" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-12 mix-blend-screen opacity-80" />
                <h3 className="text-[#DEDBC8] text-xl md:text-2xl font-medium mb-8">Core Tech Stack. <span className="text-gray-600 text-sm align-top ml-1">(02)</span></h3>
                <ul className="space-y-4">
                  {["Python, C++, Java", "Next.js, React, TypeScript", "Flask, REST APIs", "MySQL, Supabase"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="text-[#DEDBC8] shrink-0 w-4 h-4 mt-1" />
                      <span className="text-gray-400 text-sm md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#" className="flex justify-between items-center text-[#DEDBC8] text-sm md:text-sm font-medium hover:text-white transition-colors uppercase tracking-wide mt-8">
                Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
              </a>
            </div>
          </Gsap3DTilt>

          {/* Card 4 - Projects */}
          <Gsap3DTilt className="feature-card h-[400px] md:h-[450px] lg:h-full">
            <div className="w-full h-full bg-[#212121] rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:bg-[#252525] transition-colors duration-300">
              <div>
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon 3" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-12 mix-blend-screen opacity-80" />
                <h3 className="text-[#DEDBC8] text-xl md:text-2xl font-medium mb-8">Recent Projects. <span className="text-gray-600 text-sm align-top ml-1">(03)</span></h3>
                <ul className="space-y-4">
                  {["Late-Meet (AI Copilot)", "Aven (TypeScript Platform)", "JAVA-Practice Architecture", "House-Prediction-App"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="text-[#DEDBC8] shrink-0 w-4 h-4 mt-1" />
                      <span className="text-gray-400 text-sm md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="https://github.com/shouri123" target="_blank" className="flex justify-between items-center text-[#DEDBC8] text-sm md:text-sm font-medium hover:text-white transition-colors uppercase tracking-wide mt-8">
                View Github <ArrowRight className="w-4 h-4 -rotate-45" />
              </a>
            </div>
          </Gsap3DTilt>

        </div>
      </div>
    </section>
  );
}
