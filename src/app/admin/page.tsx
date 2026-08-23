"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, FolderKanban, GitBranch, Bot, Briefcase, 
  FileText, Inbox, Terminal, LogOut, CheckCircle2, AlertCircle, 
  Plus, Edit3, Trash2, ExternalLink, RefreshCw, Upload, Search, Save
} from "lucide-react";
import { Project } from "@/lib/supabase";

type NavTab = "overview" | "portfolio" | "opensource" | "ailab" | "career" | "content" | "messages" | "system";

export default function CommandCenterDashboard() {
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
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
    "shouri@command-center:~$ ready for input..."
  ]);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [career, setCareer] = useState<any>({
    headline: "Developer × Product Designer × Open Source Maintainer",
    availability: "Available for Internships & OSS",
    isAvailable: true,
    preferredRoles: ["AI Engineer", "Full Stack Developer", "Frontend Engineer"],
    location: "Kolkata, India",
    bio: "Diving deep into Generative AI, Agentic systems, AI/ML, and NLP.",
    portraitUrl: "/developer_portrait.jpg"
  });
  const [aiServices, setAiServices] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>({
    health: { frontend: "Operational", api: "Operational", database: "Operational", responseMs: 142, databaseMs: 23 },
    metrics: { visitors: 12480, stars: 92, forks: 124, contributors: 50, opportunitiesCount: 4 },
    activity: []
  });

  // Project Modal State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const router = useRouter();

  useEffect(() => {
    setAuthorized(true);
  }, []);

  useEffect(() => {
    if (!authorized) return;

    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [projRes, msgRes, carRes, aiRes, sysRes, artRes] = await Promise.allSettled([
          fetch("/api/admin/projects"),
          fetch("/api/admin/messages"),
          fetch("/api/admin/career"),
          fetch("/api/admin/ai-lab"),
          fetch("/api/admin/system"),
          fetch("/api/admin/content")
        ]);

        if (projRes.status === "fulfilled" && projRes.value.ok) setProjects(await projRes.value.json());
        if (msgRes.status === "fulfilled" && msgRes.value.ok) setMessages(await msgRes.value.json());
        if (carRes.status === "fulfilled" && carRes.value.ok) setCareer(await carRes.value.json());
        if (aiRes.status === "fulfilled" && aiRes.value.ok) setAiServices((await aiRes.value.json()).services || []);
        if (sysRes.status === "fulfilled" && sysRes.value.ok) setSystemStats(await sysRes.value.json());
        if (artRes.status === "fulfilled" && artRes.value.ok) setArticles(await artRes.value.json());
      } catch (err) {
        console.error("Error loading Command Center data:", err);
      }
      setLoading(false);
    };

    loadDashboardData();
  }, [authorized]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
  };

  const handleSaveProject = async () => {
    if (!editingProject || !editingProject.title) return;
    try {
      const isNew = !editingProject.id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject)
      });
      if (res.ok) {
        const saved = await res.json();
        if (isNew) setProjects([saved, ...projects]);
        else setProjects(projects.map(p => p.id === saved.id ? saved : p));
        setEditingProject(null);
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleSaveCareer = async () => {
    try {
      const res = await fetch("/api/admin/career", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(career)
      });
      if (res.ok) alert("Career profile updated successfully!");
    } catch (err) {
      console.error("Failed to update career:", err);
    }
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    let response = `Command executed: '${cmd}'`;
    if (cmd === "clear") {
      setTerminalLogs(["shouri@command-center:~$ ready for input..."]);
      setTerminalInput("");
      return;
    } else if (cmd === "help") {
      response = "Available commands: status, sync, projects, career, clear, help";
    } else if (cmd === "status") {
      response = "System Status: 100% Operational. Latency: 142ms.";
    } else if (cmd === "sync") {
      response = "GitHub API synchronized successfully. Stars: 92, Forks: 124.";
    }
    setTerminalLogs(prev => [...prev, `shouri@command-center:~$ ${cmd}`, response]);
    setTerminalInput("");
  };

  if (!authorized) return null;

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col md:flex-row font-sans selection:bg-primary selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary text-black flex items-center justify-center font-mono font-bold text-sm">
              S
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase font-mono text-white">SHOURI</h2>
              <p className="text-[10px] text-primary/80 font-mono tracking-widest">COMMAND CENTER</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-xs font-mono">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "portfolio", label: "Portfolio Studio", icon: FolderKanban },
              { id: "opensource", label: "Open Source HQ", icon: GitBranch },
              { id: "ailab", label: "AI Lab", icon: Bot },
              { id: "career", label: "Career Control", icon: Briefcase },
              { id: "content", label: "Content Studio", icon: FileText },
              { id: "messages", label: "Messages & Opps", icon: Inbox },
              { id: "system", label: "System / Dev", icon: Terminal },
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as NavTab)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    active 
                      ? "bg-primary text-black font-bold shadow-lg shadow-primary/10" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="border-t border-white/10 pt-4 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-300">Shouri • Online</span>
          </div>
          <button 
            onClick={handleLogout}
            title="Logout Session"
            className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">
            {/* Hero Greeting */}
            <div className="bg-linear-to-r from-zinc-900 to-black border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  Good morning, Shouri 👋
                </h1>
                <p className="text-sm text-gray-400">
                  Your digital presence is healthy. All APIs operational & GitHub synced.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-400">System Ready • 142ms</span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Visitors</p>
                <h3 className="text-2xl font-bold text-white mt-1">12.4K</h3>
                <span className="text-[10px] text-emerald-400 font-mono">+14% this month</span>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">GitHub Stars</p>
                <h3 className="text-2xl font-bold text-white mt-1">92</h3>
                <span className="text-[10px] text-primary font-mono">10 Repositories</span>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">PR Reviews</p>
                <h3 className="text-2xl font-bold text-white mt-1">273</h3>
                <span className="text-[10px] text-gray-400 font-mono">GSSoC Maintainer</span>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Opportunities</p>
                <h3 className="text-2xl font-bold text-primary mt-1">{messages.length} Messages</h3>
                <span className="text-[10px] text-emerald-400 font-mono">Active Inbox</span>
              </div>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-primary">Portfolio Studio</span>
                  <h4 className="text-lg font-bold text-white mt-2">{projects.length} Active Projects</h4>
                  <p className="text-xs text-gray-400 mt-1">Managed via live CMS data store.</p>
                </div>
                <button onClick={() => setActiveTab("portfolio")} className="mt-4 text-xs font-mono text-primary hover:underline text-left">
                  Manage Projects →
                </button>
              </div>

              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-primary">Open Source HQ</span>
                  <h4 className="text-lg font-bold text-white mt-2">200+ Merged PRs</h4>
                  <p className="text-xs text-gray-400 mt-1">Auto-synchronized with GitHub REST & GraphQL API.</p>
                </div>
                <button onClick={() => setActiveTab("opensource")} className="mt-4 text-xs font-mono text-primary hover:underline text-left">
                  View Open Source Stats →
                </button>
              </div>

              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-primary">Career Control</span>
                  <h4 className="text-lg font-bold text-white mt-2">{career.availability}</h4>
                  <p className="text-xs text-gray-400 mt-1">Headline & resume configuration.</p>
                </div>
                <button onClick={() => setActiveTab("career")} className="mt-4 text-xs font-mono text-primary hover:underline text-left">
                  Edit Career Profile →
                </button>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm uppercase font-mono tracking-widest text-white mb-4">Live Activity Stream</h3>
              <div className="flex flex-col gap-3 font-mono text-xs">
                {systemStats.activity?.map((act: any) => (
                  <div key={act.id} className="flex items-center justify-between py-2 border-b border-white/5 text-gray-300">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">●</span>
                      <span>{act.title} — <span className="text-gray-400">{act.description}</span></span>
                    </div>
                    <span className="text-gray-500">{act.timeLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO STUDIO */}
        {activeTab === "portfolio" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Portfolio Studio CMS</h1>
                <p className="text-xs text-gray-400 mt-1">Create, edit, and curate featured projects with complete Project Story breakdowns.</p>
              </div>
              <button
                onClick={() => setEditingProject({ title: "", description: "", tech_stack: ["Next.js", "TypeScript"], is_active: true })}
                className="bg-primary text-black font-semibold text-xs rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white transition-colors cursor-pointer"
              >
                <Plus size={16} /> New Project
              </button>
            </div>

            {/* Projects List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {proj.is_active !== false ? "Published" : "Draft"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingProject(proj)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white cursor-pointer">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDeleteProject(proj.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {proj.tech_stack?.map((t, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs text-primary font-mono inline-flex items-center gap-1 hover:underline">
                      View Project <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Edit / New Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col gap-5 font-sans">
                  <h2 className="text-xl font-bold text-white">
                    {editingProject.id ? "Edit Project" : "Create New Project"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Title</label>
                      <input
                        type="text"
                        value={editingProject.title || ""}
                        onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase">Live URL</label>
                      <input
                        type="text"
                        value={editingProject.live_url || ""}
                        onChange={e => setEditingProject({ ...editingProject, live_url: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={editingProject.description || ""}
                      onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  {/* Project Story Section */}
                  <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                    <h4 className="text-xs uppercase font-mono text-primary font-bold">Project Story Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase">Problem Statement</label>
                        <textarea
                          rows={2}
                          value={editingProject.problem || ""}
                          onChange={e => setEditingProject({ ...editingProject, problem: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white resize-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase">Solution & Architecture</label>
                        <textarea
                          rows={2}
                          value={editingProject.solution || ""}
                          onChange={e => setEditingProject({ ...editingProject, solution: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                    <button onClick={() => setEditingProject(null)} className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={handleSaveProject} className="bg-primary text-black font-bold text-xs rounded-xl px-5 py-2 hover:bg-white cursor-pointer">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OPEN SOURCE HQ */}
        {activeTab === "opensource" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Open Source HQ</h1>
                <p className="text-xs text-gray-400 mt-1">Live GitHub contributions, stars, forks, and maintainer activity.</p>
              </div>
              <button onClick={() => alert("GitHub synchronized!")} className="bg-white/10 border border-white/10 text-white font-mono text-xs rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/20 transition-colors cursor-pointer">
                <RefreshCw size={14} /> Sync GitHub
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono text-gray-400">Total Stars</p>
                <h3 className="text-3xl font-bold text-white mt-1">92</h3>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono text-gray-400">Forks</p>
                <h3 className="text-3xl font-bold text-white mt-1">124</h3>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono text-gray-400">Contributors</p>
                <h3 className="text-3xl font-bold text-white mt-1">50+</h3>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] uppercase font-mono text-gray-400">Merged PRs</p>
                <h3 className="text-3xl font-bold text-primary mt-1">200+</h3>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI LAB */}
        {activeTab === "ailab" && (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white">AI Lab & Integrations</h1>
              <p className="text-xs text-gray-400 mt-1">Connected AI providers, local LLM endpoints, and agent automation statuses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiServices.map(service => (
                <div key={service.id} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{service.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Model: <span className="text-gray-200 font-mono">{service.model}</span></p>
                    <span className="text-[10px] text-gray-500 font-mono mt-1 block">Last request: {service.lastRequest}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    ● {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CAREER CONTROL */}
        {activeTab === "career" && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold text-white">Career Control</h1>
              <p className="text-xs text-gray-400 mt-1">Configure professional presentation across public portfolio endpoints.</p>
            </div>

            <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 font-sans">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-gray-400">Headline</label>
                <input
                  type="text"
                  value={career.headline || ""}
                  onChange={e => setCareer({ ...career, headline: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-gray-400">Availability Status Badge</label>
                <input
                  type="text"
                  value={career.availability || ""}
                  onChange={e => setCareer({ ...career, availability: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-gray-400">Location</label>
                <input
                  type="text"
                  value={career.location || ""}
                  onChange={e => setCareer({ ...career, location: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>

              <button onClick={handleSaveCareer} className="bg-primary text-black font-bold text-xs rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer mt-2">
                <Save size={16} /> Save Career Profile
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: CONTENT STUDIO */}
        {activeTab === "content" && (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Content Studio</h1>
              <p className="text-xs text-gray-400 mt-1">Articles, case studies, and technical notes publishing pipeline.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {articles.map(art => (
                <div key={art.id} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-primary font-bold">{art.category} • {art.status}</span>
                    <h3 className="text-base font-bold text-white mt-1">{art.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{art.summary}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{art.publishedAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES & OPPORTUNITIES */}
        {activeTab === "messages" && (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Messages & Opportunities CRM</h1>
              <p className="text-xs text-gray-400 mt-1">Contact inquiries categorized by internship, freelance, and collaboration.</p>
            </div>

            <div className="flex flex-col gap-4">
              {messages.map((msg: any) => (
                <div key={msg.id} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white">{msg.name}</span>
                      <span className="text-xs text-primary font-mono">&lt;{msg.email}&gt;</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {msg.category || "General"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{msg.message}</p>
                  {msg.admin_notes && (
                    <div className="bg-black/50 border border-white/5 rounded-xl p-3 text-[11px] font-mono text-primary/80">
                      Notes: {msg.admin_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SYSTEM / DEVELOPER TERMINAL */}
        {activeTab === "system" && (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold text-white">System & Developer Metrics</h1>
              <p className="text-xs text-gray-400 mt-1">Operational status indicators and interactive CLI console widget.</p>
            </div>

            {/* Health Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-gray-400">Frontend</span>
                <p className="text-sm font-bold text-emerald-400 mt-1">● Operational</p>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-gray-400">API Latency</span>
                <p className="text-sm font-bold text-white mt-1">142 ms</p>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-gray-400">Database Latency</span>
                <p className="text-sm font-bold text-white mt-1">23 ms</p>
              </div>
              <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4">
                <span className="text-[10px] font-mono uppercase text-gray-400">GitHub Sync</span>
                <p className="text-sm font-bold text-emerald-400 mt-1">● Active</p>
              </div>
            </div>

            {/* Visual Terminal */}
            <div className="bg-black border border-white/10 rounded-2xl p-5 font-mono text-xs text-emerald-400 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-gray-400 text-[10px]">
                <span>shouri@command-center terminal session v1.0</span>
                <span>TTY_1</span>
              </div>
              <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith("shouri@") ? "text-white" : "text-emerald-400/80"}>
                    {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalCommand} className="flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="text-primary font-bold">shouri@command-center:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder="type command (status, sync, help)..."
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs"
                />
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
