'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, CheckCircle2, RefreshCw, Star, Trophy, ShieldAlert, Sparkles, Hand, ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface PenaltyShootoutProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

type ShotDirection = 'left' | 'top-left' | 'center' | 'top-right' | 'right';

export default function PenaltyShootout({ onUnlock, isUnlocked }: PenaltyShootoutProps) {
  const [goals, setGoals] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gkPredictionRate, setGkPredictionRate] = useState(55); // Starting save rate
  const [gameStatus, setGameStatus] = useState<'idle' | 'shooting' | 'goal' | 'saved' | 'gameover'>('idle');
  const [statusMessage, setStatusMessage] = useState('Swipe or select a target to take your shot!');
  
  const ballRef = useRef<HTMLDivElement>(null);
  const gkRef = useRef<HTMLDivElement>(null);

  const directions: ShotDirection[] = ['left', 'top-left', 'center', 'top-right', 'right'];

  useEffect(() => {
    if (goals >= 3 && !isUnlocked) {
      onUnlock();
      setGameStatus('gameover');
      setStatusMessage('Goal! Secure COM-LINK unlocked successfully.');
    }
  }, [goals, isUnlocked, onUnlock]);

  const handleShoot = (direction: ShotDirection) => {
    if (gameStatus === 'shooting' || goals >= 3) return;

    setGameStatus('shooting');
    setStatusMessage('AI Goalkeeper is predicting...');

    // AI Prediction logic
    // AI predicts a direction. Save probability starts at 55% and increases slightly after each attempt.
    const aiDives = Math.random() * 100 < gkPredictionRate;
    const aiDirection: ShotDirection = aiDives 
      ? direction // Saves it
      : directions.filter(d => d !== direction)[Math.floor(Math.random() * 4)]; // Dives elsewhere

    const isGoal = direction !== aiDirection;

    // GSAP animations
    const ball = ballRef.current;
    const gk = gkRef.current;
    if (!ball || !gk) return;

    // Reset positions
    gsap.set(ball, { x: 0, y: 0, scale: 1 });
    gsap.set(gk, { x: 0, y: 0 });

    // Target positions
    const targets: Record<ShotDirection, { x: number; y: number }> = {
      'left': { x: -110, y: -160 },
      'top-left': { x: -110, y: -230 },
      'center': { x: 0, y: -170 },
      'top-right': { x: 110, y: -230 },
      'right': { x: 110, y: -160 },
    };

    const gkDives: Record<ShotDirection, { x: number; y: number }> = {
      'left': { x: -80, y: -40 },
      'top-left': { x: -85, y: -80 },
      'center': { x: 0, y: 0 },
      'top-right': { x: 85, y: -80 },
      'right': { x: 80, y: -40 },
    };

    const targetPos = targets[direction];
    const gkPos = gkDives[aiDirection];

    // Timeline for coordinated animation
    const tl = gsap.timeline();

    // 1. Kick the ball
    tl.to(ball, {
      x: targetPos.x,
      y: targetPos.y,
      scale: 0.45,
      duration: 0.65,
      ease: 'power2.out',
    });

    // 2. Goalkeeper dives
    tl.to(gk, {
      x: gkPos.x,
      y: gkPos.y,
      duration: 0.5,
      ease: 'power1.out',
    }, '-=0.55');

    // 3. Evaluate goal/save state after animation
    tl.call(() => {
      setAttempts(prev => prev + 1);
      
      if (isGoal) {
        setGoals(prev => prev + 1);
        setGameStatus('goal');
        setStatusMessage('GOAL! What a strike!');
        // Bounce ball inside the net
        gsap.to(ball, {
          y: targetPos.y + 10,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'bounce.out',
        });
      } else {
        setGameStatus('saved');
        setStatusMessage('SAVED! AI Goalkeeper read your mind.');
        // Bounce ball off goalkeeper hands
        gsap.to(ball, {
          x: targetPos.x * 0.8,
          y: targetPos.y + 60,
          scale: 0.6,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      // Increase goalkeeper AI skill rate slightly for more challenge
      setGkPredictionRate(prev => Math.min(prev + 8, 85));
    });

    // 4. Return to idle after delay
    tl.to({}, { duration: 1.5 }).call(() => {
      if (goals + (isGoal ? 1 : 0) < 3) {
        setGameStatus('idle');
        setStatusMessage('Select your next shot target!');
        gsap.to(ball, { x: 0, y: 0, scale: 1, duration: 0.4 });
        gsap.to(gk, { x: 0, y: 0, duration: 0.4 });
      }
    });
  };

  const handleReset = () => {
    setGoals(0);
    setAttempts(0);
    setGkPredictionRate(55);
    setGameStatus('idle');
    setStatusMessage('Select your target to start shooting!');
    const ball = ballRef.current;
    const gk = gkRef.current;
    if (ball && gk) {
      gsap.set(ball, { x: 0, y: 0, scale: 1 });
      gsap.set(gk, { x: 0, y: 0 });
    }
  };

  return (
    <div className="w-full bg-[#0a0d06] border border-[#FFD700]/10 rounded-4xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-between items-center text-center backdrop-blur-md">
      
      {/* Subtle pitch marking watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,128,0,0.08),transparent)] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-[#FFD700] w-4 h-4" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">
            Penalty Challenge contact Form
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-white/60">
            Goals: <strong className="text-[#FFD700]">{goals} / 3</strong>
          </span>
          <span className="text-white/60">
            Attempts: <strong>{attempts}</strong>
          </span>
        </div>
      </div>

      {isUnlocked ? (
        <div className="py-14 flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.5s_ease-out]">
          <CheckCircle2 className="w-16 h-16 text-[#FFD700] animate-[scaleIn_0.3s_ease-out]" />
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">EMAIL UNLOCKED</h3>
          <p className="text-white/60 text-xs max-w-xs leading-relaxed font-mono">
            You scored {goals} goals against the AI Goalkeeper! You can now send Shouri a message directly.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {/* Shootout Goal Visualizer */}
          <div className="w-full max-w-[380px] h-[260px] relative border-b-4 border-emerald-800 flex justify-center items-end mt-4 select-none mb-6">
            
            {/* Goal Post Grid */}
            <div className="absolute top-[30px] w-[260px] h-[160px] border-4 border-b-0 border-white rounded-t-sm shadow-[0_0_15px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden">
              {/* Goal Net Webbing pattern */}
              <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10px_10px]" />
            </div>

            {/* Goalkeeper Character (Gloves or block) */}
            <div
              ref={gkRef}
              className="absolute top-[80px] w-[45px] h-[45px] flex flex-col items-center justify-center z-10 transition-transform"
            >
              <div className="flex gap-4">
                <Hand className="w-5 h-5 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-white/20" />
                <Hand className="w-5 h-5 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-white/20" style={{ transform: 'scaleX(-1)' }} />
              </div>
              <div className="bg-[#FFD700] text-black font-extrabold text-[8px] font-mono rounded px-1.5 py-0.5 mt-1 border border-black/20 shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                AI GOALIE
              </div>
            </div>

            {/* Soccer Ball */}
            <div
              ref={ballRef}
              className="absolute bottom-4 w-11 h-11 rounded-full bg-transparent overflow-hidden shadow-lg z-20 flex items-center justify-center"
            >
              <img
                src="/soccer_ball.png"
                alt="World Cup Soccer Ball"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shooting Targets Overlay (Shown when idle) */}
            {gameStatus === 'idle' && (
              <div className="absolute top-[40px] w-[240px] h-[130px] grid grid-cols-3 gap-2 p-2 z-30">
                <button
                  onClick={() => handleShoot('top-left')}
                  className="border border-[#FFD700]/20 hover:border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[8px] text-[#FFD700] uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-md"
                >
                  <ArrowUpLeft size={14} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  Top Left
                </button>
                <button
                  onClick={() => handleShoot('center')}
                  className="border border-[#FFD700]/20 hover:border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[8px] text-[#FFD700] uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-md"
                >
                  <ArrowUp size={14} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  Center
                </button>
                <button
                  onClick={() => handleShoot('top-right')}
                  className="border border-[#FFD700]/20 hover:border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[8px] text-[#FFD700] uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-md"
                >
                  <ArrowUpRight size={14} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  Top Right
                </button>
                <button
                  onClick={() => handleShoot('left')}
                  className="border border-[#FFD700]/20 hover:border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[8px] text-[#FFD700] uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-md"
                >
                  <ArrowLeft size={14} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  Left
                </button>
                <div className="flex items-center justify-center text-[10px] text-white/40 font-mono tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  AIM HERE
                </div>
                <button
                  onClick={() => handleShoot('right')}
                  className="border border-[#FFD700]/20 hover:border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all rounded-lg flex flex-col items-center justify-center gap-1 font-bold text-[8px] text-[#FFD700] uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-md"
                >
                  <ArrowRight size={14} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
                  Right
                </button>
              </div>
            )}
          </div>

          {/* Action Message Log */}
          <div className="flex flex-col items-center gap-1.5 min-h-[50px]">
            <p className={`text-xs font-mono uppercase tracking-wide ${
              gameStatus === 'goal' ? 'text-emerald-400 font-bold' : gameStatus === 'saved' ? 'text-red-400' : 'text-white/60'
            }`}>
              {statusMessage}
            </p>
            <span className="text-[9px] text-white/30 font-mono">
              AI Prediction Level: {gkPredictionRate}%
            </span>
          </div>

          {/* Reset Game button */}
          {attempts > 0 && gameStatus !== 'shooting' && (
            <button
              onClick={handleReset}
              className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw size={10} />
              Reset Shootout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
