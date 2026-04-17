"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Segment {
  text: string;
  className?: string; // We can apply font-serif italic etc. here
}

interface GsapWordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export default function GsapWordsPullUpMultiStyle({ segments, className = "" }: GsapWordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".multi-word-inner",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [segments]);

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap justify-center ${className}`}>
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wordIdx) => (
          <div key={`${segIdx}-${wordIdx}`} className="overflow-hidden inline-block mr-[0.25em] mb-2 sm:mb-0">
            <span className={`multi-word-inner inline-block ${segment.className || ""}`}>
              {word}
            </span>
          </div>
        ));
      })}
    </div>
  );
}
