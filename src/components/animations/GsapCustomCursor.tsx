'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function GsapCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // CR fix: guard localStorage for SSR — Next.js server renders this component
    const checkPreference = () => {
      if (typeof window !== "undefined") {
        const isCursorDisabled = localStorage.getItem("disable_custom_cursor") === "true";
        setTimeout(() => setDisabled(isCursorDisabled), 0);
      }
    };
    checkPreference();
    window.addEventListener("cursor_preference_change", checkPreference);
    return () => window.removeEventListener("cursor_preference_change", checkPreference);
  }, []);

  useEffect(() => {
    if (disabled) {
      document.body.classList.remove('nocursor');
      return;
    }

    // Check if device supports hover/mouse pointer
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) {
      document.body.classList.remove('nocursor');
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 0);
    document.body.classList.add('nocursor');

    const dot = dotRef.current;
    const glow = glowRef.current;

    if (!dot || !glow) return;

    // Use GSAP quickTo for 60fps lag-free tracking
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });

    const xGlowTo = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power3.out' });
    const yGlowTo = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset cursor elements by half their width/height to center them
      xDotTo(e.clientX - 4);
      yDotTo(e.clientY - 4);

      xGlowTo(e.clientX - 20);
      yGlowTo(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Expand cursor over interactive targets
      const isLink = target.closest('a') || target.closest('button') || target.closest('[role="button"]') || target.classList.contains('cursor-pointer');
      
      if (isLink) {
        gsap.to(dot, { scale: 1.5, backgroundColor: '#ffffff', duration: 0.2 });
        gsap.to(glow, { 
          scale: 1.8, 
          borderColor: '#ffffff', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
          duration: 0.2 
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.closest('[role="button"]') || target.classList.contains('cursor-pointer');

      if (isLink) {
        gsap.to(dot, { scale: 1, backgroundColor: '#DEDBC8', duration: 0.2 });
        gsap.to(glow, { 
          scale: 1, 
          borderColor: '#DEDBC8', 
          backgroundColor: 'transparent',
          boxShadow: '0 0 0px rgba(222, 219, 200, 0)',
          duration: 0.2 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.classList.remove('nocursor');
      clearTimeout(timer);
    };
  // CR fix: include `disabled` so listeners are added/removed when prop changes
  }, [disabled]);

  // Always render elements so refs are assigned on mount, but control visibility via opacity
  const showCursor = isVisible && !disabled;

  return (
    <>
      {/* Inner Dot Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-10000 mix-blend-difference transition-opacity duration-300"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
      {/* Outer Glow Ring */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/60 rounded-full pointer-events-none z-9999 select-none transition-opacity duration-300"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </>
  );
}
