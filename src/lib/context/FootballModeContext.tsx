'use client';

import React, { createContext, useContext } from 'react';

type FootballMode = 'normal';

interface FootballModeContextType {
  mode: FootballMode;
  isFootballMode: boolean;
  toggleMode: () => void;
  setMode: (mode: FootballMode) => void;
  startAudio: () => void;
}

const FootballModeContext = createContext<FootballModeContextType>({
  mode: 'normal',
  isFootballMode: false,
  toggleMode: () => {},
  setMode: () => {},
  startAudio: () => {},
});

export function FootballModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <FootballModeContext.Provider
      value={{
        mode: 'normal',
        isFootballMode: false,
        toggleMode: () => {},
        setMode: () => {},
        startAudio: () => {},
      }}
    >
      {children}
    </FootballModeContext.Provider>
  );
}

export function useFootballMode() {
  return useContext(FootballModeContext);
}
