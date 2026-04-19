"use client";

import { Mail, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function FooterSection() {
  return (
    <footer
      id="connect"
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-black text-[#DEDBC8] pt-20 pb-10 border-t border-white/5"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 mix-blend-screen pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="/videos/footer_bg.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-10 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mt-10">
        <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-6 leading-none">
          Let&apos;s{" "}
          <span className="font-serif italic font-normal text-white">
            Connect
          </span>
        </h2>
        <p className="text-gray-400 max-w-lg mb-12 text-sm md:text-base">
          Always open to discussing new projects, creative ideas or
          opportunities to be part of your visions.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-16">
          <a
            href="https://github.com/shouri123"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#DEDBC8] hover:border-[#DEDBC8]/30 hover:bg-white/[0.06] transition-all duration-300 group"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#DEDBC8] hover:border-[#DEDBC8]/30 hover:bg-white/[0.06] transition-all duration-300 group"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#DEDBC8] hover:border-[#DEDBC8]/30 hover:bg-white/[0.06] transition-all duration-300 group"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#DEDBC8] hover:border-[#DEDBC8]/30 hover:bg-white/[0.06] transition-all duration-300 group"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

        {/* Text Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-20 text-xs md:text-sm uppercase tracking-widest font-medium">
          <a
            href="mailto:hello@example.com"
            className="hover:text-white flex items-center gap-1 group transition-colors duration-300"
          >
            Email
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="https://github.com/shouri123"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 group transition-colors duration-300"
          >
            Github
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 group transition-colors duration-300"
          >
            LinkedIn
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1 group transition-colors duration-300"
          >
            Instagram
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-white/30 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} Shouri. All rights reserved.</p>
          <p>Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
}
