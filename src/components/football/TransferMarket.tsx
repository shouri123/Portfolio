'use client';

import React, { useState } from 'react';
import { ArrowRight, Trophy, Landmark, DollarSign, Award, Target, FileText, Download } from 'lucide-react';
import GsapMagnetic from '../animations/GsapMagnetic';

export default function TransferMarket() {
  const [bidValue, setBidValue] = useState(1);

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('connect');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-black py-20 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-radial-gradient from-[#FFD700]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: Transfer details */}
        <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-[#FFD700]/20 bg-[#FFD700]/5 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
            <Landmark size={12} />
            Transfer Market Portal
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white mb-6">
            CONTRACT LISTING & <br />
            <span className="font-serif italic font-normal text-[#FFD700]">Market Value</span>
          </h3>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
            Evaluating Shouri Chakraborty for your team roster? Audit the active transfer market sheet below. Current registration is set to open-source contributions, with immediate release available for standard internship clauses.
          </p>

          {/* Transfer Sheet Grid */}
          <div className="grid grid-cols-2 gap-6 w-full text-left max-w-xl pb-8 border-b border-white/10 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl pointer-events-none" />
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Current Registration</span>
              <span className="text-white font-bold text-base sm:text-lg block mt-1.5 flex items-center gap-2">
                <img src="/soccer_ball.png" alt="FC" className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]" /> 
                Open Source FC
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#FFD700]/30 transition-all group">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Market Value Rating</span>
              <span className="text-[#FFD700] font-black text-base sm:text-lg block mt-1.5 flex items-center gap-1 group-hover:scale-105 origin-left transition-transform">
                ₹∞ <span className="text-[10px] text-white/50 font-normal tracking-wide lowercase">Potential</span>
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Release Clause</span>
              <span className="text-white font-bold text-base sm:text-lg block mt-1.5">
                1 Internship Offer
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Preferred Leagues</span>
              <span className="text-white font-bold text-xs sm:text-sm block mt-1.5 flex flex-wrap gap-1">
                <span className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-[10px]">AI</span>
                <span className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-[10px]">Full Stack</span>
                <span className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-[10px]">Product</span>
              </span>
            </div>
          </div>

          {/* Standard Resume buttons as "Scouting Reports" */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/Shouri_Chakraborty_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 px-5 py-3 rounded-full flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Scouting PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Bid Panel */}
        <div className="w-full lg:w-5/12 flex justify-center items-center">
          <div className="w-full max-w-sm bg-[#0c0d08] border border-[#FFD700]/20 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFD700]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6">
              <Award className="text-[#FFD700] w-5 h-5" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Submit Contract Offer</span>
            </div>

            <form onSubmit={handleBidSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Contract Term (Months)</label>
                <div className="flex justify-between items-center bg-white/2 border border-white/5 rounded-xl px-4 py-3">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={bidValue}
                    onChange={(e) => setBidValue(parseInt(e.target.value))}
                    className="w-8/12 accent-[#FFD700] cursor-pointer"
                  />
                  <span className="text-[#FFD700] font-bold text-sm font-mono w-3/12 text-right">
                    {bidValue} {bidValue === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Incentive Package</span>
                <div className="bg-white/2 border border-white/5 rounded-xl p-4 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-white/70">
                    <span>Base Salary:</span>
                    <span className="text-white font-bold">Standard Industry</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Mentorship Perks:</span>
                    <span className="text-white font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70 border-t border-white/10 pt-2 mt-1">
                    <span>Sign-on Fee:</span>
                    <span className="text-[#FFD700] font-black flex items-center gap-1">
                      1x Hackathon Trophy <Trophy size={14} className="inline drop-shadow-[0_0_5px_rgba(255,215,0,0.6)]" />
                    </span>
                  </div>
                </div>
              </div>

              <GsapMagnetic strength={15}>
                <button
                  type="submit"
                  className="w-full bg-[#FFD700] text-black font-extrabold uppercase tracking-widest text-xs rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 cursor-pointer shadow-[0_4px_12px_rgba(255,215,0,0.15)]"
                >
                  <span>Transmit Contract Bid</span>
                  <ArrowRight size={14} />
                </button>
              </GsapMagnetic>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
