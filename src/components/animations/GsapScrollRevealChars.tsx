"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapScrollRevealChars({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Split into characters (handling spaces to keep layout)
  const chars = text.split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial opacity
      gsap.set(".char-inner", { opacity: 0.2 });

      // Create a smooth scrub animation that changes opacity as you scroll
      gsap.to(".char-inner", {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {chars.map((char, i) => (
        <span 
          key={i} 
          className="char-inner inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}
