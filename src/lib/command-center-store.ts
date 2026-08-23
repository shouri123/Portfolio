// SHOURI // COMMAND CENTER — Data Store

export interface CareerProfile {
  headline: string;
  subheadline: string;
  availability: string;
  isAvailable: boolean;
  preferredRoles: string[];
  location: string;
  bio: string;
  resumeUrl: string;
  portraitUrl: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  timeLabel: string;
  title: string;
  description: string;
  type: "github" | "project" | "message" | "resume" | "system";
}

export interface AIServiceStatus {
  id: string;
  name: string;
  status: "Connected" | "Configured" | "Standby" | "Offline";
  model: string;
  lastRequest: string;
}

export interface ContentArticle {
  id: string;
  title: string;
  slug: string;
  category: "Article" | "Case Study" | "Note" | "Announcement";
  status: "Published" | "Draft" | "Archived";
  publishedAt: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface CRMMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  category: "Internship" | "Freelance" | "Collaboration" | "General";
  status: "unread" | "read" | "replied" | "archived";
  admin_notes?: string;
}

let careerData: CareerProfile = {
  headline: "Developer × Product Designer × Open Source Maintainer",
  subheadline: "Building AI-driven products, agentic tools, and cinematic web experiences.",
  availability: "Available for Internships & OSS",
  isAvailable: true,
  preferredRoles: ["AI Engineer", "Full Stack Developer", "Frontend Engineer"],
  location: "Kolkata, India",
  bio: "Diving deep into Generative AI, Agentic systems, AI/ML, and NLP. I love exploring new tools, experimenting with emerging tech, and building things that make computers feel a little smarter.",
  resumeUrl: "/Shouri_Chakraborty_Resume.pdf",
  portraitUrl: "/developer_portrait.jpg"
};

let activityLogs: ActivityItem[] = [
  {
    id: "act-1",
    timestamp: new Date().toISOString(),
    timeLabel: "Just now",
    title: "GitHub Synchronized",
    description: "Successfully fetched latest contributions & repo stars.",
    type: "github"
  },
  {
    id: "act-2",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    timeLabel: "15m ago",
    title: "Project 'Late-Meet' viewed",
    description: "Agent crawler inspected project details.",
    type: "project"
  },
  {
    id: "act-3",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    timeLabel: "45m ago",
    title: "New opportunity received",
    description: "Contact submission from GSSoC Organizers.",
    type: "message"
  },
  {
    id: "act-4",
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeLabel: "2h ago",
    title: "Resume downloaded",
    description: "Official resume PDF fetched by recruiter agent.",
    type: "resume"
  }
];

let aiServices: AIServiceStatus[] = [
  { id: "ai-1", name: "OpenAI", status: "Connected", model: "gpt-4o / Agents SDK", lastRequest: "3m ago" },
  { id: "ai-2", name: "GitHub API", status: "Connected", model: "GraphQL v4 / REST v3", lastRequest: "1m ago" },
  { id: "ai-3", name: "Supabase", status: "Connected", model: "PostgreSQL v15", lastRequest: "Just now" },
  { id: "ai-4", name: "Gemini", status: "Connected", model: "Gemini 1.5 Pro / Flash", lastRequest: "12m ago" },
  { id: "ai-5", name: "ElevenLabs", status: "Configured", model: "v2 Voice Synthesis", lastRequest: "1h ago" }
];

let articlesList: ContentArticle[] = [
  {
    id: "art-1",
    title: "How I Built Late-Meet: A Local-First Meeting Copilot",
    slug: "how-i-built-late-meet",
    category: "Case Study",
    status: "Published",
    publishedAt: "2026-04-10",
    readTime: "6 min read",
    summary: "Deep dive into local VAD filtering, real-time WebRTC audio transcription, and running lightweight LLMs directly on-device.",
    content: "Building Late-Meet required overcoming local audio stream latency..."
  },
  {
    id: "art-2",
    title: "Lessons Learned Administering Open Source Repos in GSSoC 2026",
    slug: "gssoc-2026-maintainer-learnings",
    category: "Article",
    status: "Published",
    publishedAt: "2026-05-18",
    readTime: "4 min read",
    summary: "Reviewing 200+ PRs, managing contributor expectations, and setting up automated CI guardrails.",
    content: "Open source maintenance at scale is as much about clear communication as code..."
  }
];

let crmMessages: CRMMessage[] = [
  {
    id: "msg-1",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    name: "Asad Hussain",
    email: "asad@asadhussain.in",
    message: "Hey Shouri, looked at your portfolio upgrades. The GSAP transitions, GSSoC credentials badge, and live Github activity graph look premium. Keep up the good work!",
    category: "Collaboration",
    status: "unread",
    admin_notes: "Follow up about open source project collaborations next week."
  },
  {
    id: "msg-2",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    name: "GirlScript Organizers",
    email: "info@gssoc.org",
    message: "Thank you for administering the repositories for GSSoC 2026. Excellent PR review response times and coordination with contributors.",
    category: "General",
    status: "unread"
  },
  {
    id: "msg-3",
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    name: "TechCorp Recruiter",
    email: "careers@techcorp.com",
    message: "We're looking for a Frontend & AI Intern with strong Next.js, Tailwind, and Agentic systems skills. Let us know if you'd be interested.",
    category: "Internship",
    status: "read",
    admin_notes: "Scheduled phone screen for Friday."
  }
];

export function getCareerProfile(): CareerProfile {
  return { ...careerData };
}

export function updateCareerProfile(data: Partial<CareerProfile>): CareerProfile {
  careerData = { ...careerData, ...data };
  return { ...careerData };
}

export function getActivityLogs(): ActivityItem[] {
  return [...activityLogs];
}

export function addActivityLog(log: Omit<ActivityItem, "id" | "timestamp" | "timeLabel">) {
  const newLog: ActivityItem = {
    ...log,
    id: `act-${Date.now()}`,
    timestamp: new Date().toISOString(),
    timeLabel: "Just now"
  };
  activityLogs = [newLog, ...activityLogs].slice(0, 20);
}

export function getAIServices(): AIServiceStatus[] {
  return [...aiServices];
}

export function getArticles(): ContentArticle[] {
  return [...articlesList];
}

export function saveArticle(article: Partial<ContentArticle> & { title: string }): ContentArticle {
  if (article.id) {
    articlesList = articlesList.map(a => a.id === article.id ? { ...a, ...article } as ContentArticle : a);
    return articlesList.find(a => a.id === article.id)!;
  } else {
    const newArt: ContentArticle = {
      id: `art-${Date.now()}`,
      title: article.title,
      slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: article.category || "Article",
      status: article.status || "Published",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: article.readTime || "5 min read",
      summary: article.summary || "",
      content: article.content || ""
    };
    articlesList = [newArt, ...articlesList];
    return newArt;
  }
}

export function getCRMMessages(): CRMMessage[] {
  return [...crmMessages];
}

export function updateCRMMessage(id: string, updates: Partial<CRMMessage>): CRMMessage | null {
  const index = crmMessages.findIndex(m => String(m.id) === String(id));
  if (index !== -1) {
    crmMessages[index] = { ...crmMessages[index], ...updates };
    return crmMessages[index];
  }
  return null;
}

export function deleteCRMMessage(id: string): boolean {
  const initialLength = crmMessages.length;
  crmMessages = crmMessages.filter(m => String(m.id) !== String(id));
  return crmMessages.length < initialLength;
}
