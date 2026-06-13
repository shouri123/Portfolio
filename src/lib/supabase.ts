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
        problem: "Online meetings often lead to cognitive overload, with participants struggling to take accurate notes while actively engaging.",
        solution: "Developed a local-first Chrome extension that listens, filters voice activity (VAD), transcribes audio in real-time, and generates summaries using a lightweight local LLM.",
        impact: "Enables immediate meeting summarization with zero server costs, preserving full user privacy.",
        live_url: "https://github.com/shouri123/Late-Meet",
        source_code_url: "https://github.com/shouri123/Late-Meet",
        tech_stack: ["TypeScript", "Chrome Extensions", "VAD", "OpenAI"],
        theme_color: "#212121",
        is_active: true,
        stars: 38,
        forks: 88,
        issues: 178
      },
      {
        id: 2,
        title: "Aven",
        description: "A Multi-Agent Multi-Window Architecture (MAMWA) platform for sophisticated agentic workflows and AI-driven interfaces.",
        problem: "Standard AI interfaces are limited to single-chat flows, making it difficult to orchestrate complex multi-agent reasoning tasks simultaneously.",
        solution: "Created a split-pane, multi-window Next.js dashboard where different specialized agents can execute parallel tasks and sync state dynamically.",
        impact: "Reduces task execution times for multi-step AI reasoning workflows by over 40%.",
        live_url: "https://aven-seven.vercel.app",
        source_code_url: "https://github.com/shouri123/Aven",
        tech_stack: ["Next.js", "TypeScript", "Multi-Agent", "Vercel"],
        theme_color: "#252525",
        is_active: true,
        stars: 4,
        forks: 2
      },
      {
        id: 3,
        title: "Chat-Buddy",
        description: "A personality-driven WhatsApp AI agent with memory, guardrails, and a tool-based architecture built using the OpenAI Agents SDK.",
        problem: "Most chat bots lack stateful memory and run into security guardrail vulnerabilities, making them unsuitable for production customer service.",
        solution: "Implemented an agent using OpenAI SDK that stores conversational vectors in local memory, enforces system prompt guardrails, and calls custom APIs.",
        impact: "Automates basic client inquiries with 95%+ precision and runs completely headless.",
        live_url: "https://www.npmjs.com/package/chat-buddy",
        source_code_url: "https://github.com/shouri123/chat-buddy",
        tech_stack: ["Python", "OpenAI SDK", "WhatsApp", "NPM"],
        theme_color: "#1a1a1a",
        is_active: true,
        stars: 22,
        forks: 18
      },
      {
        id: 4,
        title: "Chat-Buddy UI",
        description: "A sleek, modern frontend interface for the Chat-Buddy AI agent, providing a seamless conversational experience.",
        problem: "Headless CLI chat bots are difficult for non-technical users to configure and monitor.",
        solution: "Designed a dashboard using Next.js and Tailwind CSS that hooks into the Chat-Buddy APIs to show active conversations, logs, and system metrics.",
        impact: "Simplifies agent management, making it accessible to non-developers.",
        live_url: "https://chat-buddy-ui-orcin.vercel.app/",
        source_code_url: "https://github.com/snackoverflowasad/chat-buddy-ui",
        tech_stack: ["React", "Next.js", "Vercel", "UI/UX"],
        theme_color: "#1e1e1e",
        is_active: true,
        stars: 3,
        forks: 1
      },
      {
        id: 5,
        title: "Java-Tut",
        description: "An immersive, cinematic learning hub for advanced object-oriented programming patterns and Java fundamentals.",
        problem: "Traditional programming tutorials are static, dry, and fail to keep students engaged with complex OOP concepts.",
        solution: "Built a cinematic, interactive tutorial portal featuring animated code walk-throughs, inline compiler simulations, and gamified quizzes.",
        impact: "Helped over 150+ fellow IEM students master Java OOP patterns with interactive code playpens.",
        live_url: "https://java-tut.vercel.app/",
        source_code_url: "https://github.com/shouri123/Java-Tut",
        tech_stack: ["Java", "OOP", "Next.js", "Vercel"],
        theme_color: "#1e1e1e",
        is_active: true,
        stars: 2,
        forks: 1
      },
      {
        id: 6,
        title: "WRAP-YOUR-GIT",
        description: "A premium utility for wrapping Git operations and providing terminal-based graphical history visualization.",
        problem: "CLI Git histories can get cluttered and complex to parse using standard logging commands.",
        solution: "Developed a wrapper that packages Git actions and draws customizable, interactive node trees in the command terminal.",
        impact: "Simplifies branch auditing and git commit tracking for developer teams.",
        live_url: "https://github.com/shouri123/WRAP-YOUR-GIT",
        source_code_url: "https://github.com/shouri123/WRAP-YOUR-GIT",
        tech_stack: ["TypeScript", "Node.js", "Git Wrapper", "CLI"],
        theme_color: "#1a2a1a",
        is_active: true,
        stars: 8,
        forks: 3
      },
      {
        id: 7,
        title: "Student-Copilot",
        description: "An AI-powered academic assistant for class notes transcription, lecture summarizing, and exam preparation.",
        problem: "Students struggle to organize unstructured lecture notes and map them to syllabus topics efficiently.",
        solution: "Engineered an AI agent that accepts audio/text uploads, indexes them into vector storage, and cross-references them against syllabus guidelines.",
        impact: "Generates custom study guides, practice questions, and study plans automatically.",
        live_url: "https://github.com/shouri123/Student-Copilot",
        source_code_url: "https://github.com/shouri123/Student-Copilot",
        tech_stack: ["TypeScript", "Next.js", "LangChain", "Vector DB"],
        theme_color: "#1b1b2f",
        is_active: true,
        stars: 12,
        forks: 4
      },
      {
        id: 8,
        title: "QR-Attendance",
        description: "A QR-code based student attendance tracking system with encryption to prevent spoofing.",
        problem: "Manual attendance sheets are slow and highly vulnerable to proxy signing.",
        solution: "Designed a Python + OpenCV scanner system that generates dynamic, time-sensitive encrypted QR codes on screen that students scan to check-in.",
        impact: "Ensures proxy-proof classroom attendance tracking with instant spreadsheet reports.",
        live_url: "https://github.com/shouri123/QR-Attendance-",
        source_code_url: "https://github.com/shouri123/QR-Attendance-",
        tech_stack: ["Python", "OpenCV", "SQLite", "QR Encryption"],
        theme_color: "#2e1a1a",
        is_active: true,
        stars: 6,
        forks: 2
      },
      {
        id: 9,
        title: "House-Prediction-App",
        description: "A machine learning based web app for housing price prediction using regression models.",
        problem: "Buyers and sellers lack accurate local price estimation tools, relying on manual agent appraisals.",
        solution: "Trained a regression model on regional housing datasets and deployed it via a clean, interactive JavaScript web interface.",
        impact: "Delivers price estimations with over 88% accuracy based on custom property variables.",
        live_url: "https://github.com/shouri123/House-Prediction-App",
        source_code_url: "https://github.com/shouri123/House-Prediction-App",
        tech_stack: ["JavaScript", "Scikit-Learn", "HTML5", "CSS3"],
        theme_color: "#1c2e3f",
        is_active: true,
        stars: 5,
        forks: 1
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
