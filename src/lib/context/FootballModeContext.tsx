'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import CareerModePreloader from '@/components/animations/CareerModePreloader';

type FootballMode = 'normal' | 'football';

interface FootballModeContextType {
  mode: FootballMode;
  isFootballMode: boolean;
  toggleMode: () => void;
  setMode: (mode: FootballMode) => void;
  startAudio: () => void;
}

const FootballModeContext = createContext<FootballModeContextType | undefined>(undefined);

export function FootballModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<FootballMode>('normal');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingMode, setPendingMode] = useState<FootballMode | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Read preference from localStorage on mount
    const savedMode = localStorage.getItem('devshouri-portfolio-mode') as FootballMode;
    if (savedMode === 'football' || savedMode === 'normal') {
      setModeState(savedMode);
    }

    // Initialize audio loop on client side
    if (typeof window !== 'undefined') {
      const audio = new Audio('/dai_dai.mp3');
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (mode === 'football' && audioEnabled) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio autoplay blocked by browser permissions until user interaction:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [mode, audioEnabled]);

  const startAudio = () => {
    setAudioEnabled(true);
  };

  const setMode = (newMode: FootballMode) => {
    setPendingMode(newMode);
    setIsTransitioning(true);
  };

  const toggleMode = () => {
    const nextMode = mode === 'normal' ? 'football' : 'normal';
    setPendingMode(nextMode);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (pendingMode) {
      setModeState(pendingMode);
      localStorage.setItem('devshouri-portfolio-mode', pendingMode);
    }
    setIsTransitioning(false);
    setPendingMode(null);
    // When manually transitioning via toggle click, force enable audio
    setAudioEnabled(true);
  };

  const isFootballMode = mode === 'football';

  return (
    <FootballModeContext.Provider value={{ mode, isFootballMode, toggleMode, setMode, startAudio }}>
      {children}
      {isTransitioning && (
        <CareerModePreloader onComplete={handleTransitionComplete} />
      )}
    </FootballModeContext.Provider>
  );
}

export function useFootballMode() {
  const context = useContext(FootballModeContext);
  if (context === undefined) {
    throw new Error('useFootballMode must be used within a FootballModeProvider');
  }
  return context;
}
