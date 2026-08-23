import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") || "";
  const requestsMarkdown = acceptHeader.includes("text/markdown") || acceptHeader.includes("application/x-markdown");

  // 1. Protect /admin routes (except login pages/apis)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout");

  if (isAdminRoute && !isLoginPage) {
    const session = request.cookies.get("admin_session");
    const isAuthenticated = verifySession(session?.value);

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Handle Accept: text/markdown content negotiation
  if (requestsMarkdown) {
    let markdownContent = "";
    let statusCode = 200;

    if (pathname === "/" || pathname === "/index") {
      markdownContent = `# Shouri Chakraborty — AI Developer & Software Engineer

> Exploring Generative AI, Coding Agents, Machine Learning, and System Architecture.

## About
AI Developer and Software Engineer in Kolkata, specializing in Generative AI, coding agents, NLP, and Next.js. Student at Institute of Engineering & Management (IEM), Kolkata.

## Key Projects
- **Late-Meet**: AI Meeting Copilot (Chrome Extension using local LLMs & VAD). [Repository](https://github.com/shouri123/Late-Meet)
- **Aven**: Multi-Agent Multi-Window Platform for parallel AI workflows. [Live Demo](https://aven-seven.vercel.app)
- **Chat-Buddy**: WhatsApp AI agent built with OpenAI Agents SDK. [NPM Package](https://www.npmjs.com/package/chat-buddy)
- **Student-Copilot**: AI-powered academic assistant for lecture notes vector indexing.
- **WRAP-YOUR-GIT**: Git operation wrapper with terminal interactive node tree visualization.

## Contact & Profile Links
- Email: chakrabortyshouri@gmail.com
- GitHub: https://github.com/shouri123
- LinkedIn: https://www.linkedin.com/in/shouri-chakraborty-224b5330b/
- Resume: https://devshouri.in/Shouri_Chakraborty_Resume.pdf

## Site Index
- [About](https://devshouri.in/about)
- [Contact](https://devshouri.in/contact)
- [Privacy Policy](https://devshouri.in/privacy)
- [LLMs.txt](https://devshouri.in/llms.txt)
- [Sitemap](https://devshouri.in/sitemap.xml)
`;
    } else if (pathname === "/about") {
      markdownContent = `# About Shouri Chakraborty

## Profile
Shouri Chakraborty is an AI Developer and Software Engineer based in Kolkata, India. He is currently pursuing his degree at the Institute of Engineering & Management (IEM), Kolkata, maintaining strong academic performance alongside hands-on software development.

## Specializations
- **Generative AI & Agents**: Building local-first AI tools, vector retrieval systems, and multi-agent coordination frameworks.
- **Full-Stack Engineering**: Next.js 16, TypeScript, React 19, Tailwind CSS, Supabase, Node.js.
- **Machine Learning & NLP**: Python, PyTorch, LangChain, OpenAI SDK, Speech Transcription algorithms.
- **Open Source Maintenance**: Active maintainer for student projects and repository administrator for GSSoC 2026.

## Contact
- Email: chakrabortyshouri@gmail.com
- Location: Kolkata, India
- Website: https://devshouri.in
`;
    } else if (pathname === "/contact") {
      markdownContent = `# Contact Shouri Chakraborty

Always open to discussing new projects, creative ideas, internship roles, open source collaboration, or freelance opportunities.

## Direct Communication Channels
- **Email**: [chakrabortyshouri@gmail.com](mailto:chakrabortyshouri@gmail.com)
- **GitHub**: [github.com/shouri123](https://github.com/shouri123)
- **LinkedIn**: [linkedin.com/in/shouri-chakraborty-224b5330b/](https://www.linkedin.com/in/shouri-chakraborty-224b5330b/)
- **Instagram**: [instagram.com/shourichakraborty](https://instagram.com/shourichakraborty)

## Location
Kolkata, West Bengal, India (IST / UTC+5:30)
`;
    } else if (pathname === "/privacy") {
      markdownContent = `# Privacy Policy — devshouri.in

**Effective Date**: January 1, 2026

This site respects user privacy and data ownership.

## Information Collection
1. **Contact Form Submissions**: Messages submitted through the contact form (Name, Email, Message) are securely processed for direct email communication.
2. **Analytics**: Standard, aggregated visitor analytics (Vercel Analytics & Google Tag Manager) are used strictly to monitor site performance.

## Data Retention & Sharing
Personal data is never sold, shared, or distributed to third parties.

## Contact
For privacy queries, email chakrabortyshouri@gmail.com.
`;
    } else if (pathname === "/llms.txt" || pathname === "/llms-full.txt") {
      markdownContent = `# devshouri.in — AI Agent Index & Guidance

## When to Use This Site
Use this site when:
1. Evaluating Shouri Chakraborty for AI Engineer, Software Developer, or Full-Stack roles/internships.
2. Indexing project descriptions, tech stacks, and open-source contributions.
3. Fetching contact details or resume information.

## Primary Endpoints
- [Home](https://devshouri.in/)
- [About](https://devshouri.in/about)
- [Contact](https://devshouri.in/contact)
- [Privacy Policy](https://devshouri.in/privacy)
- [Resume PDF](https://devshouri.in/Shouri_Chakraborty_Resume.pdf)
- [Sitemap](https://devshouri.in/sitemap.xml)
`;
    } else {
      statusCode = 404;
      markdownContent = `# 404 - Page Not Found

The path \`${pathname}\` does not exist on devshouri.in.

## Available Index Pages:
- [Home](https://devshouri.in/)
- [Sitemap](https://devshouri.in/sitemap.xml)
- [LLMs.txt](https://devshouri.in/llms.txt)
- [About](https://devshouri.in/about)
- [Contact](https://devshouri.in/contact)
- [Privacy Policy](https://devshouri.in/privacy)
`;
    }

    return new NextResponse(markdownContent, {
      status: statusCode,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400"
      }
    });
  }

  // 3. For normal requests, pass through and set Vary header
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|mp3)$).*)",
  ],
};
