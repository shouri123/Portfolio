"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);


gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  live_url: string;
  source_code_url?: string;
  tech_stack: string[];
  theme_color: string;
  is_active?: boolean;
}

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const activeProjects = projects.filter((p) => p.is_active !== false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, scale: 0.96 },
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
  }, [activeProjects]);

  // Modal open animation
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedProject]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = "";
        },
      });
    } else {
      setSelectedProject(null);
      document.body.style.overflow = "";
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
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 mix-blend-screen pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/project_bg.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />

        <div className="relative z-20 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">
              Active{" "}
              <span className="font-serif italic font-normal text-[#DEDBC8]">
                Builds
              </span>
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg">
              A curated selection of live projects, experiments, and open-source
              contributions.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="project-card group cursor-pointer"
                onClick={() => openProject(project)}
              >
                <div className="h-full rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#101010] hover:bg-[#151515] transition-all duration-500 flex flex-col relative">
                  {/* Card Header - Mac Window */}
                  <div className="h-10 md:h-11 border-b border-white/5 bg-[#1a1a1a] flex items-center px-4 md:px-5 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/80 transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 group-hover:bg-green-500/80 transition-colors duration-300" />
                    </div>
                    <div className="mx-auto text-[9px] md:text-[10px] text-white/25 font-medium tracking-[0.2em] uppercase">
                      {project.live_url.replace("https://", "").replace("http://", "").split("/")[0]}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[#DEDBC8] text-xl md:text-2xl font-semibold tracking-tight group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#DEDBC8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-400/80 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {project.tech_stack.map((ts: string) => (
                        <span
                          key={ts}
                          className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#E1E0CC]/50 border border-white/8 px-3 py-1.5 rounded-full bg-white/[0.02] group-hover:border-white/15 group-hover:text-[#E1E0CC]/70 transition-all duration-300"
                        >
                          {ts}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row: GitHub icon */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                      <span className="text-[10px] text-white/20 uppercase tracking-widest">
                        Click to preview
                      </span>
                      {project.source_code_url && (
                        <a
                          href={project.source_code_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/30 hover:text-[#DEDBC8] transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expanded Project Modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={closeProject}
        >
          <div
            ref={modalRef}
            className="relative w-[95vw] h-[90vh] max-w-[1400px] bg-[#0a0a0a] rounded-2xl md:rounded-[2rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="h-12 md:h-14 border-b border-white/5 bg-[#111] flex items-center px-5 md:px-8 shrink-0">
              <div className="flex gap-2 mr-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors" onClick={closeProject} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <span className="text-[10px] md:text-xs text-white/30 tracking-[0.2em] uppercase font-medium">
                  {selectedProject.live_url.replace("https://", "").replace("http://", "")}
                </span>
              </div>

              <button
                onClick={closeProject}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-200"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Project Info Bar */}
            <div className="px-5 md:px-8 py-4 md:py-5 border-b border-white/5 bg-[#0d0d0d] flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
              <div>
                <h3 className="text-[#DEDBC8] text-lg md:text-2xl font-semibold tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-1">
                  {selectedProject.description}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {selectedProject.source_code_url && (
                  <a
                    href={selectedProject.source_code_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#DEDBC8] border border-white/10 hover:border-white/20 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source
                  </a>
                )}
                <a
                  href={selectedProject.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-black bg-[#DEDBC8] hover:bg-white px-4 py-2 rounded-full transition-all duration-300 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit
                </a>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 relative bg-black">
              <div className="absolute inset-0 flex items-center justify-center text-white/10 text-xs tracking-widest animate-pulse uppercase">
                Loading Preview...
              </div>
              <iframe
                src={selectedProject.live_url}
                className="w-full h-full border-none relative z-10"
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
                title={`${selectedProject.title} live preview`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
