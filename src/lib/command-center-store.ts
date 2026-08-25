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
  latency?: string;
  promptsServed?: number;
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

export interface GitHubActivityEvent {
  id: string;
  action: string;
  repo: string;
  timeLabel: string;
  type: "pr_merged" | "issue_opened" | "contributor_joined" | "star_received" | "commit_pushed";
}

export interface ActivityDistribution {
  commits: number;
  codeReview: number;
  issues: number;
  pullRequests: number;
}

export interface RepoHealthItem {
  name: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPRs?: number;
  contributors?: number;
  totalCommits?: number;
  status: "Active" | "Healthy" | "Maintenance";
  lastCommit: string;
}

export interface MaintainerMetrics {
  totalProjects: number;
  activeProjects: number;
  totalContributors: number;
  mergedPRs: number;
  openIssues: number;
  openPRs?: number;
  totalCommits?: number;
  totalRepositoriesContributed?: number;
  lastActivity: string;
  prResponseQuality: string;
  issueActivity: string;
  contributorGrowthTrend: string;
  communityScore: string;
  distribution?: ActivityDistribution;
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
  { id: "ai-1", name: "OpenAI API", status: "Connected", model: "gpt-4o / Realtime SDK", lastRequest: "3m ago", latency: "142ms", promptsServed: 840 },
  { id: "ai-2", name: "GitHub GraphQL", status: "Connected", model: "GraphQL v4 / REST v3", lastRequest: "1m ago", latency: "64ms", promptsServed: 1250 },
  { id: "ai-3", name: "Supabase DB", status: "Connected", model: "PostgreSQL v17", lastRequest: "Just now", latency: "23ms", promptsServed: 3100 },
  { id: "ai-4", name: "Gemini 1.5", status: "Connected", model: "Gemini Pro / Flash", lastRequest: "12m ago", latency: "189ms", promptsServed: 420 },
  { id: "ai-5", name: "ElevenLabs", status: "Configured", model: "v2 Voice Synthesis", lastRequest: "1h ago", latency: "210ms", promptsServed: 190 }
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

let githubEvents: GitHubActivityEvent[] = [
  { id: "gh-1", action: "PR #241 merged", repo: "Late-Meet", timeLabel: "18 min ago", type: "pr_merged" },
  { id: "gh-2", action: "Issue #84 opened: 'Add VAD sensitivity slider'", repo: "Late-Meet", timeLabel: "1 hr ago", type: "issue_opened" },
  { id: "gh-3", action: "New contributor joined squad", repo: "Aven", timeLabel: "3 hr ago", type: "contributor_joined" },
  { id: "gh-4", action: "Star received from @dev_alex", repo: "Late-Meet", timeLabel: "4 hr ago", type: "star_received" },
  { id: "gh-5", action: "Pushed 3 commits to main branch", repo: "Portfolio", timeLabel: "5 hr ago", type: "commit_pushed" },
  { id: "gh-6", action: "PR #112 reviewed & approved", repo: "Chat-Buddy", timeLabel: "8 hr ago", type: "pr_merged" }
];

let repoHealthList: RepoHealthItem[] = [
  { name: "Late-Meet", stars: 44, forks: 97, openIssues: 128, openPRs: 76, contributors: 76, totalCommits: 1251, status: "Active", lastCommit: "2 days ago" },
  { name: "Sanatan-Dharma", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 75, status: "Active", lastCommit: "Just now" },
  { name: "INDEPENDENCE-DAY-2026", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 33, status: "Active", lastCommit: "Aug 15" },
  { name: "Portfolio", stars: 1, forks: 1, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 18, status: "Active", lastCommit: "Just now" },
  { name: "Snaply", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 4, status: "Active", lastCommit: "Aug 9" },
  { name: "ashram_cup-website", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 2, totalCommits: 6, status: "Active", lastCommit: "Aug 12" },
  { name: "Aven", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 1, totalCommits: 12, status: "Healthy", lastCommit: "3 months ago" },
  { name: "chat-buddy", stars: 0, forks: 0, openIssues: 0, openPRs: 0, contributors: 2, totalCommits: 45, status: "Healthy", lastCommit: "1 month ago" }
];

let maintainerMetrics: MaintainerMetrics = {
  totalProjects: 19,
  activeProjects: 6,
  totalContributors: 76,
  mergedPRs: 200,
  openIssues: 128,
  openPRs: 76,
  totalCommits: 1816,
  totalRepositoriesContributed: 44,
  lastActivity: "Just now",
  prResponseQuality: "Excellent (< 2h avg)",
  issueActivity: "High (128 open issues, 76 open PRs)",
  contributorGrowthTrend: "+76 contributors squad",
  communityScore: "96%",
  distribution: {
    commits: 75,
    codeReview: 17,
    issues: 5,
    pullRequests: 3
  }
};

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

export function setGitHubActivityEvents(events: GitHubActivityEvent[]) {
  if (events && events.length > 0) {
    githubEvents = [...events];
  }
}

export function setRepoHealthItems(items: RepoHealthItem[]) {
  if (items && items.length > 0) {
    repoHealthList = [...items];
  }
}

export function setMaintainerMetrics(metrics: Partial<MaintainerMetrics>) {
  maintainerMetrics = { ...maintainerMetrics, ...metrics };
}

export function getGitHubActivityEvents(): GitHubActivityEvent[] {
  return [...githubEvents];
}

export function getRepoHealthItems(): RepoHealthItem[] {
  return [...repoHealthList];
}

export function getMaintainerMetrics(): MaintainerMetrics {
  return { ...maintainerMetrics };
}
