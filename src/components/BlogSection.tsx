"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  url: string;
}

const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Building AI Agents with OpenAI SDK",
    excerpt:
      "A deep dive into constructing personality-driven AI agents with memory, guardrails, and tool-based architecture.",
    date: "Apr 2026",
    tag: "AI / Agents",
    readTime: "5 min read",
    url: "https://dev.to",
  },
  {
    id: 2,
    title: "Multi-Agent Architecture Patterns",
    excerpt:
      "Exploring MAMWA — Multi-Agent Multi-Window Architecture — for sophisticated agentic workflows.",
    date: "Mar 2026",
    tag: "System Design",
    readTime: "7 min read",
    url: "https://dev.to",
  },
  {
    id: 3,
    title: "Chrome Extensions & Real-Time Audio",
    excerpt:
      "How I built Late-Meet: a local-first meeting intelligence companion using VAD and streaming transcription.",
    date: "Feb 2026",
    tag: "Web / Extensions",
    readTime: "6 min read",
    url: "https://dev.to",
  },
];

export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CR fix: AbortController prevents setState on unmounted component
    const controller = new AbortController();

    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://dev.to/api/articles?username=shouri123", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Could not fetch DEV.to posts");
        const data = await res.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          const parsed: BlogPost[] = data.slice(0, 3).map((item: any) => ({
            id: item.id,
            title: item.title,
            excerpt: item.description || "Click to read this article on DEV.to.",
            date: new Date(item.published_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric"
            }),
            tag: item.tag_list && item.tag_list[0] ? item.tag_list[0].toUpperCase() : "TECH",
            readTime: `${item.reading_time_minutes || 5} min read`,
            url: item.url
          }));
          setPosts(parsed);
        } else {
          setPosts(STATIC_BLOG_POSTS);
        }
      } catch (err) {
        // Silently ignore abort errors — component unmounted intentionally
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("DEV.to API error:", err);
        setPosts(STATIC_BLOG_POSTS);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, posts]);

  return (
    <section
      id="blog"
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-20 md:py-32 px-4 md:px-8 border-t border-white/5"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-[#E1E0CC] text-4xl md:text-6xl font-bold tracking-tight">
            From the{" "}
            <span className="font-serif italic font-normal text-primary">
              Lab
            </span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-lg">
            Thoughts, experiments, and deep dives into the systems I build.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-[280px] rounded-2xl md:rounded-3xl border border-white/5 bg-bg-card animate-pulse p-6 md:p-7 flex flex-col justify-between">
                <div className="flex justify-between items-center w-full">
                  <div className="h-6 w-20 bg-white/5 rounded-full" />
                  <div className="h-4 w-12 bg-white/5 rounded" />
                </div>
                <div className="h-6 w-3/4 bg-white/5 rounded my-4" />
                <div className="h-12 w-full bg-white/5 rounded mb-4" />
                <div className="h-4 w-16 bg-white/5 rounded" />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="blog-card group cursor-pointer"
                onClick={() => window.open(post.url, "_blank")}
              >
                <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 bg-bg-card hover:bg-[#141414] transition-all duration-500 flex flex-col p-6 md:p-7">
                  {/* Tag + Read Time */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-primary/50 border border-white/8 px-3 py-1 rounded-full bg-white/2">
                      {post.tag}
                    </span>
                    <span className="text-[9px] md:text-[10px] tracking-wider text-white/20 uppercase">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-primary text-lg md:text-xl font-semibold tracking-tight mb-3 group-hover:text-white transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] text-white/20 uppercase tracking-widest font-serif italic">
                      {post.date}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/25 group-hover:text-primary/70 transition-colors duration-300">
                      Read
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
