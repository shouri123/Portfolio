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
        title: "Late-Meet (AI Copilot)",
        description: "An advanced Chrome extension utilizing local-first LLMs and transcription algorithms to act as a seamless meeting intelligence companion.",
        live_url: "https://shouri123.github.io/Late-Meet/",
        tech_stack: ["TypeScript", "Chrome Extensions", "VAD", "OpenAI"],
        theme_color: "#212121"
      },
      {
        id: 2,
        title: "Aven",
        description: "A comprehensive Next.js web application showcasing sophisticated responsive layouts, modern design tokens, and robust state management.",
        live_url: "https://shouri123.github.io/aven/",
        tech_stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        theme_color: "#252525"
      },
      {
        id: 3,
        title: "JAVA Practice Hub",
        description: "An immersive, cinematic learning hub for advanced object-oriented programming patterns modeled entirely in Java.",
        live_url: "https://shouri123.github.io/JAVA-Practice/",
        tech_stack: ["Java", "OOP", "Algorithm Design", "Next.js"],
        theme_color: "#1e1e1e"
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
