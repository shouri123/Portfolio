"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, CornerDownLeft, X, Home, Info, Cpu, FolderGit, 
  BookOpen, MessageSquare, Shield, Copy, Check, Download, MousePointer 
} from "lucide-react";
import gsap from "gsap";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animate palette entrance/exit
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        dialogRef.current,
        { scale: 0.95, y: -20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, delay: 0.05, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
    // CR fix: always restore overflow on unmount so page scroll is never stuck
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const closePalette = () => {
    gsap.to(dialogRef.current, {
      scale: 0.95,
      y: -20,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.05,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCursor = () => {
    const disabled = localStorage.getItem("disable_custom_cursor") === "true";
    localStorage.setItem("disable_custom_cursor", disabled ? "false" : "true");
    window.dispatchEvent(new Event("cursor_preference_change"));
  };

  const items = [
    {
      title: "Jump to Home",
      category: "Navigation",
      icon: Home,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to About",
      category: "Navigation",
      icon: Info,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to Tech Stack",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to Projects",
      category: "Navigation",
      icon: FolderGit,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to GitHub Activity",
      category: "Navigation",
      icon: GithubIcon,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to Blog / Lab",
      category: "Navigation",
      icon: BookOpen,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Jump to Contact Footer",
      category: "Navigation",
      icon: MessageSquare,
      action: () => {
        router.push("/");
        setTimeout(() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }), 200);
      }
    },
    {
      title: "Copy Email to Clipboard",
      category: "Utility",
      icon: copied ? Check : Copy,
      action: copyEmail
    },
    {
      title: "Download Professional Resume",
      category: "Utility",
      icon: Download,
      action: () => window.open("/resume.pdf", "_blank")
    },
    {
      title: "Toggle Custom Cursor Glow",
      category: "Utility",
      icon: MousePointer,
      action: toggleCursor
    },
    {
      title: "Go to Secure Admin Terminal",
      category: "Administration",
      icon: Shield,
      action: () => router.push("/admin/login")
    }
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    closePalette();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // CR fix: guard against empty list — modulo on 0 produces NaN
    const len = filteredItems.length;
    if (len === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % len);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + len) % len);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].action);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh] px-4 font-mono text-primary"
      onClick={closePalette}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-white/5 px-4 py-4 gap-3">
          <Search className="w-5 h-5 text-white/30" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm focus:outline-none placeholder-white/20 text-white"
          />
          <button
            onClick={closePalette}
            className="p-1 text-white/30 hover:text-white rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[350px] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-xs text-white/30 uppercase tracking-wider">
              No actions found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.title}
                  onClick={() => handleSelect(item.action)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between text-xs transition-colors ${
                    isSelected ? "bg-white/4 text-white" : "text-white/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} className={isSelected ? "text-primary" : "text-white/20"} />
                    <span className="font-semibold">{item.title}</span>
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border ${
                      isSelected ? "border-primary/30 bg-primary/5 text-primary" : "border-white/5 bg-white/1 text-white/20"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[10px] text-white/30 uppercase font-mono">
                      <span>Select</span>
                      <CornerDownLeft size={10} />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Command Footer hints */}
        <div className="border-t border-white/5 px-4 py-3.5 bg-black flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Enter</span>
          </div>
          <span>Esc Close</span>
        </div>

      </div>
    </div>
  );
}
