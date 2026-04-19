"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GsapMagnetic from "./animations/GsapMagnetic";

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const links = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Connect", href: "#connect" },
  ];

  useEffect(() => {
    // Entrance animation for the navbar items
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
      <div 
        ref={containerRef}
        className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 pointer-events-auto"
      >
        {links.map((link) => (
          <GsapMagnetic key={link.name} strength={30}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[11px] sm:text-xs md:text-sm font-medium tracking-widest uppercase relative px-2 py-3 block group"
              style={{ color: "rgba(225, 224, 204, 0.7)" }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#E1E0CC]">
                {link.name}
              </span>
              <span className="absolute bottom-1 left-0 w-full h-[1px] bg-[#E1E0CC] transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left" />
            </a>
          </GsapMagnetic>
        ))}
      </div>
    </nav>
  );
}

