'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Global styles for the cinematic preloader
const CinematicStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&display=swap');
    
    .font-preloader-serif {
      font-family: var(--font-instrument), serif;
      font-style: italic;
    }

    .font-preloader-sans {
      font-family: var(--font-almarai), sans-serif;
    }

    /* Liquid Glass Button */
    .liquid-glass {
      background: rgba(255, 255, 255, 0.01);
      background-blend-mode: luminosity;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: none;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .liquid-glass::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(180deg,
        rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
        rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
        rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .liquid-glass:hover {
      background: rgba(255, 255, 255, 0.04);
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15);
    }

    .liquid-glass:active {
      transform: scale(0.98);
    }
  `}</style>
);

const StaggeredFade = ({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const characters = Array.from(text);

  return (
    <span ref={ref} className="inline-block">
      {characters.map((char, index) => {
        const displayChar = char === ' ' ? '\u00A0' : char;
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              duration: 0.8,
              delay: delayOffset + index * 0.05,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="inline-block"
          >
            {displayChar}
          </motion.span>
        );
      })}
    </span>
  );
};

export default function GsapPreloader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleBegin = () => {
    setIsExiting(true);
    // Let the exit animation finish before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-[#010101] text-white flex flex-col justify-between"
        >
          <CinematicStyles />

          {/* Background Video */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <video
              className="w-full h-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Brand header */}
          <header className="relative z-20 flex w-full items-center justify-between px-6 py-6 md:py-10">
            <div>
              <h1 className="uppercase font-light tracking-[0.25em] text-white text-xs md:text-sm">
                Dev Career FC // 2026
              </h1>
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-white/50 uppercase">
                System Boot Sequence
              </span>
            </div>
          </header>

          {/* Center Main Heading & Details */}
          <section className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 max-w-4xl mx-auto my-auto gap-8">
            <h2 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight flex flex-col items-center uppercase select-none">
              <span className="block overflow-hidden font-preloader-sans font-light">
                <StaggeredFade text="SHOURI" delayOffset={0.2} />
              </span>
              <span className="block overflow-hidden font-preloader-serif font-normal text-primary">
                <StaggeredFade text="CHAKRABORTY" delayOffset={0.5} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-white/70 font-light leading-relaxed max-w-md text-xs sm:text-sm md:text-base font-preloader-sans"
            >
              An odyssey through generative AI, agentic systems,
              <br className="hidden sm:block" />
              and modern interfaces, driven by curiosity and build-first design.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              onClick={handleBegin}
              className="liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase tracking-[0.18em] text-[10px] sm:text-xs font-medium mt-4 cursor-pointer"
            >
              Begin the Experience
            </motion.button>
          </section>

          {/* Footer watermark */}
          <footer className="relative z-20 w-full px-6 py-6 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest">
            <span>© 2026 SHOURI</span>
            <span>engineered for the future</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
