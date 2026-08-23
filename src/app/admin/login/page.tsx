"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, ArrowRight, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("shouri@devshouri.in");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setStatus("error");
        setErrorMsg(data.error || "IDENTITY VERIFICATION FAILED: INVALID KEY OR PASSWORD.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("NETWORK FAILURE: Unable to contact authentication server.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden font-mono selection:bg-primary selection:text-black">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Frame */}
      <div className="w-full max-w-md bg-zinc-950/80 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xl relative z-10 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-2 text-primary">
            <Lock size={16} />
            <span className="text-xs uppercase tracking-widest font-bold font-mono">SHOURI // PRIVATE ACCESS</span>
          </div>
          <span className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded-full font-mono">SECURE</span>
        </div>

        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-tight text-white mb-2 font-sans">
            SYSTEM ACCESS DETECTED
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Enter authorized credentials to initialize Command Center session.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 font-sans">
          <div className="flex flex-col gap-2">
            <label htmlFor="email-input" className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Email / Identity</label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password-input" className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Password Key</label>
            <input
              id="password-input"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === "loading"}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono"
            />
          </div>

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3 text-center leading-relaxed font-mono">
              ⚠ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !password}
            className="w-full bg-primary text-black font-semibold text-xs uppercase tracking-widest rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-2 font-mono"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Authenticating Session...</span>
              </>
            ) : (
              <>
                <span>Initialize Command Center</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <button 
            type="button" 
            onClick={() => router.push("/")}
            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors font-mono"
          >
            ← Return to Portfolio Website
          </button>
        </div>
      </div>
    </main>
  );
}
