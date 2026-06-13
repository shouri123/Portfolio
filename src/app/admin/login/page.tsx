"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If middleware already set a valid session cookie, the server
    // will redirect us away from this page automatically.
    // No localStorage check needed here.
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Middleware will now allow /admin — HTTP-only cookie is set by server
        router.push("/admin");
        router.refresh(); // force Next.js to re-evaluate middleware
      } else {
        setStatus("error");
        setErrorMsg(data.error || "ACCESS DENIED: INVALID DECRYPTION PASSWORD KEY.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("NETWORK ERROR: Could not reach authentication server.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-primary flex items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Grid Scan Lines background */}
      <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] pointer-events-none" />

      {/* Futuristic Frame */}
      <div className="w-full max-w-md bg-zinc-950 border border-red-500/20 p-8 rounded-3xl backdrop-blur-md relative z-10 shadow-[0_20px_50px_rgba(255,0,0,0.05)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2 text-red-500">
            <ShieldAlert size={18} className="animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold">Security Gate</span>
          </div>
          <span className="text-[10px] text-white/20">PORT_443</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">RESTRICTED PORTAL</h1>
          <p className="text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed">
            Unauthorized access is logged. Enter decryption key to authenticate admin session.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[9px] uppercase tracking-widest text-white/40">Decryption Key</label>
            <input
              type="password"
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === "loading"}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-center text-red-500 placeholder-white/10 tracking-[0.3em] focus:outline-none focus:border-red-500/50 transition-all font-sans"
            />
          </div>

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] rounded-xl px-4 py-3 text-center leading-relaxed font-mono">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !password}
            className="w-full bg-red-600/25 border border-red-500/30 text-red-400 font-semibold text-xs uppercase tracking-widest rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Authenticating Credentials...</span>
              </>
            ) : (
              <>
                <span>Access Terminal</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button 
            type="button" 
            onClick={() => router.push("/")}
            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </main>
  );
}
