"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { useFootballMode } from "@/lib/context/FootballModeContext";
import PenaltyShootout from "@/components/football/PenaltyShootout";

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
  const { isFootballMode } = useFootballMode();
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <footer
      id="connect"
      className="relative w-full min-h-screen bg-black text-primary pt-24 pb-12 border-t border-white/5 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 mix-blend-screen pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="/videos/footer_bg.mp4"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start justify-between mt-8">
        
        {/* Left Column: Heading and Info */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-6xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter mb-8 leading-none">
            Let&apos;s{" "}
            <span className="font-serif italic font-normal text-white">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mb-10 text-sm md:text-base leading-relaxed">
            Always open to discussing new projects, creative ideas, or opportunities to collaborate in building smarter tools. Feel free to shoot a message!
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-start gap-4 mb-10 w-full">
            <a
              href="https://github.com/shouri123"
              target="_blank"
              rel="me noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:bg-white/6 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/shouri-chakraborty-224b5330b/"
              target="_blank"
              rel="me noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:bg-white/6 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://instagram.com/shourichakraborty"
              target="_blank"
              rel="me noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:bg-white/6 transition-all duration-300 group"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="mailto:chakrabortyshouri@gmail.com"
              className="w-12 h-12 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 hover:bg-white/6 transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>

          {/* Social Links (text) */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs md:text-sm uppercase tracking-widest font-semibold text-white/45 w-full">
            <a href="mailto:chakrabortyshouri@gmail.com" className="hover:text-white flex items-center gap-1 group transition-colors duration-300">
              Email <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="https://github.com/shouri123" target="_blank" rel="me noopener noreferrer" className="hover:text-white flex items-center gap-1 group transition-colors duration-300">
              Github <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/shouri-chakraborty-224b5330b/" target="_blank" rel="me noopener noreferrer" className="hover:text-white flex items-center gap-1 group transition-colors duration-300">
              LinkedIn <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="https://instagram.com/shourichakraborty" target="_blank" rel="me noopener noreferrer" className="hover:text-white flex items-center gap-1 group transition-colors duration-300">
              Instagram <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full lg:w-1/2 max-w-xl bg-white/2 border border-white/8 p-8 md:p-10 rounded-4xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          {isFootballMode && !emailUnlocked ? (
            <PenaltyShootout onUnlock={() => setEmailUnlocked(true)} isUnlocked={emailUnlocked} />
          ) : status === "success" ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.5s_ease-out]">
              <CheckCircle2 className="w-16 h-16 text-primary/80 animate-[scaleIn_0.3s_ease-out]" />
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Transmission Received</h3>
              <p className="text-gray-400 text-xs md:text-sm max-w-xs leading-relaxed font-mono">
                [COM-LINK INITIALIZED]<br />
                Your message has been sent successfully. I will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs uppercase tracking-widest text-primary hover:text-white border-b border-primary/30 hover:border-white transition-colors pb-1"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Secure COM-LINK Terminal</span>
              </div>

              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Sender Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={status === "loading"}
                  required
                  className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  disabled={status === "loading"}
                  required
                  className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Transmission Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  disabled={status === "loading"}
                  required
                  rows={4}
                  className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all resize-none"
                />
              </div>

              {/* Error Box */}
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3 text-left font-mono">
                  ⚠ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-black font-semibold text-sm rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Broadcasting Transmission...</span>
                  </>
                ) : (
                  <span>Submit Message</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Footer Bottom info */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-20">
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-white/30 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} Shouri Chakraborty. All rights reserved.</p>
          <p>Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
}
