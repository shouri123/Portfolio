'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GsapMagnetic from './animations/GsapMagnetic';
import { ChevronDown, Download } from 'lucide-react';

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Connect', href: '#connect' },
  ];

  useEffect(() => {
    // 1. Entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }

    // 2. Scroll listener for glassmorphism trigger
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // 3. IntersectionObserver for active section underlines
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section fills middle of screen
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ['about', 'tech-stack', 'projects', 'blog', 'connect'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Smooth scroll using Lenis
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-100 transition-all duration-500 w-[92%] sm:w-auto max-w-[1200px] pointer-events-auto rounded-full border ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-6 py-2'
          : 'bg-transparent border-transparent px-4 py-3'
      }`}
    >
      <div
        ref={containerRef}
        className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-10"
      >
        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4 md:gap-6">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <GsapMagnetic key={link.name} strength={15}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-[10px] sm:text-xs font-semibold tracking-widest uppercase relative px-2.5 py-3 block transition-colors duration-300 ${
                    isActive ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Underline Indicator */}
                  <span
                    className={`absolute bottom-1 left-2.5 right-2.5 h-[2px] bg-[#00ff66] transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100 shadow-[0_0_8px_#00ff66]' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </GsapMagnetic>
            );
          })}
        </div>

        {/* Resume Dropdown Button */}
        <GsapMagnetic strength={10}>
          <div className="relative group/resume">
            <button className="text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 hover:bg-[#00ff66] hover:text-black transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,102,0.05)]">
              <Download className="w-3 h-3" />
              <span>Resume</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover/resume:rotate-180" />
            </button>

            {/* Dropdown Options */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-xl py-2 opacity-0 scale-95 pointer-events-none group-hover/resume:opacity-100 group-hover/resume:scale-100 group-hover/resume:pointer-events-auto transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-101">
              <a
                href="/resume-ats.pdf"
                download
                className="flex items-center justify-between px-4 py-2.5 text-[11px] uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>ATS Resume (PDF)</span>
                <span className="text-[8px] text-[#00ff66] border border-[#00ff66]/30 px-1 py-0.5 rounded">CLEAN</span>
              </a>
              <a
                href="/resume-pretty.pdf"
                download
                className="flex items-center justify-between px-4 py-2.5 text-[11px] uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>Visual Resume (PDF)</span>
                <span className="text-[8px] text-purple-400 border border-purple-400/30 px-1 py-0.5 rounded">pretty</span>
              </a>
            </div>
          </div>
        </GsapMagnetic>
      </div>
    </nav>
  );
}
