"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Gsap3DTilt({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rotXTo = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
    const rotYTo = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      // Calculate cursor position as a ratio between -0.5 and 0.5
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // 12 degree maximum rotation for subtle tilt
      rotXTo(y * -12);
      rotYTo(x * 12);
    };

    const handleMouseLeave = () => {
      // Return to flat smoothly
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`[perspective:1200px] w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
