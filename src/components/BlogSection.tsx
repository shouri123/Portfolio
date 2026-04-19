"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "Building AI Agents with OpenAI SDK",
    excerpt:
      "A deep dive into constructing personality-driven AI agents with memory, guardrails, and tool-based architecture.",
    date: "Apr 2026",
    tag: "AI / Agents",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Multi-Agent Architecture Patterns",
    excerpt:
      "Exploring MAMWA — Multi-Agent Multi-Window Architecture — for sophisticated agentic workflows.",
    date: "Mar 2026",
    tag: "System Design",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Chrome Extensions & Real-Time Audio",
    excerpt:
      "How I built Late-Meet: a local-first meeting intelligence companion using VAD and streaming transcription.",
    date: "Feb 2026",
    tag: "Web / Extensions",
    readTime: "6 min read",
  },
];

export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-20 md:py-32 px-4 md:px-8 border-t border-white/5"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">
            From the{" "}
            <span className="font-serif italic font-normal text-[#DEDBC8]">
              Lab
            </span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg">
            Thoughts, experiments, and deep dives into the systems I build.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group cursor-pointer"
            >
              <div className="h-full rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-white/8 bg-[#101010] hover:bg-[#141414] transition-all duration-500 flex flex-col p-6 md:p-7">
                {/* Tag + Read Time */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#DEDBC8]/50 border border-white/8 px-3 py-1 rounded-full bg-white/[0.02]">
                    {post.tag}
                  </span>
                  <span className="text-[9px] md:text-[10px] tracking-wider text-white/20 uppercase">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[#DEDBC8] text-lg md:text-xl font-semibold tracking-tight mb-3 group-hover:text-white transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-serif italic">
                    {post.date}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/25 group-hover:text-[#DEDBC8]/70 transition-colors duration-300">
                    Read
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
