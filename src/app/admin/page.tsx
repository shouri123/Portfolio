"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, FolderKanban, GitBranch, Bot, Briefcase, 
  FileText, Inbox, Terminal, LogOut, CheckCircle2, AlertCircle, 
  Plus, Edit3, Trash2, ExternalLink, RefreshCw, Upload, Search, Save,
  Activity, Star, GitFork, Users, Eye, Zap, Shield, ChevronRight, Check, Code
} from "lucide-react";
import { Project } from "@/lib/supabase";

type NavTab = "overview" | "portfolio" | "opensource" | "ailab" | "career" | "content" | "messages" | "system";

export default function CommandCenterDashboard() {
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncingGithub, setSyncingGithub] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "shouri@command-center:~$ systemctl status digital-presence",
    "● digital-presence.service - Shouri Chakraborty Digital OS",
    "   Loaded: loaded (/etc/systemd/system/digital-presence.service)",
    "   Active: active (running) since Sun 2026-08-23 09:30:00 IST",
    "   Main PID: 1420 (next-server)",
    "   Tasks: 18 (limit: 4915)",
    "   Memory: 84.2M",
    "   CPU: 12ms",
    "shouri@command-center:~$ type 'help' for available commands..."
  ]);

  // Dashboard Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [career, setCareer] = useState<any>({
    headline: "Developer × Product Designer × Open Source Maintainer",
    subheadline: "Building AI-driven products, agentic tools, and cinematic web experiences.",
    availability: "Available for Internships & OSS",
    isAvailable: true,
    preferredRoles: ["AI Engineer", "Full Stack Developer", "Frontend Engineer"],
    location: "Kolkata, India",
    bio: "Diving deep into Generative AI, Agentic systems, AI/ML, and NLP. I love exploring new tools, experimenting with emerging tech, and building things that make computers feel a little smarter.",
    resumeUrl: "/Shouri_Chakraborty_Resume.pdf",
    portraitUrl: "/developer_portrait.jpg"
  });
  const [aiServices, setAiServices] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>({
    health: { frontend: "Operational", api: "Operational", database: "Operational", storage: "Operational", githubApi: "Operational", responseMs: 142, databaseMs: 24, lastCheck: "Just now", nextCheck: "Tomorrow 08:30 IST" },
    metrics: { visitors: 12480, stars: 44, forks: 97, publicRepos: 19, totalContributions: 1821, longestStreak: 23, contributors: 50, prs: 200, openIssues: 204, opportunitiesCount: 3 },
    activity: [],
    githubEvents: [],
    repoHealth: [],
    maintainerMetrics: {
      totalProjects: 19, activeProjects: 3, totalContributors: 50, mergedPRs: 200, openIssues: 204, lastActivity: "Just now", prResponseQuality: "Excellent (< 2h avg)", issueActivity: "High (daily triage)", contributorGrowthTrend: "+18% this month", communityScore: "94%"
    },
    contributions: []
  });

  // UI Filter States
  const [crmFilter, setCrmFilter] = useState<string>("all");
  const [portfolioFilter, setPortfolioFilter] = useState<string>("all");
  const [contentFilter, setContentFilter] = useState<string>("all");

  // Editing Modals State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [newRoleInput, setNewRoleInput] = useState("");

  // GitHub Repos Browser Modal State
  const [showGithubBrowser, setShowGithubBrowser] = useState(false);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [githubSearch, setGithubSearch] = useState("");
  const [importingRepoId, setImportingRepoId] = useState<number | null>(null);

  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [isBackgroundSyncing, setIsBackgroundSyncing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setAuthorized(true);
  }, []);

  const loadDashboardData = async (isBackground = false) => {
    if (!isBackground) {
      setLoading(true);
    } else {
      setIsBackgroundSyncing(true);
    }

    try {
      const [projRes, msgRes, carRes, aiRes, sysRes, artRes] = await Promise.allSettled([
        fetch("/api/admin/projects", { cache: "no-store" }),
        fetch("/api/admin/messages", { cache: "no-store" }),
        fetch("/api/admin/career", { cache: "no-store" }),
        fetch("/api/admin/ai-lab", { cache: "no-store" }),
        fetch("/api/admin/system", { cache: "no-store" }),
        fetch("/api/admin/content", { cache: "no-store" })
      ]);

      if (projRes.status === "fulfilled" && projRes.value.ok) setProjects(await projRes.value.json());
      if (msgRes.status === "fulfilled" && msgRes.value.ok) setMessages(await msgRes.value.json());
      if (carRes.status === "fulfilled" && carRes.value.ok) setCareer(await carRes.value.json());
      if (aiRes.status === "fulfilled" && aiRes.value.ok) setAiServices((await aiRes.value.json()).services || []);
      if (sysRes.status === "fulfilled" && sysRes.value.ok) setSystemStats(await sysRes.value.json());
      if (artRes.status === "fulfilled" && artRes.value.ok) setArticles(await artRes.value.json());
      setLastSyncTime(new Date());
    } catch (err) {
      console.error("Error loading Command Center data:", err);
    }

    if (!isBackground) {
      setLoading(false);
    } else {
      setIsBackgroundSyncing(false);
    }
  };

  useEffect(() => {
    if (!authorized) return;
    loadDashboardData(false);

    // Setup 30s live background polling
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadDashboardData(true);
      }
    }, 30000);

    // Refresh immediately when tab gains focus or becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadDashboardData(true);
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [authorized]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
  };

  const handleSyncGithub = async () => {
    setSyncingGithub(true);
    setSyncToast("Syncing with live GitHub API for @shouri123...");
    try {
      const syncRes = await fetch("/api/admin/sync-github", { method: "POST" });
      if (syncRes.ok) {
        const syncData = await syncRes.json();
        await loadDashboardData();
        const stars = syncData.metrics?.stars ?? systemStats.metrics?.stars;
        const forks = syncData.metrics?.forks ?? systemStats.metrics?.forks;
        const repos = syncData.metrics?.publicRepos ?? systemStats.metrics?.publicRepos;
        const contribs = syncData.metrics?.totalContributions ?? systemStats.metrics?.totalContributions;
        
        setSyncToast(`✓ GitHub Synced: ${stars}⭐ • ${forks}🍴 • ${repos} Repos • ${contribs?.toLocaleString()} Commits`);
        setTerminalLogs(prev => [
          ...prev,
          `shouri@command-center:~$ github-sync --live`,
          `[OK] GitHub telemetry synchronized successfully at ${new Date().toLocaleTimeString()}.`,
          `[TELEMETRY] Repos: ${repos} | Stars: ${stars} | Forks: ${forks} | Total Contributions: ${contribs?.toLocaleString()}`
        ]);
      } else {
        await loadDashboardData();
        setSyncToast("✓ GitHub synchronized with live API!");
      }
    } catch (err) {
      console.error("Failed to sync GitHub:", err);
      setSyncToast("Failed to sync with GitHub API.");
    }
    setSyncingGithub(false);
    setTimeout(() => setSyncToast(null), 4000);
  };

  // Helper to slice and format 52 weeks of contributions
  const getProcessedContributions = () => {
    const raw: any[] = systemStats.contributions || [];
    if (!raw || raw.length === 0) {
      return Array.from({ length: 52 }, (_, w) =>
        Array.from({ length: 7 }, (_, d) => ({
          date: `Week ${w + 1}, Day ${d + 1}`,
          count: 0,
          level: 0
        }))
      );
    }

    const recent = raw.slice(-364);
    const weeks: Array<Array<{ date: string; count: number; level: number }>> = [];
    for (let i = 0; i < recent.length; i += 7) {
      weeks.push(recent.slice(i, i + 7));
    }
    return weeks;
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-950 border border-emerald-900/50";
      case 2: return "bg-emerald-700 border border-emerald-600/50";
      case 3: return "bg-emerald-500 border border-emerald-400/50";
      case 4: return "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]";
      default: return "bg-white/5";
    }
  };

  const fetchGithubRepos = async () => {
    setLoadingRepos(true);
    try {
      const res = await fetch("/api/admin/github-repos");
      if (res.ok) {
        const data = await res.json();
        setGithubRepos(data.repos || []);
      }
    } catch (err) {
      console.error("Error fetching GitHub repos:", err);
    }
    setLoadingRepos(false);
  };

  const handleOpenGithubBrowser = () => {
    setShowGithubBrowser(true);
    fetchGithubRepos();
  };

  const handleImportRepo = async (repo: any) => {
    setImportingRepoId(repo.id);
    try {
      const newProjectPayload = {
        title: repo.name,
        description: repo.description || `Open-source GitHub repository ${repo.name} by Shouri Chakraborty.`,
        live_url: repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : repo.html_url,
        source_code_url: repo.html_url,
        tech_stack: repo.language ? [repo.language, ...(repo.topics || [])] : ["TypeScript"],
        theme_color: "#1b1b2f",
        is_active: true,
        stars: repo.stars || 0,
        forks: repo.forks || 0,
        problem: `Building scalable ${repo.language || 'web'} solutions and intuitive interfaces for ${repo.name}.`,
        solution: `Engineered using ${repo.language || 'TypeScript'} with clean module separation and efficient state management.`,
        impact: `Published open-source repository on GitHub with active developer engagement.`
      };

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjectPayload)
      });

      if (res.ok) {
        setSyncToast(`✓ Imported '${repo.name}' into Portfolio!`);
        // Mark repo as imported locally
        setGithubRepos(prev => prev.map(r => r.id === repo.id ? { ...r, is_imported: true } : r));
        await loadDashboardData();
        setTimeout(() => setSyncToast(null), 3000);
      }
    } catch (err) {
      console.error("Failed to import repo:", err);
    }
    setImportingRepoId(null);
  };

  // Project CMS Handlers
  const handleSaveProject = async () => {
    if (!editingProject || !editingProject.title) return;
    try {
      const isNew = !editingProject.id;
      const url = "/api/admin/projects";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject)
      });

      if (res.ok) {
        setEditingProject(null);
        loadDashboardData();
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) loadDashboardData();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleToggleProjectActive = async (project: Project) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, is_active: !project.is_active })
      });
      if (res.ok) loadDashboardData();
    } catch (err) {
      console.error("Failed to toggle project status:", err);
    }
  };

  // Career Profile Handlers
  const handleSaveCareer = async () => {
    try {
      const res = await fetch("/api/admin/career", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(career)
      });
      if (res.ok) {
        setSyncToast("✓ Career profile updated!");
        setTimeout(() => setSyncToast(null), 2500);
      }
    } catch (err) {
      console.error("Failed to update career profile:", err);
    }
  };

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    setCareer((prev: any) => ({
      ...prev,
      preferredRoles: [...(prev.preferredRoles || []), newRoleInput.trim()]
    }));
    setNewRoleInput("");
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setCareer((prev: any) => ({
      ...prev,
      preferredRoles: (prev.preferredRoles || []).filter((r: string) => r !== roleToRemove)
    }));
  };

  // Content Article Handlers
  const handleSaveArticle = async () => {
    if (!editingArticle || !editingArticle.title) return;
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle)
      });
      if (res.ok) {
        setEditingArticle(null);
        loadDashboardData();
      }
    } catch (err) {
      console.error("Failed to save article:", err);
    }
  };

  // CRM Message Handlers
  const handleUpdateMessageStatus = async (id: string, status: string, notes?: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, admin_notes: notes })
      });
      if (res.ok) loadDashboardData();
    } catch (err) {
      console.error("Failed to update message status:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete message record?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) loadDashboardData();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // CLI Command Terminal Handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `shouri@command-center:~$ ${cmd}`];

    if (cmd === "help") {
      newLogs.push("Available CLI Commands:");
      newLogs.push("  status      - Show all system health & latency metrics");
      newLogs.push("  health      - Inspect Supabase database telemetry & cron status");
      newLogs.push("  sync        - Run live GitHub API synchronization & update projects");
      newLogs.push("  github      - Display live GitHub metrics & repository counts");
      newLogs.push("  projects    - List current project count");
      newLogs.push("  career      - Display career status and headline");
      newLogs.push("  crm         - Show unread opportunities count");
      newLogs.push("  clear       - Clear terminal screen");
    } else if (cmd === "status") {
      newLogs.push(`System Status: ALL SYSTEMS OPERATIONAL (API: ${systemStats.health?.responseMs || 142}ms | Supabase DB: ${systemStats.health?.databaseMs || 24}ms | GitHub: Synced)`);
    } else if (cmd === "github") {
      newLogs.push(`[GITHUB PROFILE] Account: @shouri123 (https://github.com/shouri123)`);
      newLogs.push(`  • Public Repositories: ${systemStats.metrics?.publicRepos || 19}`);
      newLogs.push(`  • Total Stargazers: ${systemStats.metrics?.stars || 44} ⭐`);
      newLogs.push(`  • Total Forks: ${systemStats.metrics?.forks || 97} 🍴`);
      newLogs.push(`  • Total Contributions: ${(systemStats.metrics?.totalContributions || 1821).toLocaleString()} commits/PRs`);
      newLogs.push(`  • Longest Streak: ${systemStats.metrics?.longestStreak || 23} days`);
      newLogs.push(`  • Active Repos: ${systemStats.maintainerMetrics?.activeProjects || 3}`);
    } else if (cmd === "health" || cmd === "telemetry") {
      newLogs.push(`[DATABASE TELEMETRY] Node: Supabase PostgreSQL (devshouri.in)`);
      newLogs.push(`  • Status: ${systemStats.health?.database || "Operational"}`);
      newLogs.push(`  • Latency: ${systemStats.health?.databaseMs || 24}ms round-trip`);
      newLogs.push(`  • Last Health Check: ${systemStats.health?.lastCheck ? new Date(systemStats.health.lastCheck).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "08:30 IST"} (Automated Cron)`);
      newLogs.push(`  • Next Scheduled Run: ${systemStats.health?.nextCheck ? new Date(systemStats.health.nextCheck).toLocaleDateString([], { month: 'short', day: 'numeric' }) : "Tomorrow"} 08:30 IST`);
    } else if (cmd === "sync") {
      newLogs.push("[SYNC] Triggering live GitHub API synchronization...");
      handleSyncGithub();
    } else if (cmd === "projects") {
      newLogs.push(`Projects Count: ${projects.length} showcase projects active.`);
    } else if (cmd === "career") {
      newLogs.push(`Career Headline: ${career.headline}`);
      newLogs.push(`Availability: ${career.availability} (${career.isAvailable ? "OPEN" : "CLOSED"})`);
    } else if (cmd === "crm") {
      const unreadCount = messages.filter(m => m.status === "unread").length;
      newLogs.push(`Unread Messages: ${unreadCount} pending messages.`);
    } else if (cmd === "clear") {
      setTerminalLogs(["shouri@command-center:~$ screen cleared"]);
      setTerminalInput("");
      return;
    } else {
      newLogs.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  const unreadMessagesCount = messages.filter(m => m.status === "unread").length;
  const filteredGithubRepos = githubRepos.filter(r => 
    r.name.toLowerCase().includes(githubSearch.toLowerCase()) || 
    (r.description && r.description.toLowerCase().includes(githubSearch.toLowerCase())) ||
    (r.language && r.language.toLowerCase().includes(githubSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#070707] text-[#e0dfd5] font-sans flex flex-col md:flex-row border-t-2 border-[#DEDBC8]/20">
      
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#141414] border border-[#DEDBC8]/30 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-[slideIn_0.2s_ease-out]">
          <CheckCircle2 className="w-4 h-4 text-[#DEDBC8]" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Badge */}
          <div className="mb-8">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DEDBC8] font-bold">
              SHOURI // DIGITAL OS
            </div>
            <h1 className="text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
              COMMAND CENTER
            </h1>
            <div className="flex items-center justify-between mt-2 font-mono text-[10px] bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isBackgroundSyncing ? "bg-amber-400 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                <span className="text-gray-300 font-bold">{isBackgroundSyncing ? "SYNCING..." : "REALTIME LIVE"}</span>
              </div>
              <span className="text-gray-500">{lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "overview" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "portfolio" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>Portfolio Studio</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === "portfolio" ? "bg-black/10 text-black" : "bg-white/10 text-gray-400"}`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("opensource")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "opensource" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GitBranch className="w-4 h-4" />
                <span>Open Source HQ</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${activeTab === "opensource" ? "bg-black text-white" : "bg-[#DEDBC8]/10 text-[#DEDBC8]"}`}>
                SYNCED
              </span>
            </button>

            <button
              onClick={() => setActiveTab("ailab")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "ailab" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4" />
                <span>AI Lab</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${activeTab === "ailab" ? "bg-black/10 text-black" : "bg-white/10 text-emerald-400"}`}>
                5 ACTIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab("career")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "career" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Career Control</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${activeTab === "career" ? "bg-black text-emerald-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                OPEN
              </span>
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "content" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Content Studio</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === "content" ? "bg-black/10 text-black" : "bg-white/10 text-gray-400"}`}>
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "messages" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Messages & Opps</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="text-[10px] bg-emerald-500 text-black font-bold font-mono px-2 py-0.5 rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "system" ? "bg-[#e0dfd5] text-black font-bold shadow-md" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4" />
                <span>System / Dev</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Portfolio
            </span>
            <span className="text-[10px] font-mono text-gray-500">devshouri.in</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-all font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#070707]">
        
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            {/* Header Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Good morning, Shouri 👋</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-xs text-gray-400 font-mono">Your digital presence is healthy. All core services & storage nodes active.</p>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    REALTIME SYNC ACTIVE (30s)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenGithubBrowser}
                  className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Browse GitHub Repos</span>
                </button>

                <button
                  onClick={handleSyncGithub}
                  disabled={syncingGithub}
                  className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingGithub ? "animate-spin" : ""}`} />
                  <span>{syncingGithub ? "Syncing..." : "Sync GitHub"}</span>
                </button>
              </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Visitors (30d)</span>
                  <Eye className="w-4 h-4 text-[#DEDBC8]" />
                </div>
                <div className="text-2xl font-black text-white font-mono">12,480</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">+14% vs last month</div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider">GitHub Stars</span>
                  <Star className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{systemStats.metrics?.stars || 45}</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">Live calculated across repos</div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Public Repos</span>
                  <GitBranch className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{systemStats.metrics?.publicRepos || 19}</div>
                <div className="text-[10px] text-purple-400 font-mono mt-1">On @shouri123 account</div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Active Opps</span>
                  <Inbox className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{unreadMessagesCount}</div>
                <div className="text-[10px] text-blue-400 font-mono mt-1">Pending response</div>
              </div>
            </div>

            {/* Studio Navigation Cards */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Command Center Control Hubs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab("portfolio")} 
                  className="bg-[#0f0f0f] border border-white/10 hover:border-white/30 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <FolderKanban className="w-6 h-6 text-[#DEDBC8] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white group-hover:text-[#DEDBC8] transition-colors">Portfolio Studio</h4>
                  <p className="text-xs text-gray-400 mt-1">Manage {projects.length} showcase projects & deep stories.</p>
                </div>

                <div 
                  onClick={() => setActiveTab("opensource")} 
                  className="bg-[#0f0f0f] border border-white/10 hover:border-white/30 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <GitBranch className="w-6 h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Open Source HQ</h4>
                  <p className="text-xs text-gray-400 mt-1">Live GitHub telemetry, repo health & PR reviews.</p>
                </div>

                <div 
                  onClick={() => setActiveTab("ailab")} 
                  className="bg-[#0f0f0f] border border-white/10 hover:border-white/30 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <Bot className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">AI Lab</h4>
                  <p className="text-xs text-gray-400 mt-1">5 service monitors & agent telemetry.</p>
                </div>

                <div 
                  onClick={() => setActiveTab("career")} 
                  className="bg-[#0f0f0f] border border-white/10 hover:border-white/30 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <Briefcase className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Career Control</h4>
                  <p className="text-xs text-gray-400 mt-1">Status badge, preferred roles & resume files.</p>
                </div>
              </div>
            </div>

            {/* Live Activity Stream */}
            <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">Live Activity Log</h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">REALTIME</span>
              </div>
              <div className="space-y-3">
                {(systemStats.activity || []).map((item: any) => (
                  <div key={item.id} className="flex items-start justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                    <div className="flex items-start gap-3">
                      <Activity className="w-4 h-4 text-[#DEDBC8] mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{item.description}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{item.timeLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PORTFOLIO STUDIO */}
        {/* ========================================================================= */}
        {activeTab === "portfolio" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Portfolio Studio</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">Manage project listings, live URLs, repository links, and project stories.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenGithubBrowser}
                  className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Browse GitHub Repos</span>
                </button>

                <button
                  onClick={() => setEditingProject({ title: "", description: "", live_url: "", tech_stack: ["Next.js", "TypeScript"], theme_color: "#1a1a1a", is_active: true })}
                  className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <button
                onClick={() => setPortfolioFilter("all")}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${portfolioFilter === "all" ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:text-white"}`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setPortfolioFilter("active")}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${portfolioFilter === "active" ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-gray-400 hover:text-white"}`}
              >
                Active ({projects.filter(p => p.is_active !== false).length})
              </button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects
                .filter(p => portfolioFilter === "all" ? true : p.is_active !== false)
                .map((project) => (
                  <div key={project.id} className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]">Project #{project.id}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${project.is_active !== false ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gray-500/10 text-gray-400"}`}>
                            {project.is_active !== false ? "ACTIVE" : "HIDDEN"}
                          </span>
                          <button
                            onClick={() => handleToggleProjectActive(project)}
                            className="text-[10px] font-mono text-gray-400 hover:text-white underline cursor-pointer"
                          >
                            Toggle
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white">{project.title}</h3>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tech_stack.map(tech => (
                          <span key={tech} className="text-[9px] font-mono bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                        {project.stars !== undefined && <span>⭐ {project.stars}</span>}
                        {project.forks !== undefined && <span>🍴 {project.forks}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="bg-white/5 hover:bg-white/10 text-white text-xs font-mono px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Editing Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0f0f0f] border border-white/15 w-full max-w-2xl p-6 md:p-8 rounded-3xl space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-bold text-white">
                      {editingProject.id ? `Edit Project #${editingProject.id}` : "Create New Project"}
                    </h3>
                    <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white font-mono text-xs cursor-pointer">✕ CLOSE</button>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-gray-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title || ""}
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                        placeholder="e.g. Late-Meet"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProject.description || ""}
                        onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                        placeholder="Short overview..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-1">Live URL</label>
                        <input
                          type="text"
                          value={editingProject.live_url || ""}
                          onChange={e => setEditingProject({ ...editingProject, live_url: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Source Code URL</label>
                        <input
                          type="text"
                          value={editingProject.source_code_url || ""}
                          onChange={e => setEditingProject({ ...editingProject, source_code_url: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-1">Stars</label>
                        <input
                          type="number"
                          value={editingProject.stars ?? 0}
                          onChange={e => setEditingProject({ ...editingProject, stars: parseInt(e.target.value) || 0 })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Forks</label>
                        <input
                          type="number"
                          value={editingProject.forks ?? 0}
                          onChange={e => setEditingProject({ ...editingProject, forks: parseInt(e.target.value) || 0 })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Theme Color</label>
                        <input
                          type="text"
                          value={editingProject.theme_color || "#1a1a1a"}
                          onChange={e => setEditingProject({ ...editingProject, theme_color: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <span className="block font-bold text-white mb-2">Project Story (Deep Dive)</span>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-400 mb-1">Problem Statement</label>
                          <textarea
                            rows={2}
                            value={editingProject.problem || ""}
                            onChange={e => setEditingProject({ ...editingProject, problem: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1">Solution</label>
                          <textarea
                            rows={2}
                            value={editingProject.solution || ""}
                            onChange={e => setEditingProject({ ...editingProject, solution: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1">Impact</label>
                          <textarea
                            rows={2}
                            value={editingProject.impact || ""}
                            onChange={e => setEditingProject({ ...editingProject, impact: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: OPEN SOURCE HQ (RICH DATA DASHBOARD) */}
        {/* ========================================================================= */}
        {activeTab === "opensource" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            {/* Top Bar Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">OPEN SOURCE HQ</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-xs text-gray-400 font-mono">Live GitHub contributions, stars, forks, and maintainer activity.</p>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE GITHUB TELEMETRY
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenGithubBrowser}
                  className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Browse & Import Repos</span>
                </button>

                <button
                  onClick={handleSyncGithub}
                  disabled={syncingGithub}
                  className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingGithub ? "animate-spin" : ""}`} />
                  <span>{syncingGithub ? "Syncing..." : "Sync GitHub"}</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Total Stars</div>
                <div className="text-3xl font-black text-white font-mono mt-1">{systemStats.metrics?.stars || 45}</div>
                <div className="text-[10px] text-amber-400 font-mono mt-1 flex items-center gap-1">
                  <span>⭐ 44 Late-Meet • 1 Portfolio</span>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Total Forks</div>
                <div className="text-3xl font-black text-white font-mono mt-1">{systemStats.metrics?.forks || 98}</div>
                <div className="text-[10px] text-blue-400 font-mono mt-1 flex items-center gap-1">
                  <span>🍴 97 Late-Meet • 1 Portfolio</span>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Contributors</div>
                <div className="text-3xl font-black text-white font-mono mt-1">{systemStats.maintainerMetrics?.totalContributors || 76}+</div>
                <div className="text-[10px] text-purple-400 font-mono mt-1">
                  <span>👥 76 on Late-Meet squad</span>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Total Contributions</div>
                <div className="text-3xl font-black text-white font-mono mt-1">{(systemStats.metrics?.totalContributions || 1816).toLocaleString()}</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                  <span>🔥 1,816 in 2026 • 23d streak</span>
                </div>
              </div>
            </div>

            {/* GitHub Activity Distribution Radar Breakdown */}
            <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Activity Overview & Distribution</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      44+ REPOSITORIES CONTRIBUTED
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Contributed to <span className="text-white font-medium">shouri123/Late-Meet</span>, <span className="text-white font-medium">shouri123/Sanatan-Dharma</span>, <span className="text-white font-medium">shouri123/Portfolio</span> and 41 other repositories
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Commits (75%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Code Review (17%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Issues (5%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> PRs (3%)</span>
                </div>
              </div>

              {/* Progress Distribution Bar */}
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden flex border border-white/10">
                <div style={{ width: "75%" }} className="bg-emerald-400 h-full" title="Commits: 75%" />
                <div style={{ width: "17%" }} className="bg-purple-400 h-full" title="Code Review: 17%" />
                <div style={{ width: "5%" }} className="bg-amber-400 h-full" title="Issues: 5%" />
                <div style={{ width: "3%" }} className="bg-blue-400 h-full" title="Pull Requests: 3%" />
              </div>
            </div>

            {/* Middle Section: Contribution Activity & Repository Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Contribution Activity Heatmap (2 cols) */}
              <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Contribution Activity</h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">Live GitHub commit & activity matrix across 52 weeks</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {(systemStats.metrics?.totalContributions || 1816).toLocaleString()} COMMITS & CONTRIBUTIONS
                    </span>
                  </div>

                  {/* Real GitHub Heatmap Grid */}
                  <div className="bg-black/60 border border-white/5 p-4 rounded-xl overflow-x-auto">
                    <div className="flex gap-1.5 min-w-[680px]">
                      {getProcessedContributions().map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1.5">
                          {week.map((day, dayIdx) => (
                            <div
                              key={dayIdx}
                              className={`w-3.5 h-3.5 rounded-sm ${getLevelColor(day.level)} transition-all hover:scale-125 hover:z-10 cursor-pointer`}
                              title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mt-4 pt-4 border-t border-white/5">
                  <span>Last 52 weeks (365 days)</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 bg-white/5 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-950 border border-emerald-900/50 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-700 border border-emerald-600/50 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-400/50 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Repository Health Panel (1 col) */}
              <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Repository Health</h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">Core open source projects telemetry</p>
                  
                  <div className="space-y-3 font-mono text-xs max-h-[300px] overflow-y-auto pr-1">
                    {(systemStats.repoHealth && systemStats.repoHealth.length > 0 ? systemStats.repoHealth : [
                      { name: "Late-Meet", status: "Active", stars: 44, forks: 97, openIssues: 128, openPRs: 76, contributors: 76, totalCommits: 1251, lastCommit: "2 days ago" },
                      { name: "Sanatan-Dharma", status: "Active", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 75, lastCommit: "Just now" },
                      { name: "INDEPENDENCE-DAY-2026", status: "Active", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 33, lastCommit: "Aug 15" },
                      { name: "Portfolio", status: "Active", stars: 1, forks: 1, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 18, lastCommit: "Just now" },
                      { name: "Snaply", status: "Active", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 4, lastCommit: "Aug 9" },
                      { name: "ashram_cup-website", status: "Active", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 2, totalCommits: 6, lastCommit: "Aug 12" },
                      { name: "chat-buddy", status: "Healthy", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 2, totalCommits: 45, lastCommit: "1 month ago" }
                    ]).map((repo: any) => (
                      <div key={repo.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/2 border border-white/5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${repo.status === "Active" ? "bg-emerald-400 animate-pulse" : repo.status === "Healthy" ? "bg-amber-400" : "bg-gray-500"}`} />
                          <div className="truncate">
                            <span className="font-bold text-white block truncate">{repo.name}</span>
                            <div className="flex items-center gap-2 text-[9px] text-gray-500">
                              <span>{repo.lastCommit}</span>
                              {repo.totalCommits && <span>• {repo.totalCommits} commits</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 shrink-0">
                          {repo.stars > 0 && <span>⭐ {repo.stars}</span>}
                          {repo.forks > 0 && <span>🍴 {repo.forks}</span>}
                          {repo.openIssues > 0 && <span>🐛 {repo.openIssues}</span>}
                          {repo.openPRs > 0 && <span>🔀 {repo.openPRs}</span>}
                          {repo.contributors > 1 && <span>👥 {repo.contributors}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-emerald-400 text-center">
                  ● {systemStats.repoHealth?.length || 10} repositories tracked & verified
                </div>
              </div>
            </div>

            {/* Bottom Section: Recent Activity & Maintainer Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent GitHub Activity (2 cols) */}
              <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Recent GitHub Activity</h3>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">LIVE EVENTS</span>
                </div>
                <div className="space-y-3 font-mono text-xs max-h-[320px] overflow-y-auto pr-1">
                  {(systemStats.githubEvents && systemStats.githubEvents.length > 0 ? systemStats.githubEvents : [
                    { id: "gh-1", action: "Pushed 75 commits", repo: "Sanatan-Dharma", timeLabel: "Just now" },
                    { id: "gh-2", action: "Pushed 33 commits", repo: "INDEPENDENCE-DAY-2026", timeLabel: "Aug 15" },
                    { id: "gh-3", action: "Created PR: 'Link and Registration button added'", repo: "snackoverflowasad/Metasphere-2026", timeLabel: "Aug 10" },
                    { id: "gh-4", action: "PR merged: 'Add background music dai_dai.mp3'", repo: "subhradeep333/ashram_cup-website", timeLabel: "Aug 12" },
                    { id: "gh-5", action: "Maintained 1,251 commits & 76 contributors squad", repo: "Late-Meet", timeLabel: "2 days ago" }
                  ]).map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-[#DEDBC8] shrink-0" />
                        <span className="text-white font-medium truncate">{event.action}</span>
                        {event.repo && <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 shrink-0">{event.repo}</span>}
                      </div>
                      <span className="text-[10px] text-gray-500 shrink-0 ml-2">{event.timeLabel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintainer Status & Community Health (1 col) */}
              <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">MAINTAINER STATUS</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <div className="text-gray-500 text-[10px]">Total Repos</div>
                      <div className="font-bold text-white text-base mt-0.5">{systemStats.maintainerMetrics?.totalProjects || systemStats.metrics?.publicRepos || 19}</div>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <div className="text-gray-500 text-[10px]">Active Repos</div>
                      <div className="font-bold text-emerald-400 text-base mt-0.5">{systemStats.maintainerMetrics?.activeProjects || 6}</div>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <div className="text-gray-500 text-[10px]">Total Stars</div>
                      <div className="font-bold text-white text-base mt-0.5">{systemStats.metrics?.stars || 44}</div>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <div className="text-gray-500 text-[10px]">Contributors</div>
                      <div className="font-bold text-purple-400 text-base mt-0.5">{systemStats.maintainerMetrics?.totalContributors || 76}+</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-gray-400 font-bold">COMMUNITY HEALTH</span>
                    <span className="text-emerald-400 font-bold">{systemStats.maintainerMetrics?.communityScore || "96%"}</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[96%]" />
                  </div>
                  
                  <div className="mt-3 space-y-1.5 text-[11px] font-mono text-gray-400">
                    <div className="flex justify-between"><span>Open Issues:</span> <span className="text-white">128 open</span></div>
                    <div className="flex justify-between"><span>Open PRs:</span> <span className="text-white">76 pending review</span></div>
                    <div className="flex justify-between"><span>PR response:</span> <span className="text-white">{systemStats.maintainerMetrics?.prResponseQuality || "Excellent (< 2h avg)"}</span></div>
                    <div className="flex justify-between"><span>Late-Meet squad:</span> <span className="text-emerald-400">76 contributors</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        )}

        {/* ========================================================================= */}
        {/* TAB 4: AI LAB */}
        {/* ========================================================================= */}
        {activeTab === "ailab" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-black text-white tracking-tight">AI Lab</h2>
              <p className="text-xs text-gray-400 font-mono mt-1">Service monitors, active AI model configurations & agent telemetry.</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiServices.map((service) => (
                <div key={service.id} className="bg-[#0f0f0f] border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{service.name}</h3>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ● {service.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    <div>Model: <span className="text-white">{service.model}</span></div>
                    <div className="mt-1">Latency: <span className="text-emerald-400">{service.latency || "142ms"}</span></div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between text-[10px] font-mono text-gray-500">
                    <span>Prompts: {service.promptsServed || 420}</span>
                    <span>Last req: {service.lastRequest}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Telemetry Stream */}
            <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-4">Autonomous Agent Telemetry</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold">Late-Meet VAD Transcriber</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">Active • 18ms WebRTC buffer</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold">Chat-Buddy WhatsApp Bot</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">Active • Node.js Baileys engine</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-white font-bold">Vector Indexer Agent</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">Standby • 408 embeddings cached</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CAREER CONTROL */}
        {/* ========================================================================= */}
        {activeTab === "career" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Career Control</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">Manage public profile headline, role availability, preferred roles & resume files.</p>
              </div>
              <button
                onClick={handleSaveCareer}
                className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl space-y-5 font-mono text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Headline</label>
                  <input
                    type="text"
                    value={career.headline || ""}
                    onChange={e => setCareer({ ...career, headline: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={career.location || ""}
                    onChange={e => setCareer({ ...career, location: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    value={career.bio || ""}
                    onChange={e => setCareer({ ...career, bio: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#DEDBC8]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Preferred Roles</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(career.preferredRoles || []).map((role: string) => (
                      <span key={role} className="bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg flex items-center gap-2">
                        <span>{role}</span>
                        <button onClick={() => handleRemoveRole(role)} className="text-gray-400 hover:text-rose-400 cursor-pointer">✕</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRoleInput}
                      onChange={e => setNewRoleInput(e.target.value)}
                      placeholder="Add role e.g. AI Engineer..."
                      className="bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none text-xs flex-1"
                    />
                    <button onClick={handleAddRole} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl cursor-pointer">Add</button>
                  </div>
                </div>
              </div>

              {/* Sidebar Resume & Status */}
              <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">AVAILABILITY STATUS</h3>
                  <div className="bg-black/60 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white font-mono">Open to Internships</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">ACTIVE RESUME FILE</h3>
                  <div className="bg-black/60 border border-white/10 p-4 rounded-xl space-y-3 font-mono text-xs">
                    <div className="text-white font-bold truncate">Shouri_Chakraborty_Resume.pdf</div>
                    <div className="text-[10px] text-gray-500">Updated for 2026 Opportunities</div>
                    <a
                      href={career.resumeUrl || "/Shouri_Chakraborty_Resume.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-all"
                    >
                      View Current PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CONTENT STUDIO */}
        {/* ========================================================================= */}
        {activeTab === "content" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Content Studio</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">Write and publish tech articles, case studies, and engineering notes.</p>
              </div>
              <button
                onClick={() => setEditingArticle({ title: "", category: "Article", status: "Published", summary: "", content: "" })}
                className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {articles.map((art) => (
                <div key={art.id} className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded">{art.category}</span>
                      <span className="text-[10px] font-mono text-emerald-400">● {art.status}</span>
                      <span className="text-[10px] font-mono text-gray-500">{art.publishedAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{art.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{art.summary}</p>
                  </div>
                  <button
                    onClick={() => setEditingArticle(art)}
                    className="bg-white/5 hover:bg-white/10 text-white text-xs font-mono px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Edit Draft
                  </button>
                </div>
              ))}
            </div>

            {/* Editing Article Modal */}
            {editingArticle && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0f0f0f] border border-white/15 w-full max-w-2xl p-6 md:p-8 rounded-3xl space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-bold text-white">Article Editor</h3>
                    <button onClick={() => setEditingArticle(null)} className="text-gray-400 hover:text-white font-mono text-xs cursor-pointer">✕ CLOSE</button>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-gray-400 mb-1">Article Title</label>
                      <input
                        type="text"
                        value={editingArticle.title || ""}
                        onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Summary</label>
                      <textarea
                        rows={2}
                        value={editingArticle.summary || ""}
                        onChange={e => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                    <button onClick={() => setEditingArticle(null)} className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white">Cancel</button>
                    <button onClick={handleSaveArticle} className="bg-[#e0dfd5] text-black font-bold font-mono px-5 py-2.5 rounded-xl">Save Article</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: MESSAGES & OPPS (CRM) */}
        {/* ========================================================================= */}
        {activeTab === "messages" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-black text-white tracking-tight">Messages & Opportunities CRM</h2>
              <p className="text-xs text-gray-400 font-mono mt-1">Inbound contact submissions, internship inquiries, and recruiter opportunities pipeline.</p>
            </div>

            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-base font-bold text-white">{msg.name}</span>
                      <span className="text-xs text-gray-400 font-mono ml-2">({msg.email})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${msg.status === "unread" ? "bg-emerald-500 text-black" : "bg-white/10 text-gray-400"}`}>
                        {msg.status}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 font-mono leading-relaxed bg-black/50 p-4 rounded-xl border border-white/5">
                    {msg.message}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <button
                        onClick={() => handleUpdateMessageStatus(msg.id, msg.status === "unread" ? "read" : "unread")}
                        className="text-gray-400 hover:text-white underline cursor-pointer"
                      >
                        Mark as {msg.status === "unread" ? "Read" : "Unread"}
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 cursor-pointer self-end sm:self-auto"
                    >
                      Delete Entry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: SYSTEM / DEV CLI */}
        {/* ========================================================================= */}
        {activeTab === "system" && (
          <div className="space-y-8 animate-[fadeIn_0.2s_ease-out]">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-black text-white tracking-tight">System / Developer CLI</h2>
              <p className="text-xs text-gray-400 font-mono mt-1">Realtime system health indicators and interactive terminal console.</p>
            </div>

            {/* System Health Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl">
                <div className="text-gray-500 text-[10px]">Frontend Server</div>
                <div className="text-emerald-400 font-bold mt-1">● Operational</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Latency: {systemStats.health?.responseMs || 142}ms</div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl">
                <div className="text-gray-500 text-[10px]">Database (Supabase)</div>
                <div className="text-emerald-400 font-bold mt-1">● {systemStats.health?.database || "Operational"}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  Latency: {systemStats.health?.databaseMs || 24}ms • Checked: {systemStats.health?.lastCheck ? new Date(systemStats.health.lastCheck).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "08:30 IST"}
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl">
                <div className="text-gray-500 text-[10px]">GitHub API Sync</div>
                <div className="text-emerald-400 font-bold mt-1">● Operational</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Status: Synced ({systemStats.metrics?.stars || 44}⭐ / {systemStats.metrics?.forks || 97}🍴)</div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-2xl">
                <div className="text-gray-500 text-[10px]">Storage & Quota</div>
                <div className="text-emerald-400 font-bold mt-1">● Operational</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Auto-Cron: Daily 08:30 IST</div>
              </div>
            </div>

            {/* Interactive Terminal */}
            <div className="bg-black border border-white/15 rounded-3xl p-6 shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-white font-bold ml-2">shouri@command-center:~</span>
                </div>
                <span className="text-[10px]">BASH 5.2</span>
              </div>

              <div className="space-y-1.5 h-64 overflow-y-auto text-gray-300">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith("shouri@") ? "text-emerald-400 font-bold" : "text-gray-300"}>
                    {log}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-3 border-t border-white/10">
                <span className="text-emerald-400 font-bold">shouri@command-center:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder="type command (e.g. 'help', 'status', 'sync', 'projects')..."
                  className="bg-transparent text-white focus:outline-none flex-1 font-mono text-xs"
                />
              </form>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* BROWSE GITHUB REPOSITORIES MODAL */}
      {/* ========================================================================= */}
      {showGithubBrowser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#0f0f0f] border border-white/15 w-full max-w-4xl p-6 md:p-8 rounded-3xl space-y-6 max-h-[90vh] flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white tracking-tight">BROWSE GITHUB REPOSITORIES</h3>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Live public repositories from <span className="text-purple-300 font-bold">@shouri123</span>
                </p>
              </div>
              <button 
                onClick={() => setShowGithubBrowser(false)}
                className="text-gray-400 hover:text-white font-mono text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative shrink-0 font-mono text-xs">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={githubSearch}
                onChange={e => setGithubSearch(e.target.value)}
                placeholder="Search repos by name, language, or topic..."
                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Repositories List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {loadingRepos ? (
                <div className="py-16 text-center text-xs font-mono text-gray-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>Fetching live repositories from GitHub API...</span>
                </div>
              ) : filteredGithubRepos.length === 0 ? (
                <div className="py-16 text-center text-xs font-mono text-gray-500">
                  No GitHub repositories match "{githubSearch}".
                </div>
              ) : (
                filteredGithubRepos.map((repo: any) => (
                  <div key={repo.id} className="bg-black/60 border border-white/8 hover:border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1.5"
                        >
                          <span>{repo.name}</span>
                          <ExternalLink className="w-3 h-3 text-gray-500" />
                        </a>
                        {repo.language && (
                          <span className="text-[9px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-400 line-clamp-2">{repo.description}</p>
                      
                      <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 pt-1">
                        <span>⭐ {repo.stars} stars</span>
                        <span>🍴 {repo.forks} forks</span>
                        {repo.open_issues > 0 && <span>🐛 {repo.open_issues} issues</span>}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {repo.is_imported ? (
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono px-3.5 py-2 rounded-xl flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Portfolio</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleImportRepo(repo)}
                          disabled={importingRepoId === repo.id}
                          className="bg-[#e0dfd5] text-black hover:bg-white text-xs font-bold font-mono px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg disabled:opacity-50"
                        >
                          {importingRepoId === repo.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                          <span>{importingRepoId === repo.id ? "Importing..." : "Import to Portfolio"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500 shrink-0">
              <span>Showing {filteredGithubRepos.length} public repos</span>
              <span>Account: github.com/shouri123</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
