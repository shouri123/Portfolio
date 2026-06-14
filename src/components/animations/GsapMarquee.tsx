"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapMarquee({ items, speed = 20 }: { items: string[]; speed?: number }) {
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (xPercent.current < -100) {
        xPercent.current = 0;
      } else if (xPercent.current > 0) {
        xPercent.current = -100;
      }
      
      gsap.set(firstTextRef.current, { xPercent: xPercent.current });
      gsap.set(secondTextRef.current, { xPercent: xPercent.current });
      
      // RequestAnimation frame updates speed smoothly
      animationFrameId = requestAnimationFrame(animate);
      xPercent.current += speed * direction.current * 0.01;
    };
    
    // Reverse scroll direction automatically on scroll up
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        direction.current = -1;
      } else {
        direction.current = 1;
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div className="relative overflow-hidden w-full flex bg-bg-card py-6 md:py-8 border-y border-white/5">
      <div ref={sliderRef} className="relative whitespace-nowrap flex m-0 text-3xl sm:text-4xl md:text-5xl font-serif italic text-primary/50 uppercase tracking-wider">
        <div ref={firstTextRef} className="flex gap-16 px-8 items-center">
          {items.map((item, i) => (
            <span key={`first-${i}`} className="inline-block">{item} <span className="ml-16 text-primary/20">•</span></span>
          ))}
        </div>
        <div ref={secondTextRef} className="flex gap-16 px-8 items-center absolute left-full">
          {items.map((item, i) => (
            <span key={`second-${i}`} className="inline-block">{item} <span className="ml-16 text-primary/20">•</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}
