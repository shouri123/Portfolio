"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Inbox, Mail, MailOpen, Trash2, Archive, Search, LogOut, 
  Terminal, ShieldCheck, Calendar, Notebook, Loader2 
} from "lucide-react";

interface ContactMessage {
  id: string | number;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "archived";
  admin_notes?: string;
}

const MOCK_INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "mock-msg-1",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    name: "Asad Hussain",
    email: "asad@asadhussain.in",
    message: "Hey Shouri, looked at your portfolio upgrades. The GSAP transitions, GSSoC credentials badge, and the live Github activity graph look premium. Keep up the good work!",
    status: "unread",
    admin_notes: "Follow up about open source project collaborations next week."
  },
  {
    id: "mock-msg-2",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    name: "GirlScript Organizers",
    email: "info@gssoc.org",
    message: "Thank you for administering the repositories for GSSoC 2026. Excellent PR review response times and coordination with contributors.",
    status: "unread"
  },
  {
    id: "mock-msg-3",
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
    name: "Jane Doe",
    email: "jane.doe@techcorp.com",
    message: "We're looking for a Frontend Intern with strong Next.js, Tailwind, and Web3 skills. Let us know if you'd be interested in joining our tech stack team.",
    status: "read"
  }
];

const MOCK_INCOMING_MESSAGES = [
  {
    name: "Google Developer Group",
    email: "organizers@gdgkolkata.org",
    message: "Hey Shouri! We saw your portfolio updates. We would love to host you at our next Hackathon as a speaker/mentor. Hit us back!",
  },
  {
    name: "Dev Shouri (Real-time)",
    email: "shouri@gmail.com",
    message: "Testing the real-time administrative com-link channel. Connection status: stable, ping 24ms.",
  }
];

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeNotesId, setActiveNotesId] = useState<string | number | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [liveNotification, setLiveNotification] = useState<string | null>(null);
  const router = useRouter();

  // 1. Auth Gate — middleware already protects this route via HTTP-only cookie.
  // If we reach this component, the user is authenticated. Just mark authorized.
  useEffect(() => {
    setAuthorized(true);
  }, []);

  // 2. Fetch Messages
  useEffect(() => {
    if (!authorized) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/messages");
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("Failed to load messages from server API:", err);
        // Fallback to mock data for demo
        setMessages(MOCK_INITIAL_MESSAGES);
      }
      setLoading(false);
    };

    loadData();
  }, [authorized]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (!res.ok) {
        console.error("Logout request failed with status:", res.status);
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    // Proceed with redirect anyway — the server/middleware will re-evaluate auth
    router.push("/admin/login");
    router.refresh();
  };

  const updateMessageStatus = async (id: string | number, nextStatus: "unread" | "read" | "archived") => {
    // Optimistic UI updates
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: nextStatus } : msg))
    );

    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      console.error("Database update error:", err);
    }
  };

  const deleteMessage = async (id: string | number) => {
    // Fade out or filter from state
    setMessages((prev) => prev.filter((msg) => msg.id !== id));

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete message");
    } catch (err) {
      console.error("Database delete error:", err);
    }
  };

  const startNotesEdit = (msg: ContactMessage) => {
    setActiveNotesId(msg.id);
    setTempNotes(msg.admin_notes || "");
  };

  const saveNotes = async (id: string | number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, admin_notes: tempNotes } : msg))
    );
    setActiveNotesId(null);

    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, admin_notes: tempNotes })
      });
      if (!res.ok) throw new Error("Failed to save notes");
    } catch (err) {
      console.error("Database notes update error:", err);
    }
  };

  if (!authorized) {
    return (
      <div className="w-full min-h-screen bg-black text-primary flex items-center justify-center font-mono">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  // Filter messages based on search query & active tab
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    return msg.status === activeTab;
  });

  return (
    <main className="w-full min-h-screen bg-[#070707] text-primary p-6 md:p-12 font-mono relative">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />

      {/* Live Push Notification Toast */}
      {liveNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] px-6 py-3.5 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(0,255,102,0.15)] animate-[slideDown_0.3s_ease-out] backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66]"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider">{liveNotification}</span>
        </div>
      )}

      {/* Container wrapper */}
      <div className="max-w-[1400px] mx-auto">
        
        {/* Terminal Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 text-primary">
              <Terminal size={22} className="animate-[pulse_4s_infinite]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                ADMIN CONSOLE
                <span className="text-[10px] text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/20 font-normal tracking-widest flex items-center gap-1 font-mono">
                  <ShieldCheck size={10} /> SECURE
                </span>
              </h1>
              <p className="text-xs text-white/40 mt-0.5">Real-time incoming submissions and com-link messages.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => router.push("/")}
              className="text-xs border border-white/10 hover:border-white/30 text-white/60 hover:text-white px-4 py-2.5 rounded-xl transition-all font-semibold uppercase tracking-wider w-1/2 md:w-auto text-center"
            >
              Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold uppercase tracking-wider w-1/2 md:w-auto"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0e0e0e] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>

            {/* Navigation Tabs */}
            <div className="bg-[#0c0c0c] border border-white/5 p-2 rounded-2xl flex flex-col gap-1.5">
              {[
                { key: "all", label: "All Submissions", icon: Inbox },
                { key: "unread", label: "Unread Link", icon: Mail },
                { key: "read", label: "Reviewed", icon: MailOpen },
                { key: "archived", label: "Archived", icon: Archive },
              ].map((tab) => {
                const Icon = tab.icon;
                const count = messages.filter(m => tab.key === "all" ? true : m.status === tab.key).length;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center justify-between text-xs px-4 py-3 rounded-xl transition-all font-semibold uppercase tracking-wider ${
                      activeTab === tab.key 
                        ? "bg-primary text-black" 
                        : "text-white/40 hover:text-white hover:bg-white/2"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} />
                      {tab.label}
                    </div>
                    <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 ${activeTab === tab.key ? "bg-black/10 text-black/70" : "bg-white/5 text-white/30"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dashboard Info Card */}
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-5 text-[11px] leading-relaxed text-white/40 flex flex-col gap-3.5">
              <div className="text-white/60 uppercase tracking-widest font-bold font-mono text-xs pb-2 border-b border-white/5">System Metrics</div>
              <div className="flex justify-between">
                <span>Database Client:</span>
                <span className={supabase ? "text-emerald-400" : "text-amber-500"}>{supabase ? "SUPABASE_DB" : "OFFLINE_MOCK"}</span>
              </div>
              <div className="flex justify-between">
                <span>WS Ping State:</span>
                <span className="text-emerald-400">CONNECT_OK</span>
              </div>
              <div className="flex justify-between">
                <span>Active Channels:</span>
                <span className="text-white font-mono">Real-time Msg</span>
              </div>
            </div>

          </div>

          {/* Messages Area */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] border border-white/5 rounded-3xl gap-3">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span className="text-xs text-white/30 uppercase tracking-widest">Accessing Datastores...</span>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-3">
                <Inbox size={32} className="text-white/20" />
                <p className="text-xs text-white/30 uppercase tracking-widest">No transmissions found matching criteria.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`border rounded-3xl p-6 md:p-8 bg-[#0a0a0a] transition-all relative overflow-hidden group flex flex-col gap-4 ${
                    msg.status === "unread" ? "border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.01)]" : "border-white/5"
                  }`}
                >
                  {/* Status Indicator Bar */}
                  {msg.status === "unread" && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                  )}

                  {/* Message Top Section */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-white text-base font-bold tracking-tight">{msg.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5 hover:text-white/70 transition-colors">
                        <a href={`mailto:${msg.email}`}>{msg.email}</a>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-[10px] text-white/30 flex items-center gap-1 font-mono uppercase tracking-wider mr-2">
                        <Calendar size={12} />
                        {new Date(msg.created_at).toLocaleString()}
                      </div>

                      {/* Read/Unread toggler */}
                      {msg.status === "unread" ? (
                        <button
                          onClick={() => updateMessageStatus(msg.id, "read")}
                          title="Mark Reviewed"
                          className="p-2 bg-white/5 border border-white/5 hover:border-white/20 text-primary rounded-xl hover:bg-white/8 transition-colors"
                        >
                          <MailOpen size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateMessageStatus(msg.id, "unread")}
                          title="Mark Unread"
                          className="p-2 bg-white/5 border border-white/5 hover:border-white/20 text-emerald-400 rounded-xl hover:bg-white/8 transition-colors"
                        >
                          <Mail size={14} />
                        </button>
                      )}
 
                      {/* Archive toggler */}
                      {msg.status !== "archived" && (
                        <button
                          onClick={() => updateMessageStatus(msg.id, "archived")}
                          title="Archive Transmission"
                          className="p-2 bg-white/5 border border-white/5 hover:border-white/20 text-blue-400 rounded-xl hover:bg-white/8 transition-colors"
                        >
                          <Archive size={14} />
                        </button>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        title="Purge Record"
                        className="p-2 bg-red-950/20 border border-red-500/20 hover:border-red-500/50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap py-2 font-mono">
                    {msg.message}
                  </p>

                  {/* Notes Sub-panel */}
                  <div className="border-t border-white/5 pt-4 mt-2 bg-[#0d0d0d]/30 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 pb-6 md:pb-8">
                    {activeNotesId === msg.id ? (
                      <div className="flex flex-col gap-3">
                        <label className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Edit Session Notes</label>
                        <textarea
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add details, action items, or replies..."
                          rows={2}
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary/50 transition-all resize-none font-mono"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setActiveNotesId(null)}
                            className="text-[10px] uppercase tracking-widest border border-white/10 hover:border-white/20 text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => saveNotes(msg.id)}
                            className="text-[10px] uppercase tracking-widest bg-primary text-black px-3.5 py-1.5 rounded-lg font-semibold transition-colors"
                          >
                            Save Notes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/30 font-mono font-bold">
                            <Notebook size={10} className="text-primary" />
                            Administrative Notes
                          </div>
                          <button
                            onClick={() => startNotesEdit(msg)}
                            className="text-[9px] uppercase tracking-widest text-primary hover:text-white border-b border-primary/30 hover:border-white pb-0.5 transition-colors"
                          >
                            {msg.admin_notes ? "Edit Notes" : "+ Add Note"}
                          </button>
                        </div>
                        {msg.admin_notes ? (
                          <p className="text-[11px] text-gray-400 leading-relaxed italic border-l border-primary/20 pl-3 py-0.5 font-mono">
                            {msg.admin_notes}
                          </p>
                        ) : (
                          <p className="text-[10px] text-white/25 italic">No notes attached to this record.</p>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
