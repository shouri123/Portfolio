'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X, ArrowUpRight, Star, GitFork, AlertCircle, Play } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  live_url: string;
  source_code_url?: string;
  tech_stack: string[];
  theme_color: string;
  is_active?: boolean;
  stars?: number;
  forks?: number;
  issues?: number;
}

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const activeProjects = projects.filter((p) => p.is_active !== false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for project cards
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Count-up animation for stats
      gsap.utils.toArray('.stat-counter').forEach((el: any) => {
        const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: targetVal,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeProjects]);

  // Modal open animation
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      setIframeLoading(true);
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedProject]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = 'unset';
        },
      });
    } else {
      setSelectedProject(null);
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative w-full bg-black overflow-hidden py-20 md:py-32 px-4 md:px-8 border-t border-white/5"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 mix-blend-screen pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/project_bg.mp4"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black pointer-events-none z-10" />

        <div className="relative z-20 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">
              Active{' '}
              <span className="font-serif italic font-normal text-primary">Builds</span>
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg">
              A curated selection of live projects, experiments, and open-source contributions with real-time metrics.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="project-card group cursor-pointer"
                onClick={() => openProject(project)}
              >
                <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-bg-card hover:bg-[#151515] transition-all duration-500 flex flex-col relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {/* Card Header - Mac Window */}
                  <div className="h-10 md:h-11 border-b border-white/5 bg-[#171717] flex items-center px-4 md:px-5 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/80 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 group-hover:bg-green-500/80 transition-colors duration-300" />
                    </div>
                    <div className="mx-auto text-[9px] md:text-[10px] text-white/20 font-medium tracking-[0.2em] uppercase">
                      {project.live_url.replace('https://', '').replace('http://', '').split('/')[0]}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-primary text-xl md:text-2xl font-semibold tracking-tight group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#00ff66] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-400/80 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech_stack.map((ts: string) => (
                        <span
                          key={ts}
                          className="text-[9px] md:text-[10px] tracking-[0.12em] uppercase text-[#E1E0CC]/50 border border-white/8 px-3 py-1 rounded-full bg-white/2"
                        >
                          {ts}
                        </span>
                      ))}
                    </div>

                    {/* Quantitative Stats Row */}
                    {(project.stars !== undefined || project.forks !== undefined) && (
                      <div className="flex items-center gap-6 border-t border-white/5 pt-4 mt-auto">
                        {project.stars !== undefined && (
                          <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <Star className="w-3.5 h-3.5 text-yellow-500/80 fill-yellow-500/20" />
                            <span
                              className="stat-counter font-mono font-bold"
                              data-target={project.stars}
                            >
                              0
                            </span>{' '}
                            stars
                          </div>
                        )}
                        {project.forks !== undefined && (
                          <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <GitFork className="w-3.5 h-3.5 text-blue-500/80" />
                            <span
                              className="stat-counter font-mono font-bold"
                              data-target={project.forks}
                            >
                              0
                            </span>{' '}
                            forks
                          </div>
                        )}
                        {project.issues !== undefined && (
                          <div className="flex items-center gap-1.5 text-xs text-white/60">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                            <span
                              className="stat-counter font-mono font-bold"
                              data-target={project.issues}
                            >
                              0
                            </span>{' '}
                            issues
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expanded Split-Screen Project Modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={closeProject}
        >
          <div
            ref={modalRef}
            className="relative w-full h-full max-w-[1400px] bg-[#070707] rounded-2xl md:rounded-4xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="h-12 md:h-14 border-b border-white/5 bg-bg-card flex items-center justify-between px-5 md:px-8 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={closeProject}
                  className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 cursor-pointer transition-colors"
                  aria-label="Close"
                />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
                <span className="text-[10px] font-mono text-white/40 ml-4 hidden sm:inline">
                  {selectedProject.title.toLowerCase().replace(/\s+/g, '_')}_case_study.md
                </span>
              </div>

              <span className="text-[9px] md:text-[10px] text-white/20 font-medium tracking-[0.2em] uppercase truncate max-w-[200px] sm:max-w-none">
                {selectedProject.live_url.replace('https://', '').replace('http://', '')}
              </span>

              <button
                onClick={closeProject}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Split Screen Container */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Column: Case Study Data */}
              <div className="w-full lg:w-[32%] border-r border-white/5 flex flex-col bg-[#0b0b0b] overflow-y-auto p-6 md:p-8 select-text">
                <div className="flex flex-col gap-6">
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-primary text-2xl font-bold tracking-tight mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-[#00ff66] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                      Tech Stack Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech_stack.map((ts) => (
                        <span
                          key={ts}
                          className="text-[9px] tracking-wider text-white/70 border border-white/10 px-2.5 py-1 rounded bg-white/2"
                        >
                          {ts}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem Statement */}
                  {selectedProject.problem && (
                    <div className="border-t border-white/5 pt-4">
                      <h4 className="text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        The Problem
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {selectedProject.solution && (
                    <div className="border-t border-white/5 pt-4">
                      <h4 className="text-[#00ff66] text-[10px] font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-[#00ff66]/10" />
                        Our Solution
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}

                  {/* Impact */}
                  {selectedProject.impact && (
                    <div className="border-t border-white/5 pt-4">
                      <h4 className="text-purple-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                        Quantifiable Impact
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed border-l-2 border-purple-500/50 pl-3 italic">
                        {selectedProject.impact}
                      </p>
                    </div>
                  )}

                  {/* Star/Fork metrics inside Case Study */}
                  {(selectedProject.stars !== undefined || selectedProject.forks !== undefined) && (
                    <div className="border-t border-white/5 pt-4 flex gap-4">
                      {selectedProject.stars !== undefined && (
                        <div className="text-xs text-white/50">
                          <span className="font-mono font-bold text-white block text-sm">
                            {selectedProject.stars}
                          </span>
                          GitHub Stars
                        </div>
                      )}
                      {selectedProject.forks !== undefined && (
                        <div className="text-xs text-white/50">
                          <span className="font-mono font-bold text-white block text-sm">
                            {selectedProject.forks}
                          </span>
                          Forks Created
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto">
                    {selectedProject.source_code_url && (
                      <a
                        href={selectedProject.source_code_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white border border-white/10 hover:border-white/20 py-2.5 rounded-lg transition-all"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Code Repository
                      </a>
                    )}
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black bg-primary hover:bg-white py-2.5 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Iframe */}
              <div className="grow h-[45vh] lg:h-full relative bg-black">
                {/* motionsites.ai video background preview overlay wrapper */}
                <div className="absolute inset-0 bg-[#070707] z-0 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-tr from-[#110022]/15 via-black/80 to-[#00ff66]/5 z-10 pointer-events-none" />
                  <div className="absolute w-[200px] h-[200px] rounded-full bg-[#00ff66]/5 blur-3xl" />
                  {iframeLoading && (
                    <div className="relative z-20 flex flex-col items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff66]"></span>
                      </span>
                      <span className="text-[10px] font-mono text-[#00ff66] tracking-[0.2em] uppercase">
                        CONNECTING LIVE PREVIEW
                      </span>
                    </div>
                  )}
                </div>

                <iframe
                  src={selectedProject.live_url}
                  className={`w-full h-full border-none relative z-10 transition-opacity duration-500 ${
                    iframeLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                  title={`${selectedProject.title} live preview`}
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
