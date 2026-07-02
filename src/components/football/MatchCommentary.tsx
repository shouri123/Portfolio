'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Volume2, VolumeX } from 'lucide-react';

const COMMENTARIES = [
  "Shouri receives the ball in midfield... looks up, sees the open repo...",
  "A brilliant pass forward into the Next.js App Router... absolute precision!",
  "AI Goalkeeper dives to the left, but Shouri curves it into the top-right corner! GOAL!!",
  "Late Meet scores! An incredible product shipped with zero server costs!",
  "Merged PR number 273! GSSoC admins are cheering from the stands!",
  "VAR is checking the commit... Decision stands! Goal is given!",
  "Shouri intercepts the bug! A superb sliding tackle to resolve the issue!",
  "Tactical shift! Manager mode switches to full-stack automation...",
  "Crowd chants: 'Shouri! Shouri! Shouri!' as the contributions heatmap glows green!",
];

export default function MatchCommentary() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % COMMENTARIES.length);
        setVisible(true);
      }, 500);
    }, 9000); // Update every 9 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-[280px] sm:max-w-[320px] select-none font-mono">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0b0c08]/95 border border-[#FFD700]/30 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md relative flex gap-3 items-start"
          >
            {/* Left Status Light */}
            <div className="flex flex-col items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              <span className="text-[8px] text-[#FFD700] uppercase font-bold tracking-widest mt-1">
                90&apos;
              </span>
            </div>

            {/* Commentary text */}
            <div className="grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] text-white/40 uppercase tracking-widest">
                  Live Match Commentary
                </span>
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  title={muted ? "Unmute sounds" : "Mute sounds"}
                >
                  {muted ? <VolumeX size={10} /> : <Volume2 size={10} />}
                </button>
              </div>
              <p className="text-white/90 text-[10px] leading-relaxed font-sans italic">
                &ldquo;{COMMENTARIES[index]}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
