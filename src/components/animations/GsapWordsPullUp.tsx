"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapWordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export default function GsapWordsPullUp({ text, className = "", showAsterisk = false }: GsapWordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Find all the word-wraps inside this container
      gsap.fromTo(
        ".word-inner",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <span className="word-inner inline-block relative">
            {word}
            {showAsterisk && i === words.length - 1 && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-primary">
                *
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
