import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Instantiate only if credentials exist, otherwise return null representing mock state
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// The Database Schema mapped for the 'projects' table:
// id (uuid)
// title (text)
// description (text)
// live_url (text)
// source_code_url (text)
// tech_stack (text array)
// theme_color (text)

export async function fetchProjects() {
  if (!supabase) {
    // Return graceful fallback mocked payload if DB keys aren't set
    return [
      {
        id: 1,
        title: "Late-Meet",
        description: "An advanced Chrome extension utilizing local-first LLMs and transcription algorithms to act as a seamless meeting intelligence companion.",
        live_url: "https://github.com/shouri123/Late-Meet",
        source_code_url: "https://github.com/shouri123/Late-Meet",
        tech_stack: ["TypeScript", "Chrome Extensions", "VAD", "OpenAI"],
        theme_color: "#212121",
        is_active: true
      },
      {
        id: 2,
        title: "Aven",
        description: "A Multi-Agent Multi-Window Architecture (MAMWA) platform for sophisticated agentic workflows and AI-driven interfaces.",
        live_url: "https://aven-seven.vercel.app",
        source_code_url: "https://github.com/shouri123/Aven",
        tech_stack: ["Next.js", "TypeScript", "Multi-Agent", "Vercel"],
        theme_color: "#252525",
        is_active: true
      },
      {
        id: 3,
        title: "Chat-Buddy",
        description: "A personality-driven WhatsApp AI agent with memory, guardrails, and a tool-based architecture built using the OpenAI Agents SDK.",
        live_url: "https://www.npmjs.com/package/chat-buddy",
        source_code_url: "https://github.com/shouri123/chat-buddy",
        tech_stack: ["Python", "OpenAI SDK", "WhatsApp", "NPM"],
        theme_color: "#1a1a1a",
        is_active: true
      },
      {
        id: 4,
        title: "Chat-Buddy UI",
        description: "A sleek, modern frontend interface for the Chat-Buddy AI agent, providing a seamless conversational experience.",
        live_url: "https://chat-buddy-ui-orcin.vercel.app/",
        source_code_url: "https://github.com/snackoverflowasad/chat-buddy-ui",
        tech_stack: ["React", "Next.js", "Vercel", "UI/UX"],
        theme_color: "#1e1e1e",
        is_active: true
      },
      {
        id: 5,
        title: "Java-Tut",
        description: "An immersive, cinematic learning hub for advanced object-oriented programming patterns and Java fundamentals.",
        live_url: "https://java-tut.vercel.app/",
        source_code_url: "https://github.com/shouri123/Java-Tut",
        tech_stack: ["Java", "OOP", "Next.js", "Vercel"],
        theme_color: "#1e1e1e",
        is_active: true
      }
    ];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Fetch Error:", error);
    return [];
  }
  return data;
}
